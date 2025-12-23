import React, { useState, useMemo } from "react"
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Factory,
  FileText,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Search,
  Eye,
  Settings,
  Target,
  Zap,
  Globe,
  Shield,
  Leaf
} from "lucide-react"

interface ReportData {
  id: string
  reportType: string
  category: string
  period: string
  region: string
  department: string
  productLine: string
  businessUnit: string
  metrics: {
    revenue: number
    costs: number
    profit: number
    units: number
    customers: number
    employees: number
    efficiency: number
    quality: number
    compliance: number
    satisfaction: number
  }
  kpis: {
    [key: string]: number
  }
  timestamp: string
}

interface FilterOptions {
  reportTypes: string[]
  categories: string[]
  dateRange: {
    startDate: string
    endDate: string
  }
  periods: string[]
  regions: string[]
  departments: string[]
  productLines: string[]
  businessUnits: string[]
  metricRanges: {
    revenue: { min: number; max: number }
    profit: { min: number; max: number }
    efficiency: { min: number; max: number }
    quality: { min: number; max: number }
  }
  sortBy: string
  sortOrder: 'asc' | 'desc'
  groupBy: string
  showTrends: boolean
  includeForecasts: boolean
}

const ReportingAnalytics: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState('financial')
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'charts'>('cards')
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [filters, setFilters] = useState<FilterOptions>({
    reportTypes: ['Financial', 'Operational', 'Sales', 'Production', 'HR', 'Compliance'],
    categories: ['Performance', 'Analysis', 'Forecast', 'Comparison'],
    dateRange: {
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    periods: ['2024-Q4', '2024-Q3', '2024-Q2', '2024-Q1'],
    regions: ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar'],
    departments: ['Manufacturing', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
    productLines: ['Premium Hookah', 'Standard Hookah', 'Flavored Tobacco', 'Traditional Tobacco'],
    businessUnits: ['Manufacturing', 'Distribution', 'Retail', 'Export'],
    metricRanges: {
      revenue: { min: 0, max: 1000000 },
      profit: { min: 0, max: 500000 },
      efficiency: { min: 0, max: 100 },
      quality: { min: 0, max: 100 }
    },
    sortBy: 'timestamp',
    sortOrder: 'desc',
    groupBy: 'category',
    showTrends: true,
    includeForecasts: false
  })

  // Comprehensive report types with detailed filtering
  const reportTypes = [
    {
      id: 'financial',
      name: 'Financial Reports',
      icon: DollarSign,
      color: '#4ade80',
      reports: [
        'EBITDA Analysis',
        'Profit & Loss',
        'Cash Flow Statement',
        'Balance Sheet',
        'Revenue Analysis',
        'Cost Analysis',
        'Budget vs Actual',
        'Financial Ratios',
        'ROI Analysis',
        'Break-even Analysis'
      ]
    },
    {
      id: 'operational',
      name: 'Operational Reports',
      icon: Factory,
      color: '#3b82f6',
      reports: [
        'Production Efficiency',
        'Quality Control',
        'Inventory Turnover',
        'Supply Chain Performance',
        'Equipment Utilization',
        'Maintenance Reports',
        'Process Optimization',
        'Capacity Planning',
        'Waste Analysis',
        'Energy Consumption'
      ]
    },
    {
      id: 'sales',
      name: 'Sales & Marketing',
      icon: TrendingUp,
      color: '#f59e0b',
      reports: [
        'Sales Performance',
        'Customer Acquisition',
        'Market Share Analysis',
        'Product Performance',
        'Regional Sales',
        'Sales Forecast',
        'Customer Lifetime Value',
        'Conversion Rates',
        'Marketing ROI',
        'Channel Performance'
      ]
    },
    {
      id: 'hr',
      name: 'Human Resources',
      icon: Users,
      color: '#8b5cf6',
      reports: [
        'Employee Performance',
        'Attendance Reports',
        'Training Effectiveness',
        'Recruitment Analysis',
        'Compensation Analysis',
        'Employee Satisfaction',
        'Turnover Analysis',
        'Skills Assessment',
        'Productivity Metrics',
        'Workforce Planning'
      ]
    },
    {
      id: 'compliance',
      name: 'Compliance & Regulatory',
      icon: Shield,
      color: '#ef4444',
      reports: [
        'Regulatory Compliance',
        'Tax Compliance',
        'Safety Reports',
        'Environmental Impact',
        'Quality Certifications',
        'Audit Reports',
        'Risk Assessment',
        'Policy Compliance',
        'Documentation Status',
        'Inspection Reports'
      ]
    },
    {
      id: 'tobacco',
      name: 'Tobacco Industry Specific',
      icon: Leaf,
      color: '#059669',
      reports: [
        'Tobacco Processing',
        'Leaf Quality Analysis',
        'Curing Process Reports',
        'Blend Performance',
        'Flavor Analysis',
        'Moisture Content',
        'Fermentation Reports',
        'Export Documentation',
        'Tax Stamp Tracking',
        'Health Warning Compliance'
      ]
    }
  ]

  // Sample comprehensive data
  const [reportData] = useState<ReportData[]>([
    {
      id: 'fin-001',
      reportType: 'Financial',
      category: 'Performance',
      period: '2024-Q4',
      region: 'UAE',
      department: 'Finance',
      productLine: 'Premium Hookah',
      businessUnit: 'Manufacturing',
      metrics: {
        revenue: 375000,
        costs: 241875,
        profit: 133125,
        units: 15000,
        customers: 450,
        employees: 85,
        efficiency: 92.5,
        quality: 96.8,
        compliance: 98.2,
        satisfaction: 94.1
      },
      kpis: {
        grossMargin: 35.5,
        netMargin: 8.6,
        roa: 15.2,
        roe: 18.7,
        currentRatio: 2.1,
        quickRatio: 1.8
      },
      timestamp: '2024-12-15T10:30:00Z'
    },
    {
      id: 'ops-001',
      reportType: 'Operational',
      category: 'Analysis',
      period: '2024-Q4',
      region: 'Saudi Arabia',
      department: 'Operations',
      productLine: 'Standard Hookah',
      businessUnit: 'Distribution',
      metrics: {
        revenue: 285000,
        costs: 182400,
        profit: 102600,
        units: 22000,
        customers: 680,
        employees: 65,
        efficiency: 88.3,
        quality: 94.2,
        compliance: 96.8,
        satisfaction: 91.5
      },
      kpis: {
        productionEfficiency: 88.3,
        qualityScore: 94.2,
        onTimeDelivery: 96.5,
        inventoryTurnover: 8.2,
        equipmentUtilization: 85.7,
        defectRate: 2.1
      },
      timestamp: '2024-12-14T14:20:00Z'
    },
    {
      id: 'sales-001',
      reportType: 'Sales',
      category: 'Forecast',
      period: '2024-Q4',
      region: 'Kuwait',
      department: 'Sales',
      productLine: 'Flavored Tobacco',
      businessUnit: 'Retail',
      metrics: {
        revenue: 420000,
        costs: 273000,
        profit: 147000,
        units: 18500,
        customers: 520,
        employees: 45,
        efficiency: 91.2,
        quality: 95.5,
        compliance: 97.3,
        satisfaction: 93.8
      },
      kpis: {
        salesGrowth: 18.5,
        customerAcquisition: 125,
        conversionRate: 12.8,
        averageOrderValue: 807,
        customerRetention: 89.2,
        marketShare: 23.5
      },
      timestamp: '2024-12-13T09:15:00Z'
    }
  ])

  // Filtered data based on current filters and search
  const filteredData = useMemo(() => {
    return reportData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productLine.toLowerCase().includes(searchTerm.toLowerCase())

      const itemDate = new Date(item.timestamp)
      const startDate = new Date(filters.dateRange.startDate)
      const endDate = new Date(filters.dateRange.endDate)

      return (
        matchesSearch &&
        itemDate >= startDate &&
        itemDate <= endDate &&
        filters.reportTypes.includes(item.reportType) &&
        filters.categories.includes(item.category) &&
        filters.periods.includes(item.period) &&
        filters.regions.includes(item.region) &&
        filters.departments.includes(item.department) &&
        filters.productLines.includes(item.productLine) &&
        filters.businessUnits.includes(item.businessUnit) &&
        item.metrics.revenue >= filters.metricRanges.revenue.min &&
        item.metrics.revenue <= filters.metricRanges.revenue.max &&
        item.metrics.profit >= filters.metricRanges.profit.min &&
        item.metrics.profit <= filters.metricRanges.profit.max &&
        item.metrics.efficiency >= filters.metricRanges.efficiency.min &&
        item.metrics.efficiency <= filters.metricRanges.efficiency.max &&
        item.metrics.quality >= filters.metricRanges.quality.min &&
        item.metrics.quality <= filters.metricRanges.quality.max
      )
    }).sort((a, b) => {
      const aValue = a[filters.sortBy as keyof ReportData] as any
      const bValue = b[filters.sortBy as keyof ReportData] as any
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [reportData, filters, searchTerm])

  // Aggregated metrics
  const aggregatedMetrics = useMemo(() => {
    const totalRevenue = filteredData.reduce((sum, item) => sum + item.metrics.revenue, 0)
    const totalProfit = filteredData.reduce((sum, item) => sum + item.metrics.profit, 0)
    const avgEfficiency = filteredData.length > 0 ? 
      filteredData.reduce((sum, item) => sum + item.metrics.efficiency, 0) / filteredData.length : 0
    const avgQuality = filteredData.length > 0 ? 
      filteredData.reduce((sum, item) => sum + item.metrics.quality, 0) / filteredData.length : 0

    return {
      totalRevenue,
      totalProfit,
      avgEfficiency,
      avgQuality,
      recordCount: filteredData.length,
      profitMargin: totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0
    }
  }, [filteredData])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      reportTypes: ['Financial', 'Operational', 'Sales', 'Production', 'HR', 'Compliance'],
      categories: ['Performance', 'Analysis', 'Forecast', 'Comparison'],
      dateRange: { startDate: '2024-01-01', endDate: '2024-12-31' },
      periods: ['2024-Q4', '2024-Q3', '2024-Q2', '2024-Q1'],
      regions: ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar'],
      departments: ['Manufacturing', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
      productLines: ['Premium Hookah', 'Standard Hookah', 'Flavored Tobacco', 'Traditional Tobacco'],
      businessUnits: ['Manufacturing', 'Distribution', 'Retail', 'Export'],
      metricRanges: {
        revenue: { min: 0, max: 1000000 },
        profit: { min: 0, max: 500000 },
        efficiency: { min: 0, max: 100 },
        quality: { min: 0, max: 100 }
      },
      sortBy: 'timestamp',
      sortOrder: 'desc',
      groupBy: 'category',
      showTrends: true,
      includeForecasts: false
    })
  }

  return (
    <div style={{ 
      padding: "2rem",
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      borderRadius: '20px',
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1rem 0',
        borderBottom: '2px solid rgba(255,255,255,0.1)'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            margin: '0 0 0.5rem 0',
            background: 'linear-gradient(135deg, #00d4ff, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📊 Comprehensive Reporting & Analytics
          </h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '1.1rem' }}>
            Advanced Business Intelligence • Azure Tobacco Industrial FZCO
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ 
              position: 'absolute', 
              left: '0.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.6)'
            }} />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                width: '250px'
              }}
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              border: 'none',
              background: showFilters ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600'
            }}
          >
            <Filter size={18} />
            Filters
          </button>
          
          <button
            onClick={resetFilters}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <RefreshCw size={18} />
            Reset
          </button>
          
          <button
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600'
            }}
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#00d4ff' }}>🔍 Advanced Report Filters</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {/* Date Range */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>📅 Date Range</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="date"
                  value={filters.dateRange.startDate}
                  onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, startDate: e.target.value })}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    flex: 1
                  }}
                />
                <input
                  type="date"
                  value={filters.dateRange.endDate}
                  onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, endDate: e.target.value })}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    flex: 1
                  }}
                />
              </div>
            </div>

            {/* Revenue Range */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>💵 Revenue Range</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.metricRanges.revenue.min}
                  onChange={(e) => updateFilter('metricRanges', { 
                    ...filters.metricRanges, 
                    revenue: { ...filters.metricRanges.revenue, min: Number(e.target.value) }
                  })}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    flex: 1
                  }}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.metricRanges.revenue.max}
                  onChange={(e) => updateFilter('metricRanges', { 
                    ...filters.metricRanges, 
                    revenue: { ...filters.metricRanges.revenue, max: Number(e.target.value) }
                  })}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    flex: 1
                  }}
                />
              </div>
            </div>

            {/* Efficiency Range */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>⚡ Efficiency Range (%)</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.metricRanges.efficiency.min}
                  onChange={(e) => updateFilter('metricRanges', { 
                    ...filters.metricRanges, 
                    efficiency: { ...filters.metricRanges.efficiency, min: Number(e.target.value) }
                  })}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    flex: 1
                  }}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.metricRanges.efficiency.max}
                  onChange={(e) => updateFilter('metricRanges', { 
                    ...filters.metricRanges, 
                    efficiency: { ...filters.metricRanges.efficiency, max: Number(e.target.value) }
                  })}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    flex: 1
                  }}
                />
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>🔄 Sort By</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    flex: 1
                  }}
                >
                  <option value="timestamp">Date</option>
                  <option value="reportType">Report Type</option>
                  <option value="region">Region</option>
                  <option value="department">Department</option>
                </select>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => updateFilter('sortOrder', e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    flex: 1
                  }}
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Multi-select filters */}
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {/* Report Types */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>📋 Report Types</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Financial', 'Operational', 'Sales', 'HR', 'Compliance', 'Tobacco'].map(type => (
                  <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={filters.reportTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilter('reportTypes', [...filters.reportTypes, type])
                        } else {
                          updateFilter('reportTypes', filters.reportTypes.filter(t => t !== type))
                        }
                      }}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Regions */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>🌍 Regions</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Oman', 'Bahrain'].map(region => (
                  <label key={region} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={filters.regions.includes(region)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilter('regions', [...filters.regions, region])
                        } else {
                          updateFilter('regions', filters.regions.filter(r => r !== region))
                        }
                      }}
                    />
                    {region}
                  </label>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>🏢 Departments</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Manufacturing', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'R&D'].map(dept => (
                  <label key={dept} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={filters.departments.includes(dept)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilter('departments', [...filters.departments, dept])
                        } else {
                          updateFilter('departments', filters.departments.filter(d => d !== dept))
                        }
                      }}
                    />
                    {dept}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Mode Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {[
          { id: 'cards', label: '📊 Cards', icon: BarChart3 },
          { id: 'table', label: '📋 Table', icon: FileText },
          { id: 'charts', label: '📈 Charts', icon: LineChart }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id as any)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: viewMode === tab.id 
                ? 'linear-gradient(135deg, #00d4ff, #0099cc)' 
                : 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Summary Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '15px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 212, 255, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <DollarSign size={20} style={{ color: '#00d4ff' }} />
            <h3 style={{ margin: 0, color: '#00d4ff' }}>Total Revenue</h3>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {formatCurrency(aggregatedMetrics.totalRevenue)}
          </div>
          <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>
            From {aggregatedMetrics.recordCount} reports
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '15px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 212, 255, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <TrendingUp size={20} style={{ color: '#00d4ff' }} />
            <h3 style={{ margin: 0, color: '#00d4ff' }}>Total Profit</h3>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {formatCurrency(aggregatedMetrics.totalProfit)}
          </div>
          <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>
            Margin: {formatPercentage(aggregatedMetrics.profitMargin)}
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '15px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 212, 255, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Zap size={20} style={{ color: '#00d4ff' }} />
            <h3 style={{ margin: 0, color: '#00d4ff' }}>Avg Efficiency</h3>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {formatPercentage(aggregatedMetrics.avgEfficiency)}
          </div>
          <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>
            Operational Performance
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '15px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 212, 255, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Target size={20} style={{ color: '#00d4ff' }} />
            <h3 style={{ margin: 0, color: '#00d4ff' }}>Avg Quality</h3>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {formatPercentage(aggregatedMetrics.avgQuality)}
          </div>
          <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>
            Quality Score
          </div>
        </div>
      </div>

      {/* Report Type Categories */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {reportTypes.map((type) => (
          <div key={type.id} style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '15px',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${type.color}30`,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => setSelectedReportType(type.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <type.icon size={24} style={{ color: type.color }} />
              <h3 style={{ margin: 0, color: type.color, fontSize: '1.2rem' }}>{type.name}</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {type.reports.slice(0, 6).map((report, index) => (
                <div key={index} style={{
                  padding: '0.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  border: `1px solid ${type.color}20`
                }}>
                  {report}
                </div>
              ))}
            </div>
            
            {type.reports.length > 6 && (
              <div style={{ 
                marginTop: '0.5rem', 
                textAlign: 'center', 
                opacity: 0.7, 
                fontSize: '0.9rem' 
              }}>
                +{type.reports.length - 6} more reports
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Data Display based on view mode */}
      {viewMode === 'cards' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredData.map((item) => (
            <div key={item.id} style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '15px',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0, color: '#00d4ff' }}>{item.reportType} - {item.category}</h4>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '20px', 
                  background: 'rgba(0, 212, 255, 0.2)',
                  fontSize: '0.8rem'
                }}>
                  {item.region}
                </span>
              </div>
              
              <div style={{ marginBottom: '1rem', opacity: 0.8 }}>
                <div>{item.department} • {item.productLine}</div>
                <div style={{ fontSize: '0.9rem' }}>{item.period}</div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Revenue</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatCurrency(item.metrics.revenue)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Profit</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4ade80' }}>
                    {formatCurrency(item.metrics.profit)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Efficiency</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatPercentage(item.metrics.efficiency)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Quality</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatPercentage(item.metrics.quality)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'table' && (
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '15px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          overflowX: 'auto'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#00d4ff' }}>📋 Detailed Report Analysis</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00d4ff' }}>Type</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00d4ff' }}>Category</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00d4ff' }}>Region</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00d4ff' }}>Department</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#00d4ff' }}>Revenue</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#00d4ff' }}>Profit</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#00d4ff' }}>Efficiency</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#00d4ff' }}>Quality</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} style={{ 
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'
                }}>
                  <td style={{ padding: '1rem' }}>{item.reportType}</td>
                  <td style={{ padding: '1rem' }}>{item.category}</td>
                  <td style={{ padding: '1rem' }}>{item.region}</td>
                  <td style={{ padding: '1rem' }}>{item.department}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>{formatCurrency(item.metrics.revenue)}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: '#4ade80' }}>
                    {formatCurrency(item.metrics.profit)}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>{formatPercentage(item.metrics.efficiency)}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>{formatPercentage(item.metrics.quality)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ReportingAnalytics
