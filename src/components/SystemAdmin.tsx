import React, { useState, useEffect } from 'react'
import { Settings, Users, Shield, Database, Monitor, Bell, Palette, Globe, Lock, Key, Activity, BarChart3, AlertTriangle, CheckCircle, Clock, Trash2, Edit, Plus, Download, Upload, RefreshCw, Eye, EyeOff } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'operator' | 'viewer'
  department: string
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: string
  permissions: string[]
  avatar: string
}

interface SystemConfig {
  id: string
  category: 'general' | 'security' | 'notifications' | 'integrations' | 'appearance'
  name: string
  description: string
  value: any
  type: 'boolean' | 'string' | 'number' | 'select' | 'json'
  options?: string[]
  sensitive?: boolean
}

interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  action: string
  module: string
  details: string
  ipAddress: string
  status: 'success' | 'failed' | 'warning'
}

const SystemAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [systemConfig, setSystemConfig] = useState<SystemConfig[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [activeTab, setActiveTab] = useState('users')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showCreateUser, setShowCreateUser] = useState(false)
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    loadUsers()
    loadSystemConfig()
    loadAuditLogs()
  }, [])

  const loadUsers = () => {
    const sampleUsers: User[] = [
      {
        id: 'user-001',
        name: 'Ahmed Al-Rashid',
        email: 'ahmed@azure-tobacco.com',
        role: 'admin',
        department: 'IT Administration',
        status: 'active',
        lastLogin: '2024-01-15T14:30:00Z',
        permissions: ['all'],
        avatar: '👨‍💼'
      },
      {
        id: 'user-002',
        name: 'Sarah Johnson',
        email: 'sarah@azure-tobacco.com',
        role: 'manager',
        department: 'Quality Control',
        status: 'active',
        lastLogin: '2024-01-15T13:45:00Z',
        permissions: ['quality_control', 'production_view', 'reports'],
        avatar: '👩‍🔬'
      },
      {
        id: 'user-003',
        name: 'Mohammed Hassan',
        email: 'mohammed@azure-tobacco.com',
        role: 'operator',
        department: 'Production',
        status: 'active',
        lastLogin: '2024-01-15T12:20:00Z',
        permissions: ['production', 'inventory_view'],
        avatar: '👨‍🏭'
      },
      {
        id: 'user-004',
        name: 'Lisa Chen',
        email: 'lisa@azure-tobacco.com',
        role: 'manager',
        department: 'Finance',
        status: 'active',
        lastLogin: '2024-01-15T11:15:00Z',
        permissions: ['financial_reports', 'client_management', 'analytics'],
        avatar: '👩‍💼'
      },
      {
        id: 'user-005',
        name: 'Omar Khalil',
        email: 'omar@azure-tobacco.com',
        role: 'operator',
        department: 'Warehouse',
        status: 'inactive',
        lastLogin: '2024-01-10T16:30:00Z',
        permissions: ['warehouse_process', 'shipping'],
        avatar: '👨‍🔧'
      },
      {
        id: 'user-006',
        name: 'Emma Wilson',
        email: 'emma@azure-tobacco.com',
        role: 'viewer',
        department: 'HR',
        status: 'suspended',
        lastLogin: '2024-01-08T09:45:00Z',
        permissions: ['hr_view', 'reports_view'],
        avatar: '👩‍💻'
      }
    ]
    setUsers(sampleUsers)
  }

  const loadSystemConfig = () => {
    const sampleConfig: SystemConfig[] = [
      {
        id: 'config-001',
        category: 'general',
        name: 'Company Name',
        description: 'Official company name displayed throughout the system',
        value: 'Azure Tobacco Industrial FZCO',
        type: 'string'
      },
      {
        id: 'config-002',
        category: 'general',
        name: 'Default Currency',
        description: 'Primary currency for financial calculations',
        value: 'AED',
        type: 'select',
        options: ['AED', 'USD', 'EUR', 'GBP', 'SGD']
      },
      {
        id: 'config-003',
        category: 'general',
        name: 'Business Hours',
        description: 'Standard operating hours for the facility',
        value: '08:00 - 18:00',
        type: 'string'
      },
      {
        id: 'config-004',
        category: 'security',
        name: 'Password Minimum Length',
        description: 'Minimum required password length for user accounts',
        value: 8,
        type: 'number'
      },
      {
        id: 'config-005',
        category: 'security',
        name: 'Session Timeout',
        description: 'Automatic logout time in minutes',
        value: 60,
        type: 'number'
      },
      {
        id: 'config-006',
        category: 'security',
        name: 'Two-Factor Authentication',
        description: 'Require 2FA for all user accounts',
        value: true,
        type: 'boolean'
      },
      {
        id: 'config-007',
        category: 'security',
        name: 'API Key',
        description: 'Master API key for external integrations',
        value: 'azure_api_key_2024_secure_token_xyz789',
        type: 'string',
        sensitive: true
      },
      {
        id: 'config-008',
        category: 'notifications',
        name: 'Email Notifications',
        description: 'Enable email notifications for system alerts',
        value: true,
        type: 'boolean'
      },
      {
        id: 'config-009',
        category: 'notifications',
        name: 'Low Stock Alert Threshold',
        description: 'Percentage threshold for low stock alerts',
        value: 20,
        type: 'number'
      },
      {
        id: 'config-010',
        category: 'notifications',
        name: 'Quality Alert Recipients',
        description: 'Email addresses for quality control alerts',
        value: 'quality@azure-tobacco.com,manager@azure-tobacco.com',
        type: 'string'
      },
      {
        id: 'config-011',
        category: 'integrations',
        name: 'SAP Integration',
        description: 'Enable SAP ERP integration',
        value: true,
        type: 'boolean'
      },
      {
        id: 'config-012',
        category: 'integrations',
        name: 'Sync Frequency',
        description: 'Data synchronization frequency',
        value: 'hourly',
        type: 'select',
        options: ['realtime', '15min', '30min', 'hourly', 'daily']
      },
      {
        id: 'config-013',
        category: 'appearance',
        name: 'Default Theme',
        description: 'Default theme for new users',
        value: 'dark',
        type: 'select',
        options: ['light', 'dark', 'auto']
      },
      {
        id: 'config-014',
        category: 'appearance',
        name: 'Brand Colors',
        description: 'Custom brand color configuration',
        value: '{"primary": "#4dd0e1", "secondary": "#26c6da", "accent": "#ffc107"}',
        type: 'json'
      }
    ]
    setSystemConfig(sampleConfig)
  }

  const loadAuditLogs = () => {
    const sampleLogs: AuditLog[] = [
      {
        id: 'log-001',
        timestamp: '2024-01-15T14:30:00Z',
        userId: 'user-001',
        userName: 'Ahmed Al-Rashid',
        action: 'User Login',
        module: 'Authentication',
        details: 'Successful login from admin dashboard',
        ipAddress: '192.168.1.100',
        status: 'success'
      },
      {
        id: 'log-002',
        timestamp: '2024-01-15T14:25:00Z',
        userId: 'user-002',
        userName: 'Sarah Johnson',
        action: 'Quality Test Created',
        module: 'Quality Control',
        details: 'Created moisture content test for batch B001',
        ipAddress: '192.168.1.105',
        status: 'success'
      },
      {
        id: 'log-003',
        timestamp: '2024-01-15T14:20:00Z',
        userId: 'user-003',
        userName: 'Mohammed Hassan',
        action: 'Production Batch Updated',
        module: 'Production',
        details: 'Updated batch B002 status to Quality Check',
        ipAddress: '192.168.1.110',
        status: 'success'
      },
      {
        id: 'log-004',
        timestamp: '2024-01-15T14:15:00Z',
        userId: 'user-006',
        userName: 'Emma Wilson',
        action: 'Failed Login Attempt',
        module: 'Authentication',
        details: 'Invalid password - account suspended',
        ipAddress: '192.168.1.120',
        status: 'failed'
      },
      {
        id: 'log-005',
        timestamp: '2024-01-15T14:10:00Z',
        userId: 'user-004',
        userName: 'Lisa Chen',
        action: 'Financial Report Generated',
        module: 'Reports',
        details: 'Generated monthly revenue report for December 2023',
        ipAddress: '192.168.1.115',
        status: 'success'
      },
      {
        id: 'log-006',
        timestamp: '2024-01-15T14:05:00Z',
        userId: 'user-001',
        userName: 'Ahmed Al-Rashid',
        action: 'System Configuration Changed',
        module: 'Administration',
        details: 'Updated session timeout from 30 to 60 minutes',
        ipAddress: '192.168.1.100',
        status: 'warning'
      }
    ]
    setAuditLogs(sampleLogs)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#ef4444'
      case 'manager': return '#f59e0b'
      case 'operator': return '#10b981'
      case 'viewer': return '#6b7280'
      default: return '#6b7280'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981'
      case 'inactive': return '#6b7280'
      case 'suspended': return '#ef4444'
      case 'success': return '#10b981'
      case 'failed': return '#ef4444'
      case 'warning': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ))
  }

  const updateConfigValue = (configId: string, newValue: any) => {
    setSystemConfig(prev => prev.map(config => 
      config.id === configId 
        ? { ...config, value: newValue }
        : config
    ))
  }

  const togglePasswordVisibility = (configId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [configId]: !prev[configId]
    }))
  }

  const exportSystemData = () => {
    const data = {
      users: users.map(u => ({ ...u, permissions: u.permissions })),
      config: systemConfig,
      auditLogs: auditLogs.slice(0, 100) // Last 100 logs
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `azure-erp-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const tabs = [
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'config', name: 'System Configuration', icon: Settings },
    { id: 'security', name: 'Security & Permissions', icon: Shield },
    { id: 'audit', name: 'Audit Logs', icon: Activity },
    { id: 'backup', name: 'Backup & Maintenance', icon: Database }
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
            <Settings size={32} style={{ marginRight: '12px', verticalAlign: 'middle', color: 'var(--azure-primary)' }} />
            System Administration
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Manage users, system configuration, and security settings
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={exportSystemData}
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
            <Download size={16} />
            Export Data
          </button>
          
          <button
            onClick={() => setShowCreateUser(true)}
            style={{
              background: 'transparent',
              border: '1px solid var(--azure-primary)',
              borderRadius: '8px',
              padding: '12px 20px',
              color: 'var(--azure-primary)',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus size={16} />
            Add User
          </button>
        </div>
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

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div>
          {/* User Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px', 
            marginBottom: '32px' 
          }}>
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'var(--text-primary)', margin: '0 0 8px 0', fontSize: '24px' }}>
                {users.filter(u => u.status === 'active').length}
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                Active Users
              </p>
            </div>
            
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'var(--text-primary)', margin: '0 0 8px 0', fontSize: '24px' }}>
                {users.filter(u => u.role === 'admin').length}
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                Administrators
              </p>
            </div>
            
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'var(--text-primary)', margin: '0 0 8px 0', fontSize: '24px' }}>
                {users.filter(u => u.status === 'suspended').length}
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                Suspended
              </p>
            </div>
            
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'var(--text-primary)', margin: '0 0 8px 0', fontSize: '24px' }}>
                {new Set(users.map(u => u.department)).size}
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                Departments
              </p>
            </div>
          </div>

          {/* Users Table */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
              <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>
                User Accounts
              </h2>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(77, 208, 225, 0.05)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500' }}>User</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500' }}>Role</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500' }}>Department</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500' }}>Last Login</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ fontSize: '24px' }}>{user.avatar}</div>
                          <div>
                            <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>
                              {user.name}
                            </div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          background: `${getRoleColor(user.role)}20`,
                          color: getRoleColor(user.role),
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500',
                          textTransform: 'capitalize'
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                        {user.department}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          background: `${getStatusColor(user.status)}20`,
                          color: getStatusColor(user.status),
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500',
                          textTransform: 'capitalize'
                        }}>
                          {user.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => setSelectedUser(user)}
                            style={{
                              background: 'transparent',
                              border: '1px solid var(--border-color)',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              color: 'var(--text-primary)',
                              fontSize: '11px',
                              cursor: 'pointer'
                            }}
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            style={{
                              background: user.status === 'active' ? '#f59e0b' : '#10b981',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              color: 'white',
                              fontSize: '11px',
                              cursor: 'pointer'
                            }}
                          >
                            {user.status === 'active' ? 'Suspend' : 'Activate'}
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

      {/* System Configuration Tab */}
      {activeTab === 'config' && (
        <div>
          {/* Configuration by Category */}
          {['general', 'security', 'notifications', 'integrations', 'appearance'].map(category => (
            <div key={category} style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              marginBottom: '24px',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
                <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px', textTransform: 'capitalize' }}>
                  {category} Settings
                </h2>
              </div>
              
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'grid', gap: '20px' }}>
                  {systemConfig.filter(config => config.category === category).map(config => (
                    <div key={config.id} style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 300px',
                      gap: '20px',
                      alignItems: 'center',
                      padding: '16px',
                      background: 'rgba(77, 208, 225, 0.05)',
                      borderRadius: '8px'
                    }}>
                      <div>
                        <h4 style={{ color: 'var(--text-primary)', margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
                          {config.name}
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px' }}>
                          {config.description}
                        </p>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {config.type === 'boolean' ? (
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={config.value}
                              onChange={(e) => updateConfigValue(config.id, e.target.checked)}
                              style={{ accentColor: 'var(--azure-primary)' }}
                            />
                            <span style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
                              {config.value ? 'Enabled' : 'Disabled'}
                            </span>
                          </label>
                        ) : config.type === 'select' ? (
                          <select
                            value={config.value}
                            onChange={(e) => updateConfigValue(config.id, e.target.value)}
                            style={{
                              padding: '8px 12px',
                              border: '1px solid var(--border-color)',
                              borderRadius: '6px',
                              background: 'var(--bg-dark)',
                              color: 'var(--text-primary)',
                              fontSize: '14px',
                              width: '100%'
                            }}
                          >
                            {config.options?.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : config.type === 'number' ? (
                          <input
                            type="number"
                            value={config.value}
                            onChange={(e) => updateConfigValue(config.id, parseInt(e.target.value))}
                            style={{
                              padding: '8px 12px',
                              border: '1px solid var(--border-color)',
                              borderRadius: '6px',
                              background: 'var(--bg-dark)',
                              color: 'var(--text-primary)',
                              fontSize: '14px',
                              width: '100%'
                            }}
                          />
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                            <input
                              type={config.sensitive && !showPasswords[config.id] ? 'password' : 'text'}
                              value={config.value}
                              onChange={(e) => updateConfigValue(config.id, e.target.value)}
                              style={{
                                padding: '8px 12px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                background: 'var(--bg-dark)',
                                color: 'var(--text-primary)',
                                fontSize: '14px',
                                flex: 1
                              }}
                            />
                            {config.sensitive && (
                              <button
                                onClick={() => togglePasswordVisibility(config.id)}
                                style={{
                                  background: 'transparent',
                                  border: '1px solid var(--border-color)',
                                  borderRadius: '4px',
                                  padding: '8px',
                                  color: 'var(--text-primary)',
                                  cursor: 'pointer'
                                }}
                              >
                                {showPasswords[config.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'audit' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px'
        }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>
              System Audit Logs
            </h2>
          </div>
          
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gap: '12px' }}>
              {auditLogs.map(log => (
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
                        {log.action}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px' }}>
                        {log.userName} • {log.module} • {new Date(log.timestamp).toLocaleString()}
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
                    {log.details}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    <span>IP: {log.ipAddress}</span>
                    <span>User ID: {log.userId}</span>
                  </div>
                </div>
              ))}
            </div>
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
            Advanced Security Settings
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Role-based permissions, API security, and compliance management
          </p>
        </div>
      )}

      {/* Backup Tab */}
      {activeTab === 'backup' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <Database size={48} style={{ color: 'var(--azure-primary)', marginBottom: '16px' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>
            Backup & Maintenance
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            System backups, data export/import, and maintenance schedules
          </p>
        </div>
      )}
    </div>
  )
}

export default SystemAdmin 