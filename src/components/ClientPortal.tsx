import React, { useState, useEffect } from 'react'
import {
  ShoppingCart, Package, Star, Truck,
  Plus, Download, Search, User, LogOut,
  DollarSign, Calendar, Award, TrendingUp, BarChart3
} from 'lucide-react'
import { useNotifications } from '../contexts/NotificationContext'
import LoadingSpinner from './LoadingSpinner'

interface ClientPortalProps {
  clientId?: string
}

interface ClientTier {
  name: string
  level: number
  benefits: string[]
  nextTierRequirement?: string
  color: string
}

interface OrderItem {
  id: string
  productName: string
  sku: string
  quantity: number
  unitPrice: number
  totalPrice: number
  image?: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  totalAmount: number
  currency: string
  trackingNumber?: string
  estimatedDelivery?: string
}

interface Product {
  id: string
  name: string
  sku: string
  price: number
  currency: string
  category: string
  description: string
  image?: string
  inStock: boolean
  minOrderQuantity: number
}

const ClientPortal: React.FC<ClientPortalProps> = ({ clientId = 'client-001' }) => {
  const { addNotification } = useNotifications()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'place-order' | 'account'>('dashboard')
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState<OrderItem[]>([])

  // Mock client data
  const [clientData] = useState({
    id: clientId,
    name: 'Dubai Premium Lounge',
    contactPerson: 'Ahmed Al-Rashid',
    email: 'ahmed@dubailounge.ae',
    phone: '+971 4 123 4567',
    address: 'Sheikh Zayed Road, Dubai, UAE',
    tier: {
      name: 'Gold',
      level: 3,
      benefits: [
        '10% discount on all orders',
        'Dedicated account manager',
        'Priority shipping',
        'Extended payment terms (45 days)',
        'Exclusive product access'
      ],
      nextTierRequirement: 'Spend $50,000 more to reach Platinum tier',
      color: '#FFD700'
    } as ClientTier,
    accountBalance: 2450.00,
    creditLimit: 25000.00,
    paymentTerms: 45,
    totalOrders: 156,
    totalSpent: 245000.00,
    currency: 'USD'
  })

  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      items: [
        { id: '1', productName: 'Double Apple Premium', sku: 'DA-001', quantity: 50, unitPrice: 25.00, totalPrice: 1250.00 },
        { id: '2', productName: 'Mint Fresh', sku: 'MF-002', quantity: 30, unitPrice: 22.00, totalPrice: 660.00 }
      ],
      totalAmount: 1910.00,
      currency: 'USD',
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'shipped',
      items: [
        { id: '3', productName: 'Grape Delight', sku: 'GD-003', quantity: 40, unitPrice: 24.00, totalPrice: 960.00 }
      ],
      totalAmount: 960.00,
      currency: 'USD',
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-25'
    }
  ])

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Double Apple Premium',
      sku: 'DA-001',
      price: 25.00,
      currency: 'USD',
      category: 'Premium Flavors',
      description: 'Premium double apple flavor with authentic taste',
      inStock: true,
      minOrderQuantity: 10
    },
    {
      id: '2',
      name: 'Mint Fresh',
      sku: 'MF-002',
      price: 22.00,
      currency: 'USD',
      category: 'Fresh Flavors',
      description: 'Refreshing mint flavor for a cool experience',
      inStock: true,
      minOrderQuantity: 10
    },
    {
      id: '3',
      name: 'Grape Delight',
      sku: 'GD-003',
      price: 24.00,
      currency: 'USD',
      category: 'Fruit Flavors',
      description: 'Sweet grape flavor with natural essence',
      inStock: true,
      minOrderQuantity: 10
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#10b981'
      case 'shipped': return '#3b82f6'
      case 'processing': return '#f59e0b'
      case 'pending': return '#6b7280'
      case 'cancelled': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const addToCart = (product: Product, quantity: number) => {
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity, totalPrice: (item.quantity + quantity) * item.unitPrice }
          : item
      ))
    } else {
      setCart([...cart, {
        id: product.id,
        productName: product.name,
        sku: product.sku,
        quantity,
        unitPrice: product.price,
        totalPrice: quantity * product.price
      }])
    }
    
    addNotification(`Added ${quantity}x ${product.name} to cart`, 'success')
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId))
    addNotification('Item removed from cart', 'info')
  }

  const placeOrder = async () => {
    if (cart.length === 0) {
      addNotification('Cart is empty', 'error')
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const orderTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0)
      addNotification(`Order placed successfully! Total: $${orderTotal.toFixed(2)}`, 'success')
      setCart([])
      setActiveTab('orders')
    } catch (error) {
      addNotification('Failed to place order. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderDashboard = () => (
    <div style={{ padding: '24px' }}>
      {/* Welcome Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--azure-primary), var(--azure-secondary))',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        color: 'white'
      }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '2rem', fontWeight: '700' }}>
          Welcome back, {clientData.contactPerson}
        </h1>
        <p style={{ margin: '0', fontSize: '1.1rem', opacity: '0.9' }}>
          {clientData.name} • {clientData.tier.name} Tier
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Account Balance */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <DollarSign size={24} color="#10b981" />
            <h3 style={{ margin: '0 0 0 12px', color: 'var(--text-primary)' }}>Account Balance</h3>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>
            ${clientData.accountBalance.toLocaleString()}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Credit Limit: ${clientData.creditLimit.toLocaleString()}
          </div>
        </div>

        {/* Tier Status */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Award size={24} color={clientData.tier.color} />
            <h3 style={{ margin: '0 0 0 12px', color: 'var(--text-primary)' }}>Tier Status</h3>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: clientData.tier.color, marginBottom: '8px' }}>
            {clientData.tier.name} Tier
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {clientData.tier.nextTierRequirement}
          </div>
        </div>

        {/* Payment Terms */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Calendar size={24} color="#3b82f6" />
            <h3 style={{ margin: '0 0 0 12px', color: 'var(--text-primary)' }}>Payment Terms</h3>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6', marginBottom: '8px' }}>
            {clientData.paymentTerms} Days
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Extended terms for {clientData.tier.name} tier
          </div>
        </div>

        {/* Order Statistics */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <TrendingUp size={24} color="#f59e0b" />
            <h3 style={{ margin: '0 0 0 12px', color: 'var(--text-primary)' }}>Order Statistics</h3>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
            {clientData.totalOrders} Orders
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Total Spent: ${clientData.totalSpent.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Tier Benefits */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
          Your {clientData.tier.name} Tier Benefits
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
          {clientData.tier.benefits.map((benefit, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              background: 'rgba(77, 208, 225, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(77, 208, 225, 0.1)'
            }}>
              <Star size={16} color={clientData.tier.color} style={{ marginRight: '8px' }} />
              <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderOrders = () => (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Order History</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--azure-primary)',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {orders.map(order => (
          <div key={order.id} style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                  {order.orderNumber}
                </h3>
                <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  background: getStatusColor(order.status),
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>
                  {order.status.toUpperCase()}
                </div>
                <div style={{ color: 'var(--azure-primary)', fontWeight: '600' }}>
                  ${order.totalAmount.toFixed(2)}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              {order.items.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                      {item.productName}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}>
                      ({item.sku})
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--text-primary)' }}>
                      {item.quantity} × ${item.unitPrice.toFixed(2)}
                    </div>
                    <div style={{ color: 'var(--azure-primary)', fontWeight: '600' }}>
                      ${item.totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {order.trackingNumber && (
              <div style={{
                background: 'rgba(77, 208, 225, 0.05)',
                border: '1px solid rgba(77, 208, 225, 0.1)',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Truck size={16} color="var(--azure-primary)" />
                <div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '500' }}>
                    Tracking: {order.trackingNumber}
                  </div>
                  {order.estimatedDelivery && (
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderPlaceOrder = () => (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Place New Order</h2>
        {cart.length > 0 && (
          <div style={{
            background: 'var(--azure-primary)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            Cart: {cart.length} items
          </div>
        )}
      </div>

      {/* Search */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '12px'
        }}>
          <Search size={16} style={{ color: 'var(--text-secondary)', marginRight: '8px' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            style={{
              flex: 1,
              border: 'none',
              background: 'none',
              outline: 'none',
              color: 'var(--text-primary)'
            }}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            clientTier={clientData.tier}
          />
        ))}
      </div>

      {/* Cart */}
      {cart.length > 0 && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)' }}>Shopping Cart</h3>
          
          {cart.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <div>
                <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                  {item.productName}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {item.quantity} × ${item.unitPrice.toFixed(2)}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'var(--azure-primary)', fontWeight: '600' }}>
                  ${item.totalPrice.toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '2px solid var(--border-color)'
          }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              Total: ${cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
            </div>
            <button
              onClick={placeOrder}
              disabled={loading}
              style={{
                background: 'var(--azure-primary)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  )

  const renderAccount = () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>Account Information</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Contact Information */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)' }}>Contact Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Company Name</label>
              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{clientData.name}</div>
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Contact Person</label>
              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{clientData.contactPerson}</div>
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email</label>
              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{clientData.email}</div>
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Phone</label>
              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{clientData.phone}</div>
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Address</label>
              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{clientData.address}</div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)' }}>Account Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Client ID</label>
              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{clientData.id}</div>
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tier Level</label>
              <div style={{ color: clientData.tier.color, fontWeight: '600' }}>{clientData.tier.name}</div>
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Credit Limit</label>
              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>${clientData.creditLimit.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Payment Terms</label>
              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{clientData.paymentTerms} days</div>
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Currency</label>
              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{clientData.currency}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--card-bg)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ color: 'var(--azure-primary)', margin: 0, fontSize: '1.5rem' }}>
            Azure Tobacco Industrial FZCO Client Portal
          </h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={16} color="var(--text-secondary)" />
            <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
              {clientData.contactPerson}
            </span>
          </div>
          <button style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '8px'
          }}>
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        background: 'var(--card-bg)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 24px'
      }}>
        <div style={{ display: 'flex', gap: '32px' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'place-order', label: 'Place Order', icon: ShoppingCart },
            { id: 'orders', label: 'Order History', icon: Package },
            { id: 'account', label: 'Account', icon: User }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: 'none',
                border: 'none',
                padding: '16px 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: activeTab === tab.id ? 'var(--azure-primary)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab.id ? '2px solid var(--azure-primary)' : '2px solid transparent',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              {React.createElement(tab.icon, { size: 16 })}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'place-order' && renderPlaceOrder()}
        {activeTab === 'account' && renderAccount()}
      </div>

      {loading && <LoadingSpinner fullScreen text="Processing your request..." />}
    </div>
  )
}

// Product Card Component
interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product, quantity: number) => void
  clientTier: ClientTier
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, clientTier }) => {
  const [quantity, setQuantity] = useState(product.minOrderQuantity)
  
  const discountPercentage = clientTier.level * 5 // 5% per tier level
  const discountedPrice = product.price * (1 - discountPercentage / 100)

  return (
    <div style={{
      background: 'var(--card-bg)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '20px',
      transition: 'transform 0.2s ease'
    }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
          {product.name}
        </h3>
        <p style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          SKU: {product.sku}
        </p>
        <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {product.description}
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          {discountPercentage > 0 && (
            <span style={{
              textDecoration: 'line-through',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}>
              ${product.price.toFixed(2)}
            </span>
          )}
          <span style={{
            color: 'var(--azure-primary)',
            fontSize: '1.2rem',
            fontWeight: '700'
          }}>
            ${discountedPrice.toFixed(2)}
          </span>
          {discountPercentage > 0 && (
            <span style={{
              background: clientTier.color,
              color: 'white',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontWeight: '500'
            }}>
              -{discountPercentage}%
            </span>
          )}
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          Min order: {product.minOrderQuantity} units
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(product.minOrderQuantity, parseInt(e.target.value) || product.minOrderQuantity))}
          min={product.minOrderQuantity}
          style={{
            flex: 1,
            padding: '8px',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            background: 'var(--card-bg)',
            color: 'var(--text-primary)'
          }}
        />
        <button
          onClick={() => onAddToCart(product, quantity)}
          disabled={!product.inStock}
          style={{
            background: product.inStock ? 'var(--azure-primary)' : 'var(--text-secondary)',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: product.inStock ? 'pointer' : 'not-allowed',
            fontSize: '0.9rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Plus size={14} />
          Add
        </button>
      </div>
    </div>
  )
}

export default ClientPortal 