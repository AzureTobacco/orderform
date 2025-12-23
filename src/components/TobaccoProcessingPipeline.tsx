import React, { useState, useEffect } from 'react'
import { 
  Leaf, 
  Thermometer, 
  Droplets, 
  Clock, 
  BarChart3, 
  CheckCircle, 
  AlertTriangle, 
  Package, 
  Beaker, 
  Scale, 
  Timer, 
  TrendingUp,
  Eye,
  Settings,
  FileText,
  Award,
  Target,
  Activity,
  Zap,
  Filter,
  Layers,
  Gauge
} from 'lucide-react'

interface TobaccoLeaf {
  id: string
  batchId: string
  origin: string
  variety: string
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C'
  moistureContent: number
  weight: number
  receivedDate: string
  curingMethod: 'air' | 'fire' | 'flue' | 'sun'
  status: 'received' | 'grading' | 'curing' | 'fermentation' | 'ready' | 'blended'
  qualityScore: number
  defects: string[]
  storageLocation: string
}

interface CuringProcess {
  id: string
  batchId: string
  method: 'air' | 'fire' | 'flue' | 'sun'
  startDate: string
  estimatedEndDate: string
  currentPhase: string
  temperature: number
  humidity: number
  targetTemperature: number
  targetHumidity: number
  duration: number
  status: 'active' | 'completed' | 'paused' | 'failed'
  qualityChecks: QualityCheck[]
}

interface FermentationBatch {
  id: string
  leafBatches: string[]
  startDate: string
  duration: number
  temperature: number
  humidity: number
  ph: number
  status: 'active' | 'completed' | 'monitoring'
  qualityMetrics: {
    aroma: number
    color: number
    texture: number
    overall: number
  }
}

interface BlendRecipe {
  id: string
  name: string
  description: string
  targetProfile: {
    strength: number
    flavor: string[]
    aroma: number
    burn: number
  }
  ingredients: {
    leafType: string
    percentage: number
    grade: string
    origin: string
  }[]
  status: 'draft' | 'approved' | 'production' | 'archived'
  createdBy: string
  approvedBy?: string
  productionBatches: string[]
}

interface QualityCheck {
  id: string
  batchId: string
  checkType: 'visual' | 'moisture' | 'chemical' | 'burn' | 'taste'
  result: 'pass' | 'fail' | 'conditional'
  score: number
  notes: string
  inspector: string
  timestamp: string
  corrective_actions?: string[]
}

const TobaccoProcessingPipeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [tobaccoLeaves, setTobaccoLeaves] = useState<TobaccoLeaf[]>([])
  const [curingProcesses, setCuringProcesses] = useState<CuringProcess[]>([])
  const [fermentationBatches, setFermentationBatches] = useState<FermentationBatch[]>([])
  const [blendRecipes, setBlendRecipes] = useState<BlendRecipe[]>([])
  const [qualityChecks, setQualityChecks] = useState<QualityCheck[]>([])

  useEffect(() => {
    loadMockData()
  }, [])

  const loadMockData = () => {
    // Mock tobacco leaves data
    const mockLeaves: TobaccoLeaf[] = [
      {
        id: 'TL001',
        batchId: 'BTH-2024-001',
        origin: 'Virginia, USA',
        variety: 'Virginia Bright',
        grade: 'A+',
        moistureContent: 12.5,
        weight: 500,
        receivedDate: '2024-01-15',
        curingMethod: 'flue',
        status: 'curing',
        qualityScore: 95,
        defects: [],
        storageLocation: 'Warehouse A-1'
      },
      {
        id: 'TL002',
        batchId: 'BTH-2024-002',
        origin: 'Burley, Kentucky',
        variety: 'Burley',
        grade: 'A',
        moistureContent: 14.2,
        weight: 750,
        receivedDate: '2024-01-18',
        curingMethod: 'air',
        status: 'fermentation',
        qualityScore: 88,
        defects: ['minor discoloration'],
        storageLocation: 'Warehouse B-2'
      },
      {
        id: 'TL003',
        batchId: 'BTH-2024-003',
        origin: 'Oriental, Turkey',
        variety: 'Oriental',
        grade: 'A+',
        moistureContent: 11.8,
        weight: 300,
        receivedDate: '2024-01-20',
        curingMethod: 'sun',
        status: 'ready',
        qualityScore: 92,
        defects: [],
        storageLocation: 'Warehouse C-1'
      }
    ]

    // Mock curing processes
    const mockCuring: CuringProcess[] = [
      {
        id: 'CP001',
        batchId: 'BTH-2024-001',
        method: 'flue',
        startDate: '2024-01-16',
        estimatedEndDate: '2024-01-23',
        currentPhase: 'Yellowing Phase',
        temperature: 32,
        humidity: 85,
        targetTemperature: 35,
        targetHumidity: 80,
        duration: 168,
        status: 'active',
        qualityChecks: []
      },
      {
        id: 'CP002',
        batchId: 'BTH-2024-002',
        method: 'air',
        startDate: '2024-01-19',
        estimatedEndDate: '2024-02-19',
        currentPhase: 'Drying Phase',
        temperature: 22,
        humidity: 65,
        targetTemperature: 25,
        targetHumidity: 60,
        duration: 720,
        status: 'active',
        qualityChecks: []
      }
    ]

    // Mock fermentation batches
    const mockFermentation: FermentationBatch[] = [
      {
        id: 'FB001',
        leafBatches: ['BTH-2024-002'],
        startDate: '2024-01-25',
        duration: 30,
        temperature: 55,
        humidity: 70,
        ph: 5.8,
        status: 'active',
        qualityMetrics: {
          aroma: 85,
          color: 90,
          texture: 88,
          overall: 87
        }
      }
    ]

    // Mock blend recipes
    const mockBlends: BlendRecipe[] = [
      {
        id: 'BR001',
        name: 'Premium Gold Blend',
        description: 'Premium blend for luxury cigarettes',
        targetProfile: {
          strength: 7,
          flavor: ['smooth', 'rich', 'aromatic'],
          aroma: 9,
          burn: 8
        },
        ingredients: [
          { leafType: 'Virginia Bright', percentage: 60, grade: 'A+', origin: 'Virginia, USA' },
          { leafType: 'Burley', percentage: 25, grade: 'A', origin: 'Kentucky, USA' },
          { leafType: 'Oriental', percentage: 15, grade: 'A+', origin: 'Turkey' }
        ],
        status: 'approved',
        createdBy: 'Master Blender',
        approvedBy: 'Quality Director',
        productionBatches: ['PB001', 'PB002']
      }
    ]

    setTobaccoLeaves(mockLeaves)
    setCuringProcesses(mockCuring)
    setFermentationBatches(mockFermentation)
    setBlendRecipes(mockBlends)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'approved': case 'ready': case 'pass': return '#10b981'
      case 'completed': case 'production': return '#3b82f6'
      case 'paused': case 'conditional': return '#f59e0b'
      case 'failed': case 'fail': return '#ef4444'
      case 'draft': case 'monitoring': return '#6b7280'
      default: return '#6b7280'
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return '#10b981'
      case 'A': return '#3b82f6'
      case 'B+': return '#f59e0b'
      case 'B': return '#f97316'
      case 'C': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const renderOverview = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      {/* Pipeline Status Cards */}
      <div className="cosmic-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.2)', 
            padding: '12px', 
            borderRadius: '12px' 
          }}>
            <Leaf size={24} style={{ color: '#10b981' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>Raw Material Inventory</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Active tobacco batches</p>
          </div>
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#10b981',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          marginBottom: '8px'
        }}>
          {tobaccoLeaves.length}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Total weight: {tobaccoLeaves.reduce((sum, leaf) => sum + leaf.weight, 0)} kg
        </div>
      </div>

      <div className="cosmic-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ 
            background: 'rgba(59, 130, 246, 0.2)', 
            padding: '12px', 
            borderRadius: '12px' 
          }}>
            <Thermometer size={24} style={{ color: '#3b82f6' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>Active Curing</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Processes in progress</p>
          </div>
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#3b82f6',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          marginBottom: '8px'
        }}>
          {curingProcesses.filter(p => p.status === 'active').length}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Avg completion: 65%
        </div>
      </div>

      <div className="cosmic-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ 
            background: 'rgba(139, 92, 246, 0.2)', 
            padding: '12px', 
            borderRadius: '12px' 
          }}>
            <Beaker size={24} style={{ color: '#8b5cf6' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>Fermentation</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Active batches</p>
          </div>
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#8b5cf6',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          marginBottom: '8px'
        }}>
          {fermentationBatches.filter(b => b.status === 'active').length}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Avg quality: 87%
        </div>
      </div>

      <div className="cosmic-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ 
            background: 'rgba(245, 158, 11, 0.2)', 
            padding: '12px', 
            borderRadius: '12px' 
          }}>
            <Scale size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>Blend Recipes</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Approved formulations</p>
          </div>
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#f59e0b',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          marginBottom: '8px'
        }}>
          {blendRecipes.filter(r => r.status === 'approved').length}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Ready for production
        </div>
      </div>

      {/* Process Flow Visualization */}
      <div className="cosmic-card" style={{ padding: '24px', gridColumn: '1 / -1' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '24px', fontSize: '20px' }}>
          <Activity size={24} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Tobacco Processing Pipeline Flow
        </h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px', 
          overflowX: 'auto',
          padding: '16px 0'
        }}>
          {[
            { icon: Leaf, label: 'Raw Material\nReceiving', status: 'active', count: 3 },
            { icon: Eye, label: 'Grading &\nClassification', status: 'active', count: 2 },
            { icon: Thermometer, label: 'Curing\nProcess', status: 'active', count: 2 },
            { icon: Beaker, label: 'Fermentation', status: 'active', count: 1 },
            { icon: Scale, label: 'Blending', status: 'ready', count: 1 },
            { icon: Package, label: 'Final\nProduct', status: 'completed', count: 5 }
          ].map((step, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'center', minWidth: '120px' }}>
                <div style={{
                  background: `rgba(${getStatusColor(step.status).slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ')}, 0.2)`,
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  position: 'relative'
                }}>
                  <step.icon size={24} style={{ color: getStatusColor(step.status) }} />
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: getStatusColor(step.status),
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {step.count}
                  </div>
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'var(--text-secondary)', 
                  whiteSpace: 'pre-line',
                  lineHeight: '1.3'
                }}>
                  {step.label}
                </div>
              </div>
              {index < 5 && (
                <div style={{
                  width: '40px',
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--cosmic-primary), transparent)',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    right: '-4px',
                    top: '-3px',
                    width: '8px',
                    height: '8px',
                    background: 'var(--cosmic-primary)',
                    clipPath: 'polygon(0 0, 100% 50%, 0 100%)'
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderLeafInventory = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', margin: 0 }}>
          <Leaf size={28} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Tobacco Leaf Inventory
        </h3>
        <button className="cosmic-button" style={{ padding: '12px 24px' }}>
          + Add New Batch
        </button>
      </div>

      <div className="cosmic-table" style={{ marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left' }}>Batch ID</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Variety</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Origin</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Grade</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Weight (kg)</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Moisture %</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Quality Score</th>
            </tr>
          </thead>
          <tbody>
            {tobaccoLeaves.map((leaf) => (
              <tr key={leaf.id}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{leaf.batchId}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{leaf.id}</div>
                </td>
                <td style={{ padding: '16px', color: 'var(--text-primary)' }}>{leaf.variety}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{leaf.origin}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    background: `${getGradeColor(leaf.grade)}20`,
                    color: getGradeColor(leaf.grade),
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {leaf.grade}
                  </span>
                </td>
                <td style={{ 
                  padding: '16px', 
                  color: 'var(--text-primary)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontWeight: '600'
                }}>
                  {leaf.weight}
                </td>
                <td style={{ 
                  padding: '16px', 
                  color: leaf.moistureContent > 15 ? '#ef4444' : leaf.moistureContent < 10 ? '#f59e0b' : '#10b981',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontWeight: '600'
                }}>
                  {leaf.moistureContent}%
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    background: `${getStatusColor(leaf.status)}20`,
                    color: getStatusColor(leaf.status),
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {leaf.status}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '60px',
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${leaf.qualityScore}%`,
                        height: '100%',
                        background: leaf.qualityScore >= 90 ? '#10b981' : leaf.qualityScore >= 80 ? '#f59e0b' : '#ef4444',
                        borderRadius: '3px'
                      }} />
                    </div>
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: '600',
                      color: leaf.qualityScore >= 90 ? '#10b981' : leaf.qualityScore >= 80 ? '#f59e0b' : '#ef4444',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                    }}>
                      {leaf.qualityScore}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderCuringMonitoring = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', margin: 0 }}>
          <Thermometer size={28} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Curing Process Monitoring
        </h3>
        <button className="cosmic-button" style={{ padding: '12px 24px' }}>
          + Start New Curing
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {curingProcesses.map((process) => (
          <div key={process.id} className="cosmic-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h4 style={{ color: 'var(--text-primary)', margin: '0 0 4px 0', fontSize: '18px' }}>
                  {process.batchId}
                </h4>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                  {process.method.charAt(0).toUpperCase() + process.method.slice(1)} Curing
                </p>
              </div>
              <span style={{
                background: `${getStatusColor(process.status)}20`,
                color: getStatusColor(process.status),
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}>
                {process.status}
              </span>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Current Phase: <strong style={{ color: 'var(--text-primary)' }}>{process.currentPhase}</strong>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Temperature</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Thermometer size={16} style={{ color: '#ef4444' }} />
                    <span style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      color: Math.abs(process.temperature - process.targetTemperature) <= 2 ? '#10b981' : '#f59e0b',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                    }}>
                      {process.temperature}°C
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      (Target: {process.targetTemperature}°C)
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Humidity</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Droplets size={16} style={{ color: '#3b82f6' }} />
                    <span style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      color: Math.abs(process.humidity - process.targetHumidity) <= 5 ? '#10b981' : '#f59e0b',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                    }}>
                      {process.humidity}%
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      (Target: {process.targetHumidity}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Progress</span>
                <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600' }}>
                  {Math.round(((new Date().getTime() - new Date(process.startDate).getTime()) / (1000 * 60 * 60)) / process.duration * 100)}%
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(100, Math.round(((new Date().getTime() - new Date(process.startDate).getTime()) / (1000 * 60 * 60)) / process.duration * 100))}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--cosmic-primary), var(--cosmic-accent))',
                  borderRadius: '4px'
                }} />
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
                View Details
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
                Quality Check
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderBlendRecipes = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', margin: 0 }}>
          <Scale size={28} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Blend Recipe Management
        </h3>
        <button className="cosmic-button" style={{ padding: '12px 24px' }}>
          + Create New Recipe
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
        {blendRecipes.map((recipe) => (
          <div key={recipe.id} className="cosmic-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h4 style={{ color: 'var(--text-primary)', margin: '0 0 4px 0', fontSize: '18px' }}>
                  {recipe.name}
                </h4>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                  {recipe.description}
                </p>
              </div>
              <span style={{
                background: `${getStatusColor(recipe.status)}20`,
                color: getStatusColor(recipe.status),
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}>
                {recipe.status}
              </span>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '14px', marginBottom: '12px' }}>Target Profile</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Strength</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '60px',
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${recipe.targetProfile.strength * 10}%`,
                        height: '100%',
                        background: '#f59e0b',
                        borderRadius: '3px'
                      }} />
                    </div>
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: 'var(--text-primary)',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                    }}>
                      {recipe.targetProfile.strength}/10
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Aroma</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '60px',
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${recipe.targetProfile.aroma * 10}%`,
                        height: '100%',
                        background: '#8b5cf6',
                        borderRadius: '3px'
                      }} />
                    </div>
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: 'var(--text-primary)',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                    }}>
                      {recipe.targetProfile.aroma}/10
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Flavor Profile</div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {recipe.targetProfile.flavor.map((flavor, index) => (
                    <span key={index} style={{
                      background: 'rgba(139, 92, 246, 0.2)',
                      color: '#8b5cf6',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px'
                    }}>
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '14px', marginBottom: '12px' }}>Ingredients</h5>
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: index < recipe.ingredients.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>
                      {ingredient.leafType}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {ingredient.origin} • Grade {ingredient.grade}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: 'var(--cosmic-primary)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  }}>
                    {ingredient.percentage}%
                  </div>
                </div>
              ))}
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
                Edit Recipe
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
                Start Production
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const tabs = [
    { id: 'overview', label: 'Pipeline Overview', icon: BarChart3 },
    { id: 'inventory', label: 'Leaf Inventory', icon: Leaf },
    { id: 'curing', label: 'Curing Monitoring', icon: Thermometer },
    { id: 'fermentation', label: 'Fermentation', icon: Beaker },
    { id: 'blending', label: 'Blend Recipes', icon: Scale },
    { id: 'quality', label: 'Quality Control', icon: CheckCircle }
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
            background: 'linear-gradient(135deg, #10b981, #059669)',
            padding: '12px',
            borderRadius: '12px'
          }}>
            <Leaf size={32} style={{ color: 'white' }} />
          </div>
          Tobacco Processing Pipeline
        </h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '16px' }}>
          Complete tobacco processing workflow from raw leaf to finished blend
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
        {activeTab === 'inventory' && renderLeafInventory()}
        {activeTab === 'curing' && renderCuringMonitoring()}
        {activeTab === 'blending' && renderBlendRecipes()}
        {activeTab === 'fermentation' && (
          <div className="cosmic-card" style={{ padding: '48px', textAlign: 'center' }}>
            <Beaker size={48} style={{ color: 'var(--cosmic-primary)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Fermentation Module</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Advanced fermentation tracking coming soon...</p>
          </div>
        )}
        {activeTab === 'quality' && (
          <div className="cosmic-card" style={{ padding: '48px', textAlign: 'center' }}>
            <CheckCircle size={48} style={{ color: 'var(--cosmic-primary)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Quality Control Module</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Comprehensive quality management system coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TobaccoProcessingPipeline 