import React, { useState, useEffect } from 'react'
import { Workflow, Plus, Edit, Trash2, Search, Clock, CheckCircle, AlertTriangle, Package, Truck, ArrowRight, Calendar, User, MapPin } from 'lucide-react'
import { dataService } from '../services/dataService'
import type { Order, Client, Employee } from '../services/dataService'

interface WarehouseProcessProps {}

interface ProcessOrder extends Order {
  stage: 'queue' | 'mixing' | 'flavoring' | 'bagging' | 'packing' | 'shipping' | 'completed'
  assignedOperator?: string
  stageStartTime?: string
  estimatedCompletion?: string
  notes?: string
}

const WarehouseProcess: React.FC<WarehouseProcessProps> = () => {
  const [orders, setOrders] = useState<ProcessOrder[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredOrders, setFilteredOrders] = useState<ProcessOrder[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStage, setFilterStage] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<ProcessOrder | null>(null)
  const [loading, setLoading] = useState(true)

  const stages = [
    { id: 'queue', name: 'Queue', icon: Clock, color: '#6b7280' },
    { id: 'mixing', name: 'Mixing', icon: Package, color: '#3b82f6' },
    { id: 'flavoring', name: 'Flavoring', icon: Package, color: '#8b5cf6' },
    { id: 'bagging', name: 'Bagging', icon: Package, color: '#f59e0b' },
    { id: 'packing', name: 'Packing', icon: Package, color: '#10b981' },
    { id: 'shipping', name: 'Shipping', icon: Truck, color: '#ef4444' },
    { id: 'completed', name: 'Completed', icon: CheckCircle, color: '#059669' }
  ]

  const priorities = ['high', 'medium', 'low']

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, filterStage, filterPriority])

  const loadData = () => {
    setLoading(true)
    try {
      const orderData = dataService.getOrders()
      const clientData = dataService.getClients()
      const employeeData = dataService.getEmployees()
      
      // Convert orders to process orders with warehouse stages
      const processOrders: ProcessOrder[] = orderData.map(order => ({
        ...order,
        stage: (order as any).stage || 'queue',
        assignedOperator: (order as any).assignedOperator,
        stageStartTime: (order as any).stageStartTime || new Date().toISOString(),
        estimatedCompletion: (order as any).estimatedCompletion,
        notes: (order as any).notes
      }))
      
      setOrders(processOrders)
      setClients(clientData)
      setEmployees(employeeData.filter(emp => 
        emp.department === 'Warehouse' || 
        emp.position.includes('Operator') ||
        emp.position.includes('Supervisor')
      ))
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(order => {
        const client = getClientName(order.clientId)
        return order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
               client.toLowerCase().includes(searchTerm.toLowerCase()) ||
               order.id.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }

    if (filterStage !== 'all') {
      filtered = filtered.filter(order => order.stage === filterStage)
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(order => order.priority === filterPriority)
    }

    setFilteredOrders(filtered)
  }

  const handleMoveToNextStage = (orderId: string) => {
    const order = orders.find(o => o.id === orderId)
    if (!order) return

    const currentStageIndex = stages.findIndex(s => s.id === order.stage)
    if (currentStageIndex < stages.length - 1) {
      const nextStage = stages[currentStageIndex + 1].id as ProcessOrder['stage']
      
      const updatedOrder = {
        ...order,
        stage: nextStage,
        stageStartTime: new Date().toISOString()
      }

      setOrders(prev => prev.map(o => o.id === orderId ? updatedOrder : o))
      
      // Update in data service
      dataService.updateOrder(orderId, { 
        status: nextStage === 'completed' ? 'delivered' : 'processing',
        ...(nextStage === 'completed' && { actualDelivery: new Date().toISOString() })
      })
    }
  }

  const handleAssignOperator = (orderId: string, operatorId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, assignedOperator: operatorId }
        : order
    ))
  }

  const handleAddOrder = (orderData: Omit<ProcessOrder, 'id'>) => {
    try {
      const newOrder = dataService.addOrder({
        orderNumber: orderData.orderNumber,
        clientId: orderData.clientId,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        currency: orderData.currency,
        status: 'processing',
        orderDate: orderData.orderDate,
        expectedDelivery: orderData.expectedDelivery,
        priority: orderData.priority
      })
      
      const processOrder: ProcessOrder = {
        ...newOrder,
        stage: 'queue',
        stageStartTime: new Date().toISOString(),
        assignedOperator: orderData.assignedOperator,
        estimatedCompletion: orderData.estimatedCompletion,
        notes: orderData.notes
      }
      
      setOrders(prev => [...prev, processOrder])
      setShowAddModal(false)
    } catch (error) {
      console.error('Error adding order:', error)
    }
  }

  const handleEditOrder = (orderData: Partial<ProcessOrder>) => {
    if (!selectedOrder) return
    
    try {
      const updatedOrder = { ...selectedOrder, ...orderData }
      setOrders(prev => prev.map(order => 
        order.id === selectedOrder.id ? updatedOrder : order
      ))
      
      // Update in data service
      dataService.updateOrder(selectedOrder.id, {
        priority: orderData.priority,
        expectedDelivery: orderData.expectedDelivery
      })
      
      setShowEditModal(false)
      setSelectedOrder(null)
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const handleDeleteOrder = (id: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        setOrders(prev => prev.filter(order => order.id !== id))
        // Note: We don't delete from dataService to maintain order history
      } catch (error) {
        console.error('Error deleting order:', error)
      }
    }
  }

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    return client ? client.name : 'Unknown Client'
  }

  const getOperatorName = (operatorId?: string) => {
    if (!operatorId) return 'Unassigned'
    const operator = employees.find(emp => emp.id === operatorId)
    return operator ? operator.name : 'Unknown Operator'
  }

  const getStageInfo = (stage: string) => {
    return stages.find(s => s.id === stage) || stages[0]
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getOrdersByStage = (stage: string) => {
    return filteredOrders.filter(order => order.stage === stage)
  }

  const getTotalOrders = () => filteredOrders.length
  const getActiveOrders = () => filteredOrders.filter(order => order.stage !== 'completed').length
  const getCompletedToday = () => {
    const today = new Date().toISOString().split('T')[0]
    return filteredOrders.filter(order => 
      order.stage === 'completed' && 
      order.actualDelivery?.startsWith(today)
    ).length
  }
  const getAverageProcessingTime = () => {
    const completedOrders = filteredOrders.filter(order => order.stage === 'completed')
    if (completedOrders.length === 0) return 0
    
    const totalTime = completedOrders.reduce((total, order) => {
      const start = new Date(order.orderDate).getTime()
      const end = new Date(order.actualDelivery || new Date()).getTime()
      return total + (end - start)
    }, 0)
    
    return Math.round(totalTime / completedOrders.length / (1000 * 60 * 60 * 24)) // days
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: 'var(--text-secondary)'
      }}>
        Loading warehouse process data...
      </div>
    )
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px' 
      }}>
        <div>
          <h1 style={{ 
            color: 'var(--text-primary)', 
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: '600'
          }}>
            <Workflow size={32} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
            Warehouse Process
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Order fulfillment pipeline from queue to shipping
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            background: 'linear-gradient(135deg, var(--azure-primary), var(--azure-secondary))',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <Plus size={20} />
          Add Order
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '32px' 
      }}>
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(77, 208, 225, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <Package size={24} style={{ color: 'var(--azure-primary)' }} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '14px' }}>
                Total Orders
              </p>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {getTotalOrders()}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <Clock size={24} style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '14px' }}>
                Active Orders
              </p>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {getActiveOrders()}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <CheckCircle size={24} style={{ color: '#10b981' }} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '14px' }}>
                Completed Today
              </p>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {getCompletedToday()}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(168, 85, 247, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <Calendar size={24} style={{ color: '#a855f7' }} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '14px' }}>
                Avg Processing (days)
              </p>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {getAverageProcessingTime()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '16px' 
        }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)'
            }} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 44px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                background: 'var(--bg-dark)',
                color: 'var(--text-primary)',
                fontSize: '14px'
              }}
            />
          </div>

          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            style={{
              padding: '12px',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              background: 'var(--bg-dark)',
              color: 'var(--text-primary)',
              fontSize: '14px'
            }}
          >
            <option value="all">All Stages</option>
            {stages.map(stage => (
              <option key={stage.id} value={stage.id}>
                {stage.name}
              </option>
            ))}
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            style={{
              padding: '12px',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              background: 'var(--bg-dark)',
              color: 'var(--text-primary)',
              fontSize: '14px'
            }}
          >
            <option value="all">All Priorities</option>
            {priorities.map(priority => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Process Pipeline */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '24px', fontSize: '20px' }}>
          Process Pipeline
        </h2>
        
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          overflowX: 'auto',
          paddingBottom: '16px'
        }}>
          {stages.map((stage, index) => {
            const stageOrders = getOrdersByStage(stage.id)
            const StageIcon = stage.icon
            
            return (
              <div key={stage.id} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  minWidth: '200px',
                  background: 'rgba(77, 208, 225, 0.05)',
                  border: '1px solid rgba(77, 208, 225, 0.1)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{
                      background: `${stage.color}20`,
                      padding: '8px',
                      borderRadius: '8px'
                    }}>
                      <StageIcon size={20} style={{ color: stage.color }} />
                    </div>
                    <div>
                      <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '16px' }}>
                        {stage.name}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px' }}>
                        {stageOrders.length} orders
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {stageOrders.slice(0, 3).map(order => (
                      <div key={order.id} style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '8px',
                        marginBottom: '8px',
                        fontSize: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                            {order.orderNumber}
                          </span>
                          <span style={{
                            background: `${getPriorityColor(order.priority)}20`,
                            color: getPriorityColor(order.priority),
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            textTransform: 'uppercase'
                          }}>
                            {order.priority}
                          </span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                          {getClientName(order.clientId)}
                        </p>
                      </div>
                    ))}
                    {stageOrders.length > 3 && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '11px', textAlign: 'center', margin: '8px 0 0 0' }}>
                        +{stageOrders.length - 3} more
                      </p>
                    )}
                  </div>
                </div>
                
                {index < stages.length - 1 && (
                  <ArrowRight size={20} style={{ color: 'var(--text-secondary)', margin: '0 8px' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Orders List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {filteredOrders.map((order) => {
          const client = getClientName(order.clientId)
          const operator = getOperatorName(order.assignedOperator)
          const stageInfo = getStageInfo(order.stage)
          const StageIcon = stageInfo.icon
          
          return (
            <div key={order.id} style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
              position: 'relative'
            }}>
              {/* Priority Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500',
                background: `${getPriorityColor(order.priority)}20`,
                color: getPriorityColor(order.priority),
                textTransform: 'uppercase'
              }}>
                {order.priority}
              </div>

              {/* Order Header */}
              <div style={{ marginBottom: '16px', paddingRight: '80px' }}>
                <h3 style={{ 
                  color: 'var(--text-primary)', 
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  {order.orderNumber}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  margin: '0 0 8px 0',
                  fontSize: '14px'
                }}>
                  {client}
                </p>
              </div>

              {/* Current Stage */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{
                    background: `${stageInfo.color}20`,
                    padding: '6px',
                    borderRadius: '6px'
                  }}>
                    <StageIcon size={16} style={{ color: stageInfo.color }} />
                  </div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                    {stageInfo.name}
                  </span>
                </div>
                
                {order.stage !== 'completed' && (
                  <button
                    onClick={() => handleMoveToNextStage(order.id)}
                    style={{
                      background: 'rgba(77, 208, 225, 0.1)',
                      border: '1px solid var(--azure-primary)',
                      color: 'var(--azure-primary)',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    Move to Next Stage
                  </button>
                )}
              </div>

              {/* Order Details */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '12px' }}>
                    Total Amount
                  </p>
                  <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                    {order.totalAmount.toLocaleString()} {order.currency}
                  </p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '12px' }}>
                    Expected Delivery
                  </p>
                  <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                    {new Date(order.expectedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Assigned Operator */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <User size={14} style={{ color: 'var(--text-secondary)' }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                    Operator: {operator}
                  </span>
                </div>
                
                {!order.assignedOperator && (
                  <select
                    onChange={(e) => handleAssignOperator(order.id, e.target.value)}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      background: 'var(--bg-dark)',
                      color: 'var(--text-primary)',
                      fontSize: '12px'
                    }}
                  >
                    <option value="">Assign Operator</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Notes */}
              {order.notes && (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '12px' }}>
                    Notes
                  </p>
                  <p style={{ 
                    color: 'var(--text-primary)', 
                    margin: 0, 
                    fontSize: '13px',
                    background: 'rgba(77, 208, 225, 0.05)',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(77, 208, 225, 0.1)'
                  }}>
                    {order.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => {
                    setSelectedOrder(order)
                    setShowEditModal(true)
                  }}
                  style={{
                    background: 'rgba(77, 208, 225, 0.1)',
                    border: '1px solid var(--azure-primary)',
                    color: 'var(--azure-primary)',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  style={{
                    background: 'rgba(248, 113, 113, 0.1)',
                    border: '1px solid #f87171',
                    color: '#f87171',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          No orders found matching your criteria.
        </div>
      )}

      {/* Add Order Modal */}
      {showAddModal && (
        <OrderModal
          title="Add New Order"
          clients={clients}
          employees={employees}
          onSave={handleAddOrder}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Order Modal */}
      {showEditModal && selectedOrder && (
        <OrderModal
          title="Edit Order"
          order={selectedOrder}
          clients={clients}
          employees={employees}
          onSave={handleEditOrder}
          onClose={() => {
            setShowEditModal(false)
            setSelectedOrder(null)
          }}
        />
      )}
    </div>
  )
}

// Order Modal Component
interface OrderModalProps {
  title: string
  order?: ProcessOrder
  clients: Client[]
  employees: Employee[]
  onSave: (data: any) => void
  onClose: () => void
}

const OrderModal: React.FC<OrderModalProps> = ({ title, order, clients, employees, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    orderNumber: order?.orderNumber || `ORD-${Date.now()}`,
    clientId: order?.clientId || '',
    totalAmount: order?.totalAmount || 0,
    currency: order?.currency || 'AED',
    priority: order?.priority || 'medium',
    orderDate: order?.orderDate || new Date().toISOString().split('T')[0],
    expectedDelivery: order?.expectedDelivery || '',
    assignedOperator: order?.assignedOperator || '',
    estimatedCompletion: order?.estimatedCompletion || '',
    notes: order?.notes || '',
    items: order?.items || [{ productId: 'tobacco-mix-1', quantity: 100, price: 50 }]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '24px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>{title}</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Order Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.orderNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Client *
                </label>
                <select
                  required
                  value={formData.clientId}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientId: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="">Select Client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Total Amount *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.totalAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalAmount: Number(e.target.value) }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Currency *
                </label>
                <select
                  required
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="AED">AED</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>

              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Priority *
                </label>
                <select
                  required
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Order Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.orderDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, orderDate: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Expected Delivery *
                </label>
                <input
                  type="date"
                  required
                  value={formData.expectedDelivery}
                  onChange={(e) => setFormData(prev => ({ ...prev, expectedDelivery: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                Assigned Operator
              </label>
              <select
                value={formData.assignedOperator}
                onChange={(e) => setFormData(prev => ({ ...prev, assignedOperator: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  background: 'var(--bg-dark)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="">Select Operator</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} - {employee.position}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional order notes..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  background: 'var(--bg-dark)',
                  color: 'var(--text-primary)',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'flex-end', 
            marginTop: '24px' 
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                background: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--azure-primary), var(--azure-secondary))',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {order ? 'Update' : 'Add'} Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WarehouseProcess 