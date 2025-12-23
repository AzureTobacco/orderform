import React, { useState, useEffect } from 'react'

// Theme hook for accessing current theme
const useTheme = () => {
  // Get theme from CSS custom properties or default to dark theme colors
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

interface InventoryItem {
  id: string
  name: string
  sku: string
  barcode: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unitPrice: number
  totalValue: number
  location: string
  batchNumber?: string
  expiryDate?: string
  supplier: string
  lastUpdated: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired'
}

interface StockMovement {
  id: string
  itemId: string
  itemName: string
  type: 'in' | 'out' | 'adjustment'
  quantity: number
  reason: string
  timestamp: string
  user: string
  batchNumber?: string
}

interface FormulaIngredient {
  itemId: string
  name: string
  quantity: number
  unit: string
  costPerUnit: number
  totalCost: number
}

interface Formula {
  id: string
  name: string
  description: string
  ingredients: FormulaIngredient[]
  laborCost: number
  overheadCost: number
  totalCost: number
  sellingPrice: number
  profitMargin: number
  batchSize: number
  lastUpdated: string
}

interface Expense {
  id: string
  category: string
  description: string
  amount: number
  date: string
  type: 'Fixed' | 'Variable'
}

const InventoryManagement: React.FC = () => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState('items')
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [barcodeInput, setBarcodeInput] = useState('')
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [showStockAdjustment, setShowStockAdjustment] = useState(false)

  // Load sample data
  useEffect(() => {
    loadInventoryData()
    loadStockMovements()
  }, [])

  const loadInventoryData = () => {
    const sampleItems: InventoryItem[] = [
      {
        id: 'inv-001',
        name: 'Virginia Tobacco Leaves',
        sku: 'VTL-001',
        barcode: '1234567890123',
        category: 'Raw Materials',
        currentStock: 150,
        minStock: 50,
        maxStock: 500,
        unitPrice: 25.50,
        totalValue: 3825.00,
        location: 'Warehouse A-1',
        batchNumber: 'VTL-2024-001',
        expiryDate: '2025-12-31',
        supplier: 'Premium Tobacco Co.',
        lastUpdated: '2024-01-15T10:30:00Z',
        status: 'in-stock'
      },
      {
        id: 'inv-002',
        name: 'Cuban Wrapper Leaves',
        sku: 'CWL-002',
        barcode: '1234567890124',
        category: 'Raw Materials',
        currentStock: 25,
        minStock: 30,
        maxStock: 200,
        unitPrice: 45.00,
        totalValue: 1125.00,
        location: 'Warehouse A-2',
        batchNumber: 'CWL-2024-002',
        expiryDate: '2025-06-30',
        supplier: 'Cuban Tobacco Ltd.',
        lastUpdated: '2024-01-14T15:45:00Z',
        status: 'low-stock'
      },
      {
        id: 'inv-003',
        name: 'Premium Cigar Bands',
        sku: 'PCB-003',
        barcode: '1234567890125',
        category: 'Packaging',
        currentStock: 5000,
        minStock: 1000,
        maxStock: 10000,
        unitPrice: 0.15,
        totalValue: 750.00,
        location: 'Warehouse B-1',
        supplier: 'Packaging Solutions Inc.',
        lastUpdated: '2024-01-13T09:20:00Z',
        status: 'in-stock'
      },
      {
        id: 'inv-004',
        name: 'Luxury Wooden Boxes',
        sku: 'LWB-004',
        barcode: '1234567890126',
        category: 'Packaging',
        currentStock: 200,
        minStock: 50,
        maxStock: 500,
        unitPrice: 12.75,
        totalValue: 2550.00,
        location: 'Warehouse B-2',
        supplier: 'Luxury Packaging Co.',
        lastUpdated: '2024-01-12T14:10:00Z',
        status: 'in-stock'
      },
      {
        id: 'inv-005',
        name: 'Aged Burley Tobacco',
        sku: 'ABT-005',
        barcode: '1234567890127',
        category: 'Raw Materials',
        currentStock: 0,
        minStock: 25,
        maxStock: 300,
        unitPrice: 35.00,
        totalValue: 0.00,
        location: 'Warehouse A-3',
        batchNumber: 'ABT-2023-005',
        expiryDate: '2024-12-31',
        supplier: 'Aged Tobacco Specialists',
        lastUpdated: '2024-01-10T11:00:00Z',
        status: 'out-of-stock'
      }
    ]
    setInventoryItems(sampleItems)
  }

  const loadStockMovements = () => {
    const sampleMovements: StockMovement[] = [
      {
        id: 'mov-001',
        itemId: 'inv-001',
        itemName: 'Virginia Tobacco Leaves',
        type: 'in',
        quantity: 100,
        reason: 'Purchase Order PO-2024-001',
        timestamp: '2024-01-15T10:30:00Z',
        user: 'Ahmed Al-Rashid',
        batchNumber: 'VTL-2024-001'
      },
      {
        id: 'mov-002',
        itemId: 'inv-002',
        itemName: 'Cuban Wrapper Leaves',
        type: 'out',
        quantity: 15,
        reason: 'Production Order PR-2024-005',
        timestamp: '2024-01-14T15:45:00Z',
        user: 'Sarah Johnson'
      },
      {
        id: 'mov-003',
        itemId: 'inv-003',
        itemName: 'Premium Cigar Bands',
        type: 'in',
        quantity: 2000,
        reason: 'Purchase Order PO-2024-002',
        timestamp: '2024-01-13T09:20:00Z',
        user: 'Mohammed Hassan'
      }
    ]
    setStockMovements(sampleMovements)
  }

  // Filter inventory items
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.barcode.includes(searchTerm)
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Calculate overview metrics
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0)
  const lowStockItems = inventoryItems.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length
  const totalItems = inventoryItems.length
  const categories = [...new Set(inventoryItems.map(item => item.category))]

  // Barcode scanning simulation
  const handleBarcodeInput = (barcode: string) => {
    const item = inventoryItems.find(item => item.barcode === barcode)
    if (item) {
      setSelectedItem(item)
      setShowStockAdjustment(true)
      setBarcodeInput('')
    } else {
      alert('Item not found with barcode: ' + barcode)
    }
  }

  // Stock adjustment
  const handleStockAdjustment = (itemId: string, adjustment: number, reason: string) => {
    setInventoryItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newStock = Math.max(0, item.currentStock + adjustment)
        const newStatus = newStock === 0 ? 'out-of-stock' : 
                         newStock <= item.minStock ? 'low-stock' : 'in-stock'
        
        // Add stock movement record
        const movement: StockMovement = {
          id: `mov-${Date.now()}`,
          itemId: item.id,
          itemName: item.name,
          type: adjustment > 0 ? 'in' : adjustment < 0 ? 'out' : 'adjustment',
          quantity: Math.abs(adjustment),
          reason,
          timestamp: new Date().toISOString(),
          user: 'Current User'
        }
        setStockMovements(prev => [movement, ...prev])

        return {
          ...item,
          currentStock: newStock,
          totalValue: newStock * item.unitPrice,
          status: newStatus,
          lastUpdated: new Date().toISOString()
        }
      }
      return item
    }))
    setShowStockAdjustment(false)
    setSelectedItem(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return '#10b981'
      case 'low-stock': return '#f59e0b'
      case 'out-of-stock': return '#ef4444'
      case 'expired': return '#8b5cf6'
      default: return '#6b7280'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return '✅'
      case 'low-stock': return '⚠️'
      case 'out-of-stock': return '❌'
      case 'expired': return '⏰'
      default: return '❓'
    }
  }

  // Items Tab with enhanced features
  const renderItems = () => (
    <div style={{ padding: '2rem' }}>
      {/* Search and Filters */}
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Search by name, SKU, or barcode..."
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
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
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
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Items Table */}
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #4dd0e1, #26c6da)',
          color: 'white',
          padding: '1rem 1.5rem',
          fontSize: '1.1rem',
          fontWeight: '700'
        }}>
          📦 Inventory Items ({filteredItems.length})
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: theme.primary }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Item</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>SKU/Barcode</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Category</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Stock</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Value</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Location</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.id} style={{
                  borderBottom: `1px solid ${theme.border}`,
                  background: index % 2 === 0 ? theme.secondary : theme.primary
                }}>
                  <td style={{ padding: '1rem' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: theme.textLight }}>{item.name}</div>
                      {item.batchNumber && (
                        <div style={{ fontSize: '0.8rem', color: theme.text }}>
                          Batch: {item.batchNumber}
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: theme.textLight }}>{item.sku}</div>
                    <div style={{ fontSize: '0.8rem', color: theme.text }}>{item.barcode}</div>
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>{item.category}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: theme.textLight }}>{item.currentStock}</div>
                    <div style={{ fontSize: '0.8rem', color: theme.text }}>
                      Min: {item.minStock} | Max: {item.maxStock}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>
                    ${item.totalValue.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>{item.location}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      background: getStatusColor(item.status),
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {getStatusIcon(item.status)} {item.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => {
                        setSelectedItem(item)
                        setShowStockAdjustment(true)
                      }}
                      style={{
                        background: '#4dd0e1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}
                    >
                      Adjust Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  // Stock Movements Tab
  const renderMovements = () => (
    <div style={{ padding: '2rem' }}>
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          padding: '1rem 1.5rem',
          fontSize: '1.1rem',
          fontWeight: '700'
        }}>
          📊 Stock Movements ({stockMovements.length})
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: theme.primary }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Date/Time</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Item</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Type</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Quantity</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Reason</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>User</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Batch</th>
              </tr>
            </thead>
            <tbody>
              {stockMovements.map((movement, index) => (
                <tr key={movement.id} style={{
                  borderBottom: `1px solid ${theme.border}`,
                  background: index % 2 === 0 ? theme.secondary : theme.primary
                }}>
                  <td style={{ padding: '1rem', color: theme.textLight }}>
                    {new Date(movement.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>{movement.itemName}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      background: movement.type === 'in' ? '#10b981' : movement.type === 'out' ? '#ef4444' : '#f59e0b',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {movement.type === 'in' ? '📥 IN' : movement.type === 'out' ? '📤 OUT' : '⚖️ ADJ'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>{movement.quantity}</td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>{movement.reason}</td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>{movement.user}</td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>
                    {movement.batchNumber || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  // Reports Tab with comprehensive analytics
  const renderReports = () => (
    <div style={{ padding: '2rem' }}>
      {/* Report Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
            📊 Inventory Turnover
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: theme.textLight, marginBottom: '0.5rem' }}>
            4.2x
          </div>
          <div style={{ color: theme.text, fontSize: '0.9rem' }}>
            Average annual turnover rate
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#10b981' }}>
            ↗️ +12% vs last year
          </div>
        </div>

        <div style={{
          background: theme.secondary,
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
            💰 Carrying Cost
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: theme.textLight, marginBottom: '0.5rem' }}>
            $12.5K
          </div>
          <div style={{ color: theme.text, fontSize: '0.9rem' }}>
            Monthly carrying costs
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#f59e0b' }}>
            ↗️ +5% vs last month
          </div>
        </div>

        <div style={{
          background: theme.secondary,
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#8b5cf6', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
            📈 Stock Accuracy
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: theme.textLight, marginBottom: '0.5rem' }}>
            98.7%
          </div>
          <div style={{ color: theme.text, fontSize: '0.9rem' }}>
            Inventory accuracy rate
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
            ⚠️ Stockout Risk
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: theme.textLight, marginBottom: '0.5rem' }}>
            3
          </div>
          <div style={{ color: theme.text, fontSize: '0.9rem' }}>
            Items at risk of stockout
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#ef4444' }}>
            ⚠️ Requires attention
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {/* Category Performance */}
        <div style={{
          background: theme.secondary,
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: theme.textLight, marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '700' }}>
            📊 Category Performance
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {categories.map((category, index) => {
              const categoryItems = inventoryItems.filter(item => item.category === category)
              const categoryValue = categoryItems.reduce((sum, item) => sum + item.totalValue, 0)
              const percentage = (categoryValue / totalValue * 100).toFixed(1)
              
              return (
                <div key={category} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: theme.primary,
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: theme.textLight }}>{category}</div>
                    <div style={{ fontSize: '0.8rem', color: theme.text }}>
                      {categoryItems.length} items
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', color: theme.textLight }}>
                      ${categoryValue.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: theme.text }}>
                      {percentage}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Moving Items */}
        <div style={{
          background: theme.secondary,
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: theme.textLight, marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '700' }}>
            🚀 Top Moving Items
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {inventoryItems
              .sort((a, b) => b.totalValue - a.totalValue)
              .slice(0, 5)
              .map((item, index) => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: theme.primary,
                  borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: '#10b981',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: '700'
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: theme.textLight }}>{item.name}</div>
                      <div style={{ fontSize: '0.8rem', color: theme.text }}>{item.sku}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', color: theme.textLight }}>
                      ${item.totalValue.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: theme.text }}>
                      {item.currentStock} units
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div style={{
        marginTop: '2rem',
        background: theme.secondary,
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: theme.textLight, marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '700' }}>
          📄 Export Reports
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {[
            { name: 'Inventory Summary', format: 'PDF', color: '#ef4444' },
            { name: 'Stock Movement Report', format: 'Excel', color: '#10b981' },
            { name: 'Category Analysis', format: 'CSV', color: '#3b82f6' },
            { name: 'Supplier Performance', format: 'PDF', color: '#8b5cf6' }
          ].map(report => (
            <button
              key={report.name}
              style={{
                background: report.color,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              📊 {report.name} ({report.format})
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  // Suppliers Tab with comprehensive supplier management
  const renderSuppliers = () => {
    const suppliers = [
      {
        id: 'sup-001',
        name: 'Premium Tobacco Co.',
        contact: 'Ahmed Al-Mansouri',
        email: 'ahmed@premiumtobacco.ae',
        phone: '+971-4-555-0123',
        location: 'Dubai, UAE',
        rating: 4.8,
        totalOrders: 45,
        totalValue: 125000,
        onTimeDelivery: 96.5,
        qualityScore: 98.2,
        lastOrder: '2024-01-15',
        status: 'active',
        categories: ['Raw Materials'],
        paymentTerms: 'Net 30'
      },
      {
        id: 'sup-002',
        name: 'Cuban Tobacco Ltd.',
        contact: 'Maria Rodriguez',
        email: 'maria@cubantobacco.com',
        phone: '+53-7-555-0456',
        location: 'Havana, Cuba',
        rating: 4.9,
        totalOrders: 28,
        totalValue: 89000,
        onTimeDelivery: 94.2,
        qualityScore: 99.1,
        lastOrder: '2024-01-14',
        status: 'active',
        categories: ['Raw Materials'],
        paymentTerms: 'Net 45'
      },
      {
        id: 'sup-003',
        name: 'Packaging Solutions Inc.',
        contact: 'John Smith',
        email: 'john@packagingsolutions.com',
        phone: '+1-555-0789',
        location: 'New York, USA',
        rating: 4.6,
        totalOrders: 67,
        totalValue: 45000,
        onTimeDelivery: 98.1,
        qualityScore: 95.8,
        lastOrder: '2024-01-13',
        status: 'active',
        categories: ['Packaging'],
        paymentTerms: 'Net 15'
      },
      {
        id: 'sup-004',
        name: 'Luxury Packaging Co.',
        contact: 'Sophie Laurent',
        email: 'sophie@luxurypack.fr',
        phone: '+33-1-555-0321',
        location: 'Paris, France',
        rating: 4.7,
        totalOrders: 23,
        totalValue: 67000,
        onTimeDelivery: 92.8,
        qualityScore: 97.5,
        lastOrder: '2024-01-12',
        status: 'active',
        categories: ['Packaging'],
        paymentTerms: 'Net 30'
      }
    ]

    return (
      <div style={{ padding: '2rem' }}>
        {/* Supplier Overview */}
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
              🤝 Active Suppliers
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: theme.textLight, marginBottom: '0.5rem' }}>
              {suppliers.length}
            </div>
            <div style={{ color: theme.text, fontSize: '0.9rem' }}>
              Verified and active
            </div>
          </div>

          <div style={{
            background: theme.secondary,
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
              ⭐ Average Rating
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: theme.textLight, marginBottom: '0.5rem' }}>
              {(suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)}
            </div>
            <div style={{ color: theme.text, fontSize: '0.9rem' }}>
              Out of 5.0 stars
            </div>
          </div>

          <div style={{
            background: theme.secondary,
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#8b5cf6', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
              🚚 On-Time Delivery
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: theme.textLight, marginBottom: '0.5rem' }}>
              {(suppliers.reduce((sum, s) => sum + s.onTimeDelivery, 0) / suppliers.length).toFixed(1)}%
            </div>
            <div style={{ color: theme.text, fontSize: '0.9rem' }}>
              Average performance
            </div>
          </div>

          <div style={{
            background: theme.secondary,
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
              💰 Total Spend
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: theme.textLight, marginBottom: '0.5rem' }}>
              ${(suppliers.reduce((sum, s) => sum + s.totalValue, 0) / 1000).toFixed(0)}K
            </div>
            <div style={{ color: theme.text, fontSize: '0.9rem' }}>
              This year
            </div>
          </div>
        </div>

        {/* Suppliers Table */}
        <div style={{
          background: theme.secondary,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            padding: '1rem 1.5rem',
            fontSize: '1.1rem',
            fontWeight: '700'
          }}>
            🤝 Supplier Management ({suppliers.length})
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: theme.primary }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Supplier</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Contact</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Performance</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Orders</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Value</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier, index) => (
                  <tr key={supplier.id} style={{
                    borderBottom: `1px solid ${theme.border}`,
                    background: index % 2 === 0 ? theme.secondary : theme.primary
                  }}>
                    <td style={{ padding: '1rem' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: theme.textLight }}>{supplier.name}</div>
                        <div style={{ fontSize: '0.8rem', color: theme.text }}>
                          {supplier.location}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: theme.text }}>
                          {supplier.categories.join(', ')}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontSize: '0.9rem', color: theme.textLight }}>{supplier.contact}</div>
                      <div style={{ fontSize: '0.8rem', color: theme.text }}>{supplier.email}</div>
                      <div style={{ fontSize: '0.8rem', color: theme.text }}>{supplier.phone}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ color: theme.textLight }}>Rating:</span>
                        <span style={{ color: '#f59e0b' }}>{'⭐'.repeat(Math.floor(supplier.rating))}</span>
                        <span style={{ color: theme.textLight, fontSize: '0.8rem' }}>{supplier.rating}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: theme.text }}>
                        On-time: {supplier.onTimeDelivery}%
                      </div>
                      <div style={{ fontSize: '0.8rem', color: theme.text }}>
                        Quality: {supplier.qualityScore}%
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: theme.textLight }}>{supplier.totalOrders}</div>
                      <div style={{ fontSize: '0.8rem', color: theme.text }}>
                        Last: {new Date(supplier.lastOrder).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: theme.textLight }}>
                      ${supplier.totalValue.toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        background: supplier.status === 'active' ? '#10b981' : '#6b7280',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {supplier.status.toUpperCase()}
                      </span>
                    </td>
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
                          Order
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
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.background }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4dd0e1, #26c6da)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '700' }}>
          📦 Advanced Inventory Management
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Real-time inventory tracking with barcode scanning and automated alerts
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
            { id: 'items', label: '📦 Items', icon: '📦' },
            { id: 'movements', label: '📈 Movements', icon: '📈' },
            { id: 'reports', label: '📋 Reports', icon: '📋' },
            { id: 'suppliers', label: '🤝 Suppliers', icon: '🤝' }
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
                color: activeTab === tab.id ? '#4dd0e1' : '#6b7280',
                borderBottom: activeTab === tab.id ? '2px solid #4dd0e1' : '2px solid transparent',
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
        {activeTab === 'items' && renderItems()}
        {activeTab === 'movements' && renderMovements()}
        {activeTab === 'reports' && renderReports()}
        {activeTab === 'suppliers' && renderSuppliers()}
      </div>

      {/* Barcode Scanner Modal */}
      {showBarcodeScanner && (
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
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>📷 Barcode Scanner</h3>
            <input
              type="text"
              placeholder="Enter or scan barcode..."
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && barcodeInput.trim()) {
                  handleBarcodeInput(barcodeInput.trim())
                  setShowBarcodeScanner(false)
                }
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  if (barcodeInput.trim()) {
                    handleBarcodeInput(barcodeInput.trim())
                    setShowBarcodeScanner(false)
                  }
                }}
                style={{
                  flex: 1,
                  background: '#4dd0e1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Search
              </button>
              <button
                onClick={() => {
                  setShowBarcodeScanner(false)
                  setBarcodeInput('')
                }}
                style={{
                  flex: 1,
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {showStockAdjustment && selectedItem && (
        <StockAdjustmentModal
          item={selectedItem}
          onAdjust={handleStockAdjustment}
          onClose={() => {
            setShowStockAdjustment(false)
            setSelectedItem(null)
          }}
        />
      )}
    </div>
  )
}

// Stock Adjustment Modal Component
interface StockAdjustmentModalProps {
  item: InventoryItem
  onAdjust: (itemId: string, adjustment: number, reason: string) => void
  onClose: () => void
}

const StockAdjustmentModal: React.FC<StockAdjustmentModalProps> = ({ item, onAdjust, onClose }) => {
  const [adjustment, setAdjustment] = useState(0)
  const [reason, setReason] = useState('')

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
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>
          ⚖️ Stock Adjustment - {item.name}
        </h3>
        
        <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <strong>Current Stock:</strong> {item.currentStock}
            </div>
            <div>
              <strong>SKU:</strong> {item.sku}
            </div>
            <div>
              <strong>Location:</strong> {item.location}
            </div>
            <div>
              <strong>Min Stock:</strong> {item.minStock}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Adjustment Quantity (+ for increase, - for decrease):
          </label>
          <input
            type="number"
            value={adjustment}
            onChange={(e) => setAdjustment(parseInt(e.target.value) || 0)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
            New stock will be: {Math.max(0, item.currentStock + adjustment)}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Reason for adjustment:
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          >
            <option value="">Select reason...</option>
            <option value="Physical count adjustment">Physical count adjustment</option>
            <option value="Damaged goods">Damaged goods</option>
            <option value="Expired items">Expired items</option>
            <option value="Production consumption">Production consumption</option>
            <option value="Sales return">Sales return</option>
            <option value="Supplier return">Supplier return</option>
            <option value="Transfer between locations">Transfer between locations</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => {
              if (adjustment !== 0 && reason) {
                onAdjust(item.id, adjustment, reason)
              } else {
                alert('Please enter an adjustment quantity and select a reason.')
              }
            }}
            style={{
              flex: 1,
              background: '#4dd0e1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Apply Adjustment
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default InventoryManagement 