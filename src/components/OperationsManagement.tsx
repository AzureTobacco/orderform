import React, { useState } from 'react'
import { 
  Factory, 
  Package, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Settings,
  Truck,
  Wrench,
  Shield
} from 'lucide-react'

const OperationsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const operationsMetrics = [
    {
      title: 'Production Efficiency',
      value: '94.2%',
      change: '+2.1%',
      icon: Factory,
      color: '#00d4ff',
      trend: 'up'
    },
    {
      title: 'Quality Score',
      value: '98.7%',
      change: '+0.5%',
      icon: CheckCircle,
      color: '#00ff88',
      trend: 'up'
    },
    {
      title: 'Equipment Uptime',
      value: '96.8%',
      change: '-0.3%',
      icon: Settings,
      color: '#ffa726',
      trend: 'down'
    },
    {
      title: 'Safety Incidents',
      value: '0',
      change: '0',
      icon: Shield,
      color: '#4caf50',
      trend: 'stable'
    }
  ]

  const activeOrders = [
    { id: 'ORD-2024-001', product: 'Premium Tobacco Blend A', status: 'In Production', progress: 75, priority: 'High' },
    { id: 'ORD-2024-002', product: 'Classic Virginia Blend', status: 'Quality Check', progress: 90, priority: 'Medium' },
    { id: 'ORD-2024-003', product: 'Oriental Mix Special', status: 'Packaging', progress: 95, priority: 'High' },
    { id: 'ORD-2024-004', product: 'Burley Tobacco Grade A', status: 'Curing', progress: 45, priority: 'Low' }
  ]

  const equipmentStatus = [
    { name: 'Curing Chamber #1', status: 'Operational', utilization: 85, lastMaintenance: '2024-05-15' },
    { name: 'Blending Machine #2', status: 'Maintenance', utilization: 0, lastMaintenance: '2024-05-28' },
    { name: 'Packaging Line A', status: 'Operational', utilization: 92, lastMaintenance: '2024-05-20' },
    { name: 'Quality Scanner #3', status: 'Operational', utilization: 78, lastMaintenance: '2024-05-25' }
  ]

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: 'var(--cosmic-star-white)',
          fontFamily: 'var(--cosmic-font-primary)',
          marginBottom: '0.5rem',
          textShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
        }}>
          🏭 Operations Management
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          fontFamily: 'var(--cosmic-font-secondary)'
        }}>
          Monitor and optimize your tobacco production operations
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
        paddingBottom: '1rem'
      }}>
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'production', label: 'Production', icon: Factory },
          { id: 'equipment', label: 'Equipment', icon: Settings },
          { id: 'logistics', label: 'Logistics', icon: Truck }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cosmic-button ${activeTab === tab.id ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: activeTab === tab.id 
                ? 'var(--elegant-gradient)' 
                : 'rgba(26, 26, 46, 0.6)',
              border: `1px solid ${activeTab === tab.id 
                ? 'var(--cosmic-accent-cyan)' 
                : 'rgba(0, 212, 255, 0.2)'}`,
              borderRadius: '8px',
              color: 'var(--cosmic-star-white)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Metrics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {operationsMetrics.map((metric, index) => (
              <div key={index} className="cosmic-card" style={{
                padding: '1.5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: `linear-gradient(135deg, ${metric.color}20, transparent)`,
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  border: `2px solid ${metric.color}40`
                }}>
                  <metric.icon size={28} style={{ color: metric.color }} />
                </div>
                <h3 style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--cosmic-font-secondary)'
                }}>
                  {metric.title}
                </h3>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: metric.color,
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--cosmic-font-primary)'
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: metric.trend === 'up' ? '#00ff88' : metric.trend === 'down' ? '#ff4757' : '#ffa726',
                  fontWeight: '500'
                }}>
                  {metric.change} from last month
                </div>
              </div>
            ))}
          </div>

          {/* Active Orders */}
          <div className="cosmic-card" style={{ marginBottom: '2rem' }}>
            <h2 style={{
              color: 'var(--cosmic-accent-cyan)',
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              fontFamily: 'var(--cosmic-font-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Package size={24} />
              Active Production Orders
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="cosmic-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {activeOrders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ fontFamily: 'monospace', color: 'var(--cosmic-accent-cyan)' }}>
                        {order.id}
                      </td>
                      <td>{order.product}</td>
                      <td>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          background: 'rgba(0, 212, 255, 0.2)',
                          color: 'var(--cosmic-accent-cyan)',
                          border: '1px solid rgba(0, 212, 255, 0.3)'
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div style={{
                          background: 'rgba(26, 26, 46, 0.8)',
                          borderRadius: '10px',
                          height: '8px',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            background: `linear-gradient(90deg, var(--cosmic-accent-cyan), var(--cosmic-secondary))`,
                            height: '100%',
                            width: `${order.progress}%`,
                            borderRadius: '10px',
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {order.progress}%
                        </span>
                      </td>
                      <td>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          background: order.priority === 'High' ? 'rgba(255, 71, 87, 0.2)' :
                                     order.priority === 'Medium' ? 'rgba(255, 167, 38, 0.2)' :
                                     'rgba(0, 255, 136, 0.2)',
                          color: order.priority === 'High' ? '#ff4757' :
                                 order.priority === 'Medium' ? '#ffa726' :
                                 '#00ff88',
                          border: `1px solid ${order.priority === 'High' ? '#ff4757' :
                                                order.priority === 'Medium' ? '#ffa726' :
                                                '#00ff88'}40`
                        }}>
                          {order.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Tab */}
      {activeTab === 'equipment' && (
        <div className="cosmic-card">
          <h2 style={{
            color: 'var(--cosmic-accent-cyan)',
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            fontFamily: 'var(--cosmic-font-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Wrench size={24} />
            Equipment Status
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {equipmentStatus.map((equipment, index) => (
              <div key={index} className="cosmic-card" style={{
                padding: '1.5rem',
                border: `1px solid ${equipment.status === 'Operational' ? '#00ff88' : '#ff4757'}40`,
                background: `rgba(${equipment.status === 'Operational' ? '0, 255, 136' : '255, 71, 87'}, 0.05)`
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{
                    color: 'var(--cosmic-star-white)',
                    fontSize: '1.1rem',
                    fontFamily: 'var(--cosmic-font-primary)'
                  }}>
                    {equipment.name}
                  </h3>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    background: equipment.status === 'Operational' ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 71, 87, 0.2)',
                    color: equipment.status === 'Operational' ? '#00ff88' : '#ff4757',
                    border: `1px solid ${equipment.status === 'Operational' ? '#00ff88' : '#ff4757'}40`
                  }}>
                    {equipment.status}
                  </span>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Utilization
                    </span>
                    <span style={{ color: 'var(--cosmic-accent-cyan)', fontWeight: '600' }}>
                      {equipment.utilization}%
                    </span>
                  </div>
                  <div style={{
                    background: 'rgba(26, 26, 46, 0.8)',
                    borderRadius: '10px',
                    height: '8px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: `linear-gradient(90deg, var(--cosmic-accent-cyan), var(--cosmic-secondary))`,
                      height: '100%',
                      width: `${equipment.utilization}%`,
                      borderRadius: '10px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
                <div style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.8rem'
                }}>
                  Last Maintenance: {equipment.lastMaintenance}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other tabs content can be added here */}
      {activeTab === 'production' && (
        <div className="cosmic-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Factory size={64} style={{ color: 'var(--cosmic-accent-cyan)', marginBottom: '1rem' }} />
          <h2 style={{ color: 'var(--cosmic-star-white)', marginBottom: '1rem' }}>
            Production Management
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Detailed production management features coming soon...
          </p>
        </div>
      )}

      {activeTab === 'logistics' && (
        <div className="cosmic-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Truck size={64} style={{ color: 'var(--cosmic-accent-cyan)', marginBottom: '1rem' }} />
          <h2 style={{ color: 'var(--cosmic-star-white)', marginBottom: '1rem' }}>
            Logistics Management
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Supply chain and logistics features coming soon...
          </p>
        </div>
      )}
    </div>
  )
}

export default OperationsManagement
