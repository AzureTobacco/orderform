import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Factory, Plus, Edit, Trash2, Search, Play, Pause, CheckCircle, AlertTriangle, Clock, Users, Package, Calendar, Settings, BarChart3, Wrench, AlertCircle, Building, Activity, TrendingUp } from 'lucide-react'
import { dataService } from '../services/dataService'
import type { ProductionBatch, Employee, RawMaterial } from '../services/dataService'
import { AnimatedCounter, StatusBadge } from './ModernUI'

interface ProductionManagementProps {}

interface ProductionOrder {
  id: string
  orderNumber: string
  productName: string
  productSku: string
  quantity: number
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'planned' | 'in-progress' | 'quality-check' | 'completed' | 'on-hold'
  startDate: string
  endDate: string
  estimatedDuration: number
  actualDuration?: number
  assignedTeam: string
  supervisor: string
  stages: ProductionStage[]
  materials: MaterialRequirement[]
  qualityChecks: QualityCheck[]
  notes: string
}

interface ProductionStage {
  id: string
  name: string
  description: string
  estimatedHours: number
  actualHours?: number
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  assignedWorker: string
  startTime?: string
  endTime?: string
  notes: string
}

interface MaterialRequirement {
  materialId: string
  materialName: string
  requiredQuantity: number
  allocatedQuantity: number
  unit: string
  cost: number
}

interface QualityCheck {
  id: string
  checkName: string
  status: 'pending' | 'passed' | 'failed' | 'requires-rework'
  inspector: string
  checkDate?: string
  notes: string
  criteria: string[]
}

interface ProductionMetrics {
  efficiency: number
  qualityRate: number
  onTimeDelivery: number
  utilization: number
  defectRate: number
  throughput: number
}

interface WorkStation {
  id: string
  name: string
  type: string
  status: 'available' | 'busy' | 'maintenance' | 'offline'
  currentOrder?: string
  capacity: number
  utilization: number
  lastMaintenance: string
  nextMaintenance: string
}

