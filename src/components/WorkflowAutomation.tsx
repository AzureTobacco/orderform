import React, { useState, useEffect } from 'react'
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Activity,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Award,
  Shield,
  Thermometer,
  Beaker,
  Package,
  Truck,
  FileText,
  Calendar,
  Bell,
  Filter,
  Search
} from 'lucide-react'

interface Workflow {
  id: string
  name: string
  description: string
  category: 'tobacco-processing' | 'quality-control' | 'compliance' | 'inventory' | 'shipping' | 'maintenance'
  status: 'active' | 'inactive' | 'draft' | 'testing'
  trigger: 'manual' | 'scheduled' | 'event-based' | 'conditional'
  frequency?: string
  conditions: WorkflowCondition[]
  steps: WorkflowStep[]
  lastRun?: string
  nextRun?: string
  successRate: number
  totalRuns: number
  averageDuration: number
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface WorkflowCondition {
  id: string
  type: 'inventory' | 'quality' | 'time' | 'compliance' | 'production'
  operator: 'equals' | 'greater-than' | 'less-than' | 'contains' | 'not-equals'
  value: string | number
  field: string
  description: string
}

interface WorkflowStep {
  id: string
  name: string
  type: 'action' | 'approval' | 'notification' | 'data-collection' | 'integration'
  action: string
  parameters: Record<string, any>
  order: number
  required: boolean
  timeout?: number
  retryCount?: number
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped'
}

interface WorkflowExecution {
  id: string
  workflowId: string
  status: 'running' | 'completed' | 'failed' | 'cancelled'
  startTime: string
  endTime?: string
  duration?: number
  steps: WorkflowStepExecution[]
  triggeredBy: string
  notes?: string
}

interface WorkflowStepExecution {
  stepId: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped'
  startTime?: string
  endTime?: string
  duration?: number
  result?: any
  error?: string
}

const WorkflowAutomation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('workflows')
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [executions, setExecutions] = useState<WorkflowExecution[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddWorkflow, setShowAddWorkflow] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)

  // Tobacco-specific workflows
  const tobaccoWorkflows: Workflow[] = [
    {
      id: 'wf-001',
      name: 'Tobacco Quality Control Automation',
      description: 'Automated quality testing and compliance checking for tobacco batches',
      category: 'quality-control',
      status: 'active',
      trigger: 'event-based',
      conditions: [
        {
          id: 'cond-001',
          type: 'production',
          operator: 'equals',
          value: 'batch-completed',
          field: 'production.stage',
          description: 'Trigger when production batch is completed'
        }
      ],
      steps: [
        {
          id: 'step-001',
          name: 'Initiate Quality Tests',
          type: 'action',
          action: 'start-quality-tests',
          parameters: {
            testTypes: ['moisture', 'nicotine', 'ph', 'aroma'],
            batchId: '{{batch.id}}',
            priority: 'high'
          },
          order: 1,
          required: true,
          status: 'pending'
        },
        {
          id: 'step-002',
          name: 'Check Compliance Standards',
          type: 'action',
          action: 'check-compliance',
          parameters: {
            markets: ['UAE', 'GCC', 'EU'],
            batchId: '{{batch.id}}'
          },
          order: 2,
          required: true,
          status: 'pending'
        },
        {
          id: 'step-003',
          name: 'Generate Quality Report',
          type: 'action',
          action: 'generate-report',
          parameters: {
            reportType: 'quality-summary',
            recipients: ['quality-manager', 'production-manager']
          },
          order: 3,
          required: true,
          status: 'pending'
        }
      ],
      successRate: 98.5,
      totalRuns: 156,
      averageDuration: 45,
      createdBy: 'System Admin',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 'wf-002',
      name: 'Inventory Reorder Automation',
      description: 'Automated reorder triggers based on tobacco inventory levels',
      category: 'inventory',
      status: 'active',
      trigger: 'conditional',
      frequency: 'hourly',
      conditions: [
        {
          id: 'cond-002',
          type: 'inventory',
          operator: 'less-than',
          value: 'minStock',
          field: 'inventory.currentStock',
          description: 'Trigger when inventory falls below minimum stock'
        }
      ],
      steps: [
        {
          id: 'step-004',
          name: 'Check Supplier Availability',
          type: 'action',
          action: 'check-supplier-stock',
          parameters: {
            materialType: 'tobacco-leaf',
            suppliers: ['Premium Tobacco Suppliers LLC', 'Chemical Solutions DMCC']
          },
          order: 1,
          required: true,
          status: 'pending'
        },
        {
          id: 'step-005',
          name: 'Generate Purchase Order',
          type: 'action',
          action: 'create-purchase-order',
          parameters: {
            autoApprove: true,
            notifyPurchasing: true
          },
          order: 2,
          required: true,
          status: 'pending'
        },
        {
          id: 'step-006',
          name: 'Send Supplier Notification',
          type: 'notification',
          action: 'send-email',
          parameters: {
            template: 'purchase-order-notification',
            recipients: '{{supplier.email}}'
          },
          order: 3,
          required: false,
          status: 'pending'
        }
      ],
      successRate: 95.2,
      totalRuns: 89,
      averageDuration: 15,
      createdBy: 'Inventory Manager',
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-18T14:20:00Z'
    },
    {
      id: 'wf-003',
      name: 'Compliance Document Generation',
      description: 'Automated generation of compliance documents for export markets',
      category: 'compliance',
      status: 'active',
      trigger: 'scheduled',
      frequency: 'weekly',
      conditions: [
        {
          id: 'cond-003',
          type: 'time',
          operator: 'equals',
          value: 'monday',
          field: 'schedule.day',
          description: 'Trigger every Monday for weekly compliance reports'
        }
      ],
      steps: [
        {
          id: 'step-007',
          name: 'Collect Production Data',
          type: 'data-collection',
          action: 'gather-production-data',
          parameters: {
            dateRange: 'last-week',
            includeQuality: true,
            includeInventory: true
          },
          order: 1,
          required: true,
          status: 'pending'
        },
        {
          id: 'step-008',
          name: 'Generate Compliance Reports',
          type: 'action',
          action: 'generate-compliance-reports',
          parameters: {
            markets: ['UAE', 'GCC', 'EU'],
            reportTypes: ['weekly-summary', 'quality-compliance', 'inventory-status']
          },
          order: 2,
          required: true,
          status: 'pending'
        },
        {
          id: 'step-009',
          name: 'Submit to Regulatory Bodies',
          type: 'integration',
          action: 'submit-to-regulators',
          parameters: {
            platforms: ['ESMA', 'GSO', 'EU-Portal'],
            autoSubmit: true
          },
          order: 3,
          required: true,
          status: 'pending'
        }
      ],
      successRate: 99.1,
      totalRuns: 52,
      averageDuration: 120,
      createdBy: 'Compliance Officer',
      createdAt: '2024-01-10T00:00:00Z',
      updatedAt: '2024-01-20T09:15:00Z'
    },
    {
      id: 'wf-004',
      name: 'Production Scheduling Optimization',
      description: 'AI-powered production scheduling based on demand and resource availability',
      category: 'tobacco-processing',
      status: 'active',
      trigger: 'scheduled',
      frequency: 'daily',
      conditions: [
        {
          id: 'cond-004',
          type: 'time',
          operator: 'equals',
          value: '06:00',
          field: 'schedule.time',
          description: 'Trigger daily at 6 AM for production planning'
        }
      ],
      steps: [
        {
          id: 'step-010',
          name: 'Analyze Demand Forecast',
          type: 'action',
          action: 'analyze-demand',
          parameters: {
            forecastPeriod: '7-days',
            includeSeasonality: true,
            marketFactors: ['UAE', 'GCC', 'EU']
          },
          order: 1,
          required: true,
          status: 'pending'
        },
        {
          id: 'step-011',
          name: 'Check Resource Availability',
          type: 'action',
          action: 'check-resources',
          parameters: {
            resources: ['equipment', 'materials', 'labor'],
            includeMaintenance: true
          },
          order: 2,
          required: true,
          status: 'pending'
        },
        {
          id: 'step-012',
          name: 'Generate Optimal Schedule',
          type: 'action',
          action: 'optimize-schedule',
          parameters: {
            algorithm: 'ai-optimization',
            constraints: ['quality', 'compliance', 'efficiency'],
            outputFormat: 'production-schedule'
          },
          order: 3,
          required: true,
          status: 'pending'
        }
      ],
      successRate: 96.8,
      totalRuns: 365,
      averageDuration: 30,
      createdBy: 'Production Manager',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-21T06:00:00Z'
    }
  ]

  useEffect(() => {
    setWorkflows(tobaccoWorkflows)
    loadExecutions()
  }, [])

  const loadExecutions = () => {
    // Mock execution data
    const mockExecutions: WorkflowExecution[] = [
      {
        id: 'exec-001',
        workflowId: 'wf-001',
        status: 'completed',
        startTime: '2024-01-21T10:00:00Z',
        endTime: '2024-01-21T10:45:00Z',
        duration: 45,
        triggeredBy: 'System',
        steps: [
          {
            stepId: 'step-001',
            status: 'completed',
            startTime: '2024-01-21T10:00:00Z',
            endTime: '2024-01-21T10:15:00Z',
            duration: 15
          },
          {
            stepId: 'step-002',
            status: 'completed',
            startTime: '2024-01-21T10:15:00Z',
            endTime: '2024-01-21T10:30:00Z',
            duration: 15
          },
          {
            stepId: 'step-003',
            status: 'completed',
            startTime: '2024-01-21T10:30:00Z',
            endTime: '2024-01-21T10:45:00Z',
            duration: 15
          }
        ]
      }
    ]
    setExecutions(mockExecutions)
  }

  const getWorkflowStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981'
      case 'inactive': return '#6b7280'
      case 'draft': return '#f59e0b'
      case 'testing': return '#3b82f6'
      default: return '#6b7280'
    }
  }

  const getExecutionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981'
      case 'running': return '#3b82f6'
      case 'failed': return '#ef4444'
      case 'cancelled': return '#6b7280'
      default: return '#6b7280'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tobacco-processing': return <Thermometer size={20} />
      case 'quality-control': return <Beaker size={20} />
      case 'compliance': return <Shield size={20} />
      case 'inventory': return <Package size={20} />
      case 'shipping': return <Truck size={20} />
      case 'maintenance': return <Settings size={20} />
      default: return <Activity size={20} />
    }
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
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
            <Zap size={32} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
            Workflow Automation
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Automated tobacco manufacturing workflows and process optimization
          </p>
        </div>
        <button
          onClick={() => setShowAddWorkflow(true)}
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
          Create Workflow
        </button>
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '24px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '16px'
      }}>
        <button
          onClick={() => setActiveTab('workflows')}
          style={{
            background: activeTab === 'workflows' ? 'var(--azure-primary)' : 'transparent',
            color: activeTab === 'workflows' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          <Zap size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Workflows
        </button>
        <button
          onClick={() => setActiveTab('executions')}
          style={{
            background: activeTab === 'executions' ? 'var(--azure-primary)' : 'transparent',
            color: activeTab === 'executions' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          <Activity size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Executions
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          style={{
            background: activeTab === 'analytics' ? 'var(--azure-primary)' : 'transparent',
            color: activeTab === 'analytics' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          <BarChart3 size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Analytics
        </button>
      </div>

      {/* Content */}
      {activeTab === 'workflows' && (
        <div>
          {/* Filters */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <input
                type="text"
                placeholder="Search workflows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                padding: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                background: 'var(--bg-dark)',
                color: 'var(--text-primary)',
                minWidth: '150px'
              }}
            >
              <option value="all">All Categories</option>
              <option value="tobacco-processing">Tobacco Processing</option>
              <option value="quality-control">Quality Control</option>
              <option value="compliance">Compliance</option>
              <option value="inventory">Inventory</option>
              <option value="shipping">Shipping</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                background: 'var(--bg-dark)',
                color: 'var(--text-primary)',
                minWidth: '150px'
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
              <option value="testing">Testing</option>
            </select>
          </div>

          {/* Workflows Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
            gap: '20px' 
          }}>
            {workflows.map((workflow) => (
              <div key={workflow.id} style={{
                background: 'var(--card-bg)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {getCategoryIcon(workflow.category)}
                    <div>
                      <h3 style={{ 
                        color: 'var(--text-primary)', 
                        margin: '0 0 4px 0',
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        {workflow.name}
                      </h3>
                      <p style={{ 
                        color: 'var(--text-secondary)', 
                        margin: 0,
                        fontSize: '14px'
                      }}>
                        {workflow.description}
                      </p>
                    </div>
                  </div>
                  <div style={{
                    background: getWorkflowStatusColor(workflow.status),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {workflow.status}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Success Rate</span>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {workflow.successRate}%
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Runs</span>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {workflow.totalRuns}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Avg Duration</span>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {workflow.averageDuration}m
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Trigger</span>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {workflow.trigger}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Steps</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {workflow.steps.map((step, index) => (
                      <span key={step.id} style={{
                        background: 'var(--border-color)',
                        color: 'var(--text-secondary)',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px'
                      }}>
                        {index + 1}. {step.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #059669, #10b981)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Play size={14} />
                    Run Now
                  </button>
                  <button
                    onClick={() => setSelectedWorkflow(workflow)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    View Details
                  </button>
                  <button
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    <Edit size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'executions' && (
        <div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
            gap: '20px' 
          }}>
            {executions.map((execution) => {
              const workflow = workflows.find(w => w.id === execution.workflowId)
              return (
                <div key={execution.id} style={{
                  background: 'var(--card-bg)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ 
                        color: 'var(--text-primary)', 
                        margin: '0 0 4px 0',
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        {workflow?.name || 'Unknown Workflow'}
                      </h3>
                      <p style={{ 
                        color: 'var(--text-secondary)', 
                        margin: 0,
                        fontSize: '14px'
                      }}>
                        Execution ID: {execution.id}
                      </p>
                    </div>
                    <div style={{
                      background: getExecutionStatusColor(execution.status),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {execution.status}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Start Time</span>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                        {new Date(execution.startTime).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Duration</span>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                        {execution.duration}m
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Triggered By</span>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                        {execution.triggeredBy}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Steps</span>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                        {execution.steps.length}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Step Status</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                      {execution.steps.map((step, index) => (
                        <span key={step.stepId} style={{
                          background: getExecutionStatusColor(step.status),
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '11px'
                        }}>
                          {index + 1}. {step.status}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      View Logs
                    </button>
                    <button
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Download Report
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
                Workflow Performance
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Workflows</span>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {workflows.length}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Active Workflows</span>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: '#10b981' }}>
                    {workflows.filter(w => w.status === 'active').length}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Avg Success Rate</span>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {Math.round(workflows.reduce((acc, w) => acc + w.successRate, 0) / workflows.length)}%
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Executions</span>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {executions.length}
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
                Category Distribution
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['tobacco-processing', 'quality-control', 'compliance', 'inventory'].map(category => {
                  const count = workflows.filter(w => w.category === category).length
                  return (
                    <div key={category} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {category.replace('-', ' ')}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          background: 'var(--border-color)',
                          width: '100px',
                          height: '8px',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            background: 'linear-gradient(135deg, var(--azure-primary), var(--azure-secondary))',
                            height: '100%',
                            width: `${(count / workflows.length) * 100}%`
                          }} />
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                          {count}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkflowAutomation 