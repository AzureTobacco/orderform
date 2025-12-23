const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'orders.db');

// Ensure database directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database schema
function initializeDatabase() {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error initializing database:', err.message);
        } else {
            console.log('Database schema initialized');
            createDefaultAdmin();
        }
    });
}

// Create default admin user
function createDefaultAdmin() {
    const bcrypt = require('bcryptjs');
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    
    db.get('SELECT id FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            console.error('Error checking admin user:', err.message);
            return;
        }
        
        if (!row) {
            const passwordHash = bcrypt.hashSync(password, 10);
            db.run(
                'INSERT INTO users (username, password_hash, role, distributor_name) VALUES (?, ?, ?, ?)',
                [username, passwordHash, 'admin', 'System Administrator'],
                (err) => {
                    if (err) {
                        console.error('Error creating admin user:', err.message);
                    } else {
                        console.log(`Default admin user created: ${username} / ${password}`);
                    }
                }
            );
        }
    });
}

// Database helper functions
const dbHelpers = {
    // User operations
    getUserByUsername: (username) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },
    
    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT id, username, role, distributor_name, email, phone, address FROM users WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },
    
    createUser: (userData) => {
        return new Promise((resolve, reject) => {
            const { username, passwordHash, role, distributorName, email, phone, address } = userData;
            db.run(
                'INSERT INTO users (username, password_hash, role, distributor_name, email, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [username, passwordHash, role || 'distributor', distributorName, email, phone, address],
                function(err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID, ...userData });
                }
            );
        });
    },
    
    // Order operations
    createOrder: (orderData) => {
        return new Promise((resolve, reject) => {
            const {
                orderNumber, userId, customerName, customerCode, customerEmail,
                customerPhone, customerAddress, orderDate, deliveryDate,
                subtotal, tax, discount, total, status, notes
            } = orderData;
            
            db.run(
                `INSERT INTO orders (
                    order_number, user_id, customer_name, customer_code, customer_email,
                    customer_phone, customer_address, order_date, delivery_date,
                    subtotal, tax, discount, total, status, notes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    orderNumber, userId, customerName, customerCode, customerEmail,
                    customerPhone, customerAddress, orderDate, deliveryDate,
                    subtotal, tax || 0, discount || 0, total, status || 'draft', notes
                ],
                function(err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID, ...orderData });
                }
            );
        });
    },
    
    getOrderById: (orderId, userId = null) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM orders WHERE id = ?';
            const params = [orderId];
            
            if (userId) {
                query += ' AND user_id = ?';
                params.push(userId);
            }
            
            db.get(query, params, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },
    
    getOrdersByUser: (userId, filters = {}) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM orders WHERE user_id = ?';
            const params = [userId];
            
            if (filters.status) {
                query += ' AND status = ?';
                params.push(filters.status);
            }
            
            if (filters.month) {
                query += ' AND strftime("%Y-%m", order_date) = ?';
                params.push(filters.month);
            }
            
            query += ' ORDER BY created_at DESC';
            
            db.all(query, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows || []);
            });
        });
    },
    
    getAllOrders: (filters = {}) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM orders WHERE 1=1';
            const params = [];
            
            if (filters.status) {
                query += ' AND status = ?';
                params.push(filters.status);
            }
            
            if (filters.month) {
                query += ' AND strftime("%Y-%m", order_date) = ?';
                params.push(filters.month);
            }
            
            query += ' ORDER BY created_at DESC';
            
            db.all(query, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows || []);
            });
        });
    },
    
    updateOrder: (orderId, orderData, userId = null) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE orders SET ';
            const updates = [];
            const params = [];
            
            Object.keys(orderData).forEach(key => {
                if (key !== 'id' && key !== 'order_number' && key !== 'user_id') {
                    updates.push(`${key} = ?`);
                    params.push(orderData[key]);
                }
            });
            
            updates.push('updated_at = CURRENT_TIMESTAMP');
            query += updates.join(', ');
            query += ' WHERE id = ?';
            params.push(orderId);
            
            if (userId) {
                query += ' AND user_id = ?';
                params.push(userId);
            }
            
            db.run(query, params, function(err) {
                if (err) reject(err);
                else resolve({ id: orderId, changes: this.changes });
            });
        });
    },
    
    deleteOrder: (orderId, userId = null) => {
        return new Promise((resolve, reject) => {
            let query = 'DELETE FROM orders WHERE id = ?';
            const params = [orderId];
            
            if (userId) {
                query += ' AND user_id = ?';
                params.push(userId);
            }
            
            db.run(query, params, function(err) {
                if (err) reject(err);
                else resolve({ changes: this.changes });
            });
        });
    },
    
    // Order items operations
    createOrderItems: (orderId, items) => {
        return new Promise((resolve, reject) => {
            if (!items || items.length === 0) {
                resolve([]);
                return;
            }
            
            const stmt = db.prepare(
                'INSERT INTO order_items (order_id, product_name, product_code, product_range, packaging, quantity, unit_price, total_price, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
            );
            
            items.forEach(item => {
                stmt.run([
                    orderId,
                    item.productName,
                    item.productCode || null,
                    item.range || null,
                    item.packaging || null,
                    item.quantity,
                    item.unitPrice,
                    item.totalPrice,
                    item.notes || null
                ]);
            });
            
            stmt.finalize((err) => {
                if (err) reject(err);
                else resolve(items);
            });
        });
    },
    
    getOrderItems: (orderId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM order_items WHERE order_id = ?', [orderId], (err, rows) => {
                if (err) reject(err);
                else resolve(rows || []);
            });
        });
    },
    
    deleteOrderItems: (orderId) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM order_items WHERE order_id = ?', [orderId], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};

module.exports = { db, dbHelpers };






