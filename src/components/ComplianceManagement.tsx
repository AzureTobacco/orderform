import React, { useState, useEffect } from 'react'

// Theme hook for accessing current theme
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

interface ComplianceRequirement {
  id: string
  title: string
  description: string
  category: 'regulatory' | 'quality' | 'safety' | 'environmental' | 'financial'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'compliant' | 'non-compliant' | 'pending' | 'under-review'
  dueDate: string
  lastReviewed: string
  nextReview: string
  assignedTo: string
  documents: ComplianceDocument[]
  actions: ComplianceAction[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

interface ComplianceDocument {
  id: string
  name: string
  type: 'certificate' | 'license' | 'permit' | 'report' | 'policy'
  uploadDate: string
  expiryDate?: string
  status: 'valid' | 'expired' | 'expiring-soon'
  fileSize: string
  uploadedBy: string
}

interface ComplianceAction {
  id: string
  description: string
  type: 'corrective' | 'preventive' | 'improvement'
  status: 'open' | 'in-progress' | 'completed' | 'overdue'
  assignedTo: string
  dueDate: string
  completedDate?: string
  notes: string
}

interface Audit {
  id: string
  title: string
  type: 'internal' | 'external' | 'regulatory' | 'customer'
  auditor: string
  startDate: string
  endDate: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  scope: string[]
  findings: AuditFinding[]
  overallRating: 'excellent' | 'good' | 'satisfactory' | 'needs-improvement' | 'unsatisfactory'
  nextAudit?: string
}

interface AuditFinding {
  id: string
  category: string
  severity: 'minor' | 'major' | 'critical'
  description: string
  recommendation: string
  status: 'open' | 'in-progress' | 'closed'
  assignedTo: string
  dueDate: string
}

const ComplianceManagement: React.FC = () => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [requirements, setRequirements] = useState<ComplianceRequirement[]>([])
  const [audits, setAudits] = useState<Audit[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddCompliance, setShowAddCompliance] = useState(false)

  // Load sample data
  useEffect(() => {
    loadComplianceData()
    loadAuditData()
  }, [])

  const loadComplianceData = () => {
    const sampleRequirements: ComplianceRequirement[] = [
      {
        id: 'comp-001',
        title: 'FDA Tobacco Manufacturing License',
        description: 'Federal license required for tobacco product manufacturing and distribution',
        category: 'regulatory',
        priority: 'critical',
        status: 'compliant',
        dueDate: '2024-12-31',
        lastReviewed: '2024-01-15',
        nextReview: '2024-06-15',
        assignedTo: 'Legal Team',
        riskLevel: 'high',
        documents: [
          {
            id: 'doc-001',
            name: 'FDA Manufacturing License 2024',
            type: 'license',
            uploadDate: '2024-01-01',
            expiryDate: '2024-12-31',
            status: 'valid',
            fileSize: '2.3 MB',
            uploadedBy: 'Sarah Johnson'
          }
        ],
        actions: [
          {
            id: 'act-001',
            description: 'Prepare renewal documentation',
            type: 'preventive',
            status: 'in-progress',
            assignedTo: 'Legal Team',
            dueDate: '2024-10-01',
            notes: 'Renewal process started early to ensure continuity'
          }
        ]
      },
      // TOBACCO-SPECIFIC COMPLIANCE REQUIREMENTS
      {
        id: 'comp-tobacco-001',
        title: 'UAE Tobacco Control Law Compliance',
        description: 'Compliance with UAE Federal Law No. 15 of 2009 on Tobacco Control and its amendments',
        category: 'regulatory',
        priority: 'critical',
        status: 'compliant',
        dueDate: '2024-12-31',
        lastReviewed: '2024-01-10',
        nextReview: '2024-07-10',
        assignedTo: 'Compliance Officer',
        riskLevel: 'critical',
        documents: [
          {
            id: 'doc-tobacco-001',
            name: 'UAE Tobacco Control Compliance Certificate',
            type: 'certificate',
            uploadDate: '2024-01-01',
            expiryDate: '2024-12-31',
            status: 'valid',
            fileSize: '1.5 MB',
            uploadedBy: 'Ahmed Al Mansouri'
          }
        ],
        actions: [
          {
            id: 'act-tobacco-001',
            description: 'Quarterly compliance audit for tobacco product labeling',
            type: 'preventive',
            status: 'in-progress',
            assignedTo: 'Quality Team',
            dueDate: '2024-03-31',
            notes: 'Ensuring all packaging meets UAE labeling requirements'
          }
        ]
      },
      {
        id: 'comp-tobacco-002',
        title: 'Jebel Ali Free Zone Manufacturing License',
        description: 'Free zone manufacturing license for tobacco products export',
        category: 'regulatory',
        priority: 'critical',
        status: 'compliant',
        dueDate: '2025-01-31',
        lastReviewed: '2024-01-05',
        nextReview: '2024-07-05',
        assignedTo: 'Legal Team',
        riskLevel: 'critical',
        documents: [
          {
            id: 'doc-tobacco-002',
            name: 'JAFZA Manufacturing License 2024',
            type: 'license',
            uploadDate: '2024-01-01',
            expiryDate: '2025-01-31',
            status: 'valid',
            fileSize: '3.2 MB',
            uploadedBy: 'Legal Team'
          }
        ],
        actions: [
          {
            id: 'act-tobacco-002',
            description: 'Prepare annual free zone compliance report',
            type: 'preventive',
            status: 'open',
            assignedTo: 'Legal Team',
            dueDate: '2024-11-30',
            notes: 'Annual report required for JAFZA license renewal'
          }
        ]
      },
      {
        id: 'comp-tobacco-003',
        title: 'GCC Standardization Organization (GSO) Compliance',
        description: 'Compliance with GCC Standard No. GSO 2460/2020 for Tobacco Products',
        category: 'regulatory',
        priority: 'high',
        status: 'compliant',
        dueDate: '2024-12-31',
        lastReviewed: '2024-01-12',
        nextReview: '2024-07-12',
        assignedTo: 'Quality Team',
        riskLevel: 'high',
        documents: [
          {
            id: 'doc-tobacco-003',
            name: 'GSO Tobacco Products Certificate',
            type: 'certificate',
            uploadDate: '2024-01-01',
            expiryDate: '2024-12-31',
            status: 'valid',
            fileSize: '2.1 MB',
            uploadedBy: 'Quality Team'
          }
        ],
        actions: [
          {
            id: 'act-tobacco-003',
            description: 'Update product specifications to meet latest GSO standards',
            type: 'corrective',
            status: 'in-progress',
            assignedTo: 'Quality Team',
            dueDate: '2024-02-28',
            notes: 'Implementing new GSO requirements for nicotine content labeling'
          }
        ]
      },
      {
        id: 'comp-tobacco-004',
        title: 'ESMA Tobacco Product Registration',
        description: 'Emirates Authority for Standardization & Metrology tobacco product registration',
        category: 'regulatory',
        priority: 'high',
        status: 'pending',
        dueDate: '2024-03-31',
        lastReviewed: '2024-01-15',
        nextReview: '2024-04-15',
        assignedTo: 'Regulatory Affairs',
        riskLevel: 'high',
        documents: [
          {
            id: 'doc-tobacco-004',
            name: 'ESMA Registration Application',
            type: 'report',
            uploadDate: '2024-01-15',
            status: 'valid',
            fileSize: '4.7 MB',
            uploadedBy: 'Regulatory Affairs'
          }
        ],
        actions: [
          {
            id: 'act-tobacco-004',
            description: 'Complete ESMA product testing requirements',
            type: 'corrective',
            status: 'in-progress',
            assignedTo: 'Quality Team',
            dueDate: '2024-02-15',
            notes: 'Laboratory testing for nicotine and tar content analysis'
          }
        ]
      },
      {
        id: 'comp-tobacco-005',
        title: 'EU Tobacco Products Directive (TPD) Compliance',
        description: 'Compliance with EU Directive 2014/40/EU for tobacco products export to EU markets',
        category: 'regulatory',
        priority: 'high',
        status: 'compliant',
        dueDate: '2024-12-31',
        lastReviewed: '2024-01-08',
        nextReview: '2024-07-08',
        assignedTo: 'Export Compliance',
        riskLevel: 'high',
        documents: [
          {
            id: 'doc-tobacco-005',
            name: 'EU TPD Compliance Certificate',
            type: 'certificate',
            uploadDate: '2024-01-01',
            expiryDate: '2024-12-31',
            status: 'valid',
            fileSize: '2.8 MB',
            uploadedBy: 'Export Compliance'
          }
        ],
        actions: [
          {
            id: 'act-tobacco-005',
            description: 'Update EU market product notifications',
            type: 'preventive',
            status: 'open',
            assignedTo: 'Export Compliance',
            dueDate: '2024-06-30',
            notes: 'Annual notification update for EU tobacco products'
          }
        ]
      },
      {
        id: 'comp-002',
        title: 'ISO 9001:2015 Quality Management',
        description: 'International standard for quality management systems',
        category: 'quality',
        priority: 'high',
        status: 'compliant',
        dueDate: '2025-03-15',
        lastReviewed: '2024-01-10',
        nextReview: '2024-07-10',
        assignedTo: 'Quality Team',
        riskLevel: 'medium',
        documents: [
          {
            id: 'doc-002',
            name: 'ISO 9001 Certificate',
            type: 'certificate',
            uploadDate: '2023-03-15',
            expiryDate: '2025-03-15',
            status: 'valid',
            fileSize: '1.8 MB',
            uploadedBy: 'Ana Lopez'
          }
        ],
        actions: []
      },
      {
        id: 'comp-003',
        title: 'OSHA Workplace Safety Standards',
        description: 'Occupational safety and health administration compliance',
        category: 'safety',
        priority: 'high',
        status: 'pending',
        dueDate: '2024-02-01',
        lastReviewed: '2023-12-01',
        nextReview: '2024-02-01',
        assignedTo: 'Safety Officer',
        riskLevel: 'high',
        documents: [
          {
            id: 'doc-003',
            name: 'Safety Training Records',
            type: 'report',
            uploadDate: '2024-01-01',
            status: 'valid',
            fileSize: '5.2 MB',
            uploadedBy: 'Mike Chen'
          }
        ],
        actions: [
          {
            id: 'act-002',
            description: 'Complete quarterly safety inspection',
            type: 'corrective',
            status: 'overdue',
            assignedTo: 'Safety Officer',
            dueDate: '2024-01-31',
            notes: 'Inspection delayed due to equipment maintenance'
          }
        ]
      },
      {
        id: 'comp-004',
        title: 'Environmental Impact Assessment',
        description: 'Annual environmental compliance and impact reporting',
        category: 'environmental',
        priority: 'medium',
        status: 'under-review',
        dueDate: '2024-03-31',
        lastReviewed: '2023-12-15',
        nextReview: '2024-03-31',
        assignedTo: 'Environmental Team',
        riskLevel: 'low',
        documents: [
          {
            id: 'doc-004',
            name: 'Environmental Impact Report 2023',
            type: 'report',
            uploadDate: '2023-12-15',
            status: 'valid',
            fileSize: '8.7 MB',
            uploadedBy: 'Environmental Team'
          }
        ],
        actions: [
          {
            id: 'act-003',
            description: 'Update waste management procedures',
            type: 'improvement',
            status: 'in-progress',
            assignedTo: 'Environmental Team',
            dueDate: '2024-02-15',
            notes: 'Implementing new recycling protocols'
          }
        ]
      }
    ]
    setRequirements(sampleRequirements)
  }

  const loadAuditData = () => {
    const sampleAudits: Audit[] = [
      {
        id: 'audit-001',
        title: 'Annual Quality Management Audit',
        type: 'external',
        auditor: 'ISO Certification Body',
        startDate: '2024-02-15',
        endDate: '2024-02-17',
        status: 'scheduled',
        scope: ['Quality Management', 'Production Processes', 'Documentation'],
        overallRating: 'good',
        findings: [
          {
            id: 'find-001',
            category: 'Documentation',
            severity: 'minor',
            description: 'Some quality records missing signatures',
            recommendation: 'Implement digital signature system',
            status: 'open',
            assignedTo: 'Quality Team',
            dueDate: '2024-03-01'
          }
        ],
        nextAudit: '2025-02-15'
      },
      {
        id: 'audit-002',
        title: 'FDA Regulatory Inspection',
        type: 'regulatory',
        auditor: 'FDA Inspector',
        startDate: '2023-11-20',
        endDate: '2023-11-22',
        status: 'completed',
        scope: ['Manufacturing Processes', 'Quality Control', 'Record Keeping'],
        overallRating: 'excellent',
        findings: [],
        nextAudit: '2024-11-20'
      },
      {
        id: 'audit-003',
        title: 'Internal Safety Audit',
        type: 'internal',
        auditor: 'Internal Audit Team',
        startDate: '2024-01-10',
        endDate: '2024-01-12',
        status: 'completed',
        scope: ['Workplace Safety', 'Emergency Procedures', 'Training Records'],
        overallRating: 'satisfactory',
        findings: [
          {
            id: 'find-002',
            category: 'Safety Equipment',
            severity: 'major',
            description: 'Fire extinguisher inspection overdue',
            recommendation: 'Establish monthly inspection schedule',
            status: 'closed',
            assignedTo: 'Safety Officer',
            dueDate: '2024-01-25'
          }
        ]
      }
    ]
    setAudits(sampleAudits)
  }

  const handleAddCompliance = (complianceData: Omit<ComplianceRequirement, 'id' | 'lastReviewed' | 'documents' | 'actions'>) => {
    const newCompliance: ComplianceRequirement = {
      ...complianceData,
      id: `comp-${Date.now()}`,
      lastReviewed: new Date().toISOString().split('T')[0],
      documents: [],
      actions: []
    }
    
    setRequirements(prev => [...prev, newCompliance])
    setShowAddCompliance(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return '#10b981'
      case 'non-compliant': return '#ef4444'
      case 'pending': return '#f59e0b'
      case 'under-review': return '#8b5cf6'
      default: return '#6b7280'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'high': return '#ef4444'
      case 'critical': return '#dc2626'
      default: return '#6b7280'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'high': return '#ef4444'
      case 'critical': return '#dc2626'
      default: return '#6b7280'
    }
  }

  const getAuditStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return '#3b82f6'
      case 'in-progress': return '#f59e0b'
      case 'completed': return '#10b981'
      case 'cancelled': return '#6b7280'
      default: return '#6b7280'
    }
  }

  // Calculate metrics
  const totalRequirements = requirements.length
  const compliantRequirements = requirements.filter(req => req.status === 'compliant').length
  const overdue = requirements.filter(req => new Date(req.dueDate) < new Date() && req.status !== 'compliant').length
  const highRisk = requirements.filter(req => req.riskLevel === 'high' || req.riskLevel === 'critical').length
  const complianceRate = totalRequirements > 0 ? (compliantRequirements / totalRequirements * 100).toFixed(1) : '0'

  // Overview Tab
  const renderOverview = () => (
    <div style={{ padding: '2rem' }}>
      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: theme.secondary,
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#10b981', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
            ✅ Compliance Rate
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: theme.textLight, marginBottom: '0.5rem' }}>
            {complianceRate}%
          </div>
          <div style={{ color: theme.text, fontSize: '0.9rem' }}>
            {compliantRequirements} of {totalRequirements} requirements
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#10b981' }}>
            ↗️ +2.1% vs last month
          </div>
        </div>

        <div style={{
          background: theme.secondary,
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
            ⚠️ Overdue Items
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: theme.textLight, marginBottom: '0.5rem' }}>
            {overdue}
          </div>
          <div style={{ color: theme.text, fontSize: '0.9rem' }}>
            Require immediate attention
          </div>
          {overdue > 0 && (
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#ef4444' }}>
              ⚠️ Action required
            </div>
          )}
        </div>

        <div style={{
          background: theme.secondary,
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
            🔥 High Risk Items
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: theme.textLight, marginBottom: '0.5rem' }}>
            {highRisk}
          </div>
          <div style={{ color: theme.text, fontSize: '0.9rem' }}>
            Critical & high risk areas
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#f59e0b' }}>
            📊 Monitor closely
          </div>
        </div>

        <div style={{
          background: theme.secondary,
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#8b5cf6', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
            📋 Active Audits
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: theme.textLight, marginBottom: '0.5rem' }}>
            {audits.filter(audit => audit.status === 'scheduled' || audit.status === 'in-progress').length}
          </div>
          <div style={{ color: theme.text, fontSize: '0.9rem' }}>
            Scheduled & in progress
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#8b5cf6' }}>
            📅 Next: Feb 15, 2024
          </div>
        </div>
      </div>

      {/* Recent Activity & Upcoming Deadlines */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: theme.secondary,
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: theme.textLight, marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '700' }}>
            ⏰ Upcoming Deadlines
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {requirements
              .filter(req => new Date(req.dueDate) > new Date())
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 5)
              .map(req => (
                <div key={req.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: theme.primary,
                  borderRadius: '8px',
                  border: `2px solid ${getPriorityColor(req.priority)}`
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: theme.textLight }}>{req.title}</div>
                    <div style={{ fontSize: '0.8rem', color: theme.text }}>
                      {req.category.charAt(0).toUpperCase() + req.category.slice(1)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: theme.textLight }}>
                      {new Date(req.dueDate).toLocaleDateString()}
                    </div>
                    <div style={{
                      background: getPriorityColor(req.priority),
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      {req.priority.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div style={{
          background: theme.secondary,
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: theme.textLight, marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '700' }}>
            🔍 Recent Audits
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {audits
              .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
              .slice(0, 4)
              .map(audit => (
                <div key={audit.id} style={{
                  padding: '0.75rem',
                  background: theme.primary,
                  borderRadius: '8px',
                  border: `2px solid ${getAuditStatusColor(audit.status)}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: '600', color: theme.textLight }}>{audit.title}</div>
                    <div style={{
                      background: getAuditStatusColor(audit.status),
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      {audit.status.toUpperCase()}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: theme.text, marginBottom: '0.25rem' }}>
                    {audit.type.charAt(0).toUpperCase() + audit.type.slice(1)} • {audit.auditor}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: theme.text }}>
                    {new Date(audit.startDate).toLocaleDateString()} - {new Date(audit.endDate).toLocaleDateString()}
                  </div>
                  {audit.overallRating && (
                    <div style={{ fontSize: '0.8rem', color: theme.text, marginTop: '0.25rem' }}>
                      Rating: {audit.overallRating.charAt(0).toUpperCase() + audit.overallRating.slice(1)}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: theme.background }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '700' }}>
          📋 Compliance Management
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Regulatory compliance, audit management, and risk assessment
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
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'requirements', label: '📋 Requirements', icon: '📋' },
            { id: 'audits', label: '🔍 Audits', icon: '🔍' },
            { id: 'documents', label: '📄 Documents', icon: '📄' },
            { id: 'reports', label: '📈 Reports', icon: '📈' }
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
                color: activeTab === tab.id ? '#6366f1' : '#6b7280',
                borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
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
        {activeTab === 'requirements' && (
          <div style={{ padding: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{ color: theme.textLight, margin: 0 }}>📋 Compliance Requirements</h2>
              <button 
                onClick={() => setShowAddCompliance(true)}
                style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                + Add Requirement
              </button>
            </div>

            {/* Requirements List */}
            <div style={{
              background: theme.secondary,
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                padding: '1rem 1.5rem',
                fontSize: '1.1rem',
                fontWeight: '700'
              }}>
                Regulatory Compliance Requirements ({requirements.length})
              </div>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: theme.primary }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Requirement</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Category</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Priority</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Due Date</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Assigned To</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requirements.map((req, index) => (
                      <tr key={req.id} style={{
                        borderBottom: `1px solid ${theme.border}`,
                        background: index % 2 === 0 ? theme.secondary : theme.primary
                      }}>
                        <td style={{ padding: '1rem' }}>
                          <div>
                            <div style={{ fontWeight: '600', color: theme.textLight }}>{req.title}</div>
                            <div style={{ fontSize: '0.8rem', color: theme.text, marginTop: '0.25rem' }}>
                              {req.description.length > 60 ? req.description.substring(0, 60) + '...' : req.description}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            background: 'rgba(99, 102, 241, 0.2)',
                            color: '#6366f1',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {req.category.charAt(0).toUpperCase() + req.category.slice(1)}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            background: getPriorityColor(req.priority),
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {req.priority.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            background: getStatusColor(req.status),
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {req.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', color: theme.textLight }}>
                          {new Date(req.dueDate).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '1rem', color: theme.textLight }}>{req.assignedTo}</td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button style={{
                              background: '#3b82f6',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '0.25rem 0.5rem',
                              cursor: 'pointer',
                              fontSize: '0.7rem'
                            }}>
                              View
                            </button>
                            <button style={{
                              background: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '0.25rem 0.5rem',
                              cursor: 'pointer',
                              fontSize: '0.7rem'
                            }}>
                              Edit
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
        {activeTab === 'audits' && (
          <div style={{ padding: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{ color: theme.textLight, margin: 0 }}>🔍 Audit Management</h2>
              <button style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                + Schedule Audit
              </button>
            </div>

            {/* Audit Statistics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: theme.secondary,
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.textLight }}>
                  {audits.length}
                </div>
                <div style={{ color: theme.text, fontSize: '0.9rem' }}>Total Audits</div>
              </div>
              <div style={{
                background: theme.secondary,
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                  {audits.filter(a => a.status === 'completed').length}
                </div>
                <div style={{ color: theme.text, fontSize: '0.9rem' }}>Completed</div>
              </div>
              <div style={{
                background: theme.secondary,
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                  {audits.filter(a => a.status === 'in-progress').length}
                </div>
                <div style={{ color: theme.text, fontSize: '0.9rem' }}>In Progress</div>
              </div>
              <div style={{
                background: theme.secondary,
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                  {audits.filter(a => a.status === 'scheduled').length}
                </div>
                <div style={{ color: theme.text, fontSize: '0.9rem' }}>Scheduled</div>
              </div>
            </div>

            {/* Audits List */}
            <div style={{
              background: theme.secondary,
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                padding: '1rem 1.5rem',
                fontSize: '1.1rem',
                fontWeight: '700'
              }}>
                Audit Schedule & History
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {audits.map(audit => (
                    <div key={audit.id} style={{
                      background: theme.primary,
                      borderRadius: '12px',
                      padding: '1.5rem',
                      border: `2px solid ${getAuditStatusColor(audit.status)}`
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                        <div>
                          <h3 style={{ color: theme.textLight, margin: '0 0 0.5rem 0' }}>{audit.title}</h3>
                          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                            <span style={{ color: theme.text, fontSize: '0.9rem' }}>
                              📅 {new Date(audit.startDate).toLocaleDateString()} - {new Date(audit.endDate).toLocaleDateString()}
                            </span>
                            <span style={{ color: theme.text, fontSize: '0.9rem' }}>
                              👤 {audit.auditor}
                            </span>
                          </div>
                          <span style={{
                            background: 'rgba(99, 102, 241, 0.2)',
                            color: '#6366f1',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {audit.type.charAt(0).toUpperCase() + audit.type.slice(1)} Audit
                          </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{
                            background: getAuditStatusColor(audit.status),
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {audit.status.replace('-', ' ').toUpperCase()}
                          </span>
                          {audit.overallRating && (
                            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: theme.text }}>
                              Rating: {audit.overallRating.charAt(0).toUpperCase() + audit.overallRating.slice(1)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ color: theme.text, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          <strong>Scope:</strong> {audit.scope.join(', ')}
                        </div>
                        {audit.findings.length > 0 && (
                          <div style={{ color: theme.text, fontSize: '0.9rem' }}>
                            <strong>Findings:</strong> {audit.findings.length} findings 
                            ({audit.findings.filter(f => f.severity === 'critical').length} critical, 
                            {audit.findings.filter(f => f.severity === 'major').length} major)
                          </div>
                        )}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.5rem 1rem',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}>
                          View Details
                        </button>
                        {audit.status === 'completed' && (
                          <button style={{
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}>
                            Download Report
                          </button>
                        )}
                        {audit.findings.length > 0 && (
                          <button style={{
                            background: '#f59e0b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}>
                            View Findings
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'documents' && (
          <div style={{ padding: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{ color: theme.textLight, margin: 0 }}>📄 Document Management</h2>
              <button style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                + Upload Document
              </button>
            </div>

            <div style={{
              background: theme.secondary,
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: theme.textLight, marginBottom: '1.5rem' }}>Compliance Documents Library</h3>
              
              {/* Document Categories */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {['certificates', 'licenses', 'permits', 'reports', 'policies'].map(category => {
                  const count = Math.floor(Math.random() * 20) + 5
                  const expiring = Math.floor(Math.random() * 3)
                  
                  return (
                    <div key={category} style={{
                      background: theme.primary,
                      borderRadius: '12px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                        {category === 'certificates' ? '🏆' :
                         category === 'licenses' ? '📜' :
                         category === 'permits' ? '✅' :
                         category === 'reports' ? '📊' : '📋'}
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.textLight, marginBottom: '0.5rem' }}>
                        {count}
                      </div>
                      <div style={{ color: theme.text, fontSize: '0.9rem', textTransform: 'capitalize', marginBottom: '0.5rem' }}>
                        {category}
                      </div>
                      {expiring > 0 && (
                        <div style={{ color: '#f59e0b', fontSize: '0.8rem' }}>
                          {expiring} expiring soon
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Recent Documents */}
              <div style={{
                background: theme.primary,
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <h4 style={{ color: theme.textLight, marginBottom: '1rem' }}>Recent Documents</h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {[
                    { name: 'ISO 9001 Certificate', type: 'certificate', uploaded: '2024-01-15', expires: '2025-01-15', status: 'valid' },
                    { name: 'Export License - EU', type: 'license', uploaded: '2024-01-10', expires: '2024-06-10', status: 'expiring-soon' },
                    { name: 'Safety Compliance Report', type: 'report', uploaded: '2024-01-08', expires: null, status: 'valid' },
                    { name: 'Environmental Permit', type: 'permit', uploaded: '2024-01-05', expires: '2024-12-31', status: 'valid' }
                  ].map((doc, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      background: theme.secondary,
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ fontSize: '1.2rem' }}>
                          {doc.type === 'certificate' ? '🏆' :
                           doc.type === 'license' ? '📜' :
                           doc.type === 'permit' ? '✅' : '📊'}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: theme.textLight }}>{doc.name}</div>
                          <div style={{ fontSize: '0.8rem', color: theme.text }}>
                            Uploaded: {new Date(doc.uploaded).toLocaleDateString()}
                            {doc.expires && ` • Expires: ${new Date(doc.expires).toLocaleDateString()}`}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          background: doc.status === 'valid' ? '#10b981' : 
                                    doc.status === 'expiring-soon' ? '#f59e0b' : '#ef4444',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}>
                          {doc.status.replace('-', ' ').toUpperCase()}
                        </span>
                        <button style={{
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontSize: '0.7rem'
                        }}>
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'reports' && (
          <div style={{ padding: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{ color: theme.textLight, margin: 0 }}>📈 Compliance Reports</h2>
              <button style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                Generate Report
              </button>
            </div>

            {/* Report Templates */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                {
                  title: 'Compliance Status Report',
                  description: 'Overall compliance status across all categories',
                  type: 'status',
                  icon: '📊',
                  frequency: 'Monthly'
                },
                {
                  title: 'Audit Summary Report',
                  description: 'Summary of completed audits and findings',
                  type: 'audit',
                  icon: '🔍',
                  frequency: 'Quarterly'
                },
                {
                  title: 'Risk Assessment Report',
                  description: 'Risk analysis and mitigation strategies',
                  type: 'risk',
                  icon: '⚠️',
                  frequency: 'Bi-annually'
                },
                {
                  title: 'Document Expiry Report',
                  description: 'Upcoming document renewals and expirations',
                  type: 'documents',
                  icon: '📄',
                  frequency: 'Monthly'
                },
                {
                  title: 'Training Compliance Report',
                  description: 'Employee training completion status',
                  type: 'training',
                  icon: '🎓',
                  frequency: 'Quarterly'
                },
                {
                  title: 'Regulatory Changes Report',
                  description: 'Updates to regulations and compliance requirements',
                  type: 'regulatory',
                  icon: '📋',
                  frequency: 'As needed'
                }
              ].map((report, index) => (
                <div key={index} style={{
                  background: theme.secondary,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2rem' }}>{report.icon}</div>
                    <div>
                      <h3 style={{ color: theme.textLight, margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>
                        {report.title}
                      </h3>
                      <div style={{ color: theme.text, fontSize: '0.8rem' }}>
                        {report.frequency}
                      </div>
                    </div>
                  </div>
                  
                  <p style={{ color: theme.text, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    {report.description}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{
                      background: '#6366f1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      flex: 1
                    }}>
                      Generate Now
                    </button>
                    <button style={{
                      background: 'transparent',
                      color: theme.textLight,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '6px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}>
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Reports */}
            <div style={{
              background: theme.secondary,
              borderRadius: '16px',
              padding: '1.5rem',
              marginTop: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: theme.textLight, marginBottom: '1rem' }}>Recent Reports</h3>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {[
                  { name: 'Q4 2023 Compliance Status Report', generated: '2024-01-15', size: '2.4 MB' },
                  { name: 'ISO Audit Summary - December 2023', generated: '2024-01-10', size: '1.8 MB' },
                  { name: 'Document Expiry Report - January 2024', generated: '2024-01-08', size: '856 KB' },
                  { name: 'Training Compliance Q4 2023', generated: '2024-01-05', size: '1.2 MB' }
                ].map((report, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    background: theme.primary,
                    borderRadius: '8px'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', color: theme.textLight }}>{report.name}</div>
                      <div style={{ fontSize: '0.8rem', color: theme.text }}>
                        Generated: {new Date(report.generated).toLocaleDateString()} • {report.size}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.7rem'
                      }}>
                        View
                      </button>
                      <button style={{
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.7rem'
                      }}>
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddCompliance && (
        <AddComplianceModal
          onAdd={handleAddCompliance}
          onClose={() => setShowAddCompliance(false)}
        />
      )}
    </div>
  )
}

// Add Compliance Modal Component
interface AddComplianceModalProps {
  onAdd: (complianceData: Omit<ComplianceRequirement, 'id' | 'lastReviewed' | 'documents' | 'actions'>) => void
  onClose: () => void
}

const AddComplianceModal: React.FC<AddComplianceModalProps> = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'regulatory' as ComplianceRequirement['category'],
    priority: 'medium' as ComplianceRequirement['priority'],
    status: 'pending' as ComplianceRequirement['status'],
    dueDate: '',
    nextReview: '',
    assignedTo: '',
    riskLevel: 'medium' as ComplianceRequirement['riskLevel']
  })

  const categories = [
    { value: 'regulatory', label: 'Regulatory Compliance', icon: '⚖️' },
    { value: 'quality', label: 'Quality Management', icon: '🏆' },
    { value: 'safety', label: 'Safety & Health', icon: '🦺' },
    { value: 'environmental', label: 'Environmental', icon: '🌱' },
    { value: 'financial', label: 'Financial Compliance', icon: '💰' }
  ]

  const priorities = [
    { value: 'low', label: 'Low Priority', color: '#6b7280' },
    { value: 'medium', label: 'Medium Priority', color: '#f59e0b' },
    { value: 'high', label: 'High Priority', color: '#ef4444' },
    { value: 'critical', label: 'Critical Priority', color: '#dc2626' }
  ]

  const riskLevels = [
    { value: 'low', label: 'Low Risk', color: '#10b981' },
    { value: 'medium', label: 'Medium Risk', color: '#f59e0b' },
    { value: 'high', label: 'High Risk', color: '#ef4444' },
    { value: 'critical', label: 'Critical Risk', color: '#dc2626' }
  ]

  const teamMembers = [
    'Legal Team', 'Quality Team', 'Safety Officer', 'Environmental Team',
    'Compliance Manager', 'Operations Manager', 'HR Team', 'Finance Team'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.dueDate || !formData.assignedTo) {
      alert('Please fill in all required fields')
      return
    }

    onAdd(formData)
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.5rem', fontWeight: '700' }}>
          📋 Add Compliance Requirement
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          {/* Basic Information */}
          <div style={{ 
            background: '#f8fafc', 
            borderRadius: '12px', 
            padding: '1.5rem',
            border: '2px solid #e2e8f0'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
              📝 Basic Information
            </h4>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Requirement Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., FDA Tobacco Manufacturing License"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Detailed description of the compliance requirement..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
                required
              />
            </div>
          </div>

          {/* Classification */}
          <div style={{ 
            background: '#f0f9ff', 
            borderRadius: '12px', 
            padding: '1.5rem',
            border: '2px solid #0ea5e9'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
              🏷️ Classification
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as ComplianceRequirement['category']})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Priority Level
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value as ComplianceRequirement['priority']})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Risk Level
                </label>
                <select
                  value={formData.riskLevel}
                  onChange={(e) => setFormData({...formData, riskLevel: e.target.value as ComplianceRequirement['riskLevel']})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  {riskLevels.map(risk => (
                    <option key={risk.value} value={risk.value}>
                      {risk.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Current Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as ComplianceRequirement['status']})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="under-review">Under Review</option>
                  <option value="compliant">Compliant</option>
                  <option value="non-compliant">Non-Compliant</option>
                </select>
              </div>
            </div>
          </div>

          {/* Schedule & Assignment */}
          <div style={{ 
            background: '#f0fdf4', 
            borderRadius: '12px', 
            padding: '1.5rem',
            border: '2px solid #22c55e'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
              📅 Schedule & Assignment
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Due Date *
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Next Review Date
                </label>
                <input
                  type="date"
                  value={formData.nextReview}
                  onChange={(e) => setFormData({...formData, nextReview: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Assigned To *
                </label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  required
                >
                  <option value="">Select team or person...</option>
                  {teamMembers.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              ✅ Add Compliance Requirement
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.background = '#4b5563'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = '#6b7280'
              }}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ComplianceManagement
