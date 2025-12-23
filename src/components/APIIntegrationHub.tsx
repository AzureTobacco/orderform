import React, { useState, useEffect } from 'react'
import { Globe, Link, CheckCircle, AlertCircle, RefreshCw, Settings, Database, Cloud, Smartphone, Monitor, Key, Shield, Activity, Zap, Plus, Edit, Trash2, Play, Pause } from 'lucide-react'

interface Integration {
  id: string
  name: string
  type: 'api' | 'database' | 'cloud' | 'webhook'
  status: 'connected' | 'disconnected' | 'error' | 'syncing'
  provider: string
  description: string
  lastSync: string
  dataFlow: 'inbound' | 'outbound' | 'bidirectional'
  recordsProcessed: number
  errorCount: number
  config: {
    endpoint?: string
    apiKey?: string
    frequency?: string
    enabled: boolean
  }
}

interface SyncLog {
  id: string
  integrationId: string
  timestamp: string
  status: 'success' | 'error' | 'warning'
  message: string
  recordsProcessed: number
  duration: number
}

const APIIntegrationHub: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([])
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    loadIntegrations()
    loadSyncLogs()
  }, [])

  const loadIntegrations = () => {
    const sampleIntegrations: Integration[] = [
      {
        id: 'int-001',
        name: 'SAP ERP Integration',
        type: 'api',
        status: 'connected',
        provider: 'SAP',
        description: 'Synchronize financial data and purchase orders',
        lastSync: '2024-01-15T14:30:00Z',
        dataFlow: 'bidirectional',
        recordsProcessed: 1247,
        errorCount: 2,
        config: {
          endpoint: 'https://api.sap.com/v1/erp',
          apiKey: '***************',
          frequency: 'hourly',
          enabled: true
        }
      },
      {
        id: 'int-002',
        name: 'Salesforce CRM',
        type: 'cloud',
        status: 'connected',
        provider: 'Salesforce',
        description: 'Customer data and sales pipeline synchronization',
        lastSync: '2024-01-15T14:15:00Z',
        dataFlow: 'inbound',
        recordsProcessed: 892,
        errorCount: 0,
        config: {
          endpoint: 'https://azure-tobacco.salesforce.com',
          apiKey: '***************',
          frequency: '30min',
          enabled: true
        }
      },
      {
        id: 'int-003',
        name: 'QuickBooks Accounting',
        type: 'api',
        status: 'syncing',
        provider: 'Intuit',
        description: 'Financial transactions and invoice management',
        lastSync: '2024-01-15T13:45:00Z',
        dataFlow: 'outbound',
        recordsProcessed: 456,
        errorCount: 1,
        config: {
          endpoint: 'https://sandbox-quickbooks.api.intuit.com',
          apiKey: '***************',
          frequency: 'daily',
          enabled: true
        }
      },
      {
        id: 'int-004',
        name: 'Warehouse Management System',
        type: 'database',
        status: 'error',
        provider: 'Custom WMS',
        description: 'Inventory levels and warehouse operations',
        lastSync: '2024-01-15T12:00:00Z',
        dataFlow: 'bidirectional',
        recordsProcessed: 0,
        errorCount: 5,
        config: {
          endpoint: 'postgresql://wms.azure.local:5432/warehouse',
          frequency: 'realtime',
          enabled: false
        }
      },
      {
        id: 'int-005',
        name: 'Shipping Provider API',
        type: 'webhook',
        status: 'connected',
        provider: 'DHL Express',
        description: 'Shipment tracking and delivery notifications',
        lastSync: '2024-01-15T14:20:00Z',
        dataFlow: 'inbound',
        recordsProcessed: 234,
        errorCount: 0,
        config: {
          endpoint: 'https://api.dhl.com/track/shipments',
          apiKey: '***************',
          frequency: 'webhook',
          enabled: true
        }
      },
      {
        id: 'int-006',
        name: 'Quality Lab Equipment',
        type: 'api',
        status: 'disconnected',
        provider: 'LabTech Systems',
        description: 'Automated quality test results import',
        lastSync: '2024-01-14T16:30:00Z',
        dataFlow: 'inbound',
        recordsProcessed: 156,
        errorCount: 0,
        config: {
          endpoint: 'https://labtech.azure.local/api/v2',
          apiKey: '***************',
          frequency: '15min',
          enabled: false
        }
      }
    ]
    setIntegrations(sampleIntegrations)
  }

  const loadSyncLogs = () => {
    const sampleLogs: SyncLog[] = [
      {
        id: 'log-001',
        integrationId: 'int-001',
        timestamp: '2024-01-15T14:30:00Z',
        status: 'success',
        message: 'Successfully synchronized 45 purchase orders',
        recordsProcessed: 45,
        duration: 2.3
      },
      {
        id: 'log-002',
        integrationId: 'int-002',
        timestamp: '2024-01-15T14:15:00Z',
        status: 'success',
        message: 'Customer data sync completed',
        recordsProcessed: 23,
        duration: 1.8
      },
      {
        id: 'log-003',
        integrationId: 'int-004',
        timestamp: '2024-01-15T12:00:00Z',
        status: 'error',
        message: 'Connection timeout - database unreachable',
        recordsProcessed: 0,
        duration: 30.0
      },
      {
        id: 'log-004',
        integrationId: 'int-005',
        timestamp: '2024-01-15T14:20:00Z',
        status: 'success',
        message: 'Received 12 shipment status updates',
        recordsProcessed: 12,
        duration: 0.5
      },
      {
        id: 'log-005',
        integrationId: 'int-003',
        timestamp: '2024-01-15T13:45:00Z',
        status: 'warning',
        message: 'Partial sync - 1 invoice failed validation',
        recordsProcessed: 8,
        duration: 4.2
      }
    ]
    setSyncLogs(sampleLogs)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return '#10b981'
      case 'syncing': return '#3b82f6'
      case 'disconnected': return '#6b7280'
      case 'error': return '#ef4444'
      case 'success': return '#10b981'
      case 'warning': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'api': return Globe
      case 'database': return Database
      case 'cloud': return Cloud
      case 'webhook': return Zap
      default: return Link
    }
  }

  const toggleIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(int => 
      int.id === integrationId 
        ? { 
            ...int, 
            config: { ...int.config, enabled: !int.config.enabled },
            status: int.config.enabled ? 'disconnected' : 'connected'
          }
        : int
    ))
  }

  const syncIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(int => 
      int.id === integrationId 
        ? { ...int, status: 'syncing' }
        : int
    ))
    
    // Simulate sync process
    setTimeout(() => {
      setIntegrations(prev => prev.map(int => 
        int.id === integrationId 
          ? { ...int, status: 'connected', lastSync: new Date().toISOString() }
          : int
      ))
    }, 3000)
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'integrations', name: 'Integrations', icon: Link },
    { id: 'logs', name: 'Sync Logs', icon: Monitor },
    { id: 'security', name: 'Security', icon: Shield }
  ]

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
            <Globe size={32} style={{ marginRight: '12px', verticalAlign: 'middle', color: 'var(--azure-primary)' }} />
            API Integration Hub
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Manage external system connections and data synchronization
          </p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            background: 'var(--azure-primary)',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 20px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Plus size={16} />
          Add Integration
        </button>
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid var(--border-color)', 
        marginBottom: '24px' 
      }}>
        {tabs.map(tab => {
          const IconComponent = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 20px',
                color: activeTab === tab.id ? 'var(--azure-primary)' : 'var(--text-secondary)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid var(--azure-primary)' : '2px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <IconComponent size={16} />
              {tab.name}
            </button>
          )
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
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
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  background: 'rgba(77, 208, 225, 0.2)',
                  padding: '12px',
                  borderRadius: '8px'
                }}>
                  <Link size={24} style={{ color: 'var(--azure-primary)' }} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                    {integrations.filter(i => i.status === 'connected').length}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                    Active Integrations
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  padding: '12px',
                  borderRadius: '8px'
                }}>
                  <Activity size={24} style={{ color: '#10b981' }} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                    {integrations.reduce((sum, i) => sum + i.recordsProcessed, 0).toLocaleString()}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                    Records Processed
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  padding: '12px',
                  borderRadius: '8px'
                }}>
                  <AlertCircle size={24} style={{ color: '#ef4444' }} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                    {integrations.reduce((sum, i) => sum + i.errorCount, 0)}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                    Total Errors
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  padding: '12px',
                  borderRadius: '8px'
                }}>
                  <RefreshCw size={24} style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                    98.7%
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                    Uptime
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Status */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontSize: '20px' }}>
              Integration Status
            </h2>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {integrations.map(integration => {
                const TypeIcon = getTypeIcon(integration.type)
                return (
                  <div key={integration.id} style={{
                    background: 'rgba(77, 208, 225, 0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <TypeIcon size={20} style={{ color: 'var(--azure-primary)' }} />
                      <div>
                        <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                          {integration.name}
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px' }}>
                          {integration.provider} • Last sync: {new Date(integration.lastSync).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: getStatusColor(integration.status)
                      }} />
                      <span style={{ 
                        color: getStatusColor(integration.status),
                        fontSize: '12px',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {integration.status}
                      </span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                        {integration.recordsProcessed.toLocaleString()} records
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '24px' 
        }}>
          {integrations.map(integration => {
            const TypeIcon = getTypeIcon(integration.type)
            return (
              <div key={integration.id} style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '24px',
                position: 'relative'
              }}>
                {/* Status indicator */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: `${getStatusColor(integration.status)}20`,
                  color: getStatusColor(integration.status),
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                }}>
                  {integration.status}
                </div>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    background: 'rgba(77, 208, 225, 0.2)',
                    padding: '12px',
                    borderRadius: '8px'
                  }}>
                    <TypeIcon size={20} style={{ color: 'var(--azure-primary)' }} />
                  </div>
                  <div>
                    <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '16px', fontWeight: '600' }}>
                      {integration.name}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px' }}>
                      {integration.provider} • {integration.type.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: 'var(--text-secondary)', margin: '0 0 16px 0', fontSize: '13px' }}>
                  {integration.description}
                </p>

                {/* Stats */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 1fr', 
                  gap: '12px', 
                  marginBottom: '16px' 
                }}>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '11px' }}>
                      Records
                    </p>
                    <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                      {integration.recordsProcessed.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '11px' }}>
                      Errors
                    </p>
                    <p style={{ color: integration.errorCount > 0 ? '#ef4444' : 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                      {integration.errorCount}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '11px' }}>
                      Frequency
                    </p>
                    <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                      {integration.config.frequency}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => toggleIntegration(integration.id)}
                    style={{
                      background: integration.config.enabled ? '#f59e0b' : '#10b981',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      color: 'white',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {integration.config.enabled ? <Pause size={12} /> : <Play size={12} />}
                    {integration.config.enabled ? 'Disable' : 'Enable'}
                  </button>
                  
                  <button
                    onClick={() => syncIntegration(integration.id)}
                    disabled={integration.status === 'syncing'}
                    style={{
                      background: 'var(--azure-primary)',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      color: 'white',
                      fontSize: '12px',
                      cursor: integration.status === 'syncing' ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      opacity: integration.status === 'syncing' ? 0.6 : 1
                    }}
                  >
                    <RefreshCw size={12} style={{ 
                      animation: integration.status === 'syncing' ? 'spin 1s linear infinite' : 'none' 
                    }} />
                    Sync Now
                  </button>
                  
                  <button
                    onClick={() => setSelectedIntegration(integration)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      color: 'var(--text-primary)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Settings size={12} />
                    Configure
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Sync Logs Tab */}
      {activeTab === 'logs' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontSize: '20px' }}>
            Synchronization Logs
          </h2>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {syncLogs.map(log => {
              const integration = integrations.find(i => i.id === log.integrationId)
              return (
                <div key={log.id} style={{
                  background: 'rgba(77, 208, 225, 0.05)',
                  border: `1px solid ${getStatusColor(log.status)}40`,
                  borderRadius: '8px',
                  padding: '16px',
                  borderLeft: `4px solid ${getStatusColor(log.status)}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                        {integration?.name || 'Unknown Integration'}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span style={{
                      background: `${getStatusColor(log.status)}20`,
                      color: getStatusColor(log.status),
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '500',
                      textTransform: 'uppercase'
                    }}>
                      {log.status}
                    </span>
                  </div>
                  
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 8px 0', fontSize: '13px' }}>
                    {log.message}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    <span>Records: {log.recordsProcessed}</span>
                    <span>Duration: {log.duration}s</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <Shield size={48} style={{ color: 'var(--azure-primary)', marginBottom: '16px' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>
            Security & Compliance
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            API key management, encryption settings, and compliance monitoring
          </p>
        </div>
      )}
    </div>
  )
}

export default APIIntegrationHub 