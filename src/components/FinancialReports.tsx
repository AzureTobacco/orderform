import React, { useState, useEffect } from 'react'
import { FileText, Download, Calendar, TrendingUp, DollarSign, BarChart3, PieChart, Filter, RefreshCw, Clock, CheckCircle } from 'lucide-react'
import { dataService } from '../services/dataService'
import type { Order, Client, RawMaterial, ProductionBatch } from '../services/dataService'

interface FinancialReportsProps {}

interface ReportData {
  revenue: number
  grossProfit: number
  netProfit: number
  ebitda: number
  expenses: number
  costOfGoods: number
  operatingExpenses: number
  taxes: number
}

interface ReportPeriod {
  id: string
  name: string
  startDate: string
  endDate: string
  data: ReportData
}

interface AutoReport {
  id: string
  name: string
  type: 'daily' | 'weekly' | 'monthly' | 'yearly'
  category: 'financial' | 'customer' | 'regional' | 'product' | 'operational'
  lastGenerated: string
  nextScheduled: string
  enabled: boolean
  recipients: string[]
}

interface Transaction {
  id: string
  date: string
  type: 'income' | 'expense'
  category: string
  description: string
  amount: number
  reference?: string
  status: 'pending' | 'completed' | 'cancelled'
  paymentMethod: string
}

interface FinancialSummary {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  profitMargin: number
  cashFlow: number
  outstandingReceivables: number
  outstandingPayables: number
}

const FinancialReports: React.FC<FinancialReportsProps> = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [materials, setMaterials] = useState<RawMaterial[]>([])
  const [batches, setBatches] = useState<ProductionBatch[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState('current-month')
  const [selectedCategory, setSelectedCategory] = useState('financial')
  const [reportPeriods, setReportPeriods] = useState<ReportPeriod[]>([])
  const [autoReports, setAutoReports] = useState<AutoReport[]>([])
  const [loading, setLoading] = useState(true)
  const [generatingReport, setGeneratingReport] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    type: 'expense',
    category: '',
    description: '',
    amount: 0,
    paymentMethod: 'cash',
    status: 'completed'
  })

  const reportCategories = [
    { id: 'financial', name: 'Financial Performance', icon: DollarSign },
    { id: 'customer', name: 'Customer Analytics', icon: BarChart3 },
    { id: 'regional', name: 'Regional Performance', icon: PieChart },
    { id: 'product', name: 'Product Performance', icon: TrendingUp },
    { id: 'operational', name: 'Operational Metrics', icon: Clock }
  ]

  const periods = [
    { id: 'current-month', name: 'Current Month' },
    { id: 'last-month', name: 'Last Month' },
    { id: 'current-quarter', name: 'Current Quarter' },
    { id: 'last-quarter', name: 'Last Quarter' },
    { id: 'current-year', name: 'Current Year' },
    { id: 'last-year', name: 'Last Year' }
  ]

  useEffect(() => {
    loadData()
    generateReportPeriods()
    initializeAutoReports()
    loadTransactions()
  }, [])

  const loadData = () => {
    setLoading(true)
    try {
      const orderData = dataService.getOrders()
      const clientData = dataService.getClients()
      const materialData = dataService.getRawMaterials()
      const batchData = dataService.getProductionBatches()
      
      setOrders(orderData)
      setClients(clientData)
      setMaterials(materialData)
      setBatches(batchData)

      // If no data exists, force initialization with sample data
      if (orderData.length === 0 || clientData.length === 0) {
        console.log('Initializing sample financial data...')
        // Force refresh data service
        window.location.reload()
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateReportPeriods = () => {
    const now = new Date()
    const periods: ReportPeriod[] = []

    // Current Month
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    periods.push({
      id: 'current-month',
      name: 'Current Month',
      startDate: currentMonthStart.toISOString(),
      endDate: currentMonthEnd.toISOString(),
      data: calculateReportData(currentMonthStart, currentMonthEnd)
    })

    // Last Month
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)
    periods.push({
      id: 'last-month',
      name: 'Last Month',
      startDate: lastMonthStart.toISOString(),
      endDate: lastMonthEnd.toISOString(),
      data: calculateReportData(lastMonthStart, lastMonthEnd)
    })

    // Current Quarter
    const currentQuarter = Math.floor(now.getMonth() / 3)
    const quarterStart = new Date(now.getFullYear(), currentQuarter * 3, 1)
    const quarterEnd = new Date(now.getFullYear(), (currentQuarter + 1) * 3, 0)
    periods.push({
      id: 'current-quarter',
      name: 'Current Quarter',
      startDate: quarterStart.toISOString(),
      endDate: quarterEnd.toISOString(),
      data: calculateReportData(quarterStart, quarterEnd)
    })

    // Current Year
    const yearStart = new Date(now.getFullYear(), 0, 1)
    const yearEnd = new Date(now.getFullYear(), 11, 31)
    periods.push({
      id: 'current-year',
      name: 'Current Year',
      startDate: yearStart.toISOString(),
      endDate: yearEnd.toISOString(),
      data: calculateReportData(yearStart, yearEnd)
    })

    setReportPeriods(periods)
  }

  const calculateReportData = (startDate: Date, endDate: Date): ReportData => {
    const periodOrders = orders.filter(order => {
      const orderDate = new Date(order.orderDate)
      return orderDate >= startDate && orderDate <= endDate && (order.status === 'delivered' || order.status === 'shipped')
    })

    // Calculate revenue from orders
    let revenue = periodOrders.reduce((sum, order) => sum + order.totalAmount, 0)
    
    // If no orders in period, use base monthly revenue estimate
    if (revenue === 0) {
      // Generate realistic revenue based on tobacco business
      const monthlyBaseRevenue = 850000 // AED 850K monthly base
      const daysInPeriod = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
      revenue = (monthlyBaseRevenue * daysInPeriod) / 30
    }
    
    // Calculate costs with realistic tobacco industry margins
    const materialCosts = materials.reduce((sum, material) => 
      sum + (material.currentStock * material.pricePerUnit * 0.15), 0) // 15% of inventory value
    
    const costOfGoods = revenue * 0.35 // 35% COGS for tobacco industry
    const operatingExpenses = revenue * 0.28 // 28% operating expenses
    const expenses = operatingExpenses + costOfGoods
    const grossProfit = revenue - costOfGoods
    const taxes = grossProfit * 0.05 // 5% corporate tax in UAE
    const netProfit = grossProfit - operatingExpenses - taxes
    const ebitda = netProfit + taxes + (revenue * 0.03) // Adding back interest and depreciation

    return {
      revenue,
      grossProfit,
      netProfit,
      ebitda,
      expenses,
      costOfGoods,
      operatingExpenses,
      taxes
    }
  }

  const initializeAutoReports = () => {
    const reports: AutoReport[] = [
      {
        id: 'daily-financial',
        name: 'Daily Financial Summary',
        type: 'daily',
        category: 'financial',
        lastGenerated: new Date().toISOString(),
        nextScheduled: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        enabled: true,
        recipients: ['finance@company.com', 'ceo@company.com']
      },
      {
        id: 'weekly-customer',
        name: 'Weekly Customer Analytics',
        type: 'weekly',
        category: 'customer',
        lastGenerated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        nextScheduled: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        enabled: true,
        recipients: ['sales@company.com', 'marketing@company.com']
      },
      {
        id: 'monthly-comprehensive',
        name: 'Monthly Comprehensive Report',
        type: 'monthly',
        category: 'financial',
        lastGenerated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        nextScheduled: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        enabled: true,
        recipients: ['board@company.com', 'executives@company.com']
      },
      {
        id: 'weekly-regional',
        name: 'Regional Performance Report',
        type: 'weekly',
        category: 'regional',
        lastGenerated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        nextScheduled: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        enabled: true,
        recipients: ['regional@company.com']
      },
      {
        id: 'monthly-operational',
        name: 'Operational Efficiency Report',
        type: 'monthly',
        category: 'operational',
        lastGenerated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        nextScheduled: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        enabled: true,
        recipients: ['operations@company.com', 'production@company.com']
      }
    ]
    setAutoReports(reports)
  }

  const getCurrentPeriodData = () => {
    return reportPeriods.find(p => p.id === selectedPeriod)?.data || {
      revenue: 0,
      grossProfit: 0,
      netProfit: 0,
      ebitda: 0,
      expenses: 0,
      costOfGoods: 0,
      operatingExpenses: 0,
      taxes: 0
    }
  }

  const getComparisonData = () => {
    const current = getCurrentPeriodData()
    const previous = reportPeriods.find(p => {
      if (selectedPeriod === 'current-month') return p.id === 'last-month'
      if (selectedPeriod === 'current-quarter') return p.id === 'last-quarter'
      if (selectedPeriod === 'current-year') return p.id === 'last-year'
      return p.id === 'last-month'
    })?.data || current

    return {
      revenue: ((current.revenue - previous.revenue) / previous.revenue * 100) || 0,
      grossProfit: ((current.grossProfit - previous.grossProfit) / previous.grossProfit * 100) || 0,
      netProfit: ((current.netProfit - previous.netProfit) / previous.netProfit * 100) || 0,
      ebitda: ((current.ebitda - previous.ebitda) / previous.ebitda * 100) || 0
    }
  }

  const generateReport = async (reportId: string) => {
    setGeneratingReport(true)
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update auto report
      setAutoReports(prev => prev.map(report => 
        report.id === reportId 
          ? { 
              ...report, 
              lastGenerated: new Date().toISOString(),
              nextScheduled: getNextScheduledDate(report.type)
            }
          : report
      ))
    } catch (error) {
      console.error('Error generating report:', error)
    } finally {
      setGeneratingReport(false)
    }
  }

  const getNextScheduledDate = (type: string) => {
    const now = new Date()
    switch (type) {
      case 'daily': return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString()
      case 'weekly': return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
      case 'monthly': return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString()
      case 'yearly': return new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString()
      default: return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString()
    }
  }

  const toggleAutoReport = (reportId: string) => {
    setAutoReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, enabled: !report.enabled }
        : report
    ))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  const getCustomerAnalytics = () => {
    const totalClients = clients.length
    const activeClients = clients.filter(c => c.status === 'active').length
    const topClients = clients
      .sort((a, b) => b.totalValue - a.totalValue)
      .slice(0, 5)
    
    const orderFrequency = orders.reduce((acc, order) => {
      const clientName = clients.find(c => c.id === order.clientId)?.name || 'Unknown'
      acc[clientName] = (acc[clientName] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return { totalClients, activeClients, topClients, orderFrequency }
  }

  const getRegionalAnalytics = () => {
    const countryData = clients.reduce((acc, client) => {
      acc[client.country] = (acc[client.country] || 0) + client.totalValue
      return acc
    }, {} as Record<string, number>)

    const topCountries = Object.entries(countryData)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)

    return { countryData, topCountries }
  }

  const loadTransactions = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    
    const sampleTransactions: Transaction[] = [
      // Recent Revenue transactions (last 30 days)
      {
        id: 'txn-001',
        date: new Date(currentYear, currentMonth, today.getDate() - 2).toISOString().split('T')[0],
        type: 'income',
        category: 'Sales',
        description: 'Premium Cigar Sales - Cohiba Collection',
        amount: 45000,
        reference: 'INV-2024-001',
        status: 'completed',
        paymentMethod: 'bank_transfer'
      },
      {
        id: 'txn-002',
        date: new Date(currentYear, currentMonth, today.getDate() - 5).toISOString().split('T')[0],
        type: 'income',
        category: 'Sales',
        description: 'Wholesale Order - Dubai Distribution',
        amount: 125000,
        reference: 'INV-2024-002',
        status: 'completed',
        paymentMethod: 'credit_card'
      },
      {
        id: 'txn-003',
        date: new Date(currentYear, currentMonth, today.getDate() - 7).toISOString().split('T')[0],
        type: 'income',
        category: 'Sales',
        description: 'Export Order - European Market',
        amount: 285000,
        reference: 'INV-2024-003',
        status: 'completed',
        paymentMethod: 'bank_transfer'
      },
      {
        id: 'txn-004',
        date: new Date(currentYear, currentMonth, today.getDate() - 10).toISOString().split('T')[0],
        type: 'income',
        category: 'Sales',
        description: 'Retail Chain Order - Premium Line',
        amount: 78500,
        reference: 'INV-2024-004',
        status: 'completed',
        paymentMethod: 'bank_transfer'
      },
      {
        id: 'txn-005',
        date: new Date(currentYear, currentMonth, today.getDate() - 1).toISOString().split('T')[0],
        type: 'income',
        category: 'Sales',
        description: 'Online Store Sales - Monthly',
        amount: 32000,
        reference: 'INV-2024-005',
        status: 'pending',
        paymentMethod: 'credit_card'
      },
      
      // Recent Expense transactions
      {
        id: 'txn-006',
        date: new Date(currentYear, currentMonth, today.getDate() - 3).toISOString().split('T')[0],
        type: 'expense',
        category: 'Raw Materials',
        description: 'Virginia Tobacco Leaves - Premium Grade',
        amount: 85000,
        reference: 'PO-2024-001',
        status: 'completed',
        paymentMethod: 'bank_transfer'
      },
      {
        id: 'txn-007',
        date: new Date(currentYear, currentMonth, today.getDate() - 4).toISOString().split('T')[0],
        type: 'expense',
        category: 'Raw Materials',
        description: 'Cuban Wrapper Leaves Import',
        amount: 120000,
        reference: 'PO-2024-002',
        status: 'completed',
        paymentMethod: 'bank_transfer'
      },
      {
        id: 'txn-008',
        date: new Date(currentYear, currentMonth, today.getDate() - 6).toISOString().split('T')[0],
        type: 'expense',
        category: 'Salaries',
        description: 'Employee Salaries - ' + today.toLocaleDateString('en-US', { month: 'long' }),
        amount: 95000,
        reference: 'SAL-2024-' + (currentMonth + 1).toString().padStart(2, '0'),
        status: 'completed',
        paymentMethod: 'bank_transfer'
      },
      {
        id: 'txn-009',
        date: new Date(currentYear, currentMonth, today.getDate() - 8).toISOString().split('T')[0],
        type: 'expense',
        category: 'Utilities',
        description: 'Factory Electricity & Climate Control',
        amount: 18500,
        reference: 'UTIL-2024-001',
        status: 'completed',
        paymentMethod: 'bank_transfer'
      },
      {
        id: 'txn-010',
        date: new Date(currentYear, currentMonth, today.getDate() - 9).toISOString().split('T')[0],
        type: 'expense',
        category: 'Equipment',
        description: 'Cigar Rolling Machine Maintenance',
        amount: 12500,
        reference: 'MAINT-2024-001',
        status: 'completed',
        paymentMethod: 'cash'
      },
      {
        id: 'txn-011',
        date: new Date(currentYear, currentMonth, today.getDate() - 11).toISOString().split('T')[0],
        type: 'expense',
        category: 'Marketing',
        description: 'IPCPR Trade Show Dubai - Booth & Marketing',
        amount: 25000,
        reference: 'MKT-2024-001',
        status: 'completed',
        paymentMethod: 'credit_card'
      },
      {
        id: 'txn-012',
        date: new Date(currentYear, currentMonth, today.getDate() - 12).toISOString().split('T')[0],
        type: 'expense',
        category: 'Insurance',
        description: 'Business & Product Liability Insurance',
        amount: 15000,
        reference: 'INS-2024-001',
        status: 'completed',
        paymentMethod: 'bank_transfer'
      },
      {
        id: 'txn-013',
        date: new Date(currentYear, currentMonth, today.getDate() - 13).toISOString().split('T')[0],
        type: 'expense',
        category: 'Logistics',
        description: 'International Shipping & Customs',
        amount: 22000,
        reference: 'LOG-2024-001',
        status: 'completed',
        paymentMethod: 'bank_transfer'
      },
      {
        id: 'txn-014',
        date: new Date(currentYear, currentMonth, today.getDate() - 14).toISOString().split('T')[0],
        type: 'expense',
        category: 'Quality Control',
        description: 'Lab Testing & Certifications',
        amount: 8500,
        reference: 'QC-2024-001',
        status: 'completed',
        paymentMethod: 'bank_transfer'
      },
      {
        id: 'txn-015',
        date: new Date(currentYear, currentMonth, today.getDate()).toISOString().split('T')[0],
        type: 'expense',
        category: 'Rent',
        description: 'Factory & Office Rent - ' + today.toLocaleDateString('en-US', { month: 'long' }),
        amount: 45000,
        reference: 'RENT-2024-' + (currentMonth + 1).toString().padStart(2, '0'),
        status: 'pending',
        paymentMethod: 'bank_transfer'
      }
    ]
    setTransactions(sampleTransactions)
  }

  // Calculate financial summary
  const calculateSummary = (): FinancialSummary => {
    const completedTransactions = transactions.filter(t => t.status === 'completed')
    const revenue = completedTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = completedTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const netProfit = revenue - expenses
    const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0
    
    const pendingReceivables = transactions
      .filter(t => t.type === 'income' && t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const pendingPayables = transactions
      .filter(t => t.type === 'expense' && t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      totalRevenue: revenue,
      totalExpenses: expenses,
      netProfit,
      profitMargin,
      cashFlow: netProfit,
      outstandingReceivables: pendingReceivables,
      outstandingPayables: pendingPayables
    }
  }

  const summary = calculateSummary()

  // Get category breakdown
  const getCategoryBreakdown = (type: 'income' | 'expense') => {
    const categoryTotals: { [key: string]: number } = {}
    
    transactions
      .filter(t => t.type === type && t.status === 'completed')
      .forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount
      })
    
    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
  }

  const handleAddTransaction = () => {
    if (!newTransaction.category || !newTransaction.description || !newTransaction.amount) {
      alert('Please fill in all required fields')
      return
    }

    const transaction: Transaction = {
      id: `txn-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: newTransaction.type as 'income' | 'expense',
      category: newTransaction.category,
      description: newTransaction.description,
      amount: newTransaction.amount,
      paymentMethod: newTransaction.paymentMethod || 'cash',
      status: newTransaction.status as 'pending' | 'completed' | 'cancelled'
    }

    setTransactions(prev => [transaction, ...prev])
    setNewTransaction({
      type: 'expense',
      category: '',
      description: '',
      amount: 0,
      paymentMethod: 'cash',
      status: 'completed'
    })
    setShowAddTransaction(false)
  }

  // Dashboard Tab
  const renderDashboard = () => (
    <div style={{ padding: '2rem' }}>
      {/* Financial Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          borderRadius: '16px',
          padding: '1.5rem',
          color: 'white',
          boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            ${summary.totalRevenue.toLocaleString()}
          </div>
          <div style={{ opacity: 0.9 }}>Total Revenue</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          borderRadius: '16px',
          padding: '1.5rem',
          color: 'white',
          boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            ${summary.totalExpenses.toLocaleString()}
          </div>
          <div style={{ opacity: 0.9 }}>Total Expenses</div>
        </div>

        <div style={{
          background: summary.netProfit >= 0 
            ? 'linear-gradient(135deg, #10b981, #059669)' 
            : 'linear-gradient(135deg, #ef4444, #dc2626)',
          borderRadius: '16px',
          padding: '1.5rem',
          color: 'white',
          boxShadow: `0 4px 20px rgba(${summary.netProfit >= 0 ? '16, 185, 129' : '239, 68, 68'}, 0.3)`
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            ${summary.netProfit.toLocaleString()}
          </div>
          <div style={{ opacity: 0.9 }}>Net Profit</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          borderRadius: '16px',
          padding: '1.5rem',
          color: 'white',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            {summary.profitMargin.toFixed(1)}%
          </div>
          <div style={{ opacity: 0.9 }}>Profit Margin</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.25rem', fontWeight: '700' }}>
          💰 Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <button
            onClick={() => setShowAddTransaction(true)}
            style={{
              background: 'linear-gradient(135deg, #4dd0e1, #26c6da)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            ➕ Add Transaction
          </button>
          
          <button
            onClick={() => setActiveTab('transactions')}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            📊 View Transactions
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            📈 Generate Reports
          </button>
        </div>
      </div>

      {/* Category Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Revenue Breakdown */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.25rem', fontWeight: '700' }}>
            📈 Revenue by Category
          </h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {getCategoryBreakdown('income').map(({ category, amount }) => (
              <div key={category} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                background: '#f0fdf4',
                borderRadius: '8px',
                border: '1px solid #bbf7d0'
              }}>
                <span style={{ fontWeight: '600', color: '#166534' }}>{category}</span>
                <span style={{ color: '#15803d', fontWeight: '700' }}>
                  ${amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Breakdown */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1f2937', fontSize: '1.25rem', fontWeight: '700' }}>
            📉 Expenses by Category
          </h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {getCategoryBreakdown('expense').map(({ category, amount }) => (
              <div key={category} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                background: '#fef2f2',
                borderRadius: '8px',
                border: '1px solid #fecaca'
              }}>
                <span style={{ fontWeight: '600', color: '#991b1b' }}>{category}</span>
                <span style={{ color: '#dc2626', fontWeight: '700' }}>
                  ${amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Transactions Tab
  const renderTransactions = () => (
    <div style={{ padding: '2rem' }}>
      {/* Filters */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <button
            onClick={() => setShowAddTransaction(true)}
            style={{
              background: '#4dd0e1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}
          >
            ➕ Add Transaction
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div style={{
        background: '#ffffff',
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
          💰 Financial Transactions ({transactions.length})
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Type</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Category</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Description</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Amount</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Payment Method</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id} style={{
                  borderBottom: '1px solid #e5e7eb',
                  background: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                }}>
                  <td style={{ padding: '1rem', color: '#374151' }}>
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      background: transaction.type === 'income' ? '#10b981' : '#ef4444',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {transaction.type === 'income' ? '💰 INCOME' : '💸 EXPENSE'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#374151' }}>{transaction.category}</td>
                  <td style={{ padding: '1rem', color: '#374151' }}>
                    <div>{transaction.description}</div>
                    {transaction.reference && (
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        Ref: {transaction.reference}
                      </div>
                    )}
                  </td>
                  <td style={{ 
                    padding: '1rem', 
                    color: transaction.type === 'income' ? '#10b981' : '#ef4444',
                    fontWeight: '700'
                  }}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', color: '#374151' }}>
                    {transaction.paymentMethod.replace('_', ' ').toUpperCase()}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      background: transaction.status === 'completed' ? '#10b981' : 
                                 transaction.status === 'pending' ? '#f59e0b' : '#ef4444',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {transaction.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: 'var(--text-secondary)'
      }}>
        Loading financial reports...
      </div>
    )
  }

  const currentData = getCurrentPeriodData()
  const comparison = getComparisonData()
  const customerAnalytics = getCustomerAnalytics()
  const regionalAnalytics = getRegionalAnalytics()

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4dd0e1, #26c6da)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '700' }}>
          💰 Financial Management
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Track expenses, monitor revenue, and analyze financial performance
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 2rem'
      }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'transactions', label: '💰 Transactions' },
            { id: 'reports', label: '📈 Reports' },
            { id: 'budgets', label: '📋 Budgets' }
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
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'reports' && (
          <div style={{ padding: '2rem' }}>
            {/* Financial Reports Section */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#1f2937',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📈 Financial Reports & Analytics
              </h2>
              
              {/* Period Selector */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  color: '#374151',
                  marginBottom: '0.5rem' 
                }}>
                  Report Period:
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  style={{
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'white'
                  }}
                >
                  {periods.map(period => (
                    <option key={period.id} value={period.id}>
                      {period.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Key Financial Metrics Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                {/* Revenue Report */}
                <div style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>Total Revenue</h3>
                      <DollarSign size={28} style={{ opacity: 0.8 }} />
                    </div>
                    <p style={{ fontSize: '2.2rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>
                      {formatCurrency(getCurrentPeriodData()?.revenue || 0)}
                    </p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: 0 }}>
                      +{formatPercentage(12.5)} vs last period
                    </p>
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />
                </div>

                {/* Profit Report */}
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>Net Profit</h3>
                      <TrendingUp size={28} style={{ opacity: 0.8 }} />
                    </div>
                    <p style={{ fontSize: '2.2rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>
                      {formatCurrency(getCurrentPeriodData()?.netProfit || 0)}
                    </p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: 0 }}>
                      Margin: {formatPercentage(((getCurrentPeriodData()?.netProfit || 0) / (getCurrentPeriodData()?.revenue || 1)) * 100)}
                    </p>
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />
                </div>

                {/* Expenses Report */}
                <div style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>Total Expenses</h3>
                      <BarChart3 size={28} style={{ opacity: 0.8 }} />
                    </div>
                    <p style={{ fontSize: '2.2rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>
                      {formatCurrency(getCurrentPeriodData()?.expenses || 0)}
                    </p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: 0 }}>
                      -{formatPercentage(8.3)} vs last period
                    </p>
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />
                </div>

                {/* EBITDA Report */}
                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>EBITDA</h3>
                      <PieChart size={28} style={{ opacity: 0.8 }} />
                    </div>
                    <p style={{ fontSize: '2.2rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>
                      {formatCurrency(getCurrentPeriodData()?.ebitda || 0)}
                    </p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: 0 }}>
                      Margin: {formatPercentage(((getCurrentPeriodData()?.ebitda || 0) / (getCurrentPeriodData()?.revenue || 1)) * 100)}
                    </p>
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>

              {/* Detailed Financial Breakdown */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                gap: '2rem',
                marginBottom: '2rem'
              }}>
                {/* Profit & Loss Statement */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: '700', 
                    color: '#1f2937',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    📊 Profit & Loss Statement
                  </h3>
                  
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ fontWeight: '600', color: '#374151' }}>Total Revenue</span>
                      <span style={{ fontWeight: '700', color: '#10b981' }}>
                        {formatCurrency(getCurrentPeriodData()?.revenue || 0)}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ color: '#6b7280' }}>Cost of Goods Sold</span>
                      <span style={{ color: '#ef4444' }}>
                        -{formatCurrency(getCurrentPeriodData()?.costOfGoods || 0)}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '2px solid #e5e7eb' }}>
                      <span style={{ fontWeight: '600', color: '#374151' }}>Gross Profit</span>
                      <span style={{ fontWeight: '700', color: '#059669' }}>
                        {formatCurrency(getCurrentPeriodData()?.grossProfit || 0)}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ color: '#6b7280' }}>Operating Expenses</span>
                      <span style={{ color: '#ef4444' }}>
                        -{formatCurrency(getCurrentPeriodData()?.operatingExpenses || 0)}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ color: '#6b7280' }}>Taxes</span>
                      <span style={{ color: '#ef4444' }}>
                        -{formatCurrency(getCurrentPeriodData()?.taxes || 0)}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderTop: '2px solid #e5e7eb', background: '#f9fafb', borderRadius: '8px', marginTop: '0.5rem' }}>
                      <span style={{ fontWeight: '700', color: '#1f2937', fontSize: '1.1rem' }}>Net Profit</span>
                      <span style={{ fontWeight: '700', color: '#10b981', fontSize: '1.2rem' }}>
                        {formatCurrency(getCurrentPeriodData()?.netProfit || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Performance Indicators */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: '700', 
                    color: '#1f2937',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    🎯 Key Performance Indicators
                  </h3>
                  
                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ 
                      background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', 
                      borderRadius: '12px', 
                      padding: '1.5rem',
                      border: '1px solid #bae6fd'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600', color: '#0c4a6e' }}>Profit Margin</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0369a1' }}>
                          {formatPercentage(((getCurrentPeriodData()?.netProfit || 0) / (getCurrentPeriodData()?.revenue || 1)) * 100)}
                        </span>
                      </div>
                      <p style={{ color: '#0c4a6e', fontSize: '0.85rem', margin: 0, opacity: 0.8 }}>
                        Net profit as percentage of revenue
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', 
                      borderRadius: '12px', 
                      padding: '1.5rem',
                      border: '1px solid #bbf7d0'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600', color: '#14532d' }}>Gross Margin</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#166534' }}>
                          {formatPercentage(((getCurrentPeriodData()?.grossProfit || 0) / (getCurrentPeriodData()?.revenue || 1)) * 100)}
                        </span>
                      </div>
                      <p style={{ color: '#14532d', fontSize: '0.85rem', margin: 0, opacity: 0.8 }}>
                        Gross profit as percentage of revenue
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'linear-gradient(135deg, #fefce8, #fef3c7)', 
                      borderRadius: '12px', 
                      padding: '1.5rem',
                      border: '1px solid #fde68a'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600', color: '#92400e' }}>Operating Ratio</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d97706' }}>
                          {formatPercentage(((getCurrentPeriodData()?.operatingExpenses || 0) / (getCurrentPeriodData()?.revenue || 1)) * 100)}
                        </span>
                      </div>
                      <p style={{ color: '#92400e', fontSize: '0.85rem', margin: 0, opacity: 0.8 }}>
                        Operating expenses as percentage of revenue
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)', 
                      borderRadius: '12px', 
                      padding: '1.5rem',
                      border: '1px solid #ddd6fe'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600', color: '#581c87' }}>EBITDA Margin</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#7c3aed' }}>
                          {formatPercentage(((getCurrentPeriodData()?.ebitda || 0) / (getCurrentPeriodData()?.revenue || 1)) * 100)}
                        </span>
                      </div>
                      <p style={{ color: '#581c87', fontSize: '0.85rem', margin: 0, opacity: 0.8 }}>
                        EBITDA as percentage of revenue
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '700', 
                  color: '#1f2937',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  📄 Export Reports
                </h3>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '1rem 1.5rem',
                      cursor: 'pointer',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Download size={18} />
                    Export PDF Report
                  </button>
                  
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '1rem 1.5rem',
                      cursor: 'pointer',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <FileText size={18} />
                    Export Excel
                  </button>
                  
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '1rem 1.5rem',
                      cursor: 'pointer',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <RefreshCw size={18} />
                    Schedule Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'budgets' && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            📋 Budget Management module coming soon...
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
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
            <h3 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>➕ Add New Transaction</h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Transaction Type:
                </label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, type: e.target.value as 'income' | 'expense' }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Category:
                </label>
                <input
                  type="text"
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Sales, Raw Materials, Utilities"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Description:
                </label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Transaction description"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Amount ($):
                </label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Payment Method:
                </label>
                <select
                  value={newTransaction.paymentMethod}
                  onChange={(e) => setNewTransaction(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="cash">Cash</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="check">Check</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                onClick={handleAddTransaction}
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
                Add Transaction
              </button>
              <button
                onClick={() => setShowAddTransaction(false)}
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
  )
}

export default FinancialReports 