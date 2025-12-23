import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus, Search, Filter, Eye, Edit, Trash2, Package, Users, DollarSign, Clock, TrendingUp, Activity, CheckCircle, AlertTriangle } from 'lucide-react'
import { AnimatedCounter, StatusBadge } from './ModernUI'

interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  orderDate: string
  deliveryDate: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  paymentStatus: 'pending' | 'paid' | 'partial' | 'refunded'
  paymentMethod: string
  shippingAddress: Address
  billingAddress: Address
  notes: string
  assignedTo: string
}

interface OrderItem {
  id: string
  productId: string
  productName: string
  sku: string
  quantity: number
  unitPrice: number
  totalPrice: number
  specifications?: string
}

interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  lastOrderDate: string
  status: 'active' | 'inactive' | 'vip'
  address: Address
  notes: string
}

interface OrderStats {
  totalOrders: number
  pendingOrders: number
  processingOrders: number
  shippedOrders: number
  totalRevenue: number
  averageOrderValue: number
}

const OrdersManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showAddOrder, setShowAddOrder] = useState(false)

  // Load sample data
  useEffect(() => {
    loadOrdersData()
    loadCustomersData()
  }, [])

  const loadOrdersData = () => {
    const sampleOrders: Order[] = [
      {
        id: 'ord-001',
        orderNumber: 'ORD-2024-001',
        customerId: 'cust-001',
        customerName: 'Ahmed Al-Mansouri',
        customerEmail: 'ahmed@example.com',
        customerPhone: '+971-4-555-0123',
        orderDate: '2024-01-15T10:30:00Z',
        deliveryDate: '2024-01-20T00:00:00Z',
        status: 'processing',
        priority: 'high',
        items: [
          {
            id: 'item-001',
            productId: 'prod-001',
            productName: 'Premium Cigar Collection',
            sku: 'PCC-001',
            quantity: 2,
            unitPrice: 150.00,
            totalPrice: 300.00,
            specifications: 'Cuban wrapper, aged 5 years'
          },
          {
            id: 'item-002',
            productId: 'prod-002',
            productName: 'Luxury Humidor',
            sku: 'LH-002',
            quantity: 1,
            unitPrice: 250.00,
            totalPrice: 250.00,
            specifications: 'Cedar wood, 50-cigar capacity'
          }
        ],
        subtotal: 550.00,
        tax: 27.50,
        shipping: 15.00,
        discount: 25.00,
        total: 567.50,
        paymentStatus: 'paid',
        paymentMethod: 'Credit Card',
        shippingAddress: {
          street: '123 Business Bay',
          city: 'Dubai',
          state: 'Dubai',
          zipCode: '12345',
          country: 'UAE'
        },
        billingAddress: {
          street: '123 Business Bay',
          city: 'Dubai',
          state: 'Dubai',
          zipCode: '12345',
          country: 'UAE'
        },
        notes: 'VIP customer - expedite processing',
        assignedTo: 'Sarah Johnson'
      },
      {
        id: 'ord-002',
        orderNumber: 'ORD-2024-002',
        customerId: 'cust-002',
        customerName: 'Maria Rodriguez',
        customerEmail: 'maria@example.com',
        customerPhone: '+53-7-555-0456',
        orderDate: '2024-01-14T15:45:00Z',
        deliveryDate: '2024-01-25T00:00:00Z',
        status: 'confirmed',
        priority: 'medium',
        items: [
          {
            id: 'item-003',
            productId: 'prod-003',
            productName: 'Artisan Cigar Set',
            sku: 'ACS-003',
            quantity: 3,
            unitPrice: 85.00,
            totalPrice: 255.00
          }
        ],
        subtotal: 255.00,
        tax: 12.75,
        shipping: 20.00,
        discount: 0.00,
        total: 287.75,
        paymentStatus: 'pending',
        paymentMethod: 'Bank Transfer',
        shippingAddress: {
          street: '456 Havana Street',
          city: 'Havana',
          state: 'Havana',
          zipCode: '10400',
          country: 'Cuba'
        },
        billingAddress: {
          street: '456 Havana Street',
          city: 'Havana',
          state: 'Havana',
          zipCode: '10400',
          country: 'Cuba'
        },
        notes: 'International shipping required',
        assignedTo: 'Mike Chen'
      },
      {
        id: 'ord-003',
        orderNumber: 'ORD-2024-003',
        customerId: 'cust-003',
        customerName: 'John Smith',
        customerEmail: 'john@example.com',
        customerPhone: '+1-555-123-4567',
        orderDate: '2024-01-13T09:15:00Z',
        deliveryDate: '2024-01-18T00:00:00Z',
        status: 'shipped',
        priority: 'low',
        items: [
          {
            id: 'item-004',
            productId: 'prod-004',
            productName: 'Classic Tobacco Blend',
            sku: 'CTB-004',
            quantity: 5,
            unitPrice: 45.00,
            totalPrice: 225.00
          }
        ],
        subtotal: 225.00,
        tax: 11.25,
        shipping: 25.00,
        discount: 10.00,
        total: 251.25,
        paymentStatus: 'paid',
        paymentMethod: 'PayPal',
        shippingAddress: {
          street: '789 Broadway',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        billingAddress: {
          street: '789 Broadway',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        notes: 'Standard delivery',
        assignedTo: 'Emily Davis'
      }
    ]
    setOrders(sampleOrders)
  }

  const loadCustomersData = () => {
    const sampleCustomers: Customer[] = [
      {
        id: 'cust-001',
        name: 'Ahmed Al-Mansouri',
        email: 'ahmed@example.com',
        phone: '+971-4-555-0123',
        company: 'Dubai Premium Holdings',
        totalOrders: 15,
        totalSpent: 8450.00,
        averageOrderValue: 563.33,
        lastOrderDate: '2024-01-15',
        status: 'vip',
        address: {
          street: '123 Business Bay',
          city: 'Dubai',
          state: 'Dubai',
          zipCode: '12345',
          country: 'UAE'
        },
        notes: 'VIP customer, premium service'
      },
      {
        id: 'cust-002',
        name: 'Maria Rodriguez',
        email: 'maria@example.com',
        phone: '+53-7-555-0456',
        company: 'Havana Cigar House',
        totalOrders: 8,
        totalSpent: 2300.00,
        averageOrderValue: 287.50,
        lastOrderDate: '2024-01-14',
        status: 'active',
        address: {
          street: '456 Havana Street',
          city: 'Havana',
          state: 'Havana',
          zipCode: '10400',
          country: 'Cuba'
        },
        notes: 'International distributor'
      }
    ]
    setCustomers(sampleCustomers)
  }

  const handleAddOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'orderDate'>) => {
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      orderDate: new Date().toISOString(),
    }
    
    setOrders(prev => [...prev, newOrder])
    setShowAddOrder(false)
  }

  const calculateStats = (): OrderStats => {
    const totalOrders = orders.length
    const pendingOrders = orders.filter(order => order.status === 'pending').length
    const processingOrders = orders.filter(order => order.status === 'processing').length
    const shippedOrders = orders.filter(order => order.status === 'shipped').length
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const averageOrderValue = totalRevenue / totalOrders || 0

    return {
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      totalRevenue,
      averageOrderValue
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b'
      case 'confirmed': return '#06b6d4'
      case 'processing': return '#3b82f6'
      case 'shipped': return '#8b5cf6'
      case 'delivered': return '#10b981'
      case 'cancelled': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#ef4444'
      case 'high': return '#f59e0b'
      case 'medium': return '#06b6d4'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getCustomerStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return '#8b5cf6'
      case 'active': return '#10b981'
      case 'inactive': return '#6b7280'
      default: return '#6b7280'
    }
  }

  const stats = calculateStats()

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    const matchesPriority = filterPriority === 'all' || order.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const renderOverview = () => (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-sm sm:text-base">Total Orders</h3>
              <p className="text-gray-400 text-xs sm:text-sm">All time orders</p>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {stats.totalOrders.toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm text-green-400">
            Processing pipeline
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-sm sm:text-base">Total Revenue</h3>
              <p className="text-gray-400 text-xs sm:text-sm">All time revenue</p>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
            ${stats.totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm text-green-400">
            Revenue growth
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-sm sm:text-base">Average Order</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Average order value</p>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
            ${stats.averageOrderValue.toFixed(0)}
          </div>
          <div className="text-xs sm:text-sm text-green-400">
            Customer value
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stats.pendingOrders > 0 ? 'bg-yellow-500/20' : 'bg-green-500/20'} rounded-full flex items-center justify-center`}>
              <Clock className={`w-5 h-5 sm:w-6 sm:h-6 ${stats.pendingOrders > 0 ? 'text-yellow-400' : 'text-green-400'}`} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-sm sm:text-base">Pending Orders</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Require attention</p>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {stats.pendingOrders}
          </div>
          <div className={`text-xs sm:text-sm ${stats.pendingOrders > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
            {stats.pendingOrders === 0 ? 'All processed' : 'Needs processing'}
          </div>
        </div>
      </div>

      {/* Order Status Distribution and Recent Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
          <h3 className="text-white mb-6 text-lg sm:text-xl font-bold flex items-center gap-2">
            📊 Order Status Distribution
          </h3>
          <div className="space-y-3">
            {[
              { status: 'pending', count: stats.pendingOrders, label: 'Pending' },
              { status: 'processing', count: stats.processingOrders, label: 'Processing' },
              { status: 'shipped', count: stats.shippedOrders, label: 'Shipped' },
              { status: 'delivered', count: orders.filter(o => o.status === 'delivered').length, label: 'Delivered' }
            ].map(item => {
              const percentage = stats.totalOrders > 0 ? (item.count / stats.totalOrders * 100).toFixed(1) : '0'
              return (
                <div key={item.status} className="flex justify-between items-center bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                    <span className="font-semibold text-white text-sm sm:text-base">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white text-sm sm:text-base">{item.count}</div>
                    <div className="text-xs text-gray-400">{percentage}%</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
          <h3 className="text-white mb-6 text-lg sm:text-xl font-bold flex items-center gap-2">
            📋 Recent Orders
          </h3>
          <div className="space-y-3">
            {orders.slice(0, 4).map(order => (
              <div key={order.id} className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                  <div className="font-semibold text-white text-sm">{order.orderNumber}</div>
                  <div className="flex gap-2">
                    <span className={`${getStatusColor(order.status)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                      {order.status}
                    </span>
                    <span className={`${getPriorityColor(order.priority)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                      {order.priority}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-1">{order.customerName}</div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">${order.total.toFixed(2)}</span>
                  <span className="text-xs text-gray-400">{new Date(order.orderDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingCart style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 4px 0'
              }}>
                Orders Management
              </h1>
              <p style={{
                color: 'rgba(6, 182, 212, 0.7)',
                fontSize: '16px',
                margin: '0'
              }}>
                Comprehensive order processing and customer management
              </p>
            </div>
          </div>

          <button
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus style={{ width: '16px', height: '16px' }} />
            New Order
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          background: 'rgba(30, 41, 59, 0.3)',
          padding: '8px',
          borderRadius: '12px',
          border: '1px solid rgba(6, 182, 212, 0.2)'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'orders', label: 'Orders', icon: '🛒' },
            { id: 'customers', label: 'Customers', icon: '👥' },
            { id: 'analytics', label: 'Analytics', icon: '📈' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(6, 182, 212, 0.7)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? '600' : '400',
                transition: 'all 0.3s ease'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div style={{
                background: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Package style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                      Total Orders
                    </h3>
                    <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                      All time orders
                    </p>
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                  {stats.totalOrders}
                </div>
              </div>

              <div style={{
                background: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Clock style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                      Processing Orders
                    </h3>
                    <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                      Currently processing
                    </p>
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                  {stats.processingOrders}
                </div>
              </div>

              <div style={{
                background: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <DollarSign style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                      Total Revenue
                    </h3>
                    <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                      All orders combined
                    </p>
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                  AED {stats.totalRevenue.toLocaleString()}
                </div>
              </div>

              <div style={{
                background: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Users style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                      Average Order Value
                    </h3>
                    <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                      Per order average
                    </p>
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                  AED {stats.averageOrderValue.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.3)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{ marginBottom: '24px', color: 'white', fontSize: '18px', fontWeight: '600' }}>
                📋 Recent Orders
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    background: 'rgba(51, 65, 85, 0.3)',
                    borderRadius: '8px',
                    border: '1px solid rgba(6, 182, 212, 0.1)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: 'white' }}>{order.orderNumber}</div>
                        <div style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                          {order.customerName}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '16px', color: 'white', fontWeight: '600' }}>
                          AED {order.total.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                      </div>
                      <span style={{
                        background: getStatusColor(order.status),
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            {/* Search and Filters */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '24px',
              background: 'rgba(30, 41, 59, 0.3)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid rgba(6, 182, 212, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <Search style={{ width: '16px', height: '16px', color: 'rgba(6, 182, 212, 0.7)' }} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(30, 41, 59, 0.5)',
                    color: 'white',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  color: 'white',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  color: 'white',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Orders Table */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.3)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                color: 'white',
                padding: '20px 24px',
                fontSize: '18px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>📋</span>
                  Orders List ({filteredOrders.length} orders)
                </div>
                <button
                  onClick={() => setShowAddOrder(true)}
                  className="cosmic-btn-primary"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.3)'
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} />
                  Add Order
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(51, 65, 85, 0.3)' }}>
                      <th style={{ 
                        padding: '16px 20px', 
                        textAlign: 'left', 
                        fontWeight: '600', 
                        color: 'white',
                        fontSize: '14px'
                      }}>Order #</th>
                      <th style={{ 
                        padding: '16px 20px', 
                        textAlign: 'left', 
                        fontWeight: '600', 
                        color: 'white',
                        fontSize: '14px'
                      }}>Customer</th>
                      <th style={{ 
                        padding: '16px 20px', 
                        textAlign: 'left', 
                        fontWeight: '600', 
                        color: 'white',
                        fontSize: '14px'
                      }}>Date</th>
                      <th style={{ 
                        padding: '16px 20px', 
                        textAlign: 'left', 
                        fontWeight: '600', 
                        color: 'white',
                        fontSize: '14px'
                      }}>Total</th>
                      <th style={{ 
                        padding: '16px 20px', 
                        textAlign: 'left', 
                        fontWeight: '600', 
                        color: 'white',
                        fontSize: '14px'
                      }}>Status</th>
                      <th style={{ 
                        padding: '16px 20px', 
                        textAlign: 'left', 
                        fontWeight: '600', 
                        color: 'white',
                        fontSize: '14px'
                      }}>Priority</th>
                      <th style={{ 
                        padding: '16px 20px', 
                        textAlign: 'left', 
                        fontWeight: '600', 
                        color: 'white',
                        fontSize: '14px'
                      }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr key={order.id} style={{
                        borderBottom: '1px solid rgba(6, 182, 212, 0.1)',
                        background: index % 2 === 0 ? 'rgba(30, 41, 59, 0.2)' : 'rgba(51, 65, 85, 0.2)'
                      }}>
                        <td style={{ padding: '16px 20px', color: 'white', fontWeight: '600' }}>
                          {order.orderNumber}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div>
                            <div style={{ color: 'white', fontWeight: '600' }}>{order.customerName}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                              {order.customerEmail}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', color: 'rgba(6, 182, 212, 0.9)' }}>
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '16px 20px', color: 'white', fontWeight: '600' }}>
                          AED {order.total.toLocaleString()}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <span style={{
                            background: getStatusColor(order.status),
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {order.status.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <span style={{
                            background: getPriorityColor(order.priority),
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {order.priority.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{
                              background: 'rgba(6, 182, 212, 0.2)',
                              color: '#06b6d4',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '8px',
                              cursor: 'pointer'
                            }}>
                              <Eye style={{ width: '16px', height: '16px' }} />
                            </button>
                            <button style={{
                              background: 'rgba(16, 185, 129, 0.2)',
                              color: '#10b981',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '8px',
                              cursor: 'pointer'
                            }}>
                              <Edit style={{ width: '16px', height: '16px' }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div style={{
            background: 'rgba(30, 41, 59, 0.3)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
            <h3 style={{ color: 'white', marginBottom: '8px' }}>Customer Management</h3>
            <p style={{ color: 'rgba(6, 182, 212, 0.7)' }}>Customer details and management coming soon...</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={{
            background: 'rgba(30, 41, 59, 0.3)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📈</div>
            <h3 style={{ color: 'white', marginBottom: '8px' }}>Order Analytics</h3>
            <p style={{ color: 'rgba(6, 182, 212, 0.7)' }}>Advanced analytics and reporting coming soon...</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddOrder && (
        <AddOrderModal
          onAdd={handleAddOrder}
          onClose={() => setShowAddOrder(false)}
        />
      )}
    </div>
  )
}

// Add Order Modal Component
interface AddOrderModalProps {
  onAdd: (orderData: Omit<Order, 'id' | 'orderNumber' | 'orderDate'>) => void
  onClose: () => void
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryDate: '',
    status: 'pending' as Order['status'],
    priority: 'medium' as Order['priority'],
    items: [
      {
        id: `item-${Date.now()}`,
        productId: '',
        productName: '',
        sku: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        specifications: ''
      }
    ] as OrderItem[],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: 0,
    paymentStatus: 'pending' as const,
    paymentMethod: 'Credit Card',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'UAE'
    },
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'UAE'
    },
    notes: '',
    assignedTo: ''
  })

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.totalPrice, 0)
    const tax = subtotal * 0.05 // 5% VAT
    const total = subtotal + tax + formData.shipping - formData.discount
    
    setFormData(prev => ({
      ...prev,
      subtotal,
      tax,
      total
    }))
  }

  const updateItemTotal = (index: number, quantity: number, unitPrice: number) => {
    const newItems = [...formData.items]
    newItems[index] = {
      ...newItems[index],
      quantity,
      unitPrice,
      totalPrice: quantity * unitPrice
    }
    setFormData(prev => ({
      ...prev,
      items: newItems
    }))
    setTimeout(calculateTotals, 0)
  }

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`,
          productId: '',
          productName: '',
          sku: '',
          quantity: 1,
          unitPrice: 0,
          totalPrice: 0,
          specifications: ''
        }
      ]
    }))
  }

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        items: newItems
      }))
      setTimeout(calculateTotals, 0)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.customerName || !formData.customerEmail || formData.items.some(item => !item.productName)) {
      alert('Please fill in all required fields')
      return
    }

    onAdd(formData)
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.5rem', fontWeight: '700' }}>
          🛒 Create New Order
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          {/* Customer Information */}
          <div style={{ 
            background: '#f8fafc', 
            borderRadius: '12px', 
            padding: '1.5rem',
            border: '2px solid #e2e8f0'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
              👤 Customer Information
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  placeholder="e.g., Ahmed Al-Mansouri"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                  placeholder="ahmed@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                  placeholder="+971-4-555-0123"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Delivery Date
                </label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div style={{ 
            background: '#f0f9ff', 
            borderRadius: '12px', 
            padding: '1.5rem',
            border: '2px solid #0ea5e9'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
              📦 Order Details
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as Order['status']})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value as Order['priority']})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div style={{ 
            background: '#f0fdf4', 
            borderRadius: '12px', 
            padding: '1.5rem',
            border: '2px solid #22c55e'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: '#374151', fontSize: '1.1rem', fontWeight: '600' }}>
                📝 Order Items
              </h4>
              <button
                type="button"
                onClick={addItem}
                style={{
                  background: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                + Add Item
              </button>
            </div>
            
            {formData.items.map((item, index) => (
              <div key={item.id} style={{ 
                background: 'white', 
                borderRadius: '8px', 
                padding: '1rem', 
                marginBottom: '1rem',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={item.productName}
                      onChange={(e) => {
                        const newItems = [...formData.items]
                        newItems[index].productName = e.target.value
                        setFormData(prev => ({...prev, items: newItems}))
                      }}
                      placeholder="e.g., Premium Cigar Collection"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value) || 1
                        const newItems = [...formData.items]
                        newItems[index].quantity = quantity
                        setFormData(prev => ({...prev, items: newItems}))
                        updateItemTotal(index, quantity, item.unitPrice)
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Unit Price (AED)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) => {
                        const unitPrice = parseFloat(e.target.value) || 0
                        const newItems = [...formData.items]
                        newItems[index].unitPrice = unitPrice
                        setFormData(prev => ({...prev, items: newItems}))
                        updateItemTotal(index, item.quantity, unitPrice)
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                      Total
                    </label>
                    <div style={{ 
                      padding: '0.75rem',
                      background: '#f3f4f6',
                      borderRadius: '8px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      AED {item.totalPrice.toFixed(2)}
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={formData.items.length === 1}
                      style={{
                        background: formData.items.length === 1 ? '#d1d5db' : '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        cursor: formData.items.length === 1 ? 'not-allowed' : 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ 
            background: '#fef3c7', 
            borderRadius: '12px', 
            padding: '1.5rem',
            border: '2px solid #f59e0b'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
              💰 Order Summary
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Shipping (AED)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.shipping}
                  onChange={(e) => {
                    const shipping = parseFloat(e.target.value) || 0
                    setFormData(prev => ({...prev, shipping}))
                    setTimeout(calculateTotals, 0)
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Discount (AED)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.discount}
                  onChange={(e) => {
                    const discount = parseFloat(e.target.value) || 0
                    setFormData(prev => ({...prev, discount}))
                    setTimeout(calculateTotals, 0)
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
            
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: 'white', 
              borderRadius: '8px',
              border: '2px solid #f59e0b'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Subtotal:</span>
                <span>AED {formData.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Tax (5%):</span>
                <span>AED {formData.tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Shipping:</span>
                <span>AED {formData.shipping.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Discount:</span>
                <span>-AED {formData.discount.toFixed(2)}</span>
              </div>
              <hr style={{ margin: '0.5rem 0', border: '1px solid #f59e0b' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.1rem' }}>
                <span>Total:</span>
                <span>AED {formData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(6, 182, 212, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              ✅ Create Order
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.background = '#4b5563'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = '#6b7280'
              }}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrdersManagement
