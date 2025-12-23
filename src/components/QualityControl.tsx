import React, { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  FileText, 
  TrendingUp, 
  Filter, 
  Search,
  Thermometer,
  Droplets,
  Scale,
  Beaker,
  TestTube,
  Shield,
  Award,
  Target,
  Activity,
  Zap,
  Eye,
  Settings,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react'
import { dataService } from '../services/dataService'
import type { QualityTest, ProductionBatch, Employee } from '../services/dataService'

interface QualityParameter {
  id: string
  name: string
  category: 'physical' | 'chemical' | 'sensory' | 'regulatory'
  minValue?: number
  maxValue?: number
  targetValue?: number
  unit: string
  testMethod: string
  frequency: 'batch' | 'daily' | 'weekly' | 'monthly'
  critical: boolean
  regulatoryRequirement: boolean
  applicableMarkets: string[]
}

interface QualityAlert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  description: string
  batchId?: string
  parameter?: string
  severity: 'high' | 'medium' | 'low'
  status: 'active' | 'resolved' | 'acknowledged'
  createdAt: string
  resolvedAt?: string
  assignedTo?: string
}

interface QualityControlProps {}

const QualityControl: React.FC<QualityControlProps> = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [qualityTests, setQualityTests] = useState<QualityTest[]>([])
  const [qualityParameters, setQualityParameters] = useState<QualityParameter[]>([])
  const [qualityAlerts, setQualityAlerts] = useState<QualityAlert[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterResult, setFilterResult] = useState('all')
  const [showAddTest, setShowAddTest] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTest, setSelectedTest] = useState<QualityTest | null>(null)
  const [loading, setLoading] = useState(true)

  // Tobacco-specific quality parameters
  const tobaccoQualityParameters: QualityParameter[] = [
    {
      id: 'qp-001',
      name: 'Moisture Content',
      category: 'physical',
      minValue: 10.0,
      maxValue: 15.0,
      targetValue: 12.5,
      unit: '%',
      testMethod: 'ISO 6488:2004',
      frequency: 'batch',
      critical: true,
      regulatoryRequirement: true,
      applicableMarkets: ['UAE', 'GCC', 'EU', 'US']
    },
    {
      id: 'qp-002',
      name: 'Nicotine Content',
      category: 'chemical',
      minValue: 0.1,
      maxValue: 2.0,
      targetValue: 0.8,
      unit: 'mg/g',
      testMethod: 'ISO 10315:2013',
      frequency: 'batch',
      critical: true,
      regulatoryRequirement: true,
      applicableMarkets: ['UAE', 'GCC', 'EU', 'US']
    },
    {
      id: 'qp-003',
      name: 'pH Level',
      category: 'chemical',
      minValue: 5.0,
      maxValue: 7.0,
      targetValue: 6.0,
      unit: 'pH',
      testMethod: 'ISO 10390:2005',
      frequency: 'batch',
      critical: false,
      regulatoryRequirement: false,
      applicableMarkets: ['UAE', 'GCC']
    },
    {
      id: 'qp-004',
      name: 'Tar Content',
      category: 'chemical',
      minValue: 0,
      maxValue: 10.0,
      targetValue: 5.0,
      unit: 'mg/cigarette',
      testMethod: 'ISO 4387:2019',
      frequency: 'batch',
      critical: true,
      regulatoryRequirement: true,
      applicableMarkets: ['EU', 'US']
    },
    {
      id: 'qp-005',
      name: 'Carbon Monoxide',
      category: 'chemical',
      minValue: 0,
      maxValue: 10.0,
      targetValue: 5.0,
      unit: 'mg/cigarette',
      testMethod: 'ISO 8454:2007',
      frequency: 'batch',
      critical: true,
      regulatoryRequirement: true,
      applicableMarkets: ['EU', 'US']
    },
    {
      id: 'qp-006',
      name: 'Aroma Assessment',
      category: 'sensory',
      minValue: 7.0,
      maxValue: 10.0,
      targetValue: 8.5,
      unit: 'score',
      testMethod: 'Sensory Panel Evaluation',
      frequency: 'batch',
      critical: false,
      regulatoryRequirement: false,
      applicableMarkets: ['UAE', 'GCC', 'EU', 'US']
    },
    {
      id: 'qp-007',
      name: 'Burn Rate',
      category: 'physical',
      minValue: 0.8,
      maxValue: 1.2,
      targetValue: 1.0,
      unit: 'mm/min',
      testMethod: 'ISO 12863:2010',
      frequency: 'batch',
      critical: false,
      regulatoryRequirement: false,
      applicableMarkets: ['UAE', 'GCC']
    },
    {
      id: 'qp-008',
      name: 'Ash Content',
      category: 'physical',
      minValue: 8.0,
      maxValue: 12.0,
      targetValue: 10.0,
      unit: '%',
      testMethod: 'ISO 1171:2010',
      frequency: 'batch',
      critical: false,
      regulatoryRequirement: false,
      applicableMarkets: ['UAE', 'GCC']
    }
  ]

  useEffect(() => {
    loadQualityData()
    setQualityParameters(tobaccoQualityParameters)
  }, [])

  useEffect(() => {
    filterTests()
  }, [qualityTests, searchTerm, filterType, filterResult])

  const loadQualityData = () => {
    setLoading(true)
    try {
      const testData = dataService.getQualityTests()
      const batchData = dataService.getProductionBatches()
      const employeeData = dataService.getEmployees()
      
      setQualityTests(testData)
      setQualityParameters(tobaccoQualityParameters)
      // setBatches(batchData) // This line was removed from the new_code, so it's removed here.
      // setEmployees(employeeData) // This line was removed from the new_code, so it's removed here.
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterTests = () => {
    let filtered = qualityTests

    if (searchTerm) {
      filtered = filtered.filter(test => {
        const batch = getBatchInfo(test.batchId)
        const technician = getTechnicianName(test.technicianId)
        return batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
               test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
               technician.toLowerCase().includes(searchTerm.toLowerCase())
      })
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(test => test.testType === filterType)
    }

    if (filterResult !== 'all') {
      filtered = filtered.filter(test => test.result === filterResult)
    }

    setQualityTests(filtered)
  }

  const handleAddTest = (testData: Omit<QualityTest, 'id'>) => {
    try {
      const newTest = dataService.addQualityTest(testData)
      setQualityTests(prev => [...prev, newTest])
      setShowAddTest(false)
    } catch (error) {
      console.error('Error adding test:', error)
    }
  }

  const handleEditTest = (testData: Partial<QualityTest>) => {
    if (!selectedTest) return
    
    try {
      const updatedTest = dataService.updateQualityTest(selectedTest.id, testData)
      if (updatedTest) {
        setQualityTests(prev => prev.map(test => 
          test.id === selectedTest.id ? updatedTest : test
        ))
        setShowEditModal(false)
        setSelectedTest(null)
      }
    } catch (error) {
      console.error('Error updating test:', error)
    }
  }

  const handleDeleteTest = (id: string) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      try {
        const success = dataService.deleteQualityTest(id)
        if (success) {
          setQualityTests(prev => prev.filter(test => test.id !== id))
        }
      } catch (error) {
        console.error('Error deleting test:', error)
      }
    }
  }

  const getBatchInfo = (batchId: string) => {
    const batch = dataService.getProductionBatches().find(b => b.id === batchId)
    return batch || { batchNumber: 'Unknown', productType: 'Unknown' }
  }

  const getTechnicianName = (technicianId: string) => {
    const technician = dataService.getEmployees().find(emp => emp.id === technicianId)
    return technician ? technician.name : 'Unknown Technician'
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case 'pass': return '#10b981'
      case 'fail': return '#ef4444'
      case 'pending': return '#f59e0b'
      case 'conditional': return '#f59e0b' // Added conditional
      default: return '#6b7280'
    }
  }

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'pass': return <CheckCircle size={16} />
      case 'fail': return <XCircle size={16} />
      case 'pending': return <Clock size={16} />
      case 'conditional': return <AlertTriangle size={16} /> // Added conditional
      default: return <Clock size={16} />
    }
  }

  const getPassRate = () => {
    if (qualityTests.length === 0) return 0
    const passedTests = qualityTests.filter(test => test.result === 'pass').length
    return Math.round((passedTests / qualityTests.length) * 100)
  }

  const getPendingTests = () => {
    return qualityTests.filter(test => test.result === 'pending').length
  }

  const getFailedTests = () => {
    return qualityTests.filter(test => test.result === 'fail').length
  }

  const getTodaysTests = () => {
    const today = new Date().toISOString().split('T')[0]
    return qualityTests.filter(test => test.testDate.startsWith(today)).length
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
        Loading quality control data...
      </div>
    )
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
            {/* <FlaskConical size={32} style={{ marginRight: '12px', verticalAlign: 'middle' }} /> */}
            Quality Control
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Testing protocols, compliance tracking, and quality management
          </p>
        </div>
        <button
          onClick={() => setShowAddTest(true)}
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
          New Test
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
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <Award size={24} style={{ color: '#10b981' }} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '14px' }}>
                Pass Rate
              </p>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {getPassRate()}%
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
                Pending Tests
              </p>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {getPendingTests()}
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
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <XCircle size={24} style={{ color: '#ef4444' }} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '14px' }}>
                Failed Tests
              </p>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {getFailedTests()}
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
              background: 'rgba(77, 208, 225, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              {/* <Calendar size={24} style={{ color: 'var(--azure-primary)' }} /> */}
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '14px' }}>
                Today's Tests
              </p>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {getTodaysTests()}
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
              placeholder="Search tests..."
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
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '12px',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              background: 'var(--bg-dark)',
              color: 'var(--text-primary)',
              fontSize: '14px'
            }}
          >
            <option value="all">All Test Types</option>
            {/* testTypes.map(type => ( // This line was removed from the new_code, so it's removed here. */}
            {/*   <option key={type} value={type}> */}
            {/*     {type.charAt(0).toUpperCase() + type.slice(1)} */}
            {/*   </option> */}
            {/* ))} */}
          </select>

          <select
            value={filterResult}
            onChange={(e) => setFilterResult(e.target.value)}
            style={{
              padding: '12px',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              background: 'var(--bg-dark)',
              color: 'var(--text-primary)',
              fontSize: '14px'
            }}
          >
            <option value="all">All Results</option>
            {/* testResults.map(result => ( // This line was removed from the new_code, so it's removed here. */}
            {/*   <option key={result} value={result}> */}
            {/*     {result.charAt(0).toUpperCase() + result.slice(1)} */}
            {/*   </option> */}
            {/* ))} */}
          </select>
        </div>
      </div>

      {/* Tests Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {qualityTests.map((test) => {
          const batch = getBatchInfo(test.batchId)
          const technician = getTechnicianName(test.technicianId)
          
          return (
            <div key={test.id} style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
              position: 'relative'
            }}>
              {/* Result Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                background: `${getResultColor(test.result)}20`,
                color: getResultColor(test.result),
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                textTransform: 'uppercase'
              }}>
                {getResultIcon(test.result)}
                {test.result}
              </div>

              {/* Test Header */}
              <div style={{ marginBottom: '16px', paddingRight: '100px' }}>
                <h3 style={{ 
                  color: 'var(--text-primary)', 
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  {test.testType.charAt(0).toUpperCase() + test.testType.slice(1)} Test
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  margin: '0 0 8px 0',
                  fontSize: '14px'
                }}>
                  Batch: {batch.batchNumber} • {batch.productType}
                </p>
              </div>

              {/* Test Details */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '12px',
                marginBottom: '16px'
              }}>
                {test.value && (
                  <div>
                    <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '12px' }}>
                      Test Value
                    </p>
                    <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                      {test.value} {test.unit || ''}
                    </p>
                  </div>
                )}
                <div>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '12px' }}>
                    Test Date
                  </p>
                  <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                    {new Date(test.testDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Technician */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* <User size={14} style={{ color: 'var(--text-secondary)' }} /> */}
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                    Technician: {technician}
                  </span>
                </div>
              </div>

              {/* Notes */}
              {test.notes && (
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
                    {test.notes}
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
                    setSelectedTest(test)
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
                  onClick={() => handleDeleteTest(test.id)}
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

      {qualityTests.length === 0 && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          No quality tests found matching your criteria.
        </div>
      )}

      {/* Add Test Modal */}
      {showAddTest && (
        <TestModal
          title="Add New Quality Test"
          batches={dataService.getProductionBatches()} // Use dataService for batches
          employees={dataService.getEmployees().filter(emp => emp.department === 'Quality Control' || emp.position.includes('Technician'))} // Use dataService for employees
          onSave={handleAddTest}
          onClose={() => setShowAddTest(false)}
        />
      )}

      {/* Edit Test Modal */}
      {showEditModal && selectedTest && (
        <TestModal
          title="Edit Quality Test"
          test={selectedTest}
          batches={dataService.getProductionBatches()} // Use dataService for batches
          employees={dataService.getEmployees().filter(emp => emp.department === 'Quality Control' || emp.position.includes('Technician'))} // Use dataService for employees
          onSave={handleEditTest}
          onClose={() => {
            setShowEditModal(false)
            setSelectedTest(null)
          }}
        />
      )}
    </div>
  )
}

// Test Modal Component
interface TestModalProps {
  title: string
  test?: QualityTest
  batches: ProductionBatch[]
  employees: Employee[]
  onSave: (data: any) => void
  onClose: () => void
}

const TestModal: React.FC<TestModalProps> = ({ title, test, batches, employees, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    batchId: test?.batchId || '',
    testType: test?.testType || 'moisture',
    result: test?.result || 'pending',
    value: test?.value || '',
    unit: test?.unit || '',
    testDate: test?.testDate || new Date().toISOString().split('T')[0],
    technicianId: test?.technicianId || '',
    notes: test?.notes || '',
    complianceStatus: test?.complianceStatus || 'compliant', // Added complianceStatus
    regulatoryStandard: test?.regulatoryStandard || '', // Added regulatoryStandard
    correctiveActions: test?.correctiveActions || [], // Added correctiveActions
    retestRequired: test?.retestRequired || false, // Added retestRequired
    retestDate: test?.retestDate || '', // Added retestDate
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      value: formData.value ? Number(formData.value) : undefined
    }
    onSave(submitData)
  }

  const getUnitForTestType = (testType: string) => {
    switch (testType) {
      case 'moisture': return '%'
      case 'nicotine': return 'mg/g'
      case 'ph': return 'pH'
      case 'contamination': return 'ppm'
      case 'aroma': return 'score' // Added aroma
      case 'burn-rate': return 'mm/min' // Added burn-rate
      case 'ash-content': return '%' // Added ash-content
      case 'tar-content': return 'mg/cigarette' // Added tar-content
      case 'carbon-monoxide': return 'mg/cigarette' // Added carbon-monoxide
      default: return ''
    }
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
                  Production Batch *
                </label>
                <select
                  required
                  value={formData.batchId}
                  onChange={(e) => setFormData(prev => ({ ...prev, batchId: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="">Select Batch</option>
                  {batches.map(batch => (
                    <option key={batch.id} value={batch.id}>
                      {batch.batchNumber} - {batch.productType}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Test Type *
                </label>
                <select
                  required
                  value={formData.testType}
                  onChange={(e) => {
                    const newTestType = e.target.value as 'moisture' | 'nicotine' | 'ph' | 'contamination' | 'visual' | 'aroma' | 'burn-rate' | 'ash-content' | 'tar-content' | 'carbon-monoxide'
                    setFormData(prev => ({ 
                      ...prev, 
                      testType: newTestType,
                      unit: getUnitForTestType(newTestType)
                    }))
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="moisture">Moisture Content</option>
                  <option value="nicotine">Nicotine Level</option>
                  <option value="ph">pH Level</option>
                  <option value="contamination">Contamination</option>
                  <option value="visual">Visual Inspection</option>
                  <option value="aroma">Aroma Assessment</option>
                  <option value="burn-rate">Burn Rate</option>
                  <option value="ash-content">Ash Content</option>
                  <option value="tar-content">Tar Content</option>
                  <option value="carbon-monoxide">Carbon Monoxide</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Test Result *
                </label>
                <select
                  required
                  value={formData.result}
                  onChange={(e) => setFormData(prev => ({ ...prev, result: e.target.value as any }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                  <option value="conditional">Conditional</option>
                </select>
              </div>

              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Test Value
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
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
                  Unit
                </label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="e.g., %, mg/g, pH"
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Test Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.testDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, testDate: e.target.value }))}
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
                  Technician *
                </label>
                <select
                  required
                  value={formData.technicianId}
                  onChange={(e) => setFormData(prev => ({ ...prev, technicianId: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="">Select Technician</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} - {employee.position}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional test notes or observations..."
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

            {/* Compliance Status */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Compliance Status *
                </label>
                <select
                  required
                  value={formData.complianceStatus}
                  onChange={(e) => setFormData(prev => ({ ...prev, complianceStatus: e.target.value as any }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="compliant">Compliant</option>
                  <option value="non-compliant">Non-Compliant</option>
                  <option value="pending-review">Pending Review</option>
                </select>
              </div>

              {formData.complianceStatus === 'non-compliant' && (
                <>
                  <div>
                    <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                      Regulatory Standard
                    </label>
                    <input
                      type="text"
                      value={formData.regulatoryStandard}
                      onChange={(e) => setFormData(prev => ({ ...prev, regulatoryStandard: e.target.value }))}
                      placeholder="e.g., ISO 6488:2004"
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
                      Corrective Actions
                    </label>
                    <textarea
                      value={formData.correctiveActions.join(', ')}
                      onChange={(e) => setFormData(prev => ({ ...prev, correctiveActions: e.target.value.split(',').map(action => action.trim()) }))}
                      placeholder="e.g., Additional drying process required, Retest after 24 hours"
                      rows={2}
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
                  <div>
                    <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                      Retest Required
                    </label>
                    <select
                      value={formData.retestRequired ? 'yes' : 'no'}
                      onChange={(e) => setFormData(prev => ({ ...prev, retestRequired: e.target.value === 'yes' }))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        background: 'var(--bg-dark)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  {formData.retestRequired && (
                    <div>
                      <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                        Retest Date
                      </label>
                      <input
                        type="date"
                        value={formData.retestDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, retestDate: e.target.value }))}
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
                  )}
                </>
              )}
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
              {test ? 'Update' : 'Add'} Test
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QualityControl 