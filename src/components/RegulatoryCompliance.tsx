import React, { useState, useEffect } from 'react'
import { 
  Shield, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Globe, 
  Package, 
  Eye, 
  Calendar, 
  TrendingUp, 
  BarChart3,
  Flag,
  Stamp,
  Scale,
  Building,
  Truck,
  FileCheck,
  AlertCircle,
  Target,
  Award,
  Settings
} from 'lucide-react'

interface TaxStamp {
  id: string
  batchId: string
  stampNumber: string
  country: string
  taxAmount: number
  currency: string
  issueDate: string
  expiryDate: string
  status: 'active' | 'expired' | 'pending' | 'cancelled'
  productType: string
  quantity: number
}

interface ComplianceRecord {
  id: string
  type: 'health_warning' | 'tax_compliance' | 'import_permit' | 'export_license' | 'quality_cert'
  title: string
  description: string
  status: 'compliant' | 'non_compliant' | 'pending' | 'expired'
  dueDate: string
  lastUpdated: string
  responsible: string
  documents: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

interface ImportExportRecord {
  id: string
  type: 'import' | 'export'
  country: string
  productType: string
  quantity: number
  value: number
  currency: string
  permitNumber: string
  customsCode: string
  status: 'pending' | 'approved' | 'in_transit' | 'completed' | 'rejected'
  submissionDate: string
  approvalDate?: string
  expiryDate: string
  documents: string[]
}

const RegulatoryCompliance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [taxStamps, setTaxStamps] = useState<TaxStamp[]>([])
  const [complianceRecords, setComplianceRecords] = useState<ComplianceRecord[]>([])
  const [importExportRecords, setImportExportRecords] = useState<ImportExportRecord[]>([])

  useEffect(() => {
    loadMockData()
  }, [])

  const loadMockData = () => {
    // Mock tax stamps
    const mockTaxStamps: TaxStamp[] = [
      {
        id: 'TS001',
        batchId: 'BTH-2024-001',
        stampNumber: 'UAE-2024-001234',
        country: 'UAE',
        taxAmount: 15000,
        currency: 'AED',
        issueDate: '2024-01-15',
        expiryDate: '2024-12-31',
        status: 'active',
        productType: 'Cigarettes',
        quantity: 10000
      },
      {
        id: 'TS002',
        batchId: 'BTH-2024-002',
        stampNumber: 'SAU-2024-005678',
        country: 'Saudi Arabia',
        taxAmount: 25000,
        currency: 'SAR',
        issueDate: '2024-01-20',
        expiryDate: '2024-11-30',
        status: 'active',
        productType: 'Tobacco',
        quantity: 5000
      }
    ]

    // Mock compliance records
    const mockCompliance: ComplianceRecord[] = [
      {
        id: 'CR001',
        type: 'health_warning',
        title: 'Health Warning Labels - UAE Market',
        description: 'Compliance with UAE health warning requirements for tobacco products',
        status: 'compliant',
        dueDate: '2024-06-30',
        lastUpdated: '2024-01-15',
        responsible: 'Regulatory Affairs Team',
        documents: ['health_warning_cert.pdf', 'label_approval.pdf'],
        riskLevel: 'low'
      },
      {
        id: 'CR002',
        type: 'import_permit',
        title: 'Import Permit Renewal - Turkey',
        description: 'Annual import permit renewal for Turkish tobacco leaves',
        status: 'pending',
        dueDate: '2024-03-15',
        lastUpdated: '2024-01-20',
        responsible: 'Import/Export Manager',
        documents: ['permit_application.pdf'],
        riskLevel: 'medium'
      }
    ]

    // Mock import/export records
    const mockImportExport: ImportExportRecord[] = [
      {
        id: 'IE001',
        type: 'import',
        country: 'Turkey',
        productType: 'Oriental Tobacco Leaves',
        quantity: 2000,
        value: 150000,
        currency: 'USD',
        permitNumber: 'IMP-2024-001',
        customsCode: '2401.10.00',
        status: 'approved',
        submissionDate: '2024-01-10',
        approvalDate: '2024-01-18',
        expiryDate: '2024-12-31',
        documents: ['import_permit.pdf', 'phytosanitary_cert.pdf']
      },
      {
        id: 'IE002',
        type: 'export',
        country: 'Jordan',
        productType: 'Finished Cigarettes',
        quantity: 50000,
        value: 500000,
        currency: 'USD',
        permitNumber: 'EXP-2024-001',
        customsCode: '2402.20.00',
        status: 'in_transit',
        submissionDate: '2024-01-22',
        approvalDate: '2024-01-25',
        expiryDate: '2024-06-30',
        documents: ['export_license.pdf', 'quality_cert.pdf']
      }
    ]

    setTaxStamps(mockTaxStamps)
    setComplianceRecords(mockCompliance)
    setImportExportRecords(mockImportExport)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'compliant': case 'approved': case 'completed': return '#10b981'
      case 'pending': case 'in_transit': return '#f59e0b'
      case 'expired': case 'non_compliant': case 'rejected': return '#ef4444'
      case 'cancelled': return '#6b7280'
      default: return '#6b7280'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'high': return '#f97316'
      case 'critical': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const renderOverview = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      {/* Compliance Status Cards */}
      <div className="cosmic-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <Shield size={24} style={{ color: '#10b981' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>Overall Compliance</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Current status</p>
          </div>
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#10b981',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          marginBottom: '8px'
        }}>
          94%
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {complianceRecords.filter(r => r.status === 'compliant').length} of {complianceRecords.length} items compliant
        </div>
      </div>

      <div className="cosmic-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <Stamp size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>Active Tax Stamps</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Valid stamps</p>
          </div>
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#f59e0b',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          marginBottom: '8px'
        }}>
          {taxStamps.filter(s => s.status === 'active').length}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Total value: {taxStamps.reduce((sum, stamp) => sum + stamp.taxAmount, 0).toLocaleString()} AED
        </div>
      </div>

      <div className="cosmic-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <Globe size={24} style={{ color: '#3b82f6' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>Import/Export</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Active permits</p>
          </div>
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#3b82f6',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          marginBottom: '8px'
        }}>
          {importExportRecords.filter(r => r.status === 'approved' || r.status === 'in_transit').length}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Total value: ${importExportRecords.reduce((sum, record) => sum + record.value, 0).toLocaleString()}
        </div>
      </div>

      <div className="cosmic-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <AlertTriangle size={24} style={{ color: '#ef4444' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>Risk Alerts</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Requires attention</p>
          </div>
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#ef4444',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          marginBottom: '8px'
        }}>
          {complianceRecords.filter(r => r.riskLevel === 'high' || r.riskLevel === 'critical').length}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {complianceRecords.filter(r => r.status === 'pending').length} pending items
        </div>
      </div>

      {/* Compliance Timeline */}
      <div className="cosmic-card" style={{ padding: '24px', gridColumn: '1 / -1' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '24px', fontSize: '20px' }}>
          <Calendar size={24} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Upcoming Compliance Deadlines
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {complianceRecords
            .filter(record => new Date(record.dueDate) > new Date())
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .slice(0, 4)
            .map((record) => (
              <div key={record.id} style={{
                background: 'rgba(26, 26, 46, 0.5)',
                border: `1px solid ${getRiskColor(record.riskLevel)}40`,
                borderRadius: '12px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '16px' }}>{record.title}</h4>
                  <span style={{
                    background: `${getRiskColor(record.riskLevel)}20`,
                    color: getRiskColor(record.riskLevel),
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {record.riskLevel}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', margin: '0 0 12px 0', fontSize: '14px' }}>
                  {record.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Due: {new Date(record.dueDate).toLocaleDateString()}
                  </span>
                  <span style={{
                    background: `${getStatusColor(record.status)}20`,
                    color: getStatusColor(record.status),
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {record.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )

  const renderTaxStamps = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', margin: 0 }}>
          <Stamp size={28} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Tax Stamp Management
        </h3>
        <button className="cosmic-button" style={{ padding: '12px 24px' }}>
          + Request New Stamps
        </button>
      </div>

      <div className="cosmic-table">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left' }}>Stamp Number</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Country</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Product Type</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Quantity</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Tax Amount</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Expiry Date</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {taxStamps.map((stamp) => (
              <tr key={stamp.id}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{stamp.stampNumber}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Batch: {stamp.batchId}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Flag size={16} style={{ color: 'var(--cosmic-primary)' }} />
                    <span style={{ color: 'var(--text-primary)' }}>{stamp.country}</span>
                  </div>
                </td>
                <td style={{ padding: '16px', color: 'var(--text-primary)' }}>{stamp.productType}</td>
                <td style={{ 
                  padding: '16px', 
                  color: 'var(--text-primary)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontWeight: '600'
                }}>
                  {stamp.quantity.toLocaleString()}
                </td>
                <td style={{ 
                  padding: '16px', 
                  color: 'var(--text-primary)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontWeight: '600'
                }}>
                  {stamp.taxAmount.toLocaleString()} {stamp.currency}
                </td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>
                  {new Date(stamp.expiryDate).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    background: `${getStatusColor(stamp.status)}20`,
                    color: getStatusColor(stamp.status),
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {stamp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderImportExport = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', margin: 0 }}>
          <Globe size={28} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Import/Export Management
        </h3>
        <button className="cosmic-button" style={{ padding: '12px 24px' }}>
          + New Application
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {importExportRecords.map((record) => (
          <div key={record.id} className="cosmic-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h4 style={{ color: 'var(--text-primary)', margin: '0 0 4px 0', fontSize: '18px' }}>
                  {record.type.toUpperCase()} - {record.country}
                </h4>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                  {record.productType}
                </p>
              </div>
              <span style={{
                background: `${getStatusColor(record.status)}20`,
                color: getStatusColor(record.status),
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}>
                {record.status.replace('_', ' ')}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Quantity</div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'var(--text-primary)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  {record.quantity.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Value</div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'var(--cosmic-primary)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  ${record.value.toLocaleString()}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Permit Details</div>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                <strong>Permit:</strong> {record.permitNumber}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                <strong>Customs Code:</strong> {record.customsCode}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                <strong>Expires:</strong> {new Date(record.expiryDate).toLocaleDateString()}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                flex: 1,
                padding: '8px 16px',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid #3b82f6',
                borderRadius: '8px',
                color: '#3b82f6',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                View Documents
              </button>
              <button style={{
                flex: 1,
                padding: '8px 16px',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid #10b981',
                borderRadius: '8px',
                color: '#10b981',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                Track Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const tabs = [
    { id: 'overview', label: 'Compliance Overview', icon: Shield },
    { id: 'tax_stamps', label: 'Tax Stamps', icon: Stamp },
    { id: 'import_export', label: 'Import/Export', icon: Globe },
    { id: 'health_warnings', label: 'Health Warnings', icon: AlertTriangle },
    { id: 'audits', label: 'Audits & Reports', icon: FileCheck },
    { id: 'settings', label: 'Compliance Settings', icon: Settings }
  ]

  return (
    <div style={{ padding: '24px', maxWidth: '1800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          color: 'var(--text-primary)', 
          margin: '0 0 8px 0',
          fontSize: '32px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            padding: '12px',
            borderRadius: '12px'
          }}>
            <Shield size={32} style={{ color: 'white' }} />
          </div>
          Regulatory Compliance Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '16px' }}>
          Comprehensive tobacco industry compliance management and monitoring
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '32px',
        overflowX: 'auto',
        padding: '4px'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: activeTab === tab.id ? 'var(--elegant-gradient)' : 'rgba(26, 26, 46, 0.7)',
              border: `1px solid ${activeTab === tab.id ? 'var(--cosmic-primary)' : 'rgba(0, 212, 255, 0.2)'}`,
              borderRadius: '12px',
              color: 'var(--cosmic-star-white)',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(10px)',
              boxShadow: activeTab === tab.id ? 'var(--cosmic-glow)' : '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'tax_stamps' && renderTaxStamps()}
        {activeTab === 'import_export' && renderImportExport()}
        {activeTab === 'health_warnings' && (
          <div className="cosmic-card" style={{ padding: '48px', textAlign: 'center' }}>
            <AlertTriangle size={48} style={{ color: 'var(--cosmic-primary)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Health Warnings Module</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Health warning compliance management coming soon...</p>
          </div>
        )}
        {activeTab === 'audits' && (
          <div className="cosmic-card" style={{ padding: '48px', textAlign: 'center' }}>
            <FileCheck size={48} style={{ color: 'var(--cosmic-primary)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Audits & Reports Module</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Comprehensive audit management system coming soon...</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="cosmic-card" style={{ padding: '48px', textAlign: 'center' }}>
            <Settings size={48} style={{ color: 'var(--cosmic-primary)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Compliance Settings</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Configuration and settings management coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RegulatoryCompliance 