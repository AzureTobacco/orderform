import React, { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useNotifications } from '../contexts/NotificationContext'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity, 
  Target, 
  Zap, 
  Eye, 
  Download, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Package,
  Globe,
  Calendar,
  Filter,
  Search,
  Settings,
  Lightbulb,
  ArrowRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

interface KPIData {
  id: string
  name: string
  value: number
  target: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  change: number
  category: 'financial' | 'operational' | 'quality' | 'customer'
  icon: any
  color: string
  description: string
}

interface InsightData {
  id: string
  type: 'opportunity' | 'risk' | 'trend' | 'anomaly'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  actionable: boolean
  recommendations: string[]
  dataPoints: any[]
}

export default function AdvancedBusinessIntelligence() {
  const { isDark } = useTheme()
  const { addNotification } = useNotifications()
  const [activeView, setActiveView] = useState('overview')
  const [selectedTimeframe, setSelectedTimeframe] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [insights, setInsights] = useState<InsightData[]>([])

  // Comprehensive KPI Data
  const kpiData: KPIData[] = [
    {
      id: 'revenue',
      name: 'Monthly Revenue',
      value: 2847500,
      target: 2500000,
      unit: 'AED',
      trend: 'up',
      change: 13.9,
      category: 'financial',
      icon: DollarSign,
      color: '#10b981',
      description: 'Total revenue generated this month'
    },
    {
      id: 'profit_margin',
      name: 'Profit Margin',
      value: 34.2,
      target: 30.0,
      unit: '%',
      trend: 'up',
      change: 4.2,
      category: 'financial',
      icon: TrendingUp,
      color: '#3b82f6',
      description: 'Net profit margin percentage'
    },
    {
      id: 'production_efficiency',
      name: 'Production Efficiency',
      value: 94.7,
      target: 95.0,
      unit: '%',
      trend: 'down',
      change: -0.8,
      category: 'operational',
      icon: Activity,
      color: '#f59e0b',
      description: 'Overall production line efficiency'
    },
    {
      id: 'quality_score',
      name: 'Quality Score',
      value: 98.3,
      target: 98.0,
      unit: '%',
      trend: 'up',
      change: 0.5,
      category: 'quality',
      icon: CheckCircle,
      color: '#10b981',
      description: 'Product quality compliance rate'
    },
    {
      id: 'customer_satisfaction',
      name: 'Customer Satisfaction',
      value: 4.7,
      target: 4.5,
      unit: '/5',
      trend: 'up',
      change: 0.3,
      category: 'customer',
      icon: Users,
      color: '#8b5cf6',
      description: 'Average customer satisfaction rating'
    },
    {
      id: 'inventory_turnover',
      name: 'Inventory Turnover',
      value: 8.2,
      target: 8.0,
      unit: 'x',
      trend: 'up',
      change: 2.5,
      category: 'operational',
      icon: Package,
      color: '#06b6d4',
      description: 'Inventory turnover rate'
    },
    {
      id: 'export_volume',
      name: 'Export Volume',
      value: 1250,
      target: 1200,
      unit: 'tons',
      trend: 'up',
      change: 4.2,
      category: 'operational',
      icon: Globe,
      color: '#ec4899',
      description: 'Monthly export volume'
    },
    {
      id: 'order_fulfillment',
      name: 'Order Fulfillment',
      value: 96.8,
      target: 95.0,
      unit: '%',
      trend: 'up',
      change: 1.8,
      category: 'customer',
      icon: Clock,
      color: '#84cc16',
      description: 'On-time order fulfillment rate'
    }
  ]

  // AI-Generated Insights
  const generateInsights = async () => {
    setIsAnalyzing(true)
    addNotification('Analyzing business data with AI...', 'info')
    
    // Simulate AI analysis
    setTimeout(() => {
      const newInsights: InsightData[] = [
        {
          id: 'insight_1',
          type: 'opportunity',
          title: 'Export Market Expansion Opportunity',
          description: 'Analysis shows 23% growth potential in Southeast Asian markets based on current demand patterns and competitor analysis.',
          impact: 'high',
          confidence: 87,
          actionable: true,
          recommendations: [
            'Increase production capacity by 15% for Q2',
            'Establish partnerships with 3 new distributors in Singapore and Malaysia',
            'Develop region-specific tobacco blends'
          ],
          dataPoints: [
            { metric: 'Market Growth', value: '23%' },
            { metric: 'Competitor Gap', value: '15%' },
            { metric: 'Revenue Potential', value: 'AED 850K/month' }
          ]
        },
        {
          id: 'insight_2',
          type: 'risk',
          title: 'Production Efficiency Decline',
          description: 'Production efficiency has decreased by 0.8% this month. Root cause analysis indicates equipment maintenance issues.',
          impact: 'medium',
          confidence: 92,
          actionable: true,
          recommendations: [
            'Schedule immediate maintenance for Curing Line 2',
            'Implement predictive maintenance system',
            'Train operators on new efficiency protocols'
          ],
          dataPoints: [
            { metric: 'Efficiency Drop', value: '-0.8%' },
            { metric: 'Equipment Downtime', value: '12 hours' },
            { metric: 'Cost Impact', value: 'AED 45K' }
          ]
        },
        {
          id: 'insight_3',
          type: 'trend',
          title: 'Premium Product Demand Surge',
          description: 'Premium tobacco products show 34% higher demand compared to standard products, indicating market shift.',
          impact: 'high',
          confidence: 95,
          actionable: true,
          recommendations: [
            'Increase premium product line by 25%',
            'Develop new premium flavoring options',
            'Adjust pricing strategy for maximum profitability'
          ],
          dataPoints: [
            { metric: 'Demand Increase', value: '+34%' },
            { metric: 'Margin Improvement', value: '+18%' },
            { metric: 'Market Share', value: '42%' }
          ]
        },
        {
          id: 'insight_4',
          type: 'anomaly',
          title: 'Unusual Quality Pattern Detected',
          description: 'AI detected an unusual pattern in quality metrics for Batch B005-B007. Requires immediate investigation.',
          impact: 'medium',
          confidence: 78,
          actionable: true,
          recommendations: [
            'Investigate raw material batch RM-2024-03',
            'Review curing process parameters',
            'Conduct additional quality tests'
          ],
          dataPoints: [
            { metric: 'Affected Batches', value: '3' },
            { metric: 'Quality Variance', value: '2.3%' },
            { metric: 'Potential Loss', value: 'AED 23K' }
          ]
        }
      ]
      
      setInsights(newInsights)
      setIsAnalyzing(false)
      addNotification('AI analysis complete - 4 insights generated', 'success')
    }, 3000)
  }

  useEffect(() => {
    generateInsights()
  }, [])

  const getKPIColor = (value: number, target: number, trend: string) => {
    if (trend === 'up' && value >= target) return '#10b981'
    if (trend === 'down' && value < target) return '#ef4444'
    if (value >= target * 0.95) return '#f59e0b'
    return '#ef4444'
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Lightbulb size={20} style={{ color: '#10b981' }} />
      case 'risk': return <AlertTriangle size={20} style={{ color: '#ef4444' }} />
      case 'trend': return <TrendingUp size={20} style={{ color: '#3b82f6' }} />
      case 'anomaly': return <Eye size={20} style={{ color: '#f59e0b' }} />
      default: return <Brain size={20} style={{ color: '#8b5cf6' }} />
    }
  }

  const getInsightColor = (type: string, impact: string) => {
    if (type === 'opportunity') return '#10b981'
    if (type === 'risk') return '#ef4444'
    if (type === 'trend') return '#3b82f6'
    if (type === 'anomaly') return '#f59e0b'
    return '#6b7280'
  }

  const formatValue = (value: number, unit: string) => {
    if (unit === 'AED') {
      return `${unit} ${value.toLocaleString()}`
    }
    return `${value.toLocaleString()}${unit}`
  }

  const filteredKPIs = selectedCategory === 'all' 
    ? kpiData 
    : kpiData.filter(kpi => kpi.category === selectedCategory)

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
              <Brain style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 4px 0'
              }}>
                Business Intelligence Dashboard
              </h1>
              <p style={{
                color: 'rgba(6, 182, 212, 0.7)',
                fontSize: '16px',
                margin: '0'
              }}>
                AI-powered insights and analytics for Azure Tobacco Industrial FZCO
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={generateInsights}
              disabled={isAnalyzing}
              style={{
                background: isAnalyzing ? 'rgba(6, 182, 212, 0.3)' : 'linear-gradient(135deg, #06b6d4, #0891b2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 20px',
                cursor: isAnalyzing ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RefreshCw style={{ 
                width: '16px', 
                height: '16px',
                animation: isAnalyzing ? 'spin 1s linear infinite' : 'none'
              }} />
              {isAnalyzing ? 'Analyzing...' : 'Refresh Analysis'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
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
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'kpis', label: 'KPIs', icon: '🎯' },
            { id: 'insights', label: 'AI Insights', icon: '🧠' },
            { id: 'reports', label: 'Reports', icon: '📋' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: activeView === tab.id ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'transparent',
                color: activeView === tab.id ? 'white' : 'rgba(6, 182, 212, 0.7)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeView === tab.id ? '600' : '400',
                transition: 'all 0.3s ease'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px',
          background: 'rgba(30, 41, 59, 0.3)',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid rgba(6, 182, 212, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar style={{ width: '16px', height: '16px', color: 'rgba(6, 182, 212, 0.7)' }} />
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                color: 'white',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '14px'
              }}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter style={{ width: '16px', height: '16px', color: 'rgba(6, 182, 212, 0.7)' }} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                color: 'white',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '14px'
              }}
            >
              <option value="all">All Categories</option>
              <option value="financial">Financial</option>
              <option value="operational">Operational</option>
              <option value="quality">Quality</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {activeView === 'overview' && (
          <div>
            {/* Key Metrics Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {filteredKPIs.slice(0, 4).map(kpi => {
                const IconComponent = kpi.icon
                return (
                  <div key={kpi.id} style={{
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
                        background: `linear-gradient(135deg, ${kpi.color}, ${kpi.color}dd)`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconComponent style={{ width: '24px', height: '24px', color: 'white' }} />
                      </div>
                      <div>
                        <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                          {kpi.name}
                        </h3>
                        <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                          {kpi.description}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
                          {formatValue(kpi.value, kpi.unit)}
                        </div>
                        <div style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)', marginTop: '4px' }}>
                          Target: {formatValue(kpi.target, kpi.unit)}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {kpi.trend === 'up' ? (
                          <ArrowUp style={{ width: '16px', height: '16px', color: '#10b981' }} />
                        ) : (
                          <ArrowDown style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                        )}
                        <span style={{
                          color: kpi.trend === 'up' ? '#10b981' : '#ef4444',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          {Math.abs(kpi.change)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* AI Insights Preview */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.3)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{ marginBottom: '24px', color: 'white', fontSize: '18px', fontWeight: '600' }}>
                🧠 Latest AI Insights
              </h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                {insights.slice(0, 2).map(insight => (
                  <div key={insight.id} style={{
                    background: 'rgba(51, 65, 85, 0.3)',
                    borderRadius: '8px',
                    padding: '20px',
                    border: `1px solid ${getInsightColor(insight.type, insight.impact)}33`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{
                        color: getInsightColor(insight.type, insight.impact)
                      }}>
                        {getInsightIcon(insight.type)}
                      </div>
                      <div>
                        <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '16px' }}>
                          {insight.title}
                        </h4>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
                          <span style={{
                            background: getInsightColor(insight.type, insight.impact),
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '12px'
                          }}>
                            {insight.type.toUpperCase()}
                          </span>
                          <span style={{ color: 'rgba(6, 182, 212, 0.7)' }}>
                            {insight.confidence}% Confidence
                          </span>
                        </div>
                      </div>
                    </div>
                    <p style={{ color: 'rgba(6, 182, 212, 0.8)', margin: '0', lineHeight: '1.5' }}>
                      {insight.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setActiveView('insights')}
                style={{
                  marginTop: '16px',
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
                View All Insights
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          </div>
        )}

        {activeView === 'kpis' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {filteredKPIs.map(kpi => {
              const IconComponent = kpi.icon
              return (
                <div key={kpi.id} style={{
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
                      background: `linear-gradient(135deg, ${kpi.color}, ${kpi.color}dd)`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComponent style={{ width: '24px', height: '24px', color: 'white' }} />
                    </div>
                    <div>
                      <h3 style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>
                        {kpi.name}
                      </h3>
                      <p style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px', margin: '0' }}>
                        {kpi.description}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                      {formatValue(kpi.value, kpi.unit)}
                    </div>
                    <div style={{ fontSize: '14px', color: 'rgba(6, 182, 212, 0.7)' }}>
                      Target: {formatValue(kpi.target, kpi.unit)}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${kpi.color}, ${kpi.color}dd)`,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      color: kpi.trend === 'up' ? '#10b981' : '#ef4444',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {kpi.trend === 'up' ? (
                        <ArrowUp style={{ width: '16px', height: '16px' }} />
                      ) : (
                        <ArrowDown style={{ width: '16px', height: '16px' }} />
                      )}
                      {Math.abs(kpi.change)}%
                    </span>
                    <span style={{
                      background: kpi.category === 'financial' ? '#3b82f6' :
                                 kpi.category === 'operational' ? '#f59e0b' :
                                 kpi.category === 'quality' ? '#10b981' : '#8b5cf6',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {kpi.category.toUpperCase()}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {activeView === 'insights' && (
          <div style={{ display: 'grid', gap: '24px' }}>
            {insights.map(insight => (
              <div key={insight.id} style={{
                background: 'rgba(30, 41, 59, 0.3)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: `linear-gradient(135deg, ${getInsightColor(insight.type, insight.impact)}, ${getInsightColor(insight.type, insight.impact)}dd)`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '18px' }}>
                      {insight.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{
                        background: getInsightColor(insight.type, insight.impact),
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {insight.type.toUpperCase()}
                      </span>
                      <span style={{
                        background: insight.impact === 'high' ? '#ef4444' :
                                   insight.impact === 'medium' ? '#f59e0b' : '#10b981',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {insight.impact.toUpperCase()} IMPACT
                      </span>
                      <span style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '14px' }}>
                        {insight.confidence}% Confidence
                      </span>
                    </div>
                  </div>
                </div>

                <p style={{ 
                  color: 'rgba(6, 182, 212, 0.9)', 
                  margin: '0 0 20px 0', 
                  lineHeight: '1.6',
                  fontSize: '16px'
                }}>
                  {insight.description}
                </p>

                {insight.actionable && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: 'white', margin: '0 0 12px 0', fontSize: '16px' }}>
                      📋 Recommended Actions:
                    </h4>
                    <ul style={{ margin: '0', paddingLeft: '20px' }}>
                      {insight.recommendations.map((rec, index) => (
                        <li key={index} style={{ 
                          color: 'rgba(6, 182, 212, 0.8)', 
                          marginBottom: '8px',
                          lineHeight: '1.4'
                        }}>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                  gap: '16px',
                  background: 'rgba(51, 65, 85, 0.3)',
                  padding: '16px',
                  borderRadius: '8px'
                }}>
                  {insight.dataPoints.map((point, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        color: getInsightColor(insight.type, insight.impact),
                        marginBottom: '4px'
                      }}>
                        {point.value}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(6, 182, 212, 0.7)' }}>
                        {point.metric}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === 'reports' && (
          <div style={{
            background: 'rgba(30, 41, 59, 0.3)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ color: 'white', marginBottom: '8px' }}>Advanced Reports</h3>
            <p style={{ color: 'rgba(6, 182, 212, 0.7)' }}>Detailed reporting module coming soon...</p>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
} 