import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  FileText, 
  Download, 
  CheckCircle, 
  Clock, 
  DollarSign,
  ShoppingCart,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import {
  getAvailableMonths,
  getMonthlyReconciliation,
  getAllOrders,
  CustomerOrder,
  MonthlyReconciliation,
  exportOrdersToCSV,
  exportOrdersToJSON,
  deleteOrder
} from '../utils/orderStorage'

const MonthlyReconciliation: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [reconciliation, setReconciliation] = useState<MonthlyReconciliation | null>(null)
  const [availableMonths, setAvailableMonths] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null)

  useEffect(() => {
    const months = getAvailableMonths()
    setAvailableMonths(months)
    if (months.length > 0 && !selectedMonth) {
      setSelectedMonth(months[0])
    }
  }, [])

  useEffect(() => {
    if (selectedMonth) {
      const recon = getMonthlyReconciliation(selectedMonth)
      setReconciliation(recon)
    }
  }, [selectedMonth])

  const formatMonth = (month: string): string => {
    const [year, monthNum] = month.split('-')
    const date = new Date(parseInt(year), parseInt(monthNum) - 1)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  const handleExportCSV = () => {
    if (!reconciliation) return
    
    const csv = exportOrdersToCSV(reconciliation.orders)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `azure_tobacco_orders_${selectedMonth}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportJSON = () => {
    if (!reconciliation) return
    
    const json = exportOrdersToJSON(reconciliation.orders)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `azure_tobacco_orders_${selectedMonth}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder(orderId)
      if (selectedMonth) {
        const recon = getMonthlyReconciliation(selectedMonth)
        setReconciliation(recon)
      }
      const months = getAvailableMonths()
      setAvailableMonths(months)
    }
  }

  const handleProcessOrder = (order: CustomerOrder) => {
    const updatedOrder: CustomerOrder = {
      ...order,
      status: 'processed',
      updatedAt: new Date().toISOString()
    }
    const { saveOrder } = require('../utils/orderStorage')
    saveOrder(updatedOrder)
    if (selectedMonth) {
      const recon = getMonthlyReconciliation(selectedMonth)
      setReconciliation(recon)
    }
  }

  const filteredOrders = reconciliation?.orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerCode?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  }) || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return '#10b981'
      case 'submitted':
        return '#f59e0b'
      case 'draft':
        return '#6b7280'
      case 'cancelled':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0d1a 0%, #161b2e 100%)',
      padding: '2rem',
      color: '#ffffff'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
            Monthly Order Reconciliation
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
            Azure Tobacco - Process and manage monthly orders
          </p>
        </div>

        {/* Month Selector */}
        <div style={{
          background: 'rgba(31, 38, 55, 0.6)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(0, 212, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Calendar size={24} color="#00d4ff" />
            <label style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>
              Select Month:
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem',
                minWidth: '200px'
              }}
            >
              {availableMonths.length === 0 ? (
                <option value="">No orders available</option>
              ) : (
                availableMonths.map(month => (
                  <option key={month} value={month}>
                    {formatMonth(month)}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        {reconciliation && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'rgba(31, 38, 55, 0.6)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(0, 212, 255, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <ShoppingCart size={24} color="#00d4ff" />
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Total Orders</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#00d4ff' }}>
                {reconciliation.totalOrders}
              </div>
            </div>

            <div style={{
              background: 'rgba(31, 38, 55, 0.6)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(0, 212, 255, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <DollarSign size={24} color="#10b981" />
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Total Amount</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>
                ${reconciliation.totalAmount.toFixed(2)}
              </div>
            </div>

            <div style={{
              background: 'rgba(31, 38, 55, 0.6)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(0, 212, 255, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <CheckCircle size={24} color="#10b981" />
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Processed</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>
                {reconciliation.processedOrders}
              </div>
            </div>

            <div style={{
              background: 'rgba(31, 38, 55, 0.6)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(0, 212, 255, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Clock size={24} color="#f59e0b" />
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Pending</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f59e0b' }}>
                {reconciliation.pendingOrders}
              </div>
            </div>
          </div>
        )}

        {/* Filters and Export */}
        {reconciliation && reconciliation.orders.length > 0 && (
          <div style={{
            background: 'rgba(31, 38, 55, 0.6)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1', minWidth: '200px' }}>
              <Search size={20} color="#00d4ff" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: '1',
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={20} color="#00d4ff" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '0.9rem'
                }}
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="processed">Processed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button
              onClick={handleExportCSV}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(0, 212, 255, 0.2)',
                border: '1px solid rgba(0, 212, 255, 0.5)',
                borderRadius: '8px',
                color: '#00d4ff',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Download size={18} />
              Export CSV
            </button>
            <button
              onClick={handleExportJSON}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(0, 212, 255, 0.2)',
                border: '1px solid rgba(0, 212, 255, 0.5)',
                borderRadius: '8px',
                color: '#00d4ff',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Download size={18} />
              Export JSON
            </button>
          </div>
        )}

        {/* Orders Table */}
        {reconciliation && filteredOrders.length > 0 ? (
          <div style={{
            background: 'rgba(31, 38, 55, 0.6)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            overflowX: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(0, 212, 255, 0.3)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#00d4ff' }}>Order #</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#00d4ff' }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#00d4ff' }}>Customer</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#00d4ff' }}>Items</th>
                  <th style={{ padding: '1rem', textAlign: 'right', color: '#00d4ff' }}>Total</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#00d4ff' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#00d4ff' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr 
                    key={order.id}
                    style={{ 
                      borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <td style={{ padding: '1rem', color: '#fff', fontWeight: '600' }}>
                      {order.orderNumber}
                    </td>
                    <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.8)' }}>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.8)' }}>
                      <div>{order.customerName}</div>
                      {order.customerCode && (
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                          {order.customerCode}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.8)' }}>
                      {order.items.length} item(s)
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right', color: '#10b981', fontWeight: '600' }}>
                      ${order.total.toFixed(2)}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        background: `${getStatusColor(order.status)}20`,
                        color: getStatusColor(order.status),
                        border: `1px solid ${getStatusColor(order.status)}40`
                      }}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          style={{
                            padding: '0.25rem 0.5rem',
                            background: 'rgba(0, 212, 255, 0.2)',
                            border: '1px solid rgba(0, 212, 255, 0.5)',
                            borderRadius: '6px',
                            color: '#00d4ff',
                            cursor: 'pointer'
                          }}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        {order.status !== 'processed' && (
                          <button
                            onClick={() => handleProcessOrder(order)}
                            style={{
                              padding: '0.25rem 0.5rem',
                              background: 'rgba(16, 185, 129, 0.2)',
                              border: '1px solid rgba(16, 185, 129, 0.5)',
                              borderRadius: '6px',
                              color: '#10b981',
                              cursor: 'pointer'
                            }}
                            title="Mark as Processed"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          style={{
                            padding: '0.25rem 0.5rem',
                            background: 'rgba(244, 67, 54, 0.2)',
                            border: '1px solid rgba(244, 67, 54, 0.5)',
                            borderRadius: '6px',
                            color: '#f44336',
                            cursor: 'pointer'
                          }}
                          title="Delete Order"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : reconciliation && reconciliation.orders.length === 0 ? (
          <div style={{
            background: 'rgba(31, 38, 55, 0.6)',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid rgba(0, 212, 255, 0.2)'
          }}>
            <FileText size={48} color="rgba(255,255,255,0.3)" style={{ marginBottom: '1rem' }} />
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem' }}>
              No orders found for {selectedMonth ? formatMonth(selectedMonth) : 'this month'}
            </p>
          </div>
        ) : null}

        {/* Order Details Modal */}
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(31, 38, 55, 0.95)',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                border: '1px solid rgba(0, 212, 255, 0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: '#00d4ff', fontSize: '1.5rem' }}>Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  style={{
                    padding: '0.5rem',
                    background: 'rgba(244, 67, 54, 0.2)',
                    border: '1px solid rgba(244, 67, 54, 0.5)',
                    borderRadius: '6px',
                    color: '#f44336',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>Order Information</h3>
                  <div style={{ 
                    background: 'rgba(0, 0, 0, 0.2)',
                    padding: '1rem',
                    borderRadius: '8px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem'
                  }}>
                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Order Number:</span>
                      <div style={{ color: '#fff', fontWeight: '600' }}>{selectedOrder.orderNumber}</div>
                    </div>
                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Order Date:</span>
                      <div style={{ color: '#fff' }}>{new Date(selectedOrder.orderDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Status:</span>
                      <div style={{ color: getStatusColor(selectedOrder.status) }}>
                        {selectedOrder.status.toUpperCase()}
                      </div>
                    </div>
                    {selectedOrder.deliveryDate && (
                      <div>
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Delivery Date:</span>
                        <div style={{ color: '#fff' }}>{new Date(selectedOrder.deliveryDate).toLocaleDateString()}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>Customer Information</h3>
                  <div style={{ 
                    background: 'rgba(0, 0, 0, 0.2)',
                    padding: '1rem',
                    borderRadius: '8px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem'
                  }}>
                    <div>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Name:</span>
                      <div style={{ color: '#fff', fontWeight: '600' }}>{selectedOrder.customerName}</div>
                    </div>
                    {selectedOrder.customerCode && (
                      <div>
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Code:</span>
                        <div style={{ color: '#fff' }}>{selectedOrder.customerCode}</div>
                      </div>
                    )}
                    {selectedOrder.customerEmail && (
                      <div>
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Email:</span>
                        <div style={{ color: '#fff' }}>{selectedOrder.customerEmail}</div>
                      </div>
                    )}
                    {selectedOrder.customerPhone && (
                      <div>
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Phone:</span>
                        <div style={{ color: '#fff' }}>{selectedOrder.customerPhone}</div>
                      </div>
                    )}
                    {selectedOrder.customerAddress && (
                      <div style={{ gridColumn: '1 / -1' }}>
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Address:</span>
                        <div style={{ color: '#fff' }}>{selectedOrder.customerAddress}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>Order Items</h3>
                  <div style={{ 
                    background: 'rgba(0, 0, 0, 0.2)',
                    padding: '1rem',
                    borderRadius: '8px'
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(0, 212, 255, 0.3)' }}>
                          <th style={{ padding: '0.5rem', textAlign: 'left', color: '#00d4ff' }}>Product</th>
                          <th style={{ padding: '0.5rem', textAlign: 'right', color: '#00d4ff' }}>Qty</th>
                          <th style={{ padding: '0.5rem', textAlign: 'right', color: '#00d4ff' }}>Unit Price</th>
                          <th style={{ padding: '0.5rem', textAlign: 'right', color: '#00d4ff' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid rgba(0, 212, 255, 0.1)' }}>
                            <td style={{ padding: '0.5rem', color: '#fff' }}>{item.productName}</td>
                            <td style={{ padding: '0.5rem', textAlign: 'right', color: 'rgba(255,255,255,0.8)' }}>
                              {item.quantity}
                            </td>
                            <td style={{ padding: '0.5rem', textAlign: 'right', color: 'rgba(255,255,255,0.8)' }}>
                              ${item.unitPrice.toFixed(2)}
                            </td>
                            <td style={{ padding: '0.5rem', textAlign: 'right', color: '#10b981', fontWeight: '600' }}>
                              ${item.totalPrice.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>Order Summary</h3>
                  <div style={{ 
                    background: 'rgba(0, 0, 0, 0.2)',
                    padding: '1rem',
                    borderRadius: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.8)' }}>Subtotal:</span>
                      <span style={{ color: '#fff' }}>${selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    {selectedOrder.tax && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'rgba(255,255,255,0.8)' }}>Tax:</span>
                        <span style={{ color: '#fff' }}>${selectedOrder.tax.toFixed(2)}</span>
                      </div>
                    )}
                    {selectedOrder.discount && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'rgba(255,255,255,0.8)' }}>Discount:</span>
                        <span style={{ color: '#f44336' }}>-${selectedOrder.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '2px solid rgba(0, 212, 255, 0.3)'
                    }}>
                      <span style={{ color: '#00d4ff', fontSize: '1.2rem', fontWeight: '700' }}>Total:</span>
                      <span style={{ color: '#00d4ff', fontSize: '1.2rem', fontWeight: '700' }}>
                        ${selectedOrder.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div>
                    <h3 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>Notes</h3>
                    <div style={{ 
                      background: 'rgba(0, 0, 0, 0.2)',
                      padding: '1rem',
                      borderRadius: '8px',
                      color: 'rgba(255,255,255,0.8)'
                    }}>
                      {selectedOrder.notes}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MonthlyReconciliation






