import React, { useState, useMemo } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Filter, 
  Download, 
  BarChart3, 
  PieChart, 
  LineChart,
  FileText,
  Search,
  RefreshCw,
  Eye,
  Settings
} from 'lucide-react'

interface EBITDAData {
  id: string
  period: string
  quarter: string
  year: number
  month: number
  region: string
  productLine: string
  businessUnit: string
  revenue: number
  costOfGoodsSold: number
  grossProfit: number
  operatingExpenses: {
    salaries: number
    rent: number
    utilities: number
    marketing: number
    insurance: number
    rawMaterials: number
    transportation: number
    regulatory: number
    other: number
  }
  ebitda: number
  ebitdaMargin: number
  depreciation: number
  amortization: number
  ebit: number
  interestExpense: number
  interestIncome: number
  ebt: number
  taxes: number
  netIncome: number
  cashFlow: number
  workingCapital: number
  businessMetrics: {
    grossMargin: number
    operatingMargin: number
    netMargin: number
    returnOnAssets: number
    returnOnEquity: number
    debtToEquity: number
    currentRatio: number
    quickRatio: number
  }
}

interface FilterOptions {
  dateRange: {
    startDate: string
    endDate: string
  }
  periods: string[]
  regions: string[]
  productLines: string[]
  businessUnits: string[]
  revenueRange: {
    min: number
    max: number
  }
  ebitdaRange: {
    min: number
    max: number
  }
  sortBy: string
  sortOrder: 'asc' | 'desc'
  groupBy: string
  showComparisons: boolean
  includeForecasts: boolean
}

const EBITDAReports: React.FC = () => {
  const [viewType, setViewType] = useState<'summary' | 'detailed' | 'comparison' | 'trends' | 'forecasts'>('summary')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState('ebitda')
  
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: {
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    periods: ['2024-Q4', '2024-Q3', '2024-Q2', '2024-Q1'],
    regions: ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar'],
    productLines: ['Premium Hookah', 'Standard Hookah', 'Flavored Tobacco', 'Traditional Tobacco'],
    businessUnits: ['Manufacturing', 'Distribution', 'Retail', 'Export'],
    revenueRange: { min: 0, max: 1000000 },
    ebitdaRange: { min: 0, max: 200000 },
    sortBy: 'period',
    sortOrder: 'desc',
    groupBy: 'quarter',
    showComparisons: true,
    includeForecasts: false
  })

  // Sample comprehensive data
  const [ebitdaData] = useState<EBITDAData[]>([
    {
      id: '2024-Q4-UAE-Premium',
      period: '2024-Q4',
      quarter: 'Q4',
      year: 2024,
      month: 12,
      region: 'UAE',
      productLine: 'Premium Hookah',
      businessUnit: 'Manufacturing',
      revenue: 375000,
      costOfGoodsSold: 241875,
      grossProfit: 133125,
      operatingExpenses: {
        salaries: 45000,
        rent: 12000,
        utilities: 3500,
        marketing: 8000,
        insurance: 2500,
        rawMaterials: 15000,
        transportation: 4500,
        regulatory: 3000,
        other: 6000
      },
      ebitda: 56125,
      ebitdaMargin: 15.0,
      depreciation: 8500,
      amortization: 2000,
      ebit: 45625,
      interestExpense: 3200,
      interestIncome: 500,
      ebt: 42925,
      taxes: 10731,
      netIncome: 32194,
      cashFlow: 42694,
      workingCapital: 85000,
      businessMetrics: {
        grossMargin: 35.5,
        operatingMargin: 12.2,
        netMargin: 8.6,
        returnOnAssets: 15.2,
        returnOnEquity: 18.7,
        debtToEquity: 0.45,
        currentRatio: 2.1,
        quickRatio: 1.8
      }
    },
    {
      id: '2024-Q4-Saudi-Standard',
      period: '2024-Q4',
      quarter: 'Q4',
      year: 2024,
      month: 12,
      region: 'Saudi Arabia',
      productLine: 'Standard Hookah',
      businessUnit: 'Distribution',
      revenue: 285000,
      costOfGoodsSold: 182400,
      grossProfit: 102600,
      operatingExpenses: {
        salaries: 35000,
        rent: 8000,
        utilities: 2500,
        marketing: 6000,
        insurance: 2000,
        rawMaterials: 12000,
        transportation: 5500,
        regulatory: 4000,
        other: 4500
      },
      ebitda: 23100,
      ebitdaMargin: 8.1,
      depreciation: 6000,
      amortization: 1500,
      ebit: 15600,
      interestExpense: 2500,
      interestIncome: 200,
      ebt: 13300,
      taxes: 3325,
      netIncome: 9975,
      cashFlow: 17475,
      workingCapital: 65000,
      businessMetrics: {
        grossMargin: 36.0,
        operatingMargin: 5.5,
        netMargin: 3.5,
        returnOnAssets: 8.2,
        returnOnEquity: 12.1,
        debtToEquity: 0.62,
        currentRatio: 1.9,
        quickRatio: 1.5
      }
    },
    {
      id: '2024-Q3-UAE-Flavored',
      period: '2024-Q3',
      quarter: 'Q3',
      year: 2024,
      month: 9,
      region: 'UAE',
      productLine: 'Flavored Tobacco',
      businessUnit: 'Retail',
      revenue: 420000,
      costOfGoodsSold: 273000,
      grossProfit: 147000,
      operatingExpenses: {
        salaries: 48000,
        rent: 15000,
        utilities: 4000,
        marketing: 12000,
        insurance: 3000,
        rawMaterials: 18000,
        transportation: 6000,
        regulatory: 2500,
        other: 7500
      },
      ebitda: 31000,
      ebitdaMargin: 7.4,
      depreciation: 9000,
      amortization: 2500,
      ebit: 19500,
      interestExpense: 3500,
      interestIncome: 300,
      ebt: 16300,
      taxes: 4075,
      netIncome: 12225,
      cashFlow: 23725,
      workingCapital: 95000,
      businessMetrics: {
        grossMargin: 35.0,
        operatingMargin: 4.6,
        netMargin: 2.9,
        returnOnAssets: 6.8,
        returnOnEquity: 9.2,
        debtToEquity: 0.58,
        currentRatio: 2.3,
        quickRatio: 1.9
      }
    }
  ])

  // Filtered and processed data
  const filteredData = useMemo(() => {
    return ebitdaData.filter(item => {
      const itemDate = new Date(`${item.year}-${item.month.toString().padStart(2, '0')}-01`)
      const startDate = new Date(filters.dateRange.startDate)
      const endDate = new Date(filters.dateRange.endDate)
      
      return (
        itemDate >= startDate &&
        itemDate <= endDate &&
        filters.periods.includes(item.period) &&
        filters.regions.includes(item.region) &&
        filters.productLines.includes(item.productLine) &&
        filters.businessUnits.includes(item.businessUnit) &&
        item.revenue >= filters.revenueRange.min &&
        item.revenue <= filters.revenueRange.max &&
        item.ebitda >= filters.ebitdaRange.min &&
        item.ebitda <= filters.ebitdaRange.max
      )
    }).sort((a, b) => {
      const aValue = a[filters.sortBy as keyof EBITDAData] as any
      const bValue = b[filters.sortBy as keyof EBITDAData] as any
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [ebitdaData, filters])

  // Aggregated metrics
  const aggregatedMetrics = useMemo(() => {
    const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0)
    const totalEBITDA = filteredData.reduce((sum, item) => sum + item.ebitda, 0)
    const totalNetIncome = filteredData.reduce((sum, item) => sum + item.netIncome, 0)
    const avgEBITDAMargin = filteredData.length > 0 ? 
      filteredData.reduce((sum, item) => sum + item.ebitdaMargin, 0) / filteredData.length : 0

    return {
      totalRevenue,
      totalEBITDA,
      totalNetIncome,
      avgEBITDAMargin,
      recordCount: filteredData.length
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
      dateRange: { startDate: '2024-01-01', endDate: '2024-12-31' },
      periods: ['2024-Q4', '2024-Q3', '2024-Q2', '2024-Q1'],
      regions: ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar'],
      productLines: ['Premium Hookah', 'Standard Hookah', 'Flavored Tobacco', 'Traditional Tobacco'],
      businessUnits: ['Manufacturing', 'Distribution', 'Retail', 'Export'],
      revenueRange: { min: 0, max: 1000000 },
      ebitdaRange: { min: 0, max: 200000 },
      sortBy: 'period',
      sortOrder: 'desc',
      groupBy: 'quarter',
      showComparisons: true,
      includeForecasts: false
    })
  }

  return (
    <div style={{ 
      padding: '2rem',
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
            💰 EBITDA Reports & Analytics
          </h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '1.1rem' }}>
            Comprehensive Financial Performance Analysis • Azure Tobacco Industrial FZCO
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
          <h3 style={{ marginBottom: '1.5rem', color: '#00d4ff' }}>🔍 Advanced Filters</h3>
          
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
                  value={filters.revenueRange.min}
                  onChange={(e) => updateFilter('revenueRange', { ...filters.revenueRange, min: Number(e.target.value) })}
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
                  value={filters.revenueRange.max}
                  onChange={(e) => updateFilter('revenueRange', { ...filters.revenueRange, max: Number(e.target.value) })}
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

            {/* EBITDA Range */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>📊 EBITDA Range</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.ebitdaRange.min}
                  onChange={(e) => updateFilter('ebitdaRange', { ...filters.ebitdaRange, min: Number(e.target.value) })}
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
                  value={filters.ebitdaRange.max}
                  onChange={(e) => updateFilter('ebitdaRange', { ...filters.ebitdaRange, max: Number(e.target.value) })}
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
                  <option value="period">Period</option>
                  <option value="revenue">Revenue</option>
                  <option value="ebitda">EBITDA</option>
                  <option value="ebitdaMargin">EBITDA Margin</option>
                  <option value="netIncome">Net Income</option>
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

            {/* Product Lines */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>🚬 Product Lines</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Premium Hookah', 'Standard Hookah', 'Flavored Tobacco', 'Traditional Tobacco', 'Accessories'].map(product => (
                  <label key={product} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={filters.productLines.includes(product)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilter('productLines', [...filters.productLines, product])
                        } else {
                          updateFilter('productLines', filters.productLines.filter(p => p !== product))
                        }
                      }}
                    />
                    {product}
                  </label>
                ))}
              </div>
            </div>

            {/* Business Units */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>🏢 Business Units</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Manufacturing', 'Distribution', 'Retail', 'Export', 'R&D', 'Corporate'].map(unit => (
                  <label key={unit} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={filters.businessUnits.includes(unit)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilter('businessUnits', [...filters.businessUnits, unit])
                        } else {
                          updateFilter('businessUnits', filters.businessUnits.filter(u => u !== unit))
                        }
                      }}
                    />
                    {unit}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Type Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {[
          { id: 'summary', label: '📊 Summary', icon: BarChart3 },
          { id: 'detailed', label: '📋 Detailed', icon: FileText },
          { id: 'comparison', label: '⚖️ Comparison', icon: PieChart },
          { id: 'trends', label: '📈 Trends', icon: LineChart },
          { id: 'forecasts', label: '🔮 Forecasts', icon: TrendingUp }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setViewType(tab.id as any)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: viewType === tab.id 
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

      {/* Summary Cards */}
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
            From {aggregatedMetrics.recordCount} records
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
            <h3 style={{ margin: 0, color: '#00d4ff' }}>Total EBITDA</h3>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {formatCurrency(aggregatedMetrics.totalEBITDA)}
          </div>
          <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>
            Avg Margin: {formatPercentage(aggregatedMetrics.avgEBITDAMargin)}
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
            <BarChart3 size={20} style={{ color: '#00d4ff' }} />
            <h3 style={{ margin: 0, color: '#00d4ff' }}>Net Income</h3>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {formatCurrency(aggregatedMetrics.totalNetIncome)}
          </div>
          <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>
            Net Margin: {formatPercentage((aggregatedMetrics.totalNetIncome / aggregatedMetrics.totalRevenue) * 100)}
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
            <Eye size={20} style={{ color: '#00d4ff' }} />
            <h3 style={{ margin: 0, color: '#00d4ff' }}>Records Found</h3>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {aggregatedMetrics.recordCount}
          </div>
          <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>
            Filtered results
          </div>
        </div>
      </div>

      {/* Detailed Data Table */}
      {viewType === 'detailed' && (
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '15px',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          overflowX: 'auto'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#00d4ff' }}>📋 Detailed EBITDA Analysis</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00d4ff' }}>Period</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00d4ff' }}>Region</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00d4ff' }}>Product Line</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#00d4ff' }}>Revenue</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#00d4ff' }}>EBITDA</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#00d4ff' }}>EBITDA %</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#00d4ff' }}>Net Income</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#00d4ff' }}>ROA</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} style={{ 
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'
                }}>
                  <td style={{ padding: '1rem' }}>{item.period}</td>
                  <td style={{ padding: '1rem' }}>{item.region}</td>
                  <td style={{ padding: '1rem' }}>{item.productLine}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>{formatCurrency(item.revenue)}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: item.ebitda > 0 ? '#4ade80' : '#f87171' }}>
                    {formatCurrency(item.ebitda)}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>{formatPercentage(item.ebitdaMargin)}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>{formatCurrency(item.netIncome)}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>{formatPercentage(item.businessMetrics.returnOnAssets)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary View */}
      {viewType === 'summary' && (
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
                <h4 style={{ margin: 0, color: '#00d4ff' }}>{item.period} - {item.region}</h4>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '20px', 
                  background: 'rgba(0, 212, 255, 0.2)',
                  fontSize: '0.8rem'
                }}>
                  {item.productLine}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Revenue</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatCurrency(item.revenue)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>EBITDA</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: item.ebitda > 0 ? '#4ade80' : '#f87171' }}>
                    {formatCurrency(item.ebitda)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>EBITDA Margin</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatPercentage(item.ebitdaMargin)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Net Income</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatCurrency(item.netIncome)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EBITDAReports 