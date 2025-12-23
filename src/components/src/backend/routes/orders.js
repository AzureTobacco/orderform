const express = require('express');
const { dbHelpers } = require('../database/db');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Public endpoint for submitting orders (no auth required)
router.post('/public', [
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('orderDate').notEmpty().withMessage('Order date is required'),
    body('items').isArray().withMessage('Items must be an array'),
    body('distributorName').notEmpty().withMessage('Distributor name is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const {
            customerName, customerCode, customerEmail, customerPhone, customerAddress,
            orderDate, deliveryDate, items, tax, discount, notes, status,
            distributorName, distributorEmail, distributorPhone, distributorAddress
        } = req.body;
        
        // Calculate totals
        const subtotal = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
        const total = subtotal + (tax || 0) - (discount || 0);
        
        // Find or create distributor user
        let distributorUser = await dbHelpers.getUserByUsername(`dist_${distributorName.toLowerCase().replace(/\s+/g, '_')}`);
        
        if (!distributorUser) {
            // Create a new distributor user
            const bcrypt = require('bcryptjs');
            const username = `dist_${distributorName.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;
            const passwordHash = bcrypt.hashSync(Math.random().toString(36), 10);
            
            distributorUser = await dbHelpers.createUser({
                username,
                passwordHash,
                role: 'distributor',
                distributorName,
                email: distributorEmail,
                phone: distributorPhone,
                address: distributorAddress
            });
        }
        
        // Create order
        const orderData = {
            orderNumber: generateOrderNumber(),
            userId: distributorUser.id,
            customerName,
            customerCode,
            customerEmail,
            customerPhone,
            customerAddress,
            orderDate,
            deliveryDate,
            subtotal,
            tax: tax || 0,
            discount: discount || 0,
            total,
            status: status || 'submitted',
            notes
        };
        
        const order = await dbHelpers.createOrder(orderData);
        
        // Create order items
        if (items && items.length > 0) {
            await dbHelpers.createOrderItems(order.id, items);
        }
        
        // Get full order with items
        const fullOrder = await dbHelpers.getOrderById(order.id);
        const orderItems = await dbHelpers.getOrderItems(order.id);
        
        res.status(201).json({
            ...fullOrder,
            items: orderItems,
            message: 'Order submitted successfully'
        });
    } catch (error) {
        console.error('Public order submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// All other order routes require authentication
router.use(authenticateToken);

// Generate order number
const generateOrderNumber = () => {
    const prefix = 'AT';
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${year}${month}${day}-${random}`;
};

// Create new order
router.post('/', [
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('orderDate').notEmpty().withMessage('Order date is required'),
    body('items').isArray().withMessage('Items must be an array')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const {
            customerName, customerCode, customerEmail, customerPhone, customerAddress,
            orderDate, deliveryDate, items, tax, discount, notes, status
        } = req.body;
        
        // Calculate totals
        const subtotal = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
        const total = subtotal + (tax || 0) - (discount || 0);
        
        // Create order
        const orderData = {
            orderNumber: generateOrderNumber(),
            userId: req.user.id,
            customerName,
            customerCode,
            customerEmail,
            customerPhone,
            customerAddress,
            orderDate,
            deliveryDate,
            subtotal,
            tax: tax || 0,
            discount: discount || 0,
            total,
            status: status || 'draft',
            notes
        };
        
        const order = await dbHelpers.createOrder(orderData);
        
        // Create order items
        if (items && items.length > 0) {
            await dbHelpers.createOrderItems(order.id, items);
        }
        
        // Get full order with items
        const fullOrder = await dbHelpers.getOrderById(order.id);
        const orderItems = await dbHelpers.getOrderItems(order.id);
        
        res.status(201).json({
            ...fullOrder,
            items: orderItems
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all orders for current user
router.get('/', async (req, res) => {
    try {
        const { status, month } = req.query;
        const filters = {};
        
        if (status) filters.status = status;
        if (month) filters.month = month;
        
        const orders = await dbHelpers.getOrdersByUser(req.user.id, filters);
        
        // Get items for each order
        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const items = await dbHelpers.getOrderItems(order.id);
                return { ...order, items };
            })
        );
        
        res.json(ordersWithItems);
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all orders (admin only)
router.get('/all', requireAdmin, async (req, res) => {
    try {
        const { status, month } = req.query;
        const filters = {};
        
        if (status) filters.status = status;
        if (month) filters.month = month;
        
        const orders = await dbHelpers.getAllOrders(filters);
        
        // Get items for each order
        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const items = await dbHelpers.getOrderItems(order.id);
                return { ...order, items };
            })
        );
        
        res.json(ordersWithItems);
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get single order by ID
router.get('/:id', async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        const order = await dbHelpers.getOrderById(orderId, req.user.role === 'admin' ? null : req.user.id);
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        const items = await dbHelpers.getOrderItems(orderId);
        
        res.json({ ...order, items });
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update order
router.put('/:id', async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        
        // Check if order exists and belongs to user (unless admin)
        const existingOrder = await dbHelpers.getOrderById(orderId, req.user.role === 'admin' ? null : req.user.id);
        if (!existingOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        const {
            customerName, customerCode, customerEmail, customerPhone, customerAddress,
            orderDate, deliveryDate, items, tax, discount, notes, status
        } = req.body;
        
        // Calculate totals if items are provided
        let subtotal = existingOrder.subtotal;
        let total = existingOrder.total;
        
        if (items) {
            subtotal = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
            total = subtotal + (tax !== undefined ? tax : existingOrder.tax) - (discount !== undefined ? discount : existingOrder.discount);
        } else {
            const existingTax = tax !== undefined ? tax : existingOrder.tax;
            const existingDiscount = discount !== undefined ? discount : existingOrder.discount;
            total = subtotal + existingTax - existingDiscount;
        }
        
        // Update order
        const updateData = {
            customerName: customerName || existingOrder.customer_name,
            customerCode: customerCode !== undefined ? customerCode : existingOrder.customer_code,
            customerEmail: customerEmail !== undefined ? customerEmail : existingOrder.customer_email,
            customerPhone: customerPhone !== undefined ? customerPhone : existingOrder.customer_phone,
            customerAddress: customerAddress !== undefined ? customerAddress : existingOrder.customer_address,
            orderDate: orderDate || existingOrder.order_date,
            deliveryDate: deliveryDate !== undefined ? deliveryDate : existingOrder.delivery_date,
            subtotal,
            tax: tax !== undefined ? tax : existingOrder.tax,
            discount: discount !== undefined ? discount : existingOrder.discount,
            total,
            status: status || existingOrder.status,
            notes: notes !== undefined ? notes : existingOrder.notes
        };
        
        await dbHelpers.updateOrder(orderId, updateData, req.user.role === 'admin' ? null : req.user.id);
        
        // Update items if provided
        if (items) {
            await dbHelpers.deleteOrderItems(orderId);
            await dbHelpers.createOrderItems(orderId, items);
        }
        
        // Get updated order
        const updatedOrder = await dbHelpers.getOrderById(orderId);
        const orderItems = await dbHelpers.getOrderItems(orderId);
        
        res.json({ ...updatedOrder, items: orderItems });
    } catch (error) {
        console.error('Update order error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete order
router.delete('/:id', async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        
        // Check if order exists and belongs to user (unless admin)
        const existingOrder = await dbHelpers.getOrderById(orderId, req.user.role === 'admin' ? null : req.user.id);
        if (!existingOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        await dbHelpers.deleteOrder(orderId, req.user.role === 'admin' ? null : req.user.id);
        
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Delete order error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get monthly reconciliation
router.get('/reconciliation/:month', async (req, res) => {
    try {
        const { month } = req.params;
        const filters = { month };
        
        // If admin, get all orders; otherwise, only user's orders
        const orders = req.user.role === 'admin' 
            ? await dbHelpers.getAllOrders(filters)
            : await dbHelpers.getOrdersByUser(req.user.id, filters);
        
        // Get items for each order
        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const items = await dbHelpers.getOrderItems(order.id);
                return { ...order, items };
            })
        );
        
        const totalOrders = ordersWithItems.length;
        const totalAmount = ordersWithItems.reduce((sum, order) => sum + (order.total || 0), 0);
        const processedOrders = ordersWithItems.filter(o => o.status === 'processed').length;
        const pendingOrders = ordersWithItems.filter(o => o.status === 'submitted' || o.status === 'draft').length;
        
        res.json({
            month,
            orders: ordersWithItems,
            totalOrders,
            totalAmount,
            processedOrders,
            pendingOrders
        });
    } catch (error) {
        console.error('Reconciliation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;






