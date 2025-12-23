// Order storage utilities for distributor order form

export interface OrderItem {
  id: string
  productName: string
  productCode?: string
  quantity: number
  unitPrice: number
  totalPrice: number
  notes?: string
}

export interface CustomerOrder {
  id: string
  orderNumber: string
  customerName: string
  customerCode?: string
  customerEmail?: string
  customerPhone?: string
  customerAddress?: string
  orderDate: string
  deliveryDate?: string
  items: OrderItem[]
  subtotal: number
  tax?: number
  discount?: number
  total: number
  status: 'draft' | 'submitted' | 'processed' | 'cancelled'
  notes?: string
  distributorId?: string
  distributorName?: string
  createdAt: string
  updatedAt: string
}

export interface MonthlyReconciliation {
  month: string // Format: YYYY-MM
  orders: CustomerOrder[]
  totalOrders: number
  totalAmount: number
  processedOrders: number
  pendingOrders: number
}

// Storage keys
const STORAGE_KEY_ORDERS = 'azure_tobacco_distributor_orders'
const STORAGE_KEY_DISTRIBUTOR = 'azure_tobacco_distributor_info'

// Get all orders from localStorage
export const getAllOrders = (): CustomerOrder[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_ORDERS)
    if (!stored) return []
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error reading orders from storage:', error)
    return []
  }
}

// Save order to localStorage
export const saveOrder = (order: CustomerOrder): void => {
  try {
    const orders = getAllOrders()
    const existingIndex = orders.findIndex(o => o.id === order.id)
    
    if (existingIndex >= 0) {
      orders[existingIndex] = { ...order, updatedAt: new Date().toISOString() }
    } else {
      orders.push(order)
    }
    
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders))
  } catch (error) {
    console.error('Error saving order to storage:', error)
    throw error
  }
}

// Delete order from localStorage
export const deleteOrder = (orderId: string): void => {
  try {
    const orders = getAllOrders()
    const filtered = orders.filter(o => o.id !== orderId)
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting order from storage:', error)
    throw error
  }
}

// Get order by ID
export const getOrderById = (orderId: string): CustomerOrder | null => {
  const orders = getAllOrders()
  return orders.find(o => o.id === orderId) || null
}

// Get orders by month (YYYY-MM format)
export const getOrdersByMonth = (month: string): CustomerOrder[] => {
  const orders = getAllOrders()
  return orders.filter(order => {
    const orderMonth = order.orderDate.substring(0, 7) // Get YYYY-MM
    return orderMonth === month
  })
}

// Get monthly reconciliation data
export const getMonthlyReconciliation = (month: string): MonthlyReconciliation => {
  const orders = getOrdersByMonth(month)
  const totalAmount = orders.reduce((sum, order) => sum + order.total, 0)
  const processedOrders = orders.filter(o => o.status === 'processed').length
  const pendingOrders = orders.filter(o => o.status === 'submitted' || o.status === 'draft').length

  return {
    month,
    orders,
    totalOrders: orders.length,
    totalAmount,
    processedOrders,
    pendingOrders
  }
}

// Get all available months with orders
export const getAvailableMonths = (): string[] => {
  const orders = getAllOrders()
  const months = new Set<string>()
  
  orders.forEach(order => {
    const month = order.orderDate.substring(0, 7)
    months.add(month)
  })
  
  return Array.from(months).sort().reverse() // Most recent first
}

// Generate order number
export const generateOrderNumber = (): string => {
  const prefix = 'AT'
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `${prefix}-${year}${month}${day}-${random}`
}

// Generate unique order ID
export const generateOrderId = (): string => {
  return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Save distributor info
export interface DistributorInfo {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
}

export const saveDistributorInfo = (info: DistributorInfo): void => {
  try {
    localStorage.setItem(STORAGE_KEY_DISTRIBUTOR, JSON.stringify(info))
  } catch (error) {
    console.error('Error saving distributor info:', error)
    throw error
  }
}

export const getDistributorInfo = (): DistributorInfo | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_DISTRIBUTOR)
    if (!stored) return null
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error reading distributor info from storage:', error)
    return null
  }
}

// Export orders to JSON
export const exportOrdersToJSON = (orders: CustomerOrder[]): string => {
  return JSON.stringify(orders, null, 2)
}

// Export orders to CSV
export const exportOrdersToCSV = (orders: CustomerOrder[]): string => {
  if (orders.length === 0) return ''
  
  const headers = [
    'Order Number',
    'Order Date',
    'Customer Name',
    'Customer Code',
    'Customer Email',
    'Customer Phone',
    'Status',
    'Total Items',
    'Subtotal',
    'Tax',
    'Discount',
    'Total',
    'Notes'
  ]
  
  const rows = orders.map(order => [
    order.orderNumber,
    order.orderDate,
    order.customerName,
    order.customerCode || '',
    order.customerEmail || '',
    order.customerPhone || '',
    order.status,
    order.items.length.toString(),
    order.subtotal.toFixed(2),
    (order.tax || 0).toFixed(2),
    (order.discount || 0).toFixed(2),
    order.total.toFixed(2),
    order.notes || ''
  ])
  
  const csv = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n')
  return csv
}
