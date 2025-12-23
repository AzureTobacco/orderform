import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Save, Send, ShoppingCart, User, Calendar, FileText, X } from 'lucide-react'
import { 
  CustomerOrder, 
  OrderItem, 
  generateOrderNumber, 
  generateOrderId, 
  saveOrder,
  getDistributorInfo,
  DistributorInfo
} from '../utils/orderStorage'

interface DistributorOrderFormProps {
  onOrderSubmit?: (order: CustomerOrder) => void
  initialOrder?: CustomerOrder | null
}

const DistributorOrderForm: React.FC<DistributorOrderFormProps> = ({ 
  onOrderSubmit,
  initialOrder 
}) => {
  const [distributorInfo, setDistributorInfo] = useState<DistributorInfo | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [customerCode, setCustomerCode] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0])
  const [deliveryDate, setDeliveryDate] = useState('')
  const [items, setItems] = useState<OrderItem[]>([])
  const [notes, setNotes] = useState('')
  const [tax, setTax] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [showDistributorSetup, setShowDistributorSetup] = useState(false)
  const [tempDistributorName, setTempDistributorName] = useState('')
  const [tempDistributorEmail, setTempDistributorEmail] = useState('')
  const [tempDistributorPhone, setTempDistributorPhone] = useState('')
  const [tempDistributorAddress, setTempDistributorAddress] = useState('')

  useEffect(() => {
    const info = getDistributorInfo()
    if (info) {
      setDistributorInfo(info)
    } else {
      setShowDistributorSetup(true)
    }
  }, [])

  useEffect(() => {
    if (initialOrder) {
      setCustomerName(initialOrder.customerName)
      setCustomerCode(initialOrder.customerCode || '')
      setCustomerEmail(initialOrder.customerEmail || '')
      setCustomerPhone(initialOrder.customerPhone || '')
      setCustomerAddress(initialOrder.customerAddress || '')
      setOrderDate(initialOrder.orderDate)
      setDeliveryDate(initialOrder.deliveryDate || '')
      setItems(initialOrder.items)
      setNotes(initialOrder.notes || '')
      setTax(initialOrder.tax || 0)
      setDiscount(initialOrder.discount || 0)
    }
  }, [initialOrder])

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    return subtotal + tax - discount
  }

  const addItem = () => {
    const newItem: OrderItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      productName: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      notes: ''
    }
    setItems([...items, newItem])
  }

  const removeItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId))
  }

  const updateItem = (itemId: string, field: keyof OrderItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const updated = { ...item, [field]: value }
        if (field === 'quantity' || field === 'unitPrice') {
          updated.totalPrice = updated.quantity * updated.unitPrice
        }
        return updated
      }
      return item
    }))
  }

  const handleSaveDraft = () => {
    if (!customerName.trim()) {
      alert('Please enter customer name')
      return
    }

    const order: CustomerOrder = {
      id: initialOrder?.id || generateOrderId(),
      orderNumber: initialOrder?.orderNumber || generateOrderNumber(),
      customerName: customerName.trim(),
      customerCode: customerCode.trim() || undefined,
      customerEmail: customerEmail.trim() || undefined,
      customerPhone: customerPhone.trim() || undefined,
      customerAddress: customerAddress.trim() || undefined,
      orderDate,
      deliveryDate: deliveryDate || undefined,
      items: items.filter(item => item.productName.trim() !== ''),
      subtotal: calculateSubtotal(),
      tax: tax || undefined,
      discount: discount || undefined,
      total: calculateTotal(),
      status: 'draft',
      notes: notes.trim() || undefined,
      distributorId: distributorInfo?.id,
      distributorName: distributorInfo?.name,
      createdAt: initialOrder?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    saveOrder(order)
    alert('Order saved as draft!')
    if (onOrderSubmit) {
      onOrderSubmit(order)
    }
  }

  const handleSubmit = () => {
    if (!customerName.trim()) {
      alert('Please enter customer name')
      return
    }

    if (items.length === 0 || items.every(item => !item.productName.trim())) {
      alert('Please add at least one product to the order')
      return
    }

    const order: CustomerOrder = {
      id: initialOrder?.id || generateOrderId(),
      orderNumber: initialOrder?.orderNumber || generateOrderNumber(),
      customerName: customerName.trim(),
      customerCode: customerCode.trim() || undefined,
      customerEmail: customerEmail.trim() || undefined,
      customerPhone: customerPhone.trim() || undefined,
      customerAddress: customerAddress.trim() || undefined,
      orderDate,
      deliveryDate: deliveryDate || undefined,
      items: items.filter(item => item.productName.trim() !== ''),
      subtotal: calculateSubtotal(),
      tax: tax || undefined,
      discount: discount || undefined,
      total: calculateTotal(),
      status: 'submitted',
      notes: notes.trim() || undefined,
      distributorId: distributorInfo?.id,
      distributorName: distributorInfo?.name,
      createdAt: initialOrder?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    saveOrder(order)
    alert('Order submitted successfully!')
    
    // Reset form
    setCustomerName('')
    setCustomerCode('')
    setCustomerEmail('')
    setCustomerPhone('')
    setCustomerAddress('')
    setOrderDate(new Date().toISOString().split('T')[0])
    setDeliveryDate('')
    setItems([])
    setNotes('')
    setTax(0)
    setDiscount(0)

    if (onOrderSubmit) {
      onOrderSubmit(order)
    }
  }

  const handleSaveDistributorInfo = () => {
    if (!tempDistributorName.trim()) {
      alert('Please enter distributor name')
      return
    }

    const info: DistributorInfo = {
      id: distributorInfo?.id || `dist_${Date.now()}`,
      name: tempDistributorName.trim(),
      email: tempDistributorEmail.trim() || undefined,
      phone: tempDistributorPhone.trim() || undefined,
      address: tempDistributorAddress.trim() || undefined
    }

    import('../utils/orderStorage').then(module => {
      module.saveDistributorInfo(info)
      setDistributorInfo(info)
      setShowDistributorSetup(false)
    })
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0d1a 0%, #161b2e 100%)',
      padding: '2rem',
      color: '#ffffff'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          marginBottom: '2rem',
          textAlign: 'center',
          padding: '2rem',
          background: 'rgba(31, 38, 55, 0.6)',
          borderRadius: '16px',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '0.5rem',
            color: '#00d4ff',
            fontFamily: 'Orbitron, sans-serif'
          }}>
            Azure Tobacco - Distributor Order Form
          </h1>
          {distributorInfo && (
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
              Distributor: {distributorInfo.name}
            </p>
          )}
        </div>

        {/* Distributor Setup Modal */}
        {showDistributorSetup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem'
            }}
          >
            <motion.div
              style={{
                background: 'rgba(31, 38, 55, 0.95)',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '500px',
                width: '100%',
                border: '1px solid rgba(0, 212, 255, 0.3)'
              }}
            >
              <h2 style={{ color: '#00d4ff', marginBottom: '1.5rem' }}>Distributor Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                    Distributor Name *
                  </label>
                  <input
                    type="text"
                    value={tempDistributorName}
                    onChange={(e) => setTempDistributorName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={tempDistributorEmail}
                    onChange={(e) => setTempDistributorEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={tempDistributorPhone}
                    onChange={(e) => setTempDistributorPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                    Address
                  </label>
                  <textarea
                    value={tempDistributorAddress}
                    onChange={(e) => setTempDistributorAddress(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <button
                  onClick={handleSaveDistributorInfo}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #00d4ff 0%, #4a90a4 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '1rem'
                  }}
                >
                  Save Distributor Info
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Order Form */}
        <div style={{
          background: 'rgba(31, 38, 55, 0.6)',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          {/* Customer Information */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              color: '#00d4ff', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <User size={24} />
              Customer Information
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem' 
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                  Customer Code
                </label>
                <input
                  type="text"
                  value={customerCode}
                  onChange={(e) => setCustomerCode(e.target.value)}
                  placeholder="Customer code (optional)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="customer@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+1234567890"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                  Address
                </label>
                <textarea
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Customer delivery address"
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Order Dates */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              color: '#00d4ff', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Calendar size={24} />
              Order Dates
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem' 
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                  Order Date *
                </label>
                <input
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                  Delivery Date
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ 
                color: '#00d4ff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <ShoppingCart size={24} />
                Order Items
              </h2>
              <button
                onClick={addItem}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #00d4ff 0%, #4a90a4 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Plus size={18} />
                Add Item
              </button>
            </div>

            {items.length === 0 ? (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                color: 'rgba(255,255,255,0.5)'
              }}>
                No items added. Click "Add Item" to start.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '1rem',
                      background: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 212, 255, 0.2)'
                    }}
                  >
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                      gap: '1rem',
                      alignItems: 'center'
                    }}>
                      <input
                        type="text"
                        value={item.productName}
                        onChange={(e) => updateItem(item.id, 'productName', e.target.value)}
                        placeholder="Product name"
                        style={{
                          padding: '0.5rem',
                          background: 'rgba(0, 0, 0, 0.3)',
                          border: '1px solid rgba(0, 212, 255, 0.3)',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '0.9rem'
                        }}
                      />
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        placeholder="Qty"
                        min="1"
                        style={{
                          padding: '0.5rem',
                          background: 'rgba(0, 0, 0, 0.3)',
                          border: '1px solid rgba(0, 212, 255, 0.3)',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '0.9rem'
                        }}
                      />
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        placeholder="Unit Price"
                        min="0"
                        step="0.01"
                        style={{
                          padding: '0.5rem',
                          background: 'rgba(0, 0, 0, 0.3)',
                          border: '1px solid rgba(0, 212, 255, 0.3)',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '0.9rem'
                        }}
                      />
                      <div style={{ 
                        padding: '0.5rem',
                        color: '#00d4ff',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}>
                        ${item.totalPrice.toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          padding: '0.5rem',
                          background: 'rgba(244, 67, 54, 0.2)',
                          border: '1px solid rgba(244, 67, 54, 0.5)',
                          borderRadius: '6px',
                          color: '#f44336',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              color: '#00d4ff', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FileText size={24} />
              Order Summary
            </h2>
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              border: '1px solid rgba(0, 212, 255, 0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Subtotal:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Tax:</span>
                <input
                  type="number"
                  value={tax}
                  onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  style={{
                    width: '120px',
                    padding: '0.25rem 0.5rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    textAlign: 'right'
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Discount:</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  style={{
                    width: '120px',
                    padding: '0.25rem 0.5rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    textAlign: 'right'
                  }}
                />
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '2px solid rgba(0, 212, 255, 0.3)'
              }}>
                <span style={{ color: '#00d4ff', fontSize: '1.2rem', fontWeight: '700' }}>Total:</span>
                <span style={{ color: '#00d4ff', fontSize: '1.2rem', fontWeight: '700' }}>
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: 'rgba(255,255,255,0.8)',
              fontWeight: '600'
            }}>
              Order Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes or special instructions..."
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'flex-end',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(0, 212, 255, 0.2)'
          }}>
            <button
              onClick={handleSaveDraft}
              style={{
                padding: '0.75rem 2rem',
                background: 'rgba(0, 212, 255, 0.2)',
                border: '1px solid rgba(0, 212, 255, 0.5)',
                borderRadius: '8px',
                color: '#00d4ff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Save size={18} />
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #00d4ff 0%, #4a90a4 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Send size={18} />
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DistributorOrderForm






