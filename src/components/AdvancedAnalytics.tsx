import React, { useState, useEffect } from 'react'

// Theme hook for accessing current theme
const useTheme = () => {
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

interface AnalyticsMetric {
  id: string
  name: string
  value: number
  previousValue: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  category: 'revenue' | 'operations' | 'quality' | 'efficiency'
  forecast: number[]
  target: number
}

interface PredictiveModel {
  id: string
  name: string
  type: 'revenue' | 'demand' | 'quality' | 'maintenance'
  accuracy: number
  lastTrained: string
  predictions: PredictionData[]
  status: 'active' | 'training' | 'needs-update'
}

interface PredictionData {
  period: string
  predicted: number
  confidence: number
  factors: string[]
}

interface RealtimeData {
  timestamp: string
  production: number
  quality: number
  efficiency: number
  orders: number
  revenue: number
}

const AdvancedAnalytics: React.FC = () => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['revenue', 'production', 'quality'])
  const [realtimeData, setRealtimeData] = useState<RealtimeData[]>([])
  const [predictiveModels, setPredictiveModels] = useState<PredictiveModel[]>([])
  const [analyticsMetrics, setAnalyticsMetrics] = useState<AnalyticsMetric[]>([])

  useEffect(() => {
    loadAnalyticsData()
    loadPredictiveModels()
    startRealtimeUpdates()
  }, [])

  const loadAnalyticsData = () => {
    const metrics: AnalyticsMetric[] = [
      {
        id: 'revenue',
        name: 'Total Revenue',
        value: 2450000,
        previousValue: 2280000,
        unit: 'AED',
        trend: 'up',
        category: 'revenue',
        forecast: [2500000, 2650000, 2800000, 2950000, 3100000],
        target: 3000000
      },
      {
        id: 'production',
        name: 'Production Output',
        value: 15420,
        previousValue: 14850,
        unit: 'units',
        trend: 'up',
        category: 'operations',
        forecast: [15800, 16200, 16500, 16900, 17200],
        target: 17000
      },
      {
        id: 'quality',
        name: 'Quality Score',
        value: 98.7,
        previousValue: 97.9,
        unit: '%',
        trend: 'up',
        category: 'quality',
        forecast: [98.8, 98.9, 99.0, 99.1, 99.2],
        target: 99.5
      },
      {
        id: 'efficiency',
        name: 'Overall Efficiency',
        value: 94.2,
        previousValue: 92.8,
        unit: '%',
        trend: 'up',
        category: 'efficiency',
        forecast: [94.5, 94.8, 95.1, 95.4, 95.7],
        target: 96.0
      },
      {
        id: 'customer-satisfaction',
        name: 'Customer Satisfaction',
        value: 4.8,
        previousValue: 4.6,
        unit: '/5',
        trend: 'up',
        category: 'quality',
        forecast: [4.82, 4.85, 4.87, 4.90, 4.92],
        target: 4.9
      },
      {
        id: 'cost-per-unit',
        name: 'Cost per Unit',
        value: 125.50,
        previousValue: 128.20,
        unit: 'AED',
        trend: 'down',
        category: 'efficiency',
        forecast: [124.80, 124.20, 123.60, 123.00, 122.40],
        target: 120.00
      }
    ]
    setAnalyticsMetrics(metrics)
  }

  const loadPredictiveModels = () => {
    const models: PredictiveModel[] = [
      {
        id: 'revenue-forecast',
        name: 'Revenue Forecasting',
        type: 'revenue',
        accuracy: 94.2,
        lastTrained: '2024-01-15T10:30:00Z',
        status: 'active',
        predictions: [
          {
            period: 'Q1 2024',
            predicted: 7500000,
            confidence: 92,
            factors: ['Seasonal demand', 'Market expansion', 'Product launches']
          },
          {
            period: 'Q2 2024',
            predicted: 8200000,
            confidence: 89,
            factors: ['Summer season', 'Tourism increase', 'New partnerships']
          },
          {
            period: 'Q3 2024',
            predicted: 8800000,
            confidence: 87,
            factors: ['Peak season', 'Export growth', 'Premium products']
          }
        ]
      },
      {
        id: 'demand-prediction',
        name: 'Demand Prediction',
        type: 'demand',
        accuracy: 91.8,
        lastTrained: '2024-01-14T15:45:00Z',
        status: 'active',
        predictions: [
          {
            period: 'Next 30 days',
            predicted: 52000,
            confidence: 94,
            factors: ['Historical patterns', 'Market trends', 'Seasonal factors']
          },
          {
            period: 'Next 60 days',
            predicted: 108000,
            confidence: 88,
            factors: ['Economic indicators', 'Competition analysis', 'Customer behavior']
          }
        ]
      },
      {
        id: 'quality-prediction',
        name: 'Quality Prediction',
        type: 'quality',
        accuracy: 96.5,
        lastTrained: '2024-01-13T09:20:00Z',
        status: 'active',
        predictions: [
          {
            period: 'Next batch',
            predicted: 99.1,
            confidence: 96,
            factors: ['Material quality', 'Process parameters', 'Environmental conditions']
          }
        ]
      },
      {
        id: 'maintenance-forecast',
        name: 'Maintenance Forecasting',
        type: 'maintenance',
        accuracy: 88.7,
        lastTrained: '2024-01-12T14:10:00Z',
        status: 'needs-update',
        predictions: [
          {
            period: 'Next 7 days',
            predicted: 2,
            confidence: 85,
            factors: ['Equipment age', 'Usage patterns', 'Historical failures']
          }
        ]
      }
    ]
    setPredictiveModels(models)
  }

  const startRealtimeUpdates = () => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const newData: RealtimeData = {
        timestamp: new Date().toISOString(),
        production: Math.floor(Math.random() * 100) + 850,
        quality: Math.random() * 5 + 95,
        efficiency: Math.random() * 10 + 90,
        orders: Math.floor(Math.random() * 20) + 45,
        revenue: Math.floor(Math.random() * 50000) + 180000
      }
      
      setRealtimeData(prev => [...prev.slice(-29), newData])
    }, 5000)

    return () => clearInterval(interval)
  }

  const calculateTrendPercentage = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1)
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#10b981'
      case 'down': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getModelStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981'
      case 'training': return '#f59e0b'
      case 'needs-update': return '#ef4444'
      default: return '#6b7280'
    }
  }

  // Overview Tab with Key Metrics
  const renderOverview = () => (
    <div style={{ padding: '2rem' }}>
      {/* Key Performance Indicators */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {analyticsMetrics.slice(0, 4).map(metric => {
          const trendPercentage = calculateTrendPercentage(metric.value, metric.previousValue)
          const progressPercentage = (metric.value / metric.target * 100).toFixed(1)
          
          return (
            <div key={metric.id} style={{
              background: theme.secondary,
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: `1px solid ${theme.border}`
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  color: theme.textLight,
                  fontSize: '1rem',
                  fontWeight: '600',
                  margin: 0
                }}>
                  {metric.name}
                </h3>
                <span style={{
                  background: getTrendColor(metric.trend),
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600'
                }}>
                  {metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '→'} {trendPercentage}%
                </span>
              </div>
              
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: theme.textLight,
                marginBottom: '0.5rem'
              }}>
                {metric.unit === 'AED' ? `${(metric.value / 1000000).toFixed(1)}M` : 
                 metric.value.toLocaleString()} {metric.unit !== 'AED' ? metric.unit : 'AED'}
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{ color: theme.text, fontSize: '0.9rem' }}>
                  Target: {metric.unit === 'AED' ? `${(metric.target / 1000000).toFixed(1)}M` : 
                          metric.target.toLocaleString()} {metric.unit !== 'AED' ? metric.unit : 'AED'}
                </span>
                <span style={{ color: theme.text, fontSize: '0.9rem' }}>
                  {progressPercentage}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div style={{
                width: '100%',
                height: '8px',
                background: theme.border,
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(100, parseFloat(progressPercentage))}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${theme.accent}, #10b981)`,
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Real-time Performance Chart */}
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          color: theme.textLight,
          fontSize: '1.2rem',
          fontWeight: '700',
          marginBottom: '1.5rem'
        }}>
          📊 Real-time Performance Dashboard
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {realtimeData.slice(-1).map((data, index) => (
            <React.Fragment key={index}>
              <div style={{
                background: theme.primary,
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <div style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: '600' }}>
                  Production Rate
                </div>
                <div style={{ color: theme.textLight, fontSize: '1.8rem', fontWeight: '700' }}>
                  {data.production}
                </div>
                <div style={{ color: theme.text, fontSize: '0.8rem' }}>
                  units/hour
                </div>
              </div>
              
              <div style={{
                background: theme.primary,
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <div style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: '600' }}>
                  Quality Score
                </div>
                <div style={{ color: theme.textLight, fontSize: '1.8rem', fontWeight: '700' }}>
                  {data.quality.toFixed(1)}%
                </div>
                <div style={{ color: theme.text, fontSize: '0.8rem' }}>
                  current batch
                </div>
              </div>
              
              <div style={{
                background: theme.primary,
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <div style={{ color: '#8b5cf6', fontSize: '0.9rem', fontWeight: '600' }}>
                  Efficiency
                </div>
                <div style={{ color: theme.textLight, fontSize: '1.8rem', fontWeight: '700' }}>
                  {data.efficiency.toFixed(1)}%
                </div>
                <div style={{ color: theme.text, fontSize: '0.8rem' }}>
                  overall
                </div>
              </div>
              
              <div style={{
                background: theme.primary,
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <div style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: '600' }}>
                  Active Orders
                </div>
                <div style={{ color: theme.textLight, fontSize: '1.8rem', fontWeight: '700' }}>
                  {data.orders}
                </div>
                <div style={{ color: theme.text, fontSize: '0.8rem' }}>
                  in progress
                </div>
              </div>
              
              <div style={{
                background: theme.primary,
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <div style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: '600' }}>
                  Daily Revenue
                </div>
                <div style={{ color: theme.textLight, fontSize: '1.8rem', fontWeight: '700' }}>
                  {(data.revenue / 1000).toFixed(0)}K
                </div>
                <div style={{ color: theme.text, fontSize: '0.8rem' }}>
                  AED today
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Predictive Insights */}
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          color: theme.textLight,
          fontSize: '1.2rem',
          fontWeight: '700',
          marginBottom: '1.5rem'
        }}>
          🔮 AI-Powered Insights
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            background: theme.primary,
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #10b981'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.2rem' }}>📈</span>
              <h4 style={{ color: '#10b981', margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                Revenue Forecast
              </h4>
            </div>
            <p style={{ color: theme.text, fontSize: '0.9rem', lineHeight: '1.5' }}>
              Based on current trends, revenue is projected to reach <strong style={{ color: theme.textLight }}>8.8M AED</strong> by Q3 2024, 
              representing a <strong style={{ color: '#10b981' }}>26% growth</strong> from current quarter.
            </p>
          </div>
          
          <div style={{
            background: theme.primary,
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #3b82f6'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.2rem' }}>⚡</span>
              <h4 style={{ color: '#3b82f6', margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                Efficiency Optimization
              </h4>
            </div>
            <p style={{ color: theme.text, fontSize: '0.9rem', lineHeight: '1.5' }}>
              AI analysis suggests optimizing production schedule during <strong style={{ color: theme.textLight }}>peak hours (10-14)</strong> 
              could increase efficiency by <strong style={{ color: '#3b82f6' }}>3.2%</strong>.
            </p>
          </div>
          
          <div style={{
            background: theme.primary,
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #f59e0b'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🎯</span>
              <h4 style={{ color: '#f59e0b', margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                Quality Prediction
              </h4>
            </div>
            <p style={{ color: theme.text, fontSize: '0.9rem', lineHeight: '1.5' }}>
              Next production batch has <strong style={{ color: '#10b981' }}>96% confidence</strong> of achieving 
              <strong style={{ color: theme.textLight }}>99.1% quality score</strong> based on current parameters.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  // Predictive Analytics Tab
  const renderPredictive = () => (
    <div style={{ padding: '2rem' }}>
      {/* Model Status Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {predictiveModels.map(model => (
          <div key={model.id} style={{
            background: theme.secondary,
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: `1px solid ${getModelStatusColor(model.status)}`
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <h3 style={{
                color: theme.textLight,
                fontSize: '1rem',
                fontWeight: '600',
                margin: 0
              }}>
                {model.name}
              </h3>
              <span style={{
                background: getModelStatusColor(model.status),
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.7rem',
                fontWeight: '600'
              }}>
                {model.status.toUpperCase()}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ color: theme.text, fontSize: '0.9rem' }}>
                Accuracy
              </span>
              <span style={{ color: theme.textLight, fontSize: '1.2rem', fontWeight: '700' }}>
                {model.accuracy}%
              </span>
            </div>
            
            <div style={{
              width: '100%',
              height: '6px',
              background: theme.border,
              borderRadius: '3px',
              overflow: 'hidden',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: `${model.accuracy}%`,
                height: '100%',
                background: getModelStatusColor(model.status),
                transition: 'width 0.3s ease'
              }} />
            </div>
            
            <div style={{ color: theme.text, fontSize: '0.8rem' }}>
              Last trained: {new Date(model.lastTrained).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Predictions */}
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          color: theme.textLight,
          fontSize: '1.2rem',
          fontWeight: '700',
          marginBottom: '1.5rem'
        }}>
          🔮 Detailed Predictions
        </h3>
        
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {predictiveModels.map(model => (
            <div key={model.id} style={{
              background: theme.primary,
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h4 style={{
                color: theme.textLight,
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                {model.name}
              </h4>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                {model.predictions.map((prediction, index) => (
                  <div key={index} style={{
                    background: theme.secondary,
                    borderRadius: '8px',
                    padding: '1rem',
                    border: `1px solid ${theme.border}`
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ color: theme.textLight, fontWeight: '600' }}>
                        {prediction.period}
                      </span>
                      <span style={{
                        background: prediction.confidence > 90 ? '#10b981' : 
                                   prediction.confidence > 80 ? '#f59e0b' : '#ef4444',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: '600'
                      }}>
                        {prediction.confidence}% confidence
                      </span>
                    </div>
                    
                    <div style={{
                      color: theme.textLight,
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      marginBottom: '0.5rem'
                    }}>
                      {model.type === 'revenue' ? `${(prediction.predicted / 1000000).toFixed(1)}M AED` :
                       model.type === 'demand' ? `${prediction.predicted.toLocaleString()} units` :
                       model.type === 'quality' ? `${prediction.predicted}%` :
                       `${prediction.predicted} events`}
                    </div>
                    
                    <div style={{ color: theme.text, fontSize: '0.8rem' }}>
                      Key factors: {prediction.factors.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Custom Reports Tab
  const renderReports = () => (
    <div style={{ padding: '2rem' }}>
      <div style={{
        background: theme.secondary,
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          color: theme.textLight,
          fontSize: '1.2rem',
          fontWeight: '700',
          marginBottom: '1.5rem'
        }}>
          📊 Custom Analytics Reports
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            {
              name: 'Executive Dashboard',
              description: 'High-level KPIs and strategic metrics',
              type: 'executive',
              frequency: 'Daily',
              lastGenerated: '2024-01-15',
              recipients: 5
            },
            {
              name: 'Operational Performance',
              description: 'Detailed production and efficiency metrics',
              type: 'operational',
              frequency: 'Hourly',
              lastGenerated: '2024-01-15',
              recipients: 12
            },
            {
              name: 'Quality Analytics',
              description: 'Quality trends and predictive insights',
              type: 'quality',
              frequency: 'Daily',
              lastGenerated: '2024-01-15',
              recipients: 8
            },
            {
              name: 'Financial Performance',
              description: 'Revenue, costs, and profitability analysis',
              type: 'financial',
              frequency: 'Weekly',
              lastGenerated: '2024-01-14',
              recipients: 6
            }
          ].map((report, index) => (
            <div key={index} style={{
              background: theme.primary,
              borderRadius: '12px',
              padding: '1.5rem',
              border: `1px solid ${theme.border}`
            }}>
              <h4 style={{
                color: theme.textLight,
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                {report.name}
              </h4>
              
              <p style={{
                color: theme.text,
                fontSize: '0.9rem',
                marginBottom: '1rem',
                lineHeight: '1.4'
              }}>
                {report.description}
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{ color: theme.text, fontSize: '0.8rem' }}>
                  Frequency: {report.frequency}
                </span>
                <span style={{ color: theme.text, fontSize: '0.8rem' }}>
                  Recipients: {report.recipients}
                </span>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                <button style={{
                  flex: 1,
                  background: theme.accent,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  Generate
                </button>
                <button style={{
                  flex: 1,
                  background: 'transparent',
                  color: theme.textLight,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: theme.background }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '700' }}>
          🧠 Advanced Analytics & AI
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Predictive insights and real-time business intelligence
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
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'predictive', label: '🔮 Predictive', icon: '🔮' },
            { id: 'reports', label: '📋 Reports', icon: '📋' }
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
                color: activeTab === tab.id ? '#8b5cf6' : '#6b7280',
                borderBottom: activeTab === tab.id ? '2px solid #8b5cf6' : '2px solid transparent',
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'predictive' && renderPredictive()}
        {activeTab === 'reports' && renderReports()}
      </div>
    </div>
  )
}

export default AdvancedAnalytics 