const ProductionManagement: React.FC<ProductionManagementProps> = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [batches, setBatches] = useState<ProductionBatch[]>([])
  const [filteredBatches, setFilteredBatches] = useState<ProductionBatch[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [materials, setMaterials] = useState<RawMaterial[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStage, setFilterStage] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddOrderModal, setShowAddOrderModal] = useState(false)
  const [showEditOrderModal, setShowEditOrderModal] = useState(false)
  const [showStationModal, setShowStationModal] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState<ProductionBatch | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null)
  const [selectedStation, setSelectedStation] = useState<WorkStation | null>(null)
  const [loading, setLoading] = useState(true)
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([])
  const [workStations, setWorkStations] = useState<WorkStation[]>([])
  const [metrics, setMetrics] = useState<ProductionMetrics>({
    efficiency: 94.2,
    qualityRate: 99.1,
    onTimeDelivery: 96.8,
    utilization: 87.5,
    defectRate: 0.9,
    throughput: 145
  })

  const stages = [
    'preparation', 'blending', 'flavoring', 'curing', 'drying', 'quality-check', 'packaging', 'completed'
  ]

  const stageColors = {
    preparation: '#fbbf24',
    blending: '#f59e0b',
    flavoring: '#d97706',
    curing: '#92400e',
    drying: '#78350f',
    'quality-check': '#3b82f6',
    packaging: '#10b981',
    completed: '#059669'
  }

  useEffect(() => {
    loadData()
    loadProductionData()
    loadWorkStations()
  }, [])

  useEffect(() => {
    filterBatches()
  }, [batches, searchTerm, filterStage, filterPriority])

  const loadData = () => {
    setLoading(true)
    try {
      const batchData = dataService.getProductionBatches()
      const employeeData = dataService.getEmployees()
      const materialData = dataService.getRawMaterials()
      
      setBatches(batchData)
      setEmployees(employeeData)
      setMaterials(materialData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterBatches = () => {
    let filtered = batches

    if (searchTerm) {
      filtered = filtered.filter(batch => 
        batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batch.productType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterStage !== 'all') {
      filtered = filtered.filter(batch => batch.stage === filterStage)
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(batch => batch.priority === filterPriority)
    }

    setFilteredBatches(filtered)
  }

  const handleAddBatch = (batchData: Omit<ProductionBatch, 'id'>) => {
    try {
      const newBatch = dataService.addProductionBatch(batchData)
      setBatches(prev => [...prev, newBatch])
      setShowAddModal(false)
    } catch (error) {
      console.error('Error adding batch:', error)
    }
  }

  const handleEditBatch = (batchData: Partial<ProductionBatch>) => {
    if (!selectedBatch) return
    
    try {
      const updatedBatch = dataService.updateProductionBatch(selectedBatch.id, batchData)
      if (updatedBatch) {
        setBatches(prev => prev.map(batch => 
          batch.id === selectedBatch.id ? updatedBatch : batch
        ))
        setShowEditModal(false)
        setSelectedBatch(null)
      }
    } catch (error) {
      console.error('Error updating batch:', error)
    }
  }

  const handleDeleteBatch = (batchId: string) => {
    if (confirm('Are you sure you want to delete this batch?')) {
      try {
        setBatches(prev => prev.filter(batch => batch.id !== batchId))
      } catch (error) {
        console.error('Error deleting batch:', error)
      }
    }
  }

  const handleStageChange = (batchId: string, newStage: "preparation" | "blending" | "flavoring" | "curing" | "drying" | "quality-check" | "packaging" | "completed") => {
    try {
      const updatedBatch = dataService.updateProductionBatch(batchId, { stage: newStage })
      if (updatedBatch) {
        setBatches(prev => prev.map(batch => 
          batch.id === batchId ? updatedBatch : batch
        ))
      }
    } catch (error) {
      console.error('Error updating batch stage:', error)
    }
  }

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId)
    return employee ? employee.name : 'Unknown'
  }

  const getMaterialName = (materialId: string) => {
    const material = materials.find(mat => mat.id === materialId)
    return material ? material.name : 'Unknown'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#ef4444'
      case 'high': return '#f59e0b'
      case 'medium': return '#06b6d4'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getStageProgress = (stage: string) => {
    const index = stages.indexOf(stage)
    return index >= 0 ? ((index + 1) / stages.length) * 100 : 0
  }

  const loadProductionData = () => {
    const sampleOrders: ProductionOrder[] = [
      {
        id: 'prod-001',
        orderNumber: 'PROD-2024-001',
        productName: 'Premium Tobacco Blend A',
        productSku: 'PTB-A-001',
        quantity: 500,
        priority: 'high',
        status: 'in-progress',
        startDate: '2024-01-15',
        endDate: '2024-01-25',
        estimatedDuration: 10,
        actualDuration: 6,
        assignedTeam: 'Team Alpha',
        supervisor: 'Ahmed Hassan',
        stages: [
          { id: 'stage-001', name: 'Preparation', description: 'Initial setup', estimatedHours: 2, actualHours: 1.5, status: 'completed', assignedWorker: 'John Smith', startTime: '2024-01-15T08:00:00Z', endTime: '2024-01-15T09:30:00Z', notes: 'Completed ahead of schedule' },
          { id: 'stage-002', name: 'Blending', description: 'Mix ingredients', estimatedHours: 4, actualHours: 3, status: 'completed', assignedWorker: 'Sarah Wilson', startTime: '2024-01-15T10:00:00Z', endTime: '2024-01-15T13:00:00Z', notes: 'Perfect blend achieved' },
          { id: 'stage-003', name: 'Curing', description: 'Curing process', estimatedHours: 24, status: 'in-progress', assignedWorker: 'Mike Johnson', startTime: '2024-01-16T08:00:00Z', notes: 'In progress, monitoring temperature' },
          { id: 'stage-004', name: 'Quality Check', description: 'Final quality assessment', estimatedHours: 2, status: 'pending', assignedWorker: 'Lisa Brown', notes: 'Awaiting curing completion' }
        ],
        materials: [
          { materialId: 'mat-001', materialName: 'Virginia Tobacco', requiredQuantity: 200, allocatedQuantity: 200, unit: 'kg', cost: 5000 },
          { materialId: 'mat-002', materialName: 'Burley Tobacco', requiredQuantity: 150, allocatedQuantity: 150, unit: 'kg', cost: 3750 }
        ],
        qualityChecks: [
          { id: 'qc-001', checkName: 'Moisture Content', status: 'passed', inspector: 'Quality Team', checkDate: '2024-01-15', notes: 'Within acceptable range', criteria: ['Moisture < 12%'] },
          { id: 'qc-002', checkName: 'Blend Consistency', status: 'passed', inspector: 'Quality Team', checkDate: '2024-01-15', notes: 'Uniform blend achieved', criteria: ['Visual inspection', 'Texture test'] },
          { id: 'qc-003', checkName: 'Final Quality', status: 'pending', inspector: 'Quality Team', notes: 'Awaiting completion', criteria: ['Taste test', 'Aroma check'] }
        ],
        notes: 'High priority export order'
      },
      {
        id: 'prod-002',
        orderNumber: 'PROD-2024-002',
        productName: 'Classic Tobacco Mix',
        productSku: 'CTM-B-002',
        quantity: 750,
        priority: 'medium',
        status: 'quality-check',
        startDate: '2024-01-12',
        endDate: '2024-01-22',
        estimatedDuration: 10,
        actualDuration: 8,
        assignedTeam: 'Team Beta',
        supervisor: 'Sarah Johnson',
        stages: [
          { id: 'stage-005', name: 'Preparation', description: 'Initial setup', estimatedHours: 2, actualHours: 2, status: 'completed', assignedWorker: 'Tom Wilson', startTime: '2024-01-12T08:00:00Z', endTime: '2024-01-12T10:00:00Z', notes: 'Standard preparation completed' },
          { id: 'stage-006', name: 'Blending', description: 'Mix ingredients', estimatedHours: 4, actualHours: 4, status: 'completed', assignedWorker: 'Emma Davis', startTime: '2024-01-12T10:30:00Z', endTime: '2024-01-12T14:30:00Z', notes: 'Blend completed successfully' },
          { id: 'stage-007', name: 'Curing', description: 'Curing process', estimatedHours: 24, actualHours: 22, status: 'completed', assignedWorker: 'Alex Brown', startTime: '2024-01-13T08:00:00Z', endTime: '2024-01-14T06:00:00Z', notes: 'Completed early' },
          { id: 'stage-008', name: 'Quality Check', description: 'Final quality assessment', estimatedHours: 2, status: 'in-progress', assignedWorker: 'Lisa Brown', startTime: '2024-01-14T08:00:00Z', notes: 'Quality testing in progress' }
        ],
        materials: [
          { materialId: 'mat-003', materialName: 'Classic Blend Base', requiredQuantity: 300, allocatedQuantity: 300, unit: 'kg', cost: 6000 },
          { materialId: 'mat-004', materialName: 'Flavor Additives', requiredQuantity: 50, allocatedQuantity: 50, unit: 'kg', cost: 1500 }
        ],
        qualityChecks: [
          { id: 'qc-004', checkName: 'Moisture Content', status: 'passed', inspector: 'Quality Team', checkDate: '2024-01-14', notes: 'Optimal moisture level', criteria: ['Moisture < 12%'] },
          { id: 'qc-005', checkName: 'Blend Consistency', status: 'passed', inspector: 'Quality Team', checkDate: '2024-01-14', notes: 'Excellent consistency', criteria: ['Visual inspection', 'Texture test'] },
          { id: 'qc-006', checkName: 'Final Quality', status: 'requires-rework', inspector: 'Quality Team', checkDate: '2024-01-14', notes: 'Minor adjustments needed', criteria: ['Taste test', 'Aroma check'] }
        ],
        notes: 'Standard domestic order'
      },
      {
        id: 'prod-003',
        orderNumber: 'PROD-2024-003',
        productName: 'Oriental Premium',
        productSku: 'OP-C-003',
        quantity: 300,
        priority: 'urgent',
        status: 'planned',
        startDate: '2024-01-20',
        endDate: '2024-01-28',
        estimatedDuration: 8,
        assignedTeam: 'Team Gamma',
        supervisor: 'Michael Chen',
        stages: [
          { id: 'stage-009', name: 'Preparation', description: 'Initial setup', estimatedHours: 2, status: 'pending', assignedWorker: 'David Lee', notes: 'Scheduled to start' },
          { id: 'stage-010', name: 'Blending', description: 'Mix ingredients', estimatedHours: 3, status: 'pending', assignedWorker: 'Maria Garcia', notes: 'Awaiting preparation completion' },
          { id: 'stage-011', name: 'Curing', description: 'Curing process', estimatedHours: 20, status: 'pending', assignedWorker: 'Robert Taylor', notes: 'Equipment reserved' },
          { id: 'stage-012', name: 'Quality Check', description: 'Final quality assessment', estimatedHours: 2, status: 'pending', assignedWorker: 'Lisa Brown', notes: 'Quality protocols prepared' }
        ],
        materials: [
          { materialId: 'mat-005', materialName: 'Oriental Tobacco', requiredQuantity: 250, allocatedQuantity: 0, unit: 'kg', cost: 7500 },
          { materialId: 'mat-006', materialName: 'Premium Additives', requiredQuantity: 25, allocatedQuantity: 0, unit: 'kg', cost: 2000 }
        ],
        qualityChecks: [
          { id: 'qc-007', checkName: 'Moisture Content', status: 'pending', inspector: 'Quality Team', notes: 'Pending start', criteria: ['Moisture < 12%'] },
          { id: 'qc-008', checkName: 'Blend Consistency', status: 'pending', inspector: 'Quality Team', notes: 'Pending start', criteria: ['Visual inspection', 'Texture test'] },
          { id: 'qc-009', checkName: 'Final Quality', status: 'pending', inspector: 'Quality Team', notes: 'Pending start', criteria: ['Taste test', 'Aroma check'] }
        ],
        notes: 'Rush order for premium client'
      }
    ]
    setProductionOrders(sampleOrders)
  }

  const loadWorkStations = () => {
    const sampleStations: WorkStation[] = [
      {
        id: 'ws-001',
        name: 'Blending Station 1',
        type: 'Blending',
        status: 'busy',
        currentOrder: 'PROD-2024-001',
        capacity: 100,
        utilization: 85,
        lastMaintenance: '2024-01-01',
        nextMaintenance: '2024-02-01'
      },
      {
        id: 'ws-002',
        name: 'Curing Chamber A',
        type: 'Curing',
        status: 'available',
        capacity: 200,
        utilization: 0,
        lastMaintenance: '2024-01-05',
        nextMaintenance: '2024-02-05'
      },
      {
        id: 'ws-003',
        name: 'Packaging Line 1',
        type: 'Packaging',
        status: 'maintenance',
        capacity: 150,
        utilization: 0,
        lastMaintenance: '2024-01-15',
        nextMaintenance: '2024-02-15'
      }
    ]
    setWorkStations(sampleStations)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return '#6b7280'
      case 'in-progress': return '#3b82f6'
      case 'quality-check': return '#f59e0b'
      case 'completed': return '#10b981'
      case 'on-hold': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getStationStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10b981'
      case 'busy': return '#3b82f6'
      case 'maintenance': return '#f59e0b'
      case 'offline': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const calculateProgress = (stages: ProductionStage[]) => {
    if (stages.length === 0) return 0
    const completed = stages.filter(stage => stage.status === 'completed').length
    return (completed / stages.length) * 100
  }

  const renderOverview = () => (
    <div style={{ padding: '24px', display: 'grid', gap: '24px' }}>
      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        <div className="cosmic-card-modern">
          <h3 style={{ color: '#22c55e', marginBottom: '12px', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚡ Production Efficiency
          </h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            {metrics.efficiency}%
          </div>
          <div style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', marginBottom: '12px' }}>
            Overall efficiency rate
          </div>
          <div style={{ fontSize: '12px', color: '#22c55e' }}>
            ↗️ +2.3% vs last month
          </div>
        </div>

        <div className="cosmic-card-modern">
          <h3 style={{ color: '#3b82f6', marginBottom: '12px', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ✅ Quality Rate
          </h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            {metrics.qualityRate}%
          </div>
          <div style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', marginBottom: '12px' }}>
            Products passing QC
          </div>
          <div style={{ fontSize: '12px', color: '#22c55e' }}>
            ↗️ +0.8% vs last month
          </div>
        </div>

        <div className="cosmic-card-modern">
          <h3 style={{ color: '#a855f7', marginBottom: '12px', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🚚 On-Time Delivery
          </h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            {metrics.onTimeDelivery}%
          </div>
          <div style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', marginBottom: '12px' }}>
            Orders delivered on time
          </div>
          <div style={{ fontSize: '12px', color: '#22c55e' }}>
            ↗️ +1.5% vs last month
          </div>
        </div>

        <div className="cosmic-card-modern">
          <h3 style={{ color: '#f59e0b', marginBottom: '12px', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📊 Throughput
          </h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            {metrics.throughput}
          </div>
          <div style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', marginBottom: '12px' }}>
            Units per day
          </div>
          <div style={{ fontSize: '12px', color: '#22c55e' }}>
            ↗️ +8 units vs yesterday
          </div>
        </div>
      </div>

      {/* Active Production Orders and Work Stations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px' }}>
        <div className="cosmic-card-modern">
          <h3 style={{ color: 'white', marginBottom: '24px', fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏭 Active Production Orders
          </h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            {productionOrders
              .filter(order => order.status === 'in-progress')
              .map(order => (
                <div key={order.id} className="cosmic-card-compact">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontWeight: '600', color: 'white' }}>{order.orderNumber}</div>
                    <div style={{
                      background: getPriorityColor(order.priority),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {order.priority.toUpperCase()}
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px' }}>
                    {order.productName} - {order.quantity} units
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.5)', marginBottom: '12px' }}>
                    Team: {order.assignedTeam} | Supervisor: {order.supervisor}
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(51, 65, 85, 0.5)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      width: `${calculateProgress(order.stages)}%`,
                      height: '100%',
                      background: getStatusColor(order.status),
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                    Progress: {calculateProgress(order.stages)}% complete
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="cosmic-card-modern">
          <h3 style={{ color: 'white', marginBottom: '24px', fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔧 Work Station Status
          </h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            {workStations.map(station => (
              <div key={station.id} className="cosmic-card-compact" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: '600', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{station.name}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.5)' }}>{station.type}</div>
                  {station.currentOrder && (
                    <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.5)' }}>
                      Order: {station.currentOrder}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <div style={{
                    background: getStationStatusColor(station.status),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {station.status.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                    {station.utilization}% utilized
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            <div className="text-white text-xl">Loading Production Management...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Factory style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 4px 0'
              }}>
                Production Management
              </h1>
              <p style={{
                color: 'rgba(6, 182, 212, 0.7)',
                fontSize: '16px',
                margin: '0'
              }}>
                Manufacturing operations, quality control, and production scheduling
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus style={{ width: '16px', height: '16px' }} />
            New Batch
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'orders', label: '🏭 Production Orders', icon: '🏭' },
            { id: 'batches', label: '📦 Batch Management', icon: '📦' },
            { id: 'stations', label: '🔧 Work Stations', icon: '🔧' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #06b6d4, #0891b2)' 
                  : 'rgba(30, 41, 59, 0.3)',
                border: activeTab === tab.id 
                  ? '1px solid #06b6d4' 
                  : '1px solid rgba(30, 41, 59, 0.3)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(8px)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && renderOverview()}

        {activeTab === 'batches' && (
          <div>
            {/* Search and Filters */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '24px',
              background: 'rgba(30, 41, 59, 0.3)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid rgba(6, 182, 212, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <Search style={{ width: '16px', height: '16px', color: 'rgba(6, 182, 212, 0.7)' }} />
                <input
                  type="text"
                  placeholder="Search batches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(30, 41, 59, 0.5)',
                    color: 'white',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  color: 'white',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Stages</option>
                {stages.map(stage => (
                  <option key={stage} value={stage}>
                    {stage.charAt(0).toUpperCase() + stage.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  color: 'white',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Batches List */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.3)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{ marginBottom: '24px', color: 'white', fontSize: '18px', fontWeight: '600' }}>
                🏭 Production Batches ({filteredBatches.length})
              </h3>
              
              {loading ? (
                <div style={{ textAlign: 'center', padding: '48px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  Loading batches...
                </div>
              ) : filteredBatches.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏭</div>
                  <h3 style={{ color: 'white', marginBottom: '8px' }}>No Batches Found</h3>
                  <p style={{ color: 'rgba(6, 182, 212, 0.7)' }}>
                    {searchTerm || filterStage !== 'all' || filterPriority !== 'all' 
                      ? 'No batches match your current filters' 
                      : 'No production batches available'}
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {filteredBatches.map(batch => (
                    <div key={batch.id} style={{
                      padding: '20px',
                      background: 'rgba(51, 65, 85, 0.3)',
                      borderRadius: '8px',
                      border: '1px solid rgba(6, 182, 212, 0.1)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                          <h4 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '18px' }}>
                            {batch.batchNumber}
                          </h4>
                          <p style={{ color: 'rgba(6, 182, 212, 0.7)', margin: '0 0 8px 0' }}>
                            {batch.productType} - {batch.quantity} kg
                          </p>
                          <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.5)' }}>
                            Started: {new Date(batch.startDate).toLocaleDateString()} | 
                            Supervisor: {getEmployeeName(batch.operatorId)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span style={{
                            background: stageColors[batch.stage as keyof typeof stageColors] || '#6b7280',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {batch.stage.toUpperCase().replace('-', ' ')}
                          </span>
                          <span style={{
                            background: getPriorityColor(batch.priority),
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {batch.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '14px', color: 'white' }}>Progress</span>
                          <span style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                            {getStageProgress(batch.stage).toFixed(0)}%
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '8px',
                          background: 'rgba(51, 65, 85, 0.5)',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${getStageProgress(batch.stage)}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, ${stageColors[batch.stage as keyof typeof stageColors] || '#6b7280'}, ${stageColors[batch.stage as keyof typeof stageColors] || '#6b7280'}dd)`,
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.5)' }}>
                          Last updated: {new Date().toLocaleDateString()}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => {
                              setSelectedBatch(batch)
                              setShowEditModal(true)
                            }}
                            style={{
                              background: 'rgba(6, 182, 212, 0.2)',
                              color: '#06b6d4',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '8px',
                              cursor: 'pointer'
                            }}
                          >
                            <Edit style={{ width: '16px', height: '16px' }} />
                          </button>
                          <button
                            onClick={() => handleDeleteBatch(batch.id)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.2)',
                              color: '#ef4444',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '8px',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 style={{ width: '16px', height: '16px' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'stations' && (
          <div>
            {/* Stations Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              background: 'rgba(30, 41, 59, 0.3)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid rgba(6, 182, 212, 0.2)'
            }}>
              <div>
                <h3 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '20px', fontWeight: '600' }}>
                  🔧 Work Stations Management
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', margin: '0', fontSize: '14px' }}>
                  Monitor station status, utilization, and schedule maintenance
                </p>
              </div>
              <button
                onClick={() => setShowStationModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Settings style={{ width: '16px', height: '16px' }} />
                Add Station
              </button>
            </div>

            {/* Stations Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px' }}>
              {workStations.map(station => (
                <div key={station.id} style={{
                  background: 'rgba(30, 41, 59, 0.3)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  {/* Station Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
                        {station.name}
                      </h4>
                      <p style={{ color: 'rgba(6, 182, 212, 0.7)', margin: '0 0 8px 0', fontSize: '14px' }}>
                        {station.type}
                      </p>
                      {station.currentOrder && (
                        <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.5)' }}>
                          🏭 Current Order: {station.currentOrder}
                        </div>
                      )}
                    </div>
                    <span style={{
                      background: getStationStatusColor(station.status),
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {station.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Station Metrics */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: 'white' }}>Utilization</span>
                      <span style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                        {station.utilization}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${station.utilization}%`,
                        height: '100%',
                        background: station.utilization > 90 ? '#ef4444' : 
                                   station.utilization > 75 ? '#f59e0b' : '#06b6d4',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>

                  {/* Capacity & Maintenance */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.5)', marginBottom: '4px' }}>
                          Capacity
                        </div>
                        <div style={{ fontSize: '16px', color: 'white', fontWeight: '600' }}>
                          {station.capacity} units/day
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.5)', marginBottom: '4px' }}>
                          Status
                        </div>
                        <div style={{ fontSize: '14px', color: station.status === 'available' ? '#22c55e' : 
                                                                  station.status === 'busy' ? '#f59e0b' :
                                                                  station.status === 'maintenance' ? '#ef4444' : '#6b7280' }}>
                          {station.status === 'available' ? '✅ Available' :
                           station.status === 'busy' ? '🔄 In Use' :
                           station.status === 'maintenance' ? '🔧 Maintenance' : '❌ Offline'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Maintenance Schedule */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.5)', marginBottom: '8px' }}>
                      Maintenance Schedule
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(6, 182, 212, 0.7)' }}>
                      <div>Last: {new Date(station.lastMaintenance).toLocaleDateString()}</div>
                      <div>Next: {new Date(station.nextMaintenance).toLocaleDateString()}</div>
                    </div>
                    {new Date(station.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                      <div style={{ 
                        marginTop: '8px',
                        padding: '8px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <AlertTriangle style={{ width: '14px', height: '14px', color: '#ef4444' }} />
                        <span style={{ fontSize: '12px', color: '#ef4444' }}>
                          Maintenance due soon
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(6, 182, 212, 0.1)' }}>
                    <button
                      onClick={() => {
                        setSelectedStation(station)
                        setShowStationModal(true)
                      }}
                      style={{
                        background: 'rgba(6, 182, 212, 0.2)',
                        color: '#06b6d4',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        flex: 1,
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <Settings style={{ width: '12px', height: '12px' }} />
                      Configure
                    </button>
                    <button
                      style={{
                        background: station.status === 'maintenance' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: station.status === 'maintenance' ? '#22c55e' : '#ef4444',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        flex: 1,
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <Wrench style={{ width: '12px', height: '12px' }} />
                      {station.status === 'maintenance' ? 'Complete' : 'Maintenance'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Station Summary Cards */}
            <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{
                background: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
                <div style={{ fontSize: '24px', color: 'white', fontWeight: 'bold', marginBottom: '4px' }}>
                  {Math.round(workStations.reduce((acc, station) => acc + station.utilization, 0) / workStations.length)}%
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  Average Utilization
                </div>
              </div>

              <div style={{
                background: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
                <div style={{ fontSize: '24px', color: 'white', fontWeight: 'bold', marginBottom: '4px' }}>
                  {workStations.filter(s => s.status === 'available' || s.status === 'busy').length}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  Operational Stations
                </div>
              </div>

              <div style={{
                background: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔧</div>
                <div style={{ fontSize: '24px', color: 'white', fontWeight: 'bold', marginBottom: '4px' }}>
                  {workStations.filter(s => s.status === 'maintenance').length}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  Under Maintenance
                </div>
              </div>

              <div style={{
                background: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
                <div style={{ fontSize: '24px', color: 'white', fontWeight: 'bold', marginBottom: '4px' }}>
                  {workStations.filter(s => new Date(s.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                  Maintenance Due
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            {/* Orders Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              background: 'rgba(30, 41, 59, 0.3)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid rgba(6, 182, 212, 0.2)'
            }}>
              <div>
                <h3 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '20px', fontWeight: '600' }}>
                  🏭 Production Orders
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', margin: '0', fontSize: '14px' }}>
                  Manage and track all production orders and their progress
                </p>
              </div>
              <button
                onClick={() => setShowAddOrderModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Plus style={{ width: '16px', height: '16px' }} />
                New Order
              </button>
            </div>

            {/* Orders Grid */}
            <div style={{ display: 'grid', gap: '16px' }}>
              {productionOrders.map(order => (
                <div key={order.id} style={{
                  background: 'rgba(30, 41, 59, 0.3)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '12px',
                  padding: '24px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div>
                      <h4 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
                        {order.orderNumber}
                      </h4>
                      <p style={{ color: 'rgba(6, 182, 212, 0.7)', margin: '0 0 8px 0', fontSize: '16px' }}>
                        {order.productName} ({order.productSku})
                      </p>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'rgba(6, 182, 212, 0.5)' }}>
                        <span>📦 {order.quantity} units</span>
                        <span>👥 {order.assignedTeam}</span>
                        <span>👨‍💼 {order.supervisor}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{
                        background: getStatusColor(order.status),
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {order.status.toUpperCase().replace('-', ' ')}
                      </span>
                      <span style={{
                        background: getPriorityColor(order.priority),
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {order.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Stages Progress */}
                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ color: 'white', margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
                      Production Stages
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                      {order.stages.map(stage => (
                        <div key={stage.id} style={{
                          background: 'rgba(51, 65, 85, 0.3)',
                          border: '1px solid rgba(6, 182, 212, 0.1)',
                          borderRadius: '8px',
                          padding: '12px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>
                              {stage.name}
                            </span>
                            <span style={{
                              background: getStatusColor(stage.status),
                              color: 'white',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '10px',
                              fontWeight: '600'
                            }}>
                              {stage.status.toUpperCase()}
                            </span>
                          </div>
                          <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                            👤 {stage.assignedWorker}
                          </div>
                          <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.5)' }}>
                            ⏱️ {stage.estimatedHours}h est.
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quality Checks */}
                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ color: 'white', margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
                      Quality Checks
                    </h5>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {order.qualityChecks.map(check => (
                        <span key={check.id} style={{
                          background: check.status === 'passed' ? '#059669' :
                                     check.status === 'failed' ? '#ef4444' :
                                     check.status === 'requires-rework' ? '#f59e0b' : '#6b7280',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}>
                          {check.checkName}: {check.status.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(6, 182, 212, 0.1)' }}>
                    <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.5)' }}>
                      📅 {new Date(order.startDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setSelectedOrder(order)
                          setShowEditOrderModal(true)
                        }}
                        style={{
                          background: 'rgba(6, 182, 212, 0.2)',
                          color: '#06b6d4',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Edit style={{ width: '14px', height: '14px' }} />
                        Edit
                      </button>
                      <button
                        style={{
                          background: order.status === 'in-progress' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                          color: order.status === 'in-progress' ? '#ef4444' : '#22c55e',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {order.status === 'in-progress' ? <Pause style={{ width: '14px', height: '14px' }} /> : <Play style={{ width: '14px', height: '14px' }} />}
                        {order.status === 'in-progress' ? 'Pause' : 'Start'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Batch Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(6, 182, 212, 0.1)',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: '600' }}>
                🏭 Add New Production Batch
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(6, 182, 212, 0.7)',
                  cursor: 'pointer',
                  fontSize: '24px',
                  padding: '8px',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#06b6d4'
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(6, 182, 212, 0.7)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                Batch Number
              </label>
              <input
                type="text"
                placeholder="e.g., BTH-2024-001"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                Product Type
              </label>
              <select style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px'
              }}>
                <option value="">Select product type</option>
                <option value="Premium Blend">Premium Blend</option>
                <option value="Light Virginia">Light Virginia</option>
                <option value="Dark Burley">Dark Burley</option>
                <option value="Oriental Mix">Oriental Mix</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                  Priority
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'rgba(71, 85, 105, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(71, 85, 105, 0.7)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(71, 85, 105, 0.5)'
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(6, 182, 212, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Create Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Order Modal */}
      {showAddOrderModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(6, 182, 212, 0.1)',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: '600' }}>
                🏭 Create New Production Order
              </h3>
              <button
                onClick={() => setShowAddOrderModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(6, 182, 212, 0.7)',
                  cursor: 'pointer',
                  fontSize: '24px',
                  padding: '8px',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#06b6d4'
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(6, 182, 212, 0.7)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                Order Number
              </label>
              <input
                type="text"
                placeholder="e.g., PO-2024-001"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                Product SKU
              </label>
              <input
                type="text"
                placeholder="e.g., PRD-001"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                Product Name
              </label>
              <input
                type="text"
                placeholder="e.g., Premium Virginia Blend"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                  Priority
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                  Duration (hours)
                </label>
                <input
                  type="number"
                  placeholder="48"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                  Assigned Team
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  <option value="">Select team</option>
                  <option value="Production Team A">Production Team A</option>
                  <option value="Production Team B">Production Team B</option>
                  <option value="Quality Team">Quality Team</option>
                  <option value="Packaging Team">Packaging Team</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                  Supervisor
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  <option value="">Select supervisor</option>
                  <option value="John Smith">John Smith</option>
                  <option value="Sarah Johnson">Sarah Johnson</option>
                  <option value="Mike Davis">Mike Davis</option>
                  <option value="Lisa Wilson">Lisa Wilson</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                Notes
              </label>
              <textarea
                placeholder="Special instructions or notes for this production order..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => setShowAddOrderModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'rgba(71, 85, 105, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Station Configuration Modal */}
      {showStationModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            border: '1px solid rgba(6, 182, 212, 0.3)'
          }}>
            <h3 style={{ color: 'white', margin: '0 0 24px 0', fontSize: '20px', fontWeight: '600' }}>
              🔧 {selectedStation ? 'Configure Work Station' : 'Add New Work Station'}
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                Station Name
              </label>
              <input
                type="text"
                placeholder="e.g., Blending Station A"
                defaultValue={selectedStation?.name || ''}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                Station Type
              </label>
              <select 
                defaultValue={selectedStation?.type || ''}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px'
                }}
              >
                <option value="">Select station type</option>
                <option value="Blending">Blending</option>
                <option value="Curing">Curing</option>
                <option value="Drying">Drying</option>
                <option value="Packaging">Packaging</option>
                <option value="Quality Control">Quality Control</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                  Capacity (units/day)
                </label>
                <input
                  type="number"
                  placeholder="100"
                  defaultValue={selectedStation?.capacity || ''}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: 'rgba(6, 182, 212, 0.7)', marginBottom: '8px', fontSize: '14px' }}>
                  Status
                </label>
                <select 
                  defaultValue={selectedStation?.status || 'available'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => {
                  setShowStationModal(false)
                  setSelectedStation(null)
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'rgba(71, 85, 105, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {selectedStation ? 'Update Station' : 'Add Station'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductionManagement 