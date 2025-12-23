import React, { useState, useEffect } from 'react'

const useTheme = () => {
  const isDark = document.documentElement.style.getPropertyValue('--theme-bg')?.includes('#') || true
  return {
    type: isDark ? 'dark' : 'light',
    background: isDark ? '#1a1f3a' : '#ffffff',
    secondary: isDark ? '#1a1f3a' : '#f8fafc',
    primary: isDark ? '#0a0e27' : '#ffffff',
    text: isDark ? '#e2e8f0' : '#6b7280',
    textLight: isDark ? '#ffffff' : '#1f2937',
    border: isDark ? '#2d3748' : '#e5e7eb',
    accent: '#00d4ff'
  }
}

interface SecurityAlert {
  id: string
  type: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  timestamp: string
  source: string
  status: 'active' | 'investigating' | 'resolved'
  affectedSystems: string[]
}

interface AccessLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  timestamp: string
  ipAddress: string
  userAgent: string
  status: 'success' | 'failed' | 'blocked'
  riskScore: number
}

interface SecurityMetric {
  id: string
  name: string
  value: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  status: 'good' | 'warning' | 'critical'
  target: number
}

const EnterpriseSecurityManagement: React.FC = () => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([])
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([])
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([])

  useEffect(() => {
    loadSecurityData()
  }, [])

  const loadSecurityData = () => {
    const alerts: SecurityAlert[] = [
      {
        id: 'alert-001',
        type: 'high',
        title: 'Multiple Failed Login Attempts',
        description: 'Detected 15 failed login attempts from IP 192.168.1.100',
        timestamp: '2024-01-15T14:30:00Z',
        source: 'Authentication System',
        status: 'investigating',
        affectedSystems: ['User Portal', 'Admin Panel']
      },
      {
        id: 'alert-002',
        type: 'medium',
        title: 'Unusual Data Access Pattern',
        description: 'User accessed 50+ documents in 10 minutes',
        timestamp: '2024-01-15T13:45:00Z',
        source: 'Document Management',
        status: 'active',
        affectedSystems: ['Document System']
      }
    ]

    const logs: AccessLog[] = [
      {
        id: 'log-001',
        userId: 'user-001',
        userName: 'Ahmed Al-Rashid',
        action: 'Login',
        resource: 'Dashboard',
        timestamp: '2024-01-15T15:00:00Z',
        ipAddress: '192.168.1.50',
        userAgent: 'Chrome/120.0.0.0',
        status: 'success',
        riskScore: 2
      },
      {
        id: 'log-002',
        userId: 'user-002',
        userName: 'Unknown',
        action: 'Failed Login',
        resource: 'Admin Panel',
        timestamp: '2024-01-15T14:30:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Unknown',
        status: 'failed',
        riskScore: 8
      }
    ]

    const metrics: SecurityMetric[] = [
      {
        id: 'metric-001',
        name: 'Security Score',
        value: 94.2,
        unit: '%',
        trend: 'up',
        status: 'good',
        target: 95
      },
      {
        id: 'metric-002',
        name: 'Active Threats',
        value: 3,
        unit: 'threats',
        trend: 'down',
        status: 'warning',
        target: 0
      },
      {
        id: 'metric-003',
        name: 'Failed Logins',
        value: 15,
        unit: 'attempts',
        trend: 'up',
        status: 'critical',
        target: 5
      }
    ]

    setSecurityAlerts(alerts)
    setAccessLogs(logs)
    setSecurityMetrics(metrics)
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return '#ef4444'
      case 'high': return '#f59e0b'
      case 'medium': return '#3b82f6'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return '#10b981'
      case 'warning': return '#f59e0b'
      case 'critical': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const renderOverview = () => (
    <div style={{ padding: '2rem' }}>
      {/* Security Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {securityMetrics.map(metric => (
          <div key={metric.id} style={{
            background: theme.secondary,
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: `1px solid ${getStatusColor(metric.status)}`
          }}>
            <h3 style={{
              color: theme.textLight,
              fontSize: '1rem',
              fontWeight: '600',
              margin: 0,
              marginBottom: '0.5rem'
            }}>
              {metric.name}
            </h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: getStatusColor(metric.status),
              marginBottom: '0.5rem'
            }}>
              {metric.value} {metric.unit}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: theme.text, fontSize: '0.8rem' }}>
                Target: {metric.target} {metric.unit}
              </span>
              <span style={{
                color: metric.trend === 'up' ? '#ef4444' : '#10b981',
                fontSize: '0.8rem'
              }}>
                {metric.trend === 'up' ? '↗️' : '↘️'} {metric.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Alerts */}
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          color: theme.textLight,
          fontSize: '1.2rem',
          fontWeight: '700',
          marginBottom: '1.5rem'
        }}>
          🚨 Recent Security Alerts
        </h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {securityAlerts.map(alert => (
            <div key={alert.id} style={{
              background: theme.primary,
              borderRadius: '12px',
              padding: '1rem',
              border: `1px solid ${getAlertColor(alert.type)}`
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.5rem'
              }}>
                <h4 style={{
                  color: theme.textLight,
                  fontSize: '1rem',
                  fontWeight: '600',
                  margin: 0
                }}>
                  {alert.title}
                </h4>
                <span style={{
                  background: getAlertColor(alert.type),
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600'
                }}>
                  {alert.type.toUpperCase()}
                </span>
              </div>
              
              <p style={{
                color: theme.text,
                fontSize: '0.9rem',
                marginBottom: '0.5rem'
              }}>
                {alert.description}
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
                color: theme.text
              }}>
                <span>Source: {alert.source}</span>
                <span>{new Date(alert.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Monitoring */}
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          color: theme.textLight,
          fontSize: '1.2rem',
          fontWeight: '700',
          marginBottom: '1.5rem'
        }}>
          🔐 Recent Access Logs
        </h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: theme.primary }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: theme.textLight }}>User</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: theme.textLight }}>Action</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: theme.textLight }}>Resource</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: theme.textLight }}>Time</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: theme.textLight }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: theme.textLight }}>Risk</th>
              </tr>
            </thead>
            <tbody>
              {accessLogs.map((log, index) => (
                <tr key={log.id} style={{
                  borderBottom: `1px solid ${theme.border}`,
                  background: index % 2 === 0 ? theme.secondary : theme.primary
                }}>
                  <td style={{ padding: '1rem', color: theme.textLight }}>{log.userName}</td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>{log.action}</td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>{log.resource}</td>
                  <td style={{ padding: '1rem', color: theme.text }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      background: log.status === 'success' ? '#10b981' : 
                                 log.status === 'failed' ? '#ef4444' : '#f59e0b',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      {log.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      background: log.riskScore > 7 ? '#ef4444' : 
                                 log.riskScore > 4 ? '#f59e0b' : '#10b981',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      {log.riskScore}/10
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: theme.background }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '700' }}>
          🛡️ Enterprise Security Management
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Advanced threat detection and security monitoring
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        background: theme.secondary,
        borderBottom: `1px solid ${theme.border}`,
        padding: '0 2rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: `2px solid ${theme.border}`,
          paddingBottom: '1rem',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: '🛡️ Overview', icon: '🛡️' },
            { id: 'threats', label: '🚨 Threats', icon: '🚨' },
            { id: 'access', label: '🔐 Access Control', icon: '🔐' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '1rem 0',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: activeTab === tab.id ? '#ef4444' : '#6b7280',
                borderBottom: activeTab === tab.id ? '2px solid #ef4444' : '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
      </div>
    </div>
  )
}

export default EnterpriseSecurityManagement 