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

interface Document {
  id: string
  name: string
  type: 'pdf' | 'doc' | 'xls' | 'ppt' | 'img' | 'txt' | 'other'
  category: 'contracts' | 'reports' | 'policies' | 'certificates' | 'invoices' | 'compliance' | 'hr' | 'other'
  size: number
  uploadDate: string
  lastModified: string
  uploadedBy: string
  version: string
  status: 'draft' | 'review' | 'approved' | 'archived'
  tags: string[]
  description: string
  permissions: DocumentPermission[]
  versions: DocumentVersion[]
  comments: DocumentComment[]
  workflow?: WorkflowStatus
}

interface DocumentPermission {
  userId: string
  userName: string
  role: 'owner' | 'editor' | 'viewer'
  grantedBy: string
  grantedDate: string
}

interface DocumentVersion {
  id: string
  version: string
  uploadDate: string
  uploadedBy: string
  changes: string
  size: number
}

interface DocumentComment {
  id: string
  userId: string
  userName: string
  comment: string
  timestamp: string
  resolved: boolean
}

interface WorkflowStatus {
  id: string
  name: string
  currentStep: string
  steps: WorkflowStep[]
  status: 'pending' | 'in-progress' | 'completed' | 'rejected'
}

interface WorkflowStep {
  id: string
  name: string
  assignee: string
  status: 'pending' | 'completed' | 'rejected'
  completedDate?: string
  comments?: string
}

interface Folder {
  id: string
  name: string
  parentId?: string
  createdBy: string
  createdDate: string
  permissions: DocumentPermission[]
  documentCount: number
}

