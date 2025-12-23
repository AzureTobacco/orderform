import React, { useState, useEffect } from 'react'
import { Play, Pause, Settings, Zap, Clock, CheckCircle, AlertCircle, BarChart3, Users, Package, DollarSign, Target, ArrowRight, Plus, Edit, Trash2, TrendingUp, AlertTriangle } from 'lucide-react'

interface Workflow {
  id: string
  name: string
  description: string
  trigger: 'schedule' | 'event' | 'manual'
  status: 'active' | 'paused' | 'draft'
  lastRun: string
  nextRun?: string
  successRate: number
  steps: WorkflowStep[]
  category: 'production' | 'quality' | 'inventory' | 'sales' | 'hr'
}

interface WorkflowStep {
  id: string
  name: string
  type: 'condition' | 'action' | 'notification' | 'approval'
  config: any
  status: 'pending' | 'running' | 'completed' | 'failed'
}

const AutomationCenter: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    loadWorkflows()
  }, [])

  const loadWorkflows = () => {
    const sampleWorkflows: Workflow[] = [
      {
        id: 'wf-001',
        name: 'Low Stock Alert & Reorder',
        description: 'Automatically monitor inventory levels and trigger reorder process',
        trigger: 'event',
        status: 'active',
        lastRun: '2024-01-15T10:30:00Z',
        nextRun: 'Real-time monitoring',
        successRate: 98.5,
        category: 'inventory',
        steps: [
          { id: 's1', name: 'Check Stock Levels', type: 'condition', config: { threshold: 'minStock' }, status: 'completed' },
          { id: 's2', name: 'Send Alert', type: 'notification', config: { recipients: ['inventory@azure.com'] }, status: 'completed' },
          { id: 's3', name: 'Create Purchase Order', type: 'action', config: { autoApprove: false }, status: 'pending' }
        ]
      },
      {
        id: 'wf-002',
        name: 'Quality Control Batch Testing',
        description: 'Automated quality testing workflow for production batches',
        trigger: 'event',
        status: 'active',
        lastRun: '2024-01-15T14:20:00Z',
        successRate: 95.2,
        category: 'quality',
        steps: [
          { id: 's1', name: 'Batch Completion Check', type: 'condition', config: { stage: 'completed' }, status: 'completed' },
          { id: 's2', name: 'Schedule QC Tests', type: 'action', config: { tests: ['moisture', 'nicotine', 'pH'] }, status: 'running' },
          { id: 's3', name: 'Generate QC Report', type: 'action', config: { template: 'standard' }, status: 'pending' }
        ]
      },
      {
        id: 'wf-003',
        name: 'Monthly Financial Reports',
        description: 'Generate and distribute monthly financial reports',
        trigger: 'schedule',
        status: 'active',
        lastRun: '2024-01-01T09:00:00Z',
        nextRun: '2024-02-01T09:00:00Z',
        successRate: 100,
        category: 'sales',
        steps: [
          { id: 's1', name: 'Collect Financial Data', type: 'action', config: { period: 'monthly' }, status: 'completed' },
          { id: 's2', name: 'Generate Reports', type: 'action', config: { formats: ['PDF', 'Excel'] }, status: 'completed' },
          { id: 's3', name: 'Email to Stakeholders', type: 'notification', config: { recipients: ['finance@azure.com'] }, status: 'completed' }
        ]
      },
      {
        id: 'wf-004',
        name: 'Employee Onboarding',
        description: 'Automated new employee onboarding process',
        trigger: 'manual',
        status: 'active',
        lastRun: '2024-01-10T11:00:00Z',
        successRate: 92.8,
        category: 'hr',
        steps: [
          { id: 's1', name: 'Create Employee Profile', type: 'action', config: { template: 'standard' }, status: 'completed' },
          { id: 's2', name: 'Send Welcome Package', type: 'notification', config: { template: 'welcome' }, status: 'completed' },
          { id: 's3', name: 'Schedule Orientation', type: 'action', config: { duration: '2 days' }, status: 'completed' },
          { id: 's4', name: 'Manager Approval', type: 'approval', config: { approver: 'direct_manager' }, status: 'pending' }
        ]
      },
      {
        id: 'wf-005',
        name: 'Production Efficiency Optimization',
        description: 'Monitor and optimize production line efficiency',
        trigger: 'schedule',
        status: 'paused',
        lastRun: '2024-01-14T16:00:00Z',
        nextRun: '2024-01-16T16:00:00Z',
        successRate: 87.3,
        category: 'production',
        steps: [
          { id: 's1', name: 'Analyze Production Data', type: 'action', config: { metrics: ['efficiency', 'throughput'] }, status: 'completed' },
          { id: 's2', name: 'Identify Bottlenecks', type: 'condition', config: { threshold: 85 }, status: 'failed' },
          { id: 's3', name: 'Suggest Optimizations', type: 'action', config: { ai_enabled: true }, status: 'pending' }
        ]
      }
    ]
    setWorkflows(sampleWorkflows)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981'
      case 'paused': return '#f59e0b'
      case 'draft': return '#6b7280'
      case 'running': return '#3b82f6'
      case 'completed': return '#10b981'
      case 'failed': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'production': return Package
      case 'quality': return CheckCircle
      case 'inventory': return BarChart3
      case 'sales': return DollarSign
      case 'hr': return Users
      default: return Target
    }
  }

  const toggleWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(wf => 
      wf.id === workflowId 
        ? { ...wf, status: wf.status === 'active' ? 'paused' : 'active' }
        : wf
    ))
  }

  const runWorkflow = (workflowId: string) => {
    console.log('Running workflow:', workflowId)
    // Implement workflow execution
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'workflows', name: 'Workflows', icon: Zap },
    { id: 'analytics', name: 'Analytics', icon: Target },
    { id: 'settings', name: 'Settings', icon: Settings }
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
            <Zap size={32} style={{ marginRight: '12px', verticalAlign: 'middle', color: 'var(--azure-primary)' }} />
            Automation Center
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Streamline business processes with intelligent automation
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
          Create Workflow
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
                  <Zap size={24} style={{ color: 'var(--azure-primary)' }} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                    {workflows.filter(w => w.status === 'active').length}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                    Active Workflows
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
                  <CheckCircle size={24} style={{ color: '#10b981' }} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                    {Math.round(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length)}%
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                    Success Rate
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
                  <Clock size={24} style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                    2.4h
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                    Time Saved Daily
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
                  background: 'rgba(245, 158, 11, 0.2)',
                  padding: '12px',
                  borderRadius: '8px'
                }}>
                  <Target size={24} style={{ color: '#f59e0b' }} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                    87%
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                    Process Efficiency
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontSize: '20px' }}>
              Recent Workflow Activity
            </h2>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {workflows.slice(0, 3).map(workflow => (
                <div key={workflow.id} style={{
                  background: 'rgba(77, 208, 225, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: getStatusColor(workflow.status)
                    }} />
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                        {workflow.name}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px' }}>
                        Last run: {new Date(workflow.lastRun).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      color: workflow.successRate > 95 ? '#10b981' : workflow.successRate > 85 ? '#f59e0b' : '#ef4444',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {workflow.successRate}%
                    </span>
                    <button
                      onClick={() => runWorkflow(workflow.id)}
                      style={{
                        background: 'var(--azure-primary)',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        color: 'white',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      <Play size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Workflows Tab */}
      {activeTab === 'workflows' && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '24px' 
        }}>
          {workflows.map(workflow => {
            const CategoryIcon = getCategoryIcon(workflow.category)
            return (
              <div key={workflow.id} style={{
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
                  background: `${getStatusColor(workflow.status)}20`,
                  color: getStatusColor(workflow.status),
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                }}>
                  {workflow.status}
                </div>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    background: 'rgba(77, 208, 225, 0.2)',
                    padding: '12px',
                    borderRadius: '8px'
                  }}>
                    <CategoryIcon size={20} style={{ color: 'var(--azure-primary)' }} />
                  </div>
                  <div>
                    <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '16px', fontWeight: '600' }}>
                      {workflow.name}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px' }}>
                      {workflow.description}
                    </p>
                  </div>
                </div>

                {/* Steps */}
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: 'var(--text-primary)', margin: '0 0 8px 0', fontSize: '14px' }}>
                    Workflow Steps
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {workflow.steps.map((step, index) => (
                      <React.Fragment key={step.id}>
                        <div style={{
                          background: `${getStatusColor(step.status)}20`,
                          border: `1px solid ${getStatusColor(step.status)}`,
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '11px',
                          color: getStatusColor(step.status),
                          fontWeight: '500'
                        }}>
                          {step.name}
                        </div>
                        {index < workflow.steps.length - 1 && (
                          <ArrowRight size={12} style={{ color: 'var(--text-secondary)' }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '12px', 
                  marginBottom: '16px' 
                }}>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '11px' }}>
                      Success Rate
                    </p>
                    <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                      {workflow.successRate}%
                    </p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '11px' }}>
                      Last Run
                    </p>
                    <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                      {new Date(workflow.lastRun).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => toggleWorkflow(workflow.id)}
                    style={{
                      background: workflow.status === 'active' ? '#f59e0b' : '#10b981',
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
                    {workflow.status === 'active' ? <Pause size={12} /> : <Play size={12} />}
                    {workflow.status === 'active' ? 'Pause' : 'Activate'}
                  </button>
                  
                  <button
                    onClick={() => setSelectedWorkflow(workflow)}
                    style={{
                      background: 'var(--azure-primary)',
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
                    <Edit size={12} />
                    Edit
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'grid', gap: '24px' }}>
          {/* Analytics Overview Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  padding: '8px',
                  borderRadius: '50%'
                }}>
                  <TrendingUp size={20} style={{ color: '#10b981' }} />
                </div>
                <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                  Total Executions
                </h3>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {workflows.reduce((sum, w) => sum + Math.floor(Math.random() * 100) + 50, 0)}
              </div>
              <div style={{ fontSize: '12px', color: '#10b981' }}>
                +23% vs last month
              </div>
            </div>

            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  background: 'rgba(77, 208, 225, 0.2)',
                  padding: '8px',
                  borderRadius: '50%'
                }}>
                  <BarChart3 size={20} style={{ color: 'var(--azure-primary)' }} />
                </div>
                <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                  Success Rate
                </h3>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {Math.round(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length)}%
              </div>
              <div style={{ fontSize: '12px', color: '#10b981' }}>
                +5% vs last month
              </div>
            </div>

            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  background: 'rgba(245, 158, 11, 0.2)',
                  padding: '8px',
                  borderRadius: '50%'
                }}>
                  <Clock size={20} style={{ color: '#f59e0b' }} />
                </div>
                <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                  Avg. Runtime
                </h3>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>
                2.4min
              </div>
              <div style={{ fontSize: '12px', color: '#10b981' }}>
                -15s vs last month
              </div>
            </div>

            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  padding: '8px',
                  borderRadius: '50%'
                }}>
                  <AlertTriangle size={20} style={{ color: '#ef4444' }} />
                </div>
                <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                  Failed Runs
                </h3>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {workflows.filter(w => w.successRate < 90).length}
              </div>
              <div style={{ fontSize: '12px', color: '#ef4444' }}>
                2 workflows need attention
              </div>
            </div>
          </div>

          {/* Workflow Performance Chart */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
              📊 Workflow Performance Over Time
            </h3>
            <div style={{ 
              height: '200px', 
              background: 'rgba(77, 208, 225, 0.05)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed rgba(77, 208, 225, 0.3)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <BarChart3 size={48} style={{ color: 'var(--azure-primary)', marginBottom: '8px' }} />
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                  Interactive performance charts showing execution trends, success rates, and optimization opportunities
                </p>
              </div>
            </div>
          </div>

          {/* Category Performance */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
                📈 Performance by Category
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {['production', 'quality', 'inventory', 'sales', 'hr'].map(category => {
                  const categoryWorkflows = workflows.filter(w => w.category === category)
                  const avgSuccess = categoryWorkflows.length > 0 
                    ? Math.round(categoryWorkflows.reduce((sum, w) => sum + w.successRate, 0) / categoryWorkflows.length)
                    : 0
                  const CategoryIcon = getCategoryIcon(category)
                  
                  return (
                    <div key={category} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      background: 'rgba(77, 208, 225, 0.05)',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CategoryIcon size={16} style={{ color: 'var(--azure-primary)' }} />
                        <span style={{ color: 'var(--text-primary)', fontSize: '14px', textTransform: 'capitalize' }}>
                          {category}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                          {categoryWorkflows.length} workflows
                        </span>
                        <span style={{ 
                          color: avgSuccess >= 90 ? '#10b981' : avgSuccess >= 70 ? '#f59e0b' : '#ef4444',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {avgSuccess}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
                🔍 Recent Activity
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {workflows.slice(0, 5).map((workflow, index) => {
                  const timeAgo = ['2 minutes ago', '15 minutes ago', '1 hour ago', '3 hours ago', '1 day ago'][index]
                  const status = ['completed', 'completed', 'failed', 'completed', 'completed'][index]
                  
                  return (
                    <div key={workflow.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px',
                      borderRadius: '6px',
                      background: status === 'failed' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: status === 'failed' ? '#ef4444' : '#10b981'
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: '500' }}>
                          {workflow.name}
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                          {status === 'failed' ? 'Failed' : 'Completed'} • {timeAgo}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Optimization Recommendations */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
              💡 Optimization Recommendations
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                {
                  title: 'Optimize Inventory Reorder Workflow',
                  description: 'Current success rate: 85%. Consider adding supplier availability check.',
                  priority: 'medium',
                  impact: 'High'
                },
                {
                  title: 'Reduce Quality Check Runtime',
                  description: 'Average runtime is 4.2 minutes. Parallel processing could reduce to 2.1 minutes.',
                  priority: 'low',
                  impact: 'Medium'
                },
                {
                  title: 'Add Backup Notification Channel',
                  description: 'Email notifications have 12% failure rate. Consider SMS backup.',
                  priority: 'high',
                  impact: 'High'
                }
              ].map((rec, index) => (
                <div key={index} style={{
                  padding: '16px',
                  background: 'rgba(77, 208, 225, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(77, 208, 225, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: rec.priority === 'high' ? '#ef4444' : rec.priority === 'medium' ? '#f59e0b' : '#10b981',
                      marginTop: '6px'
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        color: 'var(--text-primary)', 
                        fontSize: '14px', 
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}>
                        {rec.title}
                      </div>
                      <div style={{ 
                        color: 'var(--text-secondary)', 
                        fontSize: '12px',
                        marginBottom: '8px'
                      }}>
                        {rec.description}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{
                          background: rec.priority === 'high' ? 'rgba(239, 68, 68, 0.2)' : 
                                    rec.priority === 'medium' ? 'rgba(245, 158, 11, 0.2)' : 
                                    'rgba(16, 185, 129, 0.2)',
                          color: rec.priority === 'high' ? '#ef4444' : 
                                rec.priority === 'medium' ? '#f59e0b' : '#10b981',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '500',
                          textTransform: 'uppercase'
                        }}>
                          {rec.priority} priority
                        </span>
                        <span style={{
                          background: 'rgba(77, 208, 225, 0.2)',
                          color: 'var(--azure-primary)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '500'
                        }}>
                          {rec.impact} impact
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <Settings size={48} style={{ color: 'var(--azure-primary)', marginBottom: '16px' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>
            Automation Settings
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Configure global automation preferences and integrations
          </p>
        </div>
      )}
    </div>
  )
}

export default AutomationCenter 