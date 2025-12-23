import React, { useState, useEffect } from 'react'
import { Package, Plus, Edit, Trash2, Search, AlertTriangle, TrendingDown, TrendingUp, Truck, MapPin } from 'lucide-react'
import { dataService } from '../services/dataService'
import type { RawMaterial, Supplier } from '../services/dataService'

interface RawMaterialsManagementProps {}

const RawMaterialsManagement: React.FC<RawMaterialsManagementProps> = () => {
  const [materials, setMaterials] = useState<RawMaterial[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [filteredMaterials, setFilteredMaterials] = useState<RawMaterial[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<RawMaterial | null>(null)
  const [loading, setLoading] = useState(true)

  const materialTypes = ['tobacco-leaf', 'tobacco-blend', 'flavoring', 'packaging', 'chemical', 'accessories']

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterMaterials()
  }, [materials, searchTerm, filterType, filterStatus])

  const loadData = () => {
    setLoading(true)
    try {
      const materialData = dataService.getRawMaterials()
      const supplierData = dataService.getSuppliers()
      
      setMaterials(materialData)
      setSuppliers(supplierData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterMaterials = () => {
    let filtered = materials

    if (searchTerm) {
      filtered = filtered.filter(material => 
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(material => material.type === filterType)
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(material => {
        const stockStatus = getStockStatus(material)
        return stockStatus === filterStatus
      })
    }

    setFilteredMaterials(filtered)
  }

  const handleAddMaterial = (materialData: Omit<RawMaterial, 'id' | 'lastUpdated'>) => {
    try {
      const materialWithTimestamp = {
        ...materialData,
        lastUpdated: new Date().toISOString()
      }
      const newMaterial = dataService.addRawMaterial(materialWithTimestamp)
      setMaterials(prev => [...prev, newMaterial])
      setShowAddModal(false)
    } catch (error) {
      console.error('Error adding material:', error)
    }
  }

  const handleEditMaterial = (materialData: Partial<RawMaterial>) => {
    if (!selectedMaterial) return
    
    try {
      const updatedMaterial = dataService.updateRawMaterial(selectedMaterial.id, materialData)
      if (updatedMaterial) {
        setMaterials(prev => prev.map(material => 
          material.id === selectedMaterial.id ? updatedMaterial : material
        ))
        setShowEditModal(false)
        setSelectedMaterial(null)
      }
    } catch (error) {
      console.error('Error updating material:', error)
    }
  }

  const handleDeleteMaterial = (id: string) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        const success = dataService.deleteRawMaterial(id)
        if (success) {
          setMaterials(prev => prev.filter(material => material.id !== id))
        }
      } catch (error) {
        console.error('Error deleting material:', error)
      }
    }
  }

  const getStockStatus = (material: RawMaterial) => {
    if (material.currentStock <= material.minStock) return 'critical'
    if (material.currentStock <= material.minStock * 1.5) return 'low'
    return 'good'
  }

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return '#ef4444'
      case 'low': return '#f59e0b'
      case 'good': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getSupplierName = (supplierId: string) => {
    const supplier = suppliers.find(sup => sup.id === supplierId)
    return supplier ? supplier.name : 'Unknown Supplier'
  }

  const getTotalInventoryValue = () => {
    return materials.reduce((total, material) => 
      total + (material.currentStock * material.pricePerUnit), 0
    )
  }

  const getLowStockCount = () => {
    return materials.filter(material => getStockStatus(material) !== 'good').length
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
        Loading materials data...
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
            <Package size={32} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
            Raw Materials Management
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Inventory tracking, supplier management, and stock monitoring
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
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
          Add Material
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
              background: 'rgba(77, 208, 225, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <Package size={24} style={{ color: 'var(--azure-primary)' }} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '14px' }}>
                Total Materials
              </p>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {materials.length}
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
              <AlertTriangle size={24} style={{ color: '#ef4444' }} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '14px' }}>
                Low Stock Alerts
              </p>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {getLowStockCount()}
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
              background: 'rgba(168, 85, 247, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <TrendingUp size={24} style={{ color: '#a855f7' }} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '14px' }}>
                Inventory Value (AED)
              </p>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {getTotalInventoryValue().toLocaleString()}
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
              background: 'rgba(34, 197, 94, 0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <Truck size={24} style={{ color: '#22c55e' }} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '14px' }}>
                Active Suppliers
              </p>
              <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '24px', fontWeight: '600' }}>
                {suppliers.filter(sup => sup.status === 'active').length}
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
              placeholder="Search materials..."
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
            <option value="all">All Types</option>
            {materialTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
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
              fontSize: '14px'
            }}
          >
            <option value="all">All Stock Levels</option>
            <option value="critical">Critical Stock</option>
            <option value="low">Low Stock</option>
            <option value="good">Good Stock</option>
          </select>
        </div>
      </div>

      {/* Materials Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {filteredMaterials.map((material) => {
          const stockStatus = getStockStatus(material)
          const stockPercentage = (material.currentStock / material.maxStock) * 100
          
          return (
            <div key={material.id} style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
              position: 'relative'
            }}>
              {/* Stock Status Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500',
                background: `${getStockStatusColor(stockStatus)}20`,
                color: getStockStatusColor(stockStatus),
                textTransform: 'uppercase'
              }}>
                {stockStatus} Stock
              </div>

              {/* Material Header */}
              <div style={{ marginBottom: '16px', paddingRight: '80px' }}>
                <h3 style={{ 
                  color: 'var(--text-primary)', 
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  {material.name}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  margin: '0 0 8px 0',
                  fontSize: '14px'
                }}>
                  {material.category} • {material.type}
                </p>
                {material.qualityGrade && (
                  <span style={{
                    background: 'rgba(77, 208, 225, 0.1)',
                    color: 'var(--azure-primary)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    Grade {material.qualityGrade}
                  </span>
                )}
              </div>

              {/* Stock Progress */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '500' }}>
                    Stock Level
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                    {material.currentStock} / {material.maxStock} {material.unit}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'var(--border-color)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${Math.min(stockPercentage, 100)}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${getStockStatusColor(stockStatus)}, ${getStockStatusColor(stockStatus)}80)`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              {/* Material Details */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '12px' }}>
                    Price per {material.unit}
                  </p>
                  <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                    AED {material.pricePerUnit.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0', fontSize: '12px' }}>
                    Total Value
                  </p>
                  <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                    AED {(material.currentStock * material.pricePerUnit).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Location & Supplier */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <MapPin size={14} style={{ color: 'var(--text-secondary)' }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                    {material.location}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={14} style={{ color: 'var(--text-secondary)' }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                    {getSupplierName(material.supplierId)}
                  </span>
                </div>
              </div>

              {/* Last Updated */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12px', margin: 0 }}>
                  Last updated: {new Date(material.lastUpdated).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => {
                    setSelectedMaterial(material)
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
                  onClick={() => handleDeleteMaterial(material.id)}
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

      {filteredMaterials.length === 0 && (
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          No materials found matching your criteria.
        </div>
      )}

      {/* Add Material Modal */}
      {showAddModal && (
        <MaterialModal
          title="Add New Material"
          suppliers={suppliers}
          onSave={handleAddMaterial}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Material Modal */}
      {showEditModal && selectedMaterial && (
        <MaterialModal
          title="Edit Material"
          material={selectedMaterial}
          suppliers={suppliers}
          onSave={handleEditMaterial}
          onClose={() => {
            setShowEditModal(false)
            setSelectedMaterial(null)
          }}
        />
      )}
    </div>
  )
}

// Material Modal Component
interface MaterialModalProps {
  title: string
  material?: RawMaterial
  suppliers: Supplier[]
  onSave: (data: any) => void
  onClose: () => void
}

const MaterialModal: React.FC<MaterialModalProps> = ({ title, material, suppliers, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: material?.name || '',
    type: material?.type || 'tobacco',
    category: material?.category || '',
    currentStock: material?.currentStock || 0,
    minStock: material?.minStock || 0,
    maxStock: material?.maxStock || 0,
    unit: material?.unit || 'kg',
    pricePerUnit: material?.pricePerUnit || 0,
    supplierId: material?.supplierId || '',
    location: material?.location || '',
    qualityGrade: material?.qualityGrade || '',
    expiryDate: material?.expiryDate || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
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
                  Material Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                  Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="tobacco">Tobacco</option>
                  <option value="chemical">Chemical</option>
                  <option value="flavoring">Flavoring</option>
                  <option value="packaging">Packaging</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                Category *
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Current Stock *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.currentStock}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentStock: Number(e.target.value) }))}
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
                  Min Stock *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.minStock}
                  onChange={(e) => setFormData(prev => ({ ...prev, minStock: Number(e.target.value) }))}
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
                  Max Stock *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.maxStock}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxStock: Number(e.target.value) }))}
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
                  Unit *
                </label>
                <select
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="kg">Kilograms</option>
                  <option value="L">Liters</option>
                  <option value="units">Units</option>
                  <option value="tons">Tons</option>
                </select>
              </div>

              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Price per Unit (AED) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.pricePerUnit}
                  onChange={(e) => setFormData(prev => ({ ...prev, pricePerUnit: Number(e.target.value) }))}
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
                  Supplier *
                </label>
                <select
                  required
                  value={formData.supplierId}
                  onChange={(e) => setFormData(prev => ({ ...prev, supplierId: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-dark)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Storage Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
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
                  Quality Grade
                </label>
                <input
                  type="text"
                  value={formData.qualityGrade}
                  onChange={(e) => setFormData(prev => ({ ...prev, qualityGrade: e.target.value }))}
                  placeholder="e.g., A+, B, Premium"
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
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
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
              {material ? 'Update' : 'Add'} Material
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RawMaterialsManagement 