const DocumentManagement: React.FC = () => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState('documents')
  const [documents, setDocuments] = useState<Document[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showWorkflowModal, setShowWorkflowModal] = useState(false)

  useEffect(() => {
    loadDocuments()
    loadFolders()
  }, [])

  const loadDocuments = () => {
    const sampleDocuments: Document[] = [
      {
        id: 'doc-001',
        name: 'Quality Control Manual 2024.pdf',
        type: 'pdf',
        category: 'policies',
        size: 2456789,
        uploadDate: '2024-01-15T10:30:00Z',
        lastModified: '2024-01-15T10:30:00Z',
        uploadedBy: 'Ahmed Al-Rashid',
        version: '2.1',
        status: 'approved',
        tags: ['quality', 'manual', 'procedures'],
        description: 'Comprehensive quality control procedures and standards',
        permissions: [
          { userId: 'user-001', userName: 'Ahmed Al-Rashid', role: 'owner', grantedBy: 'system', grantedDate: '2024-01-15T10:30:00Z' },
          { userId: 'user-002', userName: 'Sarah Johnson', role: 'editor', grantedBy: 'user-001', grantedDate: '2024-01-15T11:00:00Z' }
        ],
        versions: [
          { id: 'v-001', version: '2.1', uploadDate: '2024-01-15T10:30:00Z', uploadedBy: 'Ahmed Al-Rashid', changes: 'Updated quality standards', size: 2456789 },
          { id: 'v-002', version: '2.0', uploadDate: '2024-01-10T09:15:00Z', uploadedBy: 'Ahmed Al-Rashid', changes: 'Major revision', size: 2398765 }
        ],
        comments: [
          { id: 'c-001', userId: 'user-002', userName: 'Sarah Johnson', comment: 'Excellent updates to section 3', timestamp: '2024-01-15T12:00:00Z', resolved: false }
        ]
      },
      {
        id: 'doc-002',
        name: 'Supplier Contract - Premium Tobacco Co.docx',
        type: 'doc',
        category: 'contracts',
        size: 1234567,
        uploadDate: '2024-01-14T15:45:00Z',
        lastModified: '2024-01-14T16:20:00Z',
        uploadedBy: 'Mohammed Hassan',
        version: '1.3',
        status: 'review',
        tags: ['contract', 'supplier', 'tobacco'],
        description: 'Annual supply contract with Premium Tobacco Co.',
        permissions: [
          { userId: 'user-003', userName: 'Mohammed Hassan', role: 'owner', grantedBy: 'system', grantedDate: '2024-01-14T15:45:00Z' }
        ],
        versions: [
          { id: 'v-003', version: '1.3', uploadDate: '2024-01-14T16:20:00Z', uploadedBy: 'Mohammed Hassan', changes: 'Updated pricing terms', size: 1234567 }
        ],
        comments: [],
        workflow: {
          id: 'wf-001',
          name: 'Contract Review Process',
          currentStep: 'Legal Review',
          status: 'in-progress',
          steps: [
            { id: 'step-001', name: 'Initial Review', assignee: 'Mohammed Hassan', status: 'completed', completedDate: '2024-01-14T16:00:00Z' },
            { id: 'step-002', name: 'Legal Review', assignee: 'Legal Team', status: 'pending' },
            { id: 'step-003', name: 'Final Approval', assignee: 'CEO', status: 'pending' }
          ]
        }
      },
      {
        id: 'doc-003',
        name: 'Monthly Production Report - December 2023.xlsx',
        type: 'xls',
        category: 'reports',
        size: 987654,
        uploadDate: '2024-01-13T09:20:00Z',
        lastModified: '2024-01-13T09:20:00Z',
        uploadedBy: 'Production Team',
        version: '1.0',
        status: 'approved',
        tags: ['production', 'monthly', 'report'],
        description: 'Detailed production metrics and analysis for December 2023',
        permissions: [
          { userId: 'user-004', userName: 'Production Team', role: 'owner', grantedBy: 'system', grantedDate: '2024-01-13T09:20:00Z' }
        ],
        versions: [
          { id: 'v-004', version: '1.0', uploadDate: '2024-01-13T09:20:00Z', uploadedBy: 'Production Team', changes: 'Initial version', size: 987654 }
        ],
        comments: []
      },
      {
        id: 'doc-004',
        name: 'ISO 9001 Certificate.pdf',
        type: 'pdf',
        category: 'certificates',
        size: 567890,
        uploadDate: '2024-01-12T14:10:00Z',
        lastModified: '2024-01-12T14:10:00Z',
        uploadedBy: 'Quality Manager',
        version: '1.0',
        status: 'approved',
        tags: ['iso', 'certificate', 'quality'],
        description: 'ISO 9001:2015 Quality Management System Certificate',
        permissions: [
          { userId: 'user-005', userName: 'Quality Manager', role: 'owner', grantedBy: 'system', grantedDate: '2024-01-12T14:10:00Z' }
        ],
        versions: [
          { id: 'v-005', version: '1.0', uploadDate: '2024-01-12T14:10:00Z', uploadedBy: 'Quality Manager', changes: 'Initial upload', size: 567890 }
        ],
        comments: []
      },
      {
        id: 'doc-005',
        name: 'Employee Handbook 2024.pdf',
        type: 'pdf',
        category: 'hr',
        size: 3456789,
        uploadDate: '2024-01-11T11:30:00Z',
        lastModified: '2024-01-11T11:30:00Z',
        uploadedBy: 'HR Manager',
        version: '3.0',
        status: 'draft',
        tags: ['hr', 'handbook', 'policies'],
        description: 'Updated employee handbook with new policies and procedures',
        permissions: [
          { userId: 'user-006', userName: 'HR Manager', role: 'owner', grantedBy: 'system', grantedDate: '2024-01-11T11:30:00Z' }
        ],
        versions: [
          { id: 'v-006', version: '3.0', uploadDate: '2024-01-11T11:30:00Z', uploadedBy: 'HR Manager', changes: 'Major update for 2024', size: 3456789 }
        ],
        comments: []
      }
    ]
    setDocuments(sampleDocuments)
  }

  const loadFolders = () => {
    const sampleFolders: Folder[] = [
      {
        id: 'folder-001',
        name: 'Quality Management',
        createdBy: 'Ahmed Al-Rashid',
        createdDate: '2024-01-01T00:00:00Z',
        permissions: [
          { userId: 'user-001', userName: 'Ahmed Al-Rashid', role: 'owner', grantedBy: 'system', grantedDate: '2024-01-01T00:00:00Z' }
        ],
        documentCount: 15
      },
      {
        id: 'folder-002',
        name: 'Contracts & Legal',
        createdBy: 'Mohammed Hassan',
        createdDate: '2024-01-01T00:00:00Z',
        permissions: [
          { userId: 'user-003', userName: 'Mohammed Hassan', role: 'owner', grantedBy: 'system', grantedDate: '2024-01-01T00:00:00Z' }
        ],
        documentCount: 23
      },
      {
        id: 'folder-003',
        name: 'Production Reports',
        createdBy: 'Production Team',
        createdDate: '2024-01-01T00:00:00Z',
        permissions: [
          { userId: 'user-004', userName: 'Production Team', role: 'owner', grantedBy: 'system', grantedDate: '2024-01-01T00:00:00Z' }
        ],
        documentCount: 42
      },
      {
        id: 'folder-004',
        name: 'Compliance & Certificates',
        createdBy: 'Quality Manager',
        createdDate: '2024-01-01T00:00:00Z',
        permissions: [
          { userId: 'user-005', userName: 'Quality Manager', role: 'owner', grantedBy: 'system', grantedDate: '2024-01-01T00:00:00Z' }
        ],
        documentCount: 18
      }
    ]
    setFolders(sampleFolders)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄'
      case 'doc': return '📝'
      case 'xls': return '📊'
      case 'ppt': return '📋'
      case 'img': return '🖼️'
      case 'txt': return '📃'
      default: return '📁'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10b981'
      case 'review': return '#f59e0b'
      case 'draft': return '#6b7280'
      case 'archived': return '#8b5cf6'
      default: return '#6b7280'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'contracts': return '#3b82f6'
      case 'reports': return '#10b981'
      case 'policies': return '#8b5cf6'
      case 'certificates': return '#f59e0b'
      case 'invoices': return '#ef4444'
      case 'compliance': return '#06b6d4'
      case 'hr': return '#ec4899'
      default: return '#6b7280'
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Documents Tab
  const renderDocuments = () => (
    <div style={{ padding: '2rem' }}>
      {/* Search and Filters */}
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.75rem',
              border: `2px solid ${theme.border}`,
              borderRadius: '8px',
              fontSize: '0.9rem',
              background: theme.primary,
              color: theme.textLight
            }}
          />
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: '0.75rem',
              border: `2px solid ${theme.border}`,
              borderRadius: '8px',
              fontSize: '0.9rem',
              background: theme.primary,
              color: theme.textLight
            }}
          >
            <option value="all">All Categories</option>
            <option value="contracts">Contracts</option>
            <option value="reports">Reports</option>
            <option value="policies">Policies</option>
            <option value="certificates">Certificates</option>
            <option value="invoices">Invoices</option>
            <option value="compliance">Compliance</option>
            <option value="hr">HR</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '0.75rem',
              border: `2px solid ${theme.border}`,
              borderRadius: '8px',
              fontSize: '0.9rem',
              background: theme.primary,
              color: theme.textLight
            }}
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="archived">Archived</option>
          </select>

          <button
            onClick={() => setShowUploadModal(true)}
            style={{
              background: theme.accent,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}
          >
            📤 Upload Document
          </button>
        </div>

        {selectedDocuments.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            padding: '0.75rem',
            background: theme.primary,
            borderRadius: '8px',
            border: `1px solid ${theme.border}`
          }}>
            <span style={{ color: theme.textLight, fontSize: '0.9rem' }}>
              {selectedDocuments.length} document(s) selected
            </span>
            <button style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.25rem 0.5rem',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}>
              Download
            </button>
            <button style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.25rem 0.5rem',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}>
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Documents Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredDocuments.map(doc => (
          <div key={doc.id} style={{
            background: theme.secondary,
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: `1px solid ${theme.border}`,
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>{getFileIcon(doc.type)}</span>
                <div>
                  <h3 style={{
                    color: theme.textLight,
                    fontSize: '1rem',
                    fontWeight: '600',
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>
                    {doc.name}
                  </h3>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      background: getCategoryColor(doc.category),
                      color: 'white',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      {doc.category}
                    </span>
                    <span style={{
                      background: getStatusColor(doc.status),
                      color: 'white',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <input
                type="checkbox"
                checked={selectedDocuments.includes(doc.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDocuments([...selectedDocuments, doc.id])
                  } else {
                    setSelectedDocuments(selectedDocuments.filter(id => id !== doc.id))
                  }
                }}
                style={{ cursor: 'pointer' }}
              />
            </div>

            <p style={{
              color: theme.text,
              fontSize: '0.9rem',
              marginBottom: '1rem',
              lineHeight: '1.4'
            }}>
              {doc.description}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              marginBottom: '1rem',
              fontSize: '0.8rem',
              color: theme.text
            }}>
              <div>Size: {formatFileSize(doc.size)}</div>
              <div>Version: {doc.version}</div>
              <div>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</div>
              <div>By: {doc.uploadedBy}</div>
            </div>

            {doc.tags.length > 0 && (
              <div style={{
                display: 'flex',
                gap: '0.25rem',
                flexWrap: 'wrap',
                marginBottom: '1rem'
              }}>
                {doc.tags.map(tag => (
                  <span key={tag} style={{
                    background: theme.primary,
                    color: theme.text,
                    padding: '0.125rem 0.5rem',
                    borderRadius: '8px',
                    fontSize: '0.7rem',
                    border: `1px solid ${theme.border}`
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {doc.workflow && (
              <div style={{
                background: theme.primary,
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1rem',
                border: `1px solid ${theme.border}`
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ color: theme.textLight, fontSize: '0.8rem', fontWeight: '600' }}>
                    {doc.workflow.name}
                  </span>
                  <span style={{
                    background: doc.workflow.status === 'completed' ? '#10b981' : 
                               doc.workflow.status === 'in-progress' ? '#f59e0b' : '#6b7280',
                    color: 'white',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '8px',
                    fontSize: '0.6rem',
                    fontWeight: '600'
                  }}>
                    {doc.workflow.status}
                  </span>
                </div>
                <div style={{ color: theme.text, fontSize: '0.7rem' }}>
                  Current: {doc.workflow.currentStep}
                </div>
              </div>
            )}

            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              <button style={{
                flex: 1,
                background: theme.accent,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                📖 View
              </button>
              <button style={{
                flex: 1,
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                📥 Download
              </button>
              <button style={{
                flex: 1,
                background: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                ✏️ Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Folders Tab
  const renderFolders = () => (
    <div style={{ padding: '2rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {folders.map(folder => (
          <div key={folder.id} style={{
            background: theme.secondary,
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: `1px solid ${theme.border}`,
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          onClick={() => setCurrentFolder(folder.id)}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '3rem' }}>📁</span>
              <div>
                <h3 style={{
                  color: theme.textLight,
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  margin: 0,
                  marginBottom: '0.25rem'
                }}>
                  {folder.name}
                </h3>
                <div style={{ color: theme.text, fontSize: '0.8rem' }}>
                  {folder.documentCount} documents
                </div>
              </div>
            </div>

            <div style={{
              color: theme.text,
              fontSize: '0.8rem',
              marginBottom: '1rem'
            }}>
              Created by {folder.createdBy} on {new Date(folder.createdDate).toLocaleDateString()}
            </div>

            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              <button style={{
                flex: 1,
                background: theme.accent,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                📂 Open
              </button>
              <button style={{
                background: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                ⚙️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Workflows Tab
  const renderWorkflows = () => (
    <div style={{ padding: '2rem' }}>
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
          🔄 Document Workflows
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '1.5rem'
        }}>
          {documents.filter(doc => doc.workflow).map(doc => (
            <div key={doc.id} style={{
              background: theme.primary,
              borderRadius: '12px',
              padding: '1.5rem',
              border: `1px solid ${theme.border}`
            }}>
              <h4 style={{
                color: theme.textLight,
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                {doc.name}
              </h4>
              
              <div style={{
                color: theme.text,
                fontSize: '0.9rem',
                marginBottom: '1rem'
              }}>
                Workflow: {doc.workflow?.name}
              </div>

              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {doc.workflow?.steps.map((step, index) => (
                  <div key={step.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.5rem',
                    background: theme.secondary,
                    borderRadius: '8px',
                    border: step.status === 'completed' ? '1px solid #10b981' :
                           step.status === 'rejected' ? '1px solid #ef4444' :
                           doc.workflow?.currentStep === step.name ? '1px solid #f59e0b' : `1px solid ${theme.border}`
                  }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: step.status === 'completed' ? '#10b981' :
                                 step.status === 'rejected' ? '#ef4444' :
                                 doc.workflow?.currentStep === step.name ? '#f59e0b' : '#6b7280',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      {index + 1}
                    </span>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ color: theme.textLight, fontSize: '0.9rem', fontWeight: '600' }}>
                        {step.name}
                      </div>
                      <div style={{ color: theme.text, fontSize: '0.8rem' }}>
                        Assigned to: {step.assignee}
                      </div>
                    </div>
                    
                    <span style={{
                      background: step.status === 'completed' ? '#10b981' :
                                 step.status === 'rejected' ? '#ef4444' :
                                 step.status === 'pending' ? '#6b7280' : '#f59e0b',
                      color: 'white',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '8px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      {step.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: theme.background }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '700' }}>
          📁 Document Management System
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Centralized document storage with version control and collaboration
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
            { id: 'documents', label: '📄 Documents', icon: '📄' },
            { id: 'folders', label: '📁 Folders', icon: '📁' },
            { id: 'workflows', label: '🔄 Workflows', icon: '🔄' }
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
                color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
                borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
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
        {activeTab === 'documents' && renderDocuments()}
        {activeTab === 'folders' && renderFolders()}
        {activeTab === 'workflows' && renderWorkflows()}
      </div>
    </div>
  )
}

export default DocumentManagement 