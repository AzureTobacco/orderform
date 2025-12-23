import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Package2, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Edit, 
  Trash2, 
  Eye,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  Building,
  Activity,
  Settings,
  MapPin,
  Calendar,
  Wrench,
  Shield,
  Award,
  Target
} from 'lucide-react'
import { AnimatedCounter, StatusBadge } from './ModernUI'

interface Asset {
  id: string
  name: string
  assetTag: string
  category: string
  subcategory: string
  description: string
  serialNumber: string
  model: string
  manufacturer: string
  purchaseDate: string
  purchasePrice: number
  currentValue: number
  depreciationRate: number
  location: string
  department: string
  assignedTo: string
  status: 'active' | 'maintenance' | 'retired' | 'disposed'
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  warrantyExpiry?: string
  lastMaintenanceDate?: string
  nextMaintenanceDate?: string
  maintenanceCost: number
  notes: string
  attachments: string[]
  createdAt: string
  updatedAt: string
}

interface MaintenanceRecord {
  id: string
  assetId: string
  assetName: string
  type: 'preventive' | 'corrective' | 'emergency'
  description: string
  cost: number
  performedBy: string
  performedDate: string
  nextDueDate?: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  notes: string
}

interface FilterOptions {
  categories: string[]
  statuses: string[]
  conditions: string[]
  departments: string[]
  locations: string[]
  dateRange: {
    startDate: string
    endDate: string
  }
  valueRange: {
    min: number
    max: number
  }
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

const AssetManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assets' | 'maintenance' | 'reports'>('assets')
  const [showFilters, setShowFilters] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const [filters, setFilters] = useState<FilterOptions>({
    categories: ['Manufacturing Equipment', 'Office Equipment', 'Vehicles', 'IT Equipment', 'Furniture'],
    statuses: ['active', 'maintenance', 'retired', 'disposed'],
    conditions: ['excellent', 'good', 'fair', 'poor'],
    departments: ['Manufacturing', 'Administration', 'Sales', 'IT', 'Warehouse'],
    locations: ['Dubai Main Facility', 'Abu Dhabi Warehouse', 'Sharjah Office', 'Riyadh Branch'],
    dateRange: {
      startDate: '2020-01-01',
      endDate: '2024-12-31'
    },
    valueRange: {
      min: 0,
      max: 1000000
    },
    sortBy: 'name',
    sortOrder: 'asc'
  })

  // Sample asset data
  const [assets] = useState<Asset[]>([
    {
      id: 'asset-001',
      name: 'Tobacco Curing Chamber #1',
      assetTag: 'TCC-001',
      category: 'Manufacturing Equipment',
      subcategory: 'Curing Equipment',
      description: 'Industrial tobacco leaf curing chamber with humidity control',
      serialNumber: 'TCC-2023-001',
      model: 'CureMaster Pro 5000',
      manufacturer: 'Industrial Tobacco Solutions',
      purchaseDate: '2023-03-15',
      purchasePrice: 125000,
      currentValue: 112500,
      depreciationRate: 10,
      location: 'Dubai Main Facility',
      department: 'Manufacturing',
      assignedTo: 'Ahmed Al-Rashid',
      status: 'active',
      condition: 'excellent',
      warrantyExpiry: '2026-03-15',
      lastMaintenanceDate: '2024-01-15',
      nextMaintenanceDate: '2024-04-15',
      maintenanceCost: 2500,
      notes: 'Primary curing chamber for premium tobacco processing',
      attachments: ['manual.pdf', 'warranty.pdf'],
      createdAt: '2023-03-15T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: 'asset-002',
      name: 'Forklift - Toyota 8FBE20',
      assetTag: 'FL-002',
      category: 'Vehicles',
      subcategory: 'Material Handling',
      description: 'Electric forklift for warehouse operations',
      serialNumber: '8FBE20-2022-456',
      model: '8FBE20',
      manufacturer: 'Toyota Material Handling',
      purchaseDate: '2022-08-10',
      purchasePrice: 35000,
      currentValue: 28000,
      depreciationRate: 20,
      location: 'Abu Dhabi Warehouse',
      department: 'Warehouse',
      assignedTo: 'Mohammed Hassan',
      status: 'active',
      condition: 'good',
      warrantyExpiry: '2025-08-10',
      lastMaintenanceDate: '2024-01-10',
      nextMaintenanceDate: '2024-04-10',
      maintenanceCost: 800,
      notes: 'Regular maintenance required every 3 months',
      attachments: ['service_manual.pdf'],
      createdAt: '2022-08-10T09:00:00Z',
      updatedAt: '2024-01-10T11:20:00Z'
    },
    {
      id: 'asset-003',
      name: 'Dell OptiPlex 7090',
      assetTag: 'PC-003',
      category: 'IT Equipment',
      subcategory: 'Desktop Computers',
      description: 'Desktop computer for office use',
      serialNumber: 'DOP7090-2023-789',
      model: 'OptiPlex 7090',
      manufacturer: 'Dell Technologies',
      purchaseDate: '2023-06-20',
      purchasePrice: 1200,
      currentValue: 960,
      depreciationRate: 25,
      location: 'Sharjah Office',
      department: 'Administration',
      assignedTo: 'Sarah Al-Zahra',
      status: 'active',
      condition: 'excellent',
      warrantyExpiry: '2026-06-20',
      lastMaintenanceDate: '2024-01-05',
      nextMaintenanceDate: '2024-07-05',
      maintenanceCost: 150,
      notes: 'Standard office workstation',
      attachments: ['specs.pdf'],
      createdAt: '2023-06-20T13:15:00Z',
      updatedAt: '2024-01-05T16:45:00Z'
    }
  ])

  // Sample maintenance records
  const [maintenanceRecords] = useState<MaintenanceRecord[]>([
    {
      id: 'maint-001',
      assetId: 'asset-001',
      assetName: 'Tobacco Curing Chamber #1',
      type: 'preventive',
      description: 'Quarterly maintenance - filter replacement and calibration',
      cost: 850,
      performedBy: 'Technical Services Team',
      performedDate: '2024-01-15',
      nextDueDate: '2024-04-15',
      status: 'completed',
      notes: 'All systems functioning normally'
    },
    {
      id: 'maint-002',
      assetId: 'asset-002',
      assetName: 'Forklift - Toyota 8FBE20',
      type: 'preventive',
      description: 'Battery maintenance and hydraulic system check',
      cost: 450,
      performedBy: 'Equipment Maintenance',
      performedDate: '2024-01-10',
      nextDueDate: '2024-04-10',
      status: 'completed',
      notes: 'Battery performance optimal'
    }
  ])

  // Filtered data
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch = searchTerm === '' || 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())

      const purchaseDate = new Date(asset.purchaseDate)
      const startDate = new Date(filters.dateRange.startDate)
      const endDate = new Date(filters.dateRange.endDate)

      return (
        matchesSearch &&
        purchaseDate >= startDate &&
        purchaseDate <= endDate &&
        filters.categories.includes(asset.category) &&
        filters.statuses.includes(asset.status) &&
        filters.conditions.includes(asset.condition) &&
        filters.departments.includes(asset.department) &&
        filters.locations.includes(asset.location) &&
        asset.currentValue >= filters.valueRange.min &&
        asset.currentValue <= filters.valueRange.max
      )
    }).sort((a, b) => {
      const aValue = a[filters.sortBy as keyof Asset] as any
      const bValue = b[filters.sortBy as keyof Asset] as any
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [assets, filters, searchTerm])

  // Aggregated metrics
  const metrics = useMemo(() => {
    const totalAssets = filteredAssets.length
    const totalValue = filteredAssets.reduce((sum, asset) => sum + asset.currentValue, 0)
    const totalMaintenanceCost = filteredAssets.reduce((sum, asset) => sum + asset.maintenanceCost, 0)
    const activeAssets = filteredAssets.filter(asset => asset.status === 'active').length
    const maintenanceDue = filteredAssets.filter(asset => {
      if (!asset.nextMaintenanceDate) return false
      return new Date(asset.nextMaintenanceDate) <= new Date()
    }).length

    return {
      totalAssets,
      totalValue,
      totalMaintenanceCost,
      activeAssets,
      maintenanceDue,
      utilizationRate: totalAssets > 0 ? (activeAssets / totalAssets) * 100 : 0
    }
  }, [filteredAssets])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981'
      case 'maintenance': return '#f59e0b'
      case 'retired': return '#6b7280'
      case 'disposed': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return '#10b981'
      case 'good': return '#3b82f6'
      case 'fair': return '#f59e0b'
      case 'poor': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      categories: ['Manufacturing Equipment', 'Office Equipment', 'Vehicles', 'IT Equipment', 'Furniture'],
      statuses: ['active', 'maintenance', 'retired', 'disposed'],
      conditions: ['excellent', 'good', 'fair', 'poor'],
      departments: ['Manufacturing', 'Administration', 'Sales', 'IT', 'Warehouse'],
      locations: ['Dubai Main Facility', 'Abu Dhabi Warehouse', 'Sharjah Office', 'Riyadh Branch'],
      dateRange: { startDate: '2020-01-01', endDate: '2024-12-31' },
      valueRange: { min: 0, max: 1000000 },
      sortBy: 'name',
      sortOrder: 'asc'
    })
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
              <Package2 style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 4px 0'
              }}>
                Asset Management
              </h1>
              <p style={{
                color: 'rgba(6, 182, 212, 0.7)',
                fontSize: '16px',
                margin: '0'
              }}>
                Comprehensive asset tracking and maintenance management
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#06b6d4',
                width: '16px',
                height: '16px'
              }} />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  width: '200px',
                  outline: 'none'
                }}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: showFilters ? 'rgba(6, 182, 212, 0.2)' : 'rgba(51, 65, 85, 0.5)',
                color: '#06b6d4',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <Filter style={{ width: '16px', height: '16px' }} />
              Filters
            </button>
            
            <button
              onClick={() => setShowAddModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <Plus style={{ width: '16px', height: '16px' }} />
              Add Asset
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          background: 'rgba(30, 41, 59, 0.3)',
          padding: '8px',
          borderRadius: '12px',
          border: '1px solid rgba(6, 182, 212, 0.2)'
        }}>
          {[
            { key: 'assets', label: 'Assets', icon: Package2 },
            { key: 'maintenance', label: 'Maintenance', icon: Wrench },
            { key: 'reports', label: 'Reports', icon: BarChart3 }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: activeTab === key ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'transparent',
                color: activeTab === key ? 'white' : 'rgba(6, 182, 212, 0.7)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === key ? '600' : '400',
                transition: 'all 0.3s ease'
              }}
            >
              <Icon style={{ width: '16px', height: '16px' }} />
              {label}
            </button>
          ))}
        </div>

        {/* Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.3)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Package2 style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                  Total Assets
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                  All registered assets
                </p>
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              {metrics.totalAssets}
            </div>
            <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
              {metrics.activeAssets} active assets
            </div>
          </div>

          <div style={{
            background: 'rgba(30, 41, 59, 0.3)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <DollarSign style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                  Total Value
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                  Current book value
                </p>
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              {formatCurrency(metrics.totalValue)}
            </div>
            <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
              Asset portfolio value
            </div>
          </div>

          <div style={{
            background: 'rgba(30, 41, 59, 0.3)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Wrench style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                  Maintenance Cost
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                  Annual maintenance
                </p>
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              {formatCurrency(metrics.totalMaintenanceCost)}
            </div>
            <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
              Yearly maintenance budget
            </div>
          </div>

          <div style={{
            background: 'rgba(30, 41, 59, 0.3)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUp style={{ width: '24px', height: '24px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                  Utilization Rate
                </h3>
                <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                  Asset efficiency
                </p>
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              {metrics.utilizationRate.toFixed(1)}%
            </div>
            <div style={{ fontSize: '14px', color: '#10b981', marginTop: '8px' }}>
              Operational efficiency
            </div>
          </div>
        </div>

        {/* Assets Tab Content */}
        {activeTab === 'assets' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredAssets.map((asset) => (
              <div key={asset.id} style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '15px',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, color: '#00d4ff' }}>{asset.name}</h4>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      background: getStatusColor(asset.status) + '20',
                      color: getStatusColor(asset.status),
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {asset.status}
                    </span>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      background: getConditionColor(asset.condition) + '20',
                      color: getConditionColor(asset.condition),
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {asset.condition}
                    </span>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem', opacity: 0.8 }}>
                  <div><strong>Tag:</strong> {asset.assetTag}</div>
                  <div><strong>Category:</strong> {asset.category}</div>
                  <div><strong>Location:</strong> {asset.location}</div>
                  <div><strong>Assigned to:</strong> {asset.assignedTo}</div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Current Value</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatCurrency(asset.currentValue)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Purchase Date</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatDate(asset.purchaseDate)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Next Maintenance</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: asset.nextMaintenanceDate && new Date(asset.nextMaintenanceDate) <= new Date() ? '#f59e0b' : '#4ade80' }}>
                      {asset.nextMaintenanceDate ? formatDate(asset.nextMaintenanceDate) : 'Not scheduled'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Maintenance Cost</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatCurrency(asset.maintenanceCost)}</div>
                  </div>
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setSelectedAsset(asset)
                      setShowEditModal(true)
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'rgba(0, 212, 255, 0.2)',
                      color: '#00d4ff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    <Eye size={14} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Maintenance Tab Content */}
        {activeTab === 'maintenance' && (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '15px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#00d4ff' }}>🔧 Maintenance Records</h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {maintenanceRecords.map((record) => (
                <div key={record.id} style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  padding: '1rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, color: '#ffffff' }}>{record.assetName}</h4>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      background: record.status === 'completed' ? '#10b98120' : '#f59e0b20',
                      color: record.status === 'completed' ? '#10b981' : '#f59e0b',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {record.status}
                    </span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '0.5rem' }}>
                    <div>
                      <strong>Type:</strong> {record.type}
                    </div>
                    <div>
                      <strong>Cost:</strong> {formatCurrency(record.cost)}
                    </div>
                    <div>
                      <strong>Performed:</strong> {formatDate(record.performedDate)}
                    </div>
                    <div>
                      <strong>Next Due:</strong> {record.nextDueDate ? formatDate(record.nextDueDate) : 'N/A'}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Description:</strong> {record.description}
                  </div>
                  
                  <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                    <strong>Performed by:</strong> {record.performedBy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab Content */}
        {activeTab === 'reports' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '15px',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>📊 Asset Utilization</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {metrics.utilizationRate.toFixed(1)}%
              </div>
              <div style={{ opacity: 0.8 }}>
                {metrics.activeAssets} of {metrics.totalAssets} assets are active
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '15px',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>💰 Asset Value Distribution</h3>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {['Manufacturing Equipment', 'Vehicles', 'IT Equipment'].map(category => {
                  const categoryAssets = filteredAssets.filter(asset => asset.category === category)
                  const categoryValue = categoryAssets.reduce((sum, asset) => sum + asset.currentValue, 0)
                  const percentage = metrics.totalValue > 0 ? (categoryValue / metrics.totalValue) * 100 : 0
                  
                  return (
                    <div key={category} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{category}:</span>
                      <span>{formatCurrency(categoryValue)} ({percentage.toFixed(1)}%)</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '15px',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{ color: '#00d4ff', marginBottom: '1rem' }}>🔧 Maintenance Schedule</h3>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {filteredAssets
                  .filter(asset => asset.nextMaintenanceDate)
                  .sort((a, b) => new Date(a.nextMaintenanceDate!).getTime() - new Date(b.nextMaintenanceDate!).getTime())
                  .slice(0, 5)
                  .map(asset => (
                    <div key={asset.id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      padding: '0.5rem',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '5px'
                    }}>
                      <span style={{ fontSize: '0.9rem' }}>{asset.name}</span>
                      <span style={{ 
                        fontSize: '0.9rem',
                        color: new Date(asset.nextMaintenanceDate!) <= new Date() ? '#f59e0b' : '#4ade80'
                      }}>
                        {formatDate(asset.nextMaintenanceDate!)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                🏢 Add New Asset
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(6, 182, 212, 0.7)',
                  cursor: 'pointer',
                  fontSize: '24px',
                  padding: '8px'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              setShowAddModal(false)
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Asset Name *
                  </label>
                  <input
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="Asset name"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Asset Tag *
                  </label>
                  <input
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="AST-001"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Category *
                  </label>
                  <select
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Select Category</option>
                    <option value="Manufacturing Equipment">Manufacturing Equipment</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="IT Equipment">IT Equipment</option>
                    <option value="Office Furniture">Office Furniture</option>
                    <option value="Safety Equipment">Safety Equipment</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="Manufacturer name"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Model
                  </label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="Model number"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Serial Number
                  </label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="Serial number"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Purchase Price (AED)
                  </label>
                  <input
                    type="number"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    placeholder="Building/Room/Area"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                    Department
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Select Department</option>
                    <option value="Production">Production</option>
                    <option value="Quality Control">Quality Control</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Finance">Finance</option>
                    <option value="IT">IT</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: '500' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                  placeholder="Asset description and details"
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(51, 65, 85, 0.5)',
                    color: 'rgba(6, 182, 212, 0.7)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssetManagement
