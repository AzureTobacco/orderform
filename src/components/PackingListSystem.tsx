import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Box,
  Palette,
  Scale,
  Ruler,
  Calculator,
  FileText,
  Download,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Check,
  AlertTriangle,
  Info,
  Layers,
  Truck,
  Warehouse,
  Settings,
  RotateCcw,
  Eye,
  EyeOff,
  BarChart3,
  TrendingUp,
  Activity
} from 'lucide-react';
import { GlassCard, ModernButton, StatusBadge, AnimatedCounter } from './ModernUI';

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

interface BoxSize {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  maxWeight: number;
}

interface PackingItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'packed' | 'shipped';
  assignedPallet?: string;
}

interface Pallet {
  id: string;
  name: string;
  maxWeight: number;
  maxHeight: number;
  currentWeight: number;
  currentHeight: number;
  items: PackingItem[];
  status: 'available' | 'full' | 'shipped';
}

interface PackingList {
  id: string;
  name: string;
  date: string;
  items: PackingItem[];
  pallets: Pallet[];
  totalWeight: number;
  totalVolume: number;
  status: 'draft' | 'confirmed' | 'shipped';
}

const PackingListSystem: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('items');
  const [packingItems, setPackingItems] = useState<PackingItem[]>([]);
  const [pallets, setPallets] = useState<Pallet[]>([]);
  const [boxSizes, setBoxSizes] = useState<BoxSize[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [unitSystem, setUnitSystem] = useState<'inches' | 'cm'>('inches');
  const [weightUnitSystem, setWeightUnitSystem] = useState<'lbs' | 'kg'>('lbs');
  const [maxPalletWeight, setMaxPalletWeight] = useState(1000);
  const [maxPalletHeight, setMaxPalletHeight] = useState(48);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddBoxSize, setShowAddBoxSize] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    sku: '',
    quantity: 1,
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 },
    category: '',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });
  const [newBoxSize, setNewBoxSize] = useState({
    name: '',
    length: 0,
    width: 0,
    height: 0,
    maxWeight: 0
  });

  // Load sample data
  useEffect(() => {
    loadPackingData();
    loadPallets();
    loadBoxSizes();
  }, []);

  const loadPackingData = () => {
    const sampleItems: PackingItem[] = [
      {
        id: 'item-001',
        name: 'Premium Cigar Box',
        sku: 'PCB-001',
        quantity: 50,
        weight: 2.5,
        dimensions: { length: 8, width: 6, height: 2 },
        category: 'Luxury',
        priority: 'high',
        status: 'pending'
      },
      {
        id: 'item-002',
        name: 'Tobacco Leaf Bundle',
        sku: 'TLB-002',
        quantity: 100,
        weight: 1.8,
        dimensions: { length: 12, width: 8, height: 3 },
        category: 'Raw Materials',
        priority: 'medium',
        status: 'packed',
        assignedPallet: 'pallet-001'
      },
      {
        id: 'item-003',
        name: 'Cigar Wrapper Sheets',
        sku: 'CWS-003',
        quantity: 200,
        weight: 0.5,
        dimensions: { length: 6, width: 4, height: 1 },
        category: 'Materials',
        priority: 'low',
        status: 'pending'
      },
      {
        id: 'item-004',
        name: 'Luxury Gift Set',
        sku: 'LGS-004',
        quantity: 25,
        weight: 5.0,
        dimensions: { length: 10, width: 8, height: 4 },
        category: 'Luxury',
        priority: 'high',
        status: 'shipped',
        assignedPallet: 'pallet-002'
      },
      {
        id: 'item-005',
        name: 'Tobacco Processing Tools',
        sku: 'TPT-005',
        quantity: 75,
        weight: 3.2,
        dimensions: { length: 14, width: 10, height: 6 },
        category: 'Equipment',
        priority: 'medium',
        status: 'pending'
      }
    ];
    setPackingItems(sampleItems);
  };

  const loadPallets = () => {
    const samplePallets: Pallet[] = [
      {
        id: 'pallet-001',
        name: 'Pallet A-1',
        maxWeight: 1000,
        maxHeight: 48,
        currentWeight: 180,
        currentHeight: 3,
        items: [],
        status: 'available'
      },
      {
        id: 'pallet-002',
        name: 'Pallet A-2',
        maxWeight: 1000,
        maxHeight: 48,
        currentWeight: 125,
        currentHeight: 4,
        items: [],
        status: 'available'
      },
      {
        id: 'pallet-003',
        name: 'Pallet B-1',
        maxWeight: 1000,
        maxHeight: 48,
        currentWeight: 0,
        currentHeight: 0,
        items: [],
        status: 'available'
      }
    ];
    setPallets(samplePallets);
  };

  const loadBoxSizes = () => {
    const sampleBoxSizes: BoxSize[] = [
      {
        id: 'box-001',
        name: 'Small Box',
        length: 6,
        width: 4,
        height: 2,
        maxWeight: 5
      },
      {
        id: 'box-002',
        name: 'Medium Box',
        length: 10,
        width: 8,
        height: 4,
        maxWeight: 15
      },
      {
        id: 'box-003',
        name: 'Large Box',
        length: 14,
        width: 12,
        height: 6,
        maxWeight: 30
      },
      {
        id: 'box-004',
        name: 'Extra Large Box',
        length: 18,
        width: 16,
        height: 8,
        maxWeight: 50
      }
    ];
    setBoxSizes(sampleBoxSizes);
  };

  const convertUnit = (value: number, from: 'inches' | 'cm', to: 'inches' | 'cm') => {
    if (from === to) return value;
    if (from === 'inches' && to === 'cm') return value * 2.54;
    if (from === 'cm' && to === 'inches') return value / 2.54;
    return value;
  };

  const convertWeight = (value: number, from: 'lbs' | 'kg', to: 'lbs' | 'kg') => {
    if (from === to) return value;
    if (from === 'lbs' && to === 'kg') return value * 0.453592;
    if (from === 'kg' && to === 'lbs') return value / 0.453592;
    return value;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'packed': return '#10b981';
      case 'shipped': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'packed': return '📦';
      case 'shipped': return '🚚';
      default: return '❓';
    }
  };

  const autoDistributeItems = () => {
    const pendingItems = packingItems.filter(item => item.status === 'pending');
    const availablePallets = pallets.filter(pallet => pallet.status === 'available');
    
    pendingItems.forEach(item => {
      for (const pallet of availablePallets) {
        const itemHeight = convertUnit(item.dimensions.height, 'inches', unitSystem);
        const itemWeight = item.weight * item.quantity;
        
        if (pallet.currentWeight + itemWeight <= pallet.maxWeight && 
            pallet.currentHeight + itemHeight <= pallet.maxHeight) {
          
          // Assign item to pallet
          const updatedItems = packingItems.map(pItem => 
            pItem.id === item.id ? { ...pItem, status: 'packed' as const, assignedPallet: pallet.id } : pItem
          );
          setPackingItems(updatedItems);
          
          // Update pallet
          const updatedPallets = pallets.map(p => 
            p.id === pallet.id ? {
              ...p,
              currentWeight: p.currentWeight + itemWeight,
              currentHeight: p.currentHeight + itemHeight,
              items: [...p.items, item]
            } : p
          );
          setPallets(updatedPallets);
          break;
        }
      }
    });
  };

  const filteredItems = packingItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(packingItems.map(item => item.category))];

  const addNewItem = () => {
    if (newItem.name && newItem.sku && newItem.category) {
      const item: PackingItem = {
        id: `item-${Date.now()}`,
        name: newItem.name,
        sku: newItem.sku,
        quantity: newItem.quantity,
        weight: newItem.weight,
        dimensions: newItem.dimensions,
        category: newItem.category,
        priority: newItem.priority,
        status: 'pending'
      }
      setPackingItems([...packingItems, item])
      setNewItem({
        name: '',
        sku: '',
        quantity: 1,
        weight: 0,
        dimensions: { length: 0, width: 0, height: 0 },
        category: '',
        priority: 'medium'
      })
      setShowAddItem(false)
    } else {
      alert('Please fill in all required fields (Name, SKU, Category)')
    }
  }

  const addNewBoxSize = () => {
    if (newBoxSize.name && newBoxSize.length > 0 && newBoxSize.width > 0 && newBoxSize.height > 0) {
      const boxSize: BoxSize = {
        id: `box-${Date.now()}`,
        name: newBoxSize.name,
        length: newBoxSize.length,
        width: newBoxSize.width,
        height: newBoxSize.height,
        maxWeight: newBoxSize.maxWeight
      }
      setBoxSizes([...boxSizes, boxSize])
      setNewBoxSize({
        name: '',
        length: 0,
        width: 0,
        height: 0,
        maxWeight: 0
      })
      setShowAddBoxSize(false)
    } else {
      alert('Please fill in all required fields (Name, Length, Width, Height)')
    }
  }

  const deleteItem = (id: string) => {
    setPackingItems(packingItems.filter(item => item.id !== id))
  }

  const deleteBoxSize = (id: string) => {
    setBoxSizes(boxSizes.filter(box => box.id !== id))
  }

  const updateItemStatus = (id: string, status: 'pending' | 'packed' | 'shipped') => {
    setPackingItems(packingItems.map(item => 
      item.id === id ? { ...item, status } : item
    ))
  }

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
            placeholder="Search by name or SKU..."
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
            <option value="pending">Pending</option>
            <option value="packed">Packed</option>
            <option value="shipped">Shipped</option>
          </select>

          <button
            onClick={() => setShowAddItem(true)}
            style={{
              background: '#4dd0e1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}
          >
            ➕ Add Item
          </button>
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
          📦 Packing Items ({filteredItems.length})
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: theme.primary }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Item</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>SKU</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Category</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Quantity</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Dimensions</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Weight</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Priority</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Pallet</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.id} style={{
                  borderBottom: `1px solid ${theme.border}`,
                  background: index % 2 === 0 ? theme.secondary : theme.primary
                }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600', color: theme.textLight }}>{item.name}</div>
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>{item.sku}</td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>{item.category}</td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>{item.quantity}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: theme.textLight }}>
                      {convertUnit(item.dimensions.length, 'inches', unitSystem).toFixed(1)} × 
                      {convertUnit(item.dimensions.width, 'inches', unitSystem).toFixed(1)} × 
                      {convertUnit(item.dimensions.height, 'inches', unitSystem).toFixed(1)} {unitSystem}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>
                    {convertWeight(item.weight * item.quantity, 'lbs', weightUnitSystem).toFixed(1)} {weightUnitSystem}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      background: getPriorityColor(item.priority),
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {item.priority.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      background: getStatusColor(item.status),
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {getStatusIcon(item.status)} {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>
                    {item.assignedPallet || '-'}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => updateItemStatus(item.id, 'packed')}
                        disabled={item.status === 'packed'}
                        style={{
                          background: item.status === 'packed' ? '#6b7280' : '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.25rem 0.5rem',
                          cursor: item.status === 'packed' ? 'not-allowed' : 'pointer',
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}
                      >
                        Pack
                      </button>
                      <button
                        onClick={() => updateItemStatus(item.id, 'shipped')}
                        disabled={item.status === 'shipped'}
                        style={{
                          background: item.status === 'shipped' ? '#6b7280' : '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.25rem 0.5rem',
                          cursor: item.status === 'shipped' ? 'not-allowed' : 'pointer',
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}
                      >
                        Ship
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        style={{
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}
                      >
                        Delete
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
  );

  const renderPallets = () => (
    <div style={{ padding: '2rem' }}>
      {/* Pallet Configuration */}
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '1rem', color: theme.textLight }}>⚙️ Pallet Configuration</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: theme.textLight }}>Unit System:</label>
            <select
              value={unitSystem}
              onChange={(e) => setUnitSystem(e.target.value as 'inches' | 'cm')}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `2px solid ${theme.border}`,
                borderRadius: '8px',
                fontSize: '0.9rem',
                background: theme.primary,
                color: theme.textLight
              }}
            >
              <option value="inches">Inches</option>
              <option value="cm">Centimeters</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: theme.textLight }}>Weight Unit:</label>
            <select
              value={weightUnitSystem}
              onChange={(e) => setWeightUnitSystem(e.target.value as 'lbs' | 'kg')}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `2px solid ${theme.border}`,
                borderRadius: '8px',
                fontSize: '0.9rem',
                background: theme.primary,
                color: theme.textLight
              }}
            >
              <option value="lbs">Pounds (lbs)</option>
              <option value="kg">Kilograms (kg)</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: theme.textLight }}>Max Pallet Weight ({weightUnitSystem}):</label>
            <input
              type="number"
              value={convertWeight(maxPalletWeight, 'lbs', weightUnitSystem)}
              onChange={(e) => setMaxPalletWeight(convertWeight(Number(e.target.value), weightUnitSystem, 'lbs'))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `2px solid ${theme.border}`,
                borderRadius: '8px',
                fontSize: '0.9rem',
                background: theme.primary,
                color: theme.textLight
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: theme.textLight }}>Max Pallet Height ({unitSystem}):</label>
            <input
              type="number"
              value={maxPalletHeight}
              onChange={(e) => setMaxPalletHeight(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `2px solid ${theme.border}`,
                borderRadius: '8px',
                fontSize: '0.9rem',
                background: theme.primary,
                color: theme.textLight
              }}
            />
          </div>
          
          <button
            onClick={autoDistributeItems}
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              alignSelf: 'end'
            }}
          >
            🤖 Auto Distribute
          </button>
        </div>
      </div>

      {/* Pallets Table */}
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
          🏗️ Pallets ({pallets.length})
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: theme.primary }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Pallet</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Weight</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Height</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Items</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Capacity</th>
              </tr>
            </thead>
            <tbody>
              {pallets.map((pallet, index) => (
                <tr key={pallet.id} style={{
                  borderBottom: `1px solid ${theme.border}`,
                  background: index % 2 === 0 ? theme.secondary : theme.primary
                }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600', color: theme.textLight }}>{pallet.name}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      background: getStatusColor(pallet.status),
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {pallet.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>
                    {convertWeight(pallet.currentWeight, 'lbs', weightUnitSystem).toFixed(1)} / {convertWeight(pallet.maxWeight, 'lbs', weightUnitSystem)} {weightUnitSystem}
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>
                    {convertUnit(pallet.currentHeight, 'inches', unitSystem).toFixed(1)} / {convertUnit(pallet.maxHeight, 'inches', unitSystem)} {unitSystem}
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>
                    {pallet.items.length} items
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ width: '100%', background: theme.border, borderRadius: '4px', height: '8px' }}>
                      <div style={{
                        width: `${Math.max((pallet.currentWeight / pallet.maxWeight) * 100, (pallet.currentHeight / pallet.maxHeight) * 100)}%`,
                        background: '#10b981',
                        height: '100%',
                        borderRadius: '4px'
                      }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBoxSizes = () => (
    <div style={{ padding: '2rem' }}>
      {/* Box Sizes Management */}
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ color: theme.textLight }}>📏 Box Sizes</h3>
          <button
            onClick={() => setShowAddBoxSize(true)}
            style={{
              background: '#4dd0e1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}
          >
            ➕ Add Box Size
          </button>
        </div>
      </div>

      {/* Box Sizes Table */}
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: 'white',
          padding: '1rem 1.5rem',
          fontSize: '1.1rem',
          fontWeight: '700'
        }}>
          📦 Box Sizes ({boxSizes.length})
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: theme.primary }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Box Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Dimensions</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Max Weight</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: theme.textLight }}>Volume</th>
              </tr>
            </thead>
            <tbody>
              {boxSizes.map((box, index) => (
                <tr key={box.id} style={{
                  borderBottom: `1px solid ${theme.border}`,
                  background: index % 2 === 0 ? theme.secondary : theme.primary
                }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600', color: theme.textLight }}>{box.name}</div>
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>
                    {convertUnit(box.length, 'inches', unitSystem).toFixed(1)} × 
                    {convertUnit(box.width, 'inches', unitSystem).toFixed(1)} × 
                    {convertUnit(box.height, 'inches', unitSystem).toFixed(1)} {unitSystem}
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>
                    {convertWeight(box.maxWeight, 'lbs', weightUnitSystem).toFixed(1)} {weightUnitSystem}
                  </td>
                  <td style={{ padding: '1rem', color: theme.textLight }}>
                    {(box.length * box.width * box.height).toFixed(1)} in³
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => deleteBoxSize(box.id)}
                      style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.7rem',
                        fontWeight: '600'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

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
          📦 Advanced Packing List System
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Intelligent packing optimization with automated pallet distribution
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
            { id: 'pallets', label: '🏗️ Pallets', icon: '🏗️' },
            { id: 'boxsizes', label: '📏 Box Sizes', icon: '📏' }
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
        {activeTab === 'pallets' && renderPallets()}
        {activeTab === 'boxsizes' && renderBoxSizes()}
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
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
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: theme.secondary,
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: `1px solid ${theme.border}`,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3), 0 0 0 1px rgba(6, 182, 212, 0.1)',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: theme.textLight }}>➕ Add New Packing Item</h3>
              <button
                onClick={() => setShowAddItem(false)}
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
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.textLight }}>Item Name *</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `2px solid ${theme.border}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: theme.primary,
                    color: theme.textLight
                  }}
                  placeholder="Enter item name"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.textLight }}>SKU *</label>
                <input
                  type="text"
                  value={newItem.sku}
                  onChange={(e) => setNewItem({...newItem, sku: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `2px solid ${theme.border}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: theme.primary,
                    color: theme.textLight
                  }}
                  placeholder="Enter SKU"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.textLight }}>Category *</label>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `2px solid ${theme.border}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: theme.primary,
                    color: theme.textLight
                  }}
                  placeholder="Enter category"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.textLight }}>Quantity</label>
                <input
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `2px solid ${theme.border}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: theme.primary,
                    color: theme.textLight
                  }}
                  min="1"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.textLight }}>Weight ({weightUnitSystem})</label>
                <input
                  type="number"
                  value={convertWeight(newItem.weight, 'lbs', weightUnitSystem)}
                  onChange={(e) => setNewItem({...newItem, weight: convertWeight(parseFloat(e.target.value) || 0, weightUnitSystem, 'lbs')})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `2px solid ${theme.border}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: theme.primary,
                    color: theme.textLight
                  }}
                  step="0.1"
                  min="0"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.textLight }}>Priority</label>
                <select
                  value={newItem.priority}
                  onChange={(e) => setNewItem({...newItem, priority: e.target.value as 'high' | 'medium' | 'low'})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `2px solid ${theme.border}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: theme.primary,
                    color: theme.textLight
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.textLight }}>
                Dimensions ({unitSystem === 'inches' ? 'inches' : 'centimeters'})
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', color: theme.textLight }}>
                    Length ({unitSystem === 'inches' ? 'in' : 'cm'})
                  </label>
                  <input
                    type="number"
                    value={convertUnit(newItem.dimensions.length, 'inches', unitSystem)}
                    onChange={(e) => setNewItem({
                      ...newItem, 
                      dimensions: {
                        ...newItem.dimensions,
                        length: convertUnit(parseFloat(e.target.value) || 0, unitSystem, 'inches')
                      }
                    })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${theme.border}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: theme.primary,
                      color: theme.textLight
                    }}
                    step="0.1"
                    min="0"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', color: theme.textLight }}>
                    Width ({unitSystem === 'inches' ? 'in' : 'cm'})
                  </label>
                  <input
                    type="number"
                    value={convertUnit(newItem.dimensions.width, 'inches', unitSystem)}
                    onChange={(e) => setNewItem({
                      ...newItem, 
                      dimensions: {
                        ...newItem.dimensions,
                        width: convertUnit(parseFloat(e.target.value) || 0, unitSystem, 'inches')
                      }
                    })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${theme.border}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: theme.primary,
                      color: theme.textLight
                    }}
                    step="0.1"
                    min="0"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', color: theme.textLight }}>
                    Height ({unitSystem === 'inches' ? 'in' : 'cm'})
                  </label>
                  <input
                    type="number"
                    value={convertUnit(newItem.dimensions.height, 'inches', unitSystem)}
                    onChange={(e) => setNewItem({
                      ...newItem, 
                      dimensions: {
                        ...newItem.dimensions,
                        height: convertUnit(parseFloat(e.target.value) || 0, unitSystem, 'inches')
                      }
                    })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${theme.border}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: theme.primary,
                      color: theme.textLight
                    }}
                    step="0.1"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={addNewItem}
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
                Add Item
              </button>
              <button
                onClick={() => setShowAddItem(false)}
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

      {/* Add Box Size Modal */}
      {showAddBoxSize && (
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
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: theme.secondary,
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            border: `1px solid ${theme.border}`,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3), 0 0 0 1px rgba(6, 182, 212, 0.1)',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: theme.textLight }}>📏 Add New Box Size</h3>
              <button
                onClick={() => setShowAddBoxSize(false)}
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
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.textLight }}>Box Name *</label>
              <input
                type="text"
                value={newBoxSize.name}
                onChange={(e) => setNewBoxSize({...newBoxSize, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `2px solid ${theme.border}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: theme.primary,
                  color: theme.textLight
                }}
                placeholder="Enter box name"
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.textLight }}>
                Dimensions ({unitSystem === 'inches' ? 'inches' : 'centimeters'}) *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', color: theme.textLight }}>
                    Length ({unitSystem === 'inches' ? 'in' : 'cm'})
                  </label>
                  <input
                    type="number"
                    value={convertUnit(newBoxSize.length, 'inches', unitSystem)}
                    onChange={(e) => setNewBoxSize({
                      ...newBoxSize, 
                      length: convertUnit(parseFloat(e.target.value) || 0, unitSystem, 'inches')
                    })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${theme.border}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: theme.primary,
                      color: theme.textLight
                    }}
                    step="0.1"
                    min="0"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', color: theme.textLight }}>
                    Width ({unitSystem === 'inches' ? 'in' : 'cm'})
                  </label>
                  <input
                    type="number"
                    value={convertUnit(newBoxSize.width, 'inches', unitSystem)}
                    onChange={(e) => setNewBoxSize({
                      ...newBoxSize, 
                      width: convertUnit(parseFloat(e.target.value) || 0, unitSystem, 'inches')
                    })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${theme.border}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: theme.primary,
                      color: theme.textLight
                    }}
                    step="0.1"
                    min="0"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', color: theme.textLight }}>
                    Height ({unitSystem === 'inches' ? 'in' : 'cm'})
                  </label>
                  <input
                    type="number"
                    value={convertUnit(newBoxSize.height, 'inches', unitSystem)}
                    onChange={(e) => setNewBoxSize({
                      ...newBoxSize, 
                      height: convertUnit(parseFloat(e.target.value) || 0, unitSystem, 'inches')
                    })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `2px solid ${theme.border}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: theme.primary,
                      color: theme.textLight
                    }}
                    step="0.1"
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.textLight }}>Max Weight ({weightUnitSystem})</label>
              <input
                type="number"
                value={convertWeight(newBoxSize.maxWeight, 'lbs', weightUnitSystem)}
                onChange={(e) => setNewBoxSize({...newBoxSize, maxWeight: convertWeight(parseFloat(e.target.value) || 0, weightUnitSystem, 'lbs')})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `2px solid ${theme.border}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: theme.primary,
                  color: theme.textLight
                }}
                step="0.1"
                min="0"
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={addNewBoxSize}
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
                Add Box Size
              </button>
              <button
                onClick={() => setShowAddBoxSize(false)}
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
    </div>
  );
};

export default PackingListSystem; 