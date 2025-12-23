import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Target, 
  Calendar, 
  DollarSign, 
  Package, 
  Users, 
  Globe, 
  Award, 
  AlertCircle,
  Zap,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Settings,
  Activity,
  Layers,
  Gauge
} from 'lucide-react'

interface BlendPerformance {
  blendId: string
  blendName: string
  productionVolume: number
  qualityScore: number
  customerSatisfaction: number
  profitMargin: number
  marketShare: number
  trend: 'up' | 'down' | 'stable'
  seasonalVariation: number
}

interface MarketData {
  region: string
  totalSales: number
  marketShare: number
  growthRate: number
  competitorAnalysis: {
    competitor: string
    marketShare: number
    pricePoint: number
  }[]
  seasonalTrends: {
    month: string
    sales: number
    demand: number
  }[]
}

interface QualityTrend {
  date: string
  overallQuality: number
  moistureContent: number
  leafGrade: number
  curingEfficiency: number
  defectRate: number
  customerComplaints: number
}

interface ProductionForecast {
  period: string
  predictedDemand: number
  recommendedProduction: number
  rawMaterialNeeds: {
    leafType: string
    quantity: number
    estimatedCost: number
  }[]
  confidence: number
}

const TobaccoAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [blendPerformance, setBlendPerformance] = useState<BlendPerformance[]>([])
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [qualityTrends, setQualityTrends] = useState<QualityTrend[]>([])
  const [productionForecasts, setProductionForecasts] = useState<ProductionForecast[]>([])
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months')

  useEffect(() => {
    loadAnalyticsData()
  }, [selectedTimeRange])

  const loadAnalyticsData = () => {
    // Mock blend performance data
    const mockBlendPerformance: BlendPerformance[] = [
      {
        blendId: 'BR001',
        blendName: 'Premium Gold Blend',
        productionVolume: 150000,
        qualityScore: 94,
        customerSatisfaction: 4.7,
        profitMargin: 28.5,
        marketShare: 15.2,
        trend: 'up',
        seasonalVariation: 12
      },
      {
        blendId: 'BR002',
        blendName: 'Classic Virginia',
        productionVolume: 200000,
        qualityScore: 89,
        customerSatisfaction: 4.3,
        profitMargin: 22.1,
        marketShare: 18.7,
        trend: 'stable',
        seasonalVariation: 8
      },
      {
        blendId: 'BR003',
        blendName: 'Oriental Supreme',
        productionVolume: 80000,
        qualityScore: 96,
        customerSatisfaction: 4.9,
        profitMargin: 35.2,
        marketShare: 8.3,
        trend: 'up',
        seasonalVariation: 20
      }
    ]

    // Mock market data
    const mockMarketData: MarketData[] = [
      {
        region: 'UAE',
        totalSales: 2500000,
        marketShare: 22.5,
        growthRate: 8.3,
        competitorAnalysis: [
          { competitor: 'Competitor A', marketShare: 28.1, pricePoint: 45 },
          { competitor: 'Competitor B', marketShare: 19.7, pricePoint: 38 },
          { competitor: 'Competitor C', marketShare: 15.2, pricePoint: 42 }
        ],
        seasonalTrends: [
          { month: 'Jan', sales: 180000, demand: 185000 },
          { month: 'Feb', sales: 195000, demand: 200000 },
          { month: 'Mar', sales: 220000, demand: 215000 },
          { month: 'Apr', sales: 210000, demand: 205000 },
          { month: 'May', sales: 235000, demand: 240000 },
          { month: 'Jun', sales: 250000, demand: 255000 }
        ]
      },
      {
        region: 'Saudi Arabia',
        totalSales: 1800000,
        marketShare: 18.2,
        growthRate: 12.1,
        competitorAnalysis: [
          { competitor: 'Competitor A', marketShare: 32.5, pricePoint: 48 },
          { competitor: 'Competitor B', marketShare: 21.3, pricePoint: 41 },
          { competitor: 'Competitor C', marketShare: 16.8, pricePoint: 39 }
        ],
        seasonalTrends: [
          { month: 'Jan', sales: 140000, demand: 145000 },
          { month: 'Feb', sales: 155000, demand: 160000 },
          { month: 'Mar', sales: 170000, demand: 165000 },
          { month: 'Apr', sales: 160000, demand: 155000 },
          { month: 'May', sales: 180000, demand: 185000 },
          { month: 'Jun', sales: 195000, demand: 200000 }
        ]
      }
    ]

    // Mock quality trends
    const mockQualityTrends: QualityTrend[] = [
      { date: '2024-01', overallQuality: 91, moistureContent: 12.5, leafGrade: 88, curingEfficiency: 94, defectRate: 2.1, customerComplaints: 5 },
      { date: '2024-02', overallQuality: 93, moistureContent: 12.2, leafGrade: 90, curingEfficiency: 96, defectRate: 1.8, customerComplaints: 3 },
      { date: '2024-03', overallQuality: 89, moistureContent: 13.1, leafGrade: 85, curingEfficiency: 92, defectRate: 2.5, customerComplaints: 7 },
      { date: '2024-04', overallQuality: 95, moistureContent: 11.8, leafGrade: 93, curingEfficiency: 98, defectRate: 1.2, customerComplaints: 2 },
      { date: '2024-05', overallQuality: 92, moistureContent: 12.0, leafGrade: 89, curingEfficiency: 95, defectRate: 1.9, customerComplaints: 4 },
      { date: '2024-06', overallQuality: 94, moistureContent: 11.9, leafGrade: 91, curingEfficiency: 97, defectRate: 1.5, customerComplaints: 3 }
    ]

    // Mock production forecasts
    const mockForecasts: ProductionForecast[] = [
      {
        period: 'Q3 2024',
        predictedDemand: 450000,
        recommendedProduction: 470000,
        rawMaterialNeeds: [
          { leafType: 'Virginia Bright', quantity: 280000, estimatedCost: 1400000 },
          { leafType: 'Burley', quantity: 120000, estimatedCost: 480000 },
          { leafType: 'Oriental', quantity: 70000, estimatedCost: 560000 }
        ],
        confidence: 87
      },
      {
        period: 'Q4 2024',
        predictedDemand: 520000,
        recommendedProduction: 545000,
        rawMaterialNeeds: [
          { leafType: 'Virginia Bright', quantity: 325000, estimatedCost: 1625000 },
          { leafType: 'Burley', quantity: 140000, estimatedCost: 560000 },
          { leafType: 'Oriental', quantity: 80000, estimatedCost: 640000 }
        ],
        confidence: 82
      }
    ]

    setBlendPerformance(mockBlendPerformance)
    setMarketData(mockMarketData)
    setQualityTrends(mockQualityTrends)
    setProductionForecasts(mockForecasts)
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#10b981'
      case 'down': return '#ef4444'
      case 'stable': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗'
      case 'down': return '↘'
      case 'stable': return '→'
      default: return '→'
    }
  }

  const renderOverview = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      {/* Key Performance Indicators */}
      <div className="cosmic-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <TrendingUp size={24} style={{ color: '#10b981' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>Total Revenue</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Last 6 months</p>
          </div>
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#10b981',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          marginBottom: '8px'
        }}>
          $4.3M
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          <span style={{ color: '#10b981' }}>↗ +12.5%</span> vs previous period
        </div>
      </div>

      <div className="cosmic-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <Package size={24} style={{ color: '#3b82f6' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>Production Volume</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Units produced</p>
          </div>
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#3b82f6',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          marginBottom: '8px'
        }}>
          {blendPerformance.reduce((sum, blend) => sum + blend.productionVolume, 0).toLocaleString()}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          <span style={{ color: '#3b82f6' }}>↗ +8.2%</span> efficiency improvement
        </div>
      </div>

      <div className="cosmic-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <Award size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>Avg Quality Score</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Across all blends</p>
          </div>
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#f59e0b',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          marginBottom: '8px'
        }}>
          {Math.round(blendPerformance.reduce((sum, blend) => sum + blend.qualityScore, 0) / blendPerformance.length)}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          <span style={{ color: '#10b981' }}>↗ +3.1%</span> quality improvement
        </div>
      </div>

      <div className="cosmic-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <Globe size={24} style={{ color: '#8b5cf6' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>Market Share</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>Regional average</p>
          </div>
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#8b5cf6',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          marginBottom: '8px'
        }}>
          {Math.round(marketData.reduce((sum, market) => sum + market.marketShare, 0) / marketData.length)}%
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          <span style={{ color: '#10b981' }}>↗ +2.3%</span> market expansion
        </div>
      </div>

      {/* Blend Performance Chart */}
      <div className="cosmic-card" style={{ padding: '24px', gridColumn: '1 / -1' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '24px', fontSize: '20px' }}>
          <BarChart3 size={24} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Blend Performance Analysis
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {blendPerformance.map((blend) => (
            <div key={blend.blendId} style={{
              background: 'rgba(26, 26, 46, 0.5)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '16px' }}>{blend.blendName}</h4>
                <span style={{
                  background: `${getTrendColor(blend.trend)}20`,
                  color: getTrendColor(blend.trend),
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {getTrendIcon(blend.trend)} {blend.trend}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Production Volume</div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: 'var(--text-primary)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  }}>
                    {blend.productionVolume.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Quality Score</div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: blend.qualityScore >= 90 ? '#10b981' : blend.qualityScore >= 80 ? '#f59e0b' : '#ef4444',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  }}>
                    {blend.qualityScore}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Profit Margin</div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#10b981',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  }}>
                    {blend.profitMargin}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Market Share</div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: 'var(--cosmic-primary)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  }}>
                    {blend.marketShare}%
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Customer Satisfaction</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '100px',
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${(blend.customerSatisfaction / 5) * 100}%`,
                      height: '100%',
                      background: blend.customerSatisfaction >= 4.5 ? '#10b981' : blend.customerSatisfaction >= 4.0 ? '#f59e0b' : '#ef4444',
                      borderRadius: '3px'
                    }} />
                  </div>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: blend.customerSatisfaction >= 4.5 ? '#10b981' : blend.customerSatisfaction >= 4.0 ? '#f59e0b' : '#ef4444',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  }}>
                    {blend.customerSatisfaction}/5.0
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Analysis */}
      <div className="cosmic-card" style={{ padding: '24px', gridColumn: '1 / -1' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '24px', fontSize: '20px' }}>
          <Globe size={24} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Regional Market Analysis
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          {marketData.map((market) => (
            <div key={market.region} style={{
              background: 'rgba(26, 26, 46, 0.5)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h4 style={{ color: 'var(--text-primary)', margin: '0 0 16px 0', fontSize: '18px' }}>{market.region}</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Sales</div>
                  <div style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: 'var(--cosmic-primary)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  }}>
                    ${market.totalSales.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Growth Rate</div>
                  <div style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: market.growthRate > 0 ? '#10b981' : '#ef4444',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  }}>
                    {market.growthRate > 0 ? '+' : ''}{market.growthRate}%
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: '600' }}>
                  Competitor Analysis
                </div>
                {market.competitorAnalysis.slice(0, 3).map((competitor, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: index < 2 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                  }}>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{competitor.competitor}</span>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: 'var(--text-primary)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                      }}>
                        {competitor.marketShare}%
                      </span>
                      <span style={{ 
                        fontSize: '12px', 
                        color: 'var(--text-secondary)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                      }}>
                        ${competitor.pricePoint}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
                  Market Share: {market.marketShare}%
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${market.marketShare}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--cosmic-primary), var(--cosmic-accent))',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSeasonalForecasting = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', margin: 0 }}>
          <Calendar size={28} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Seasonal Forecasting & Demand Planning
        </h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select 
            value={selectedTimeRange} 
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            style={{
              background: 'rgba(26, 26, 46, 0.7)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              padding: '8px 12px',
              fontSize: '14px'
            }}
          >
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="12months">12 Months</option>
          </select>
          <button className="cosmic-button" style={{ padding: '8px 16px' }}>
            <RefreshCw size={16} style={{ marginRight: '8px' }} />
            Update Forecast
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {productionForecasts.map((forecast) => (
          <div key={forecast.period} className="cosmic-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>{forecast.period}</h4>
              <span style={{
                background: `rgba(${forecast.confidence >= 85 ? '16, 185, 129' : forecast.confidence >= 70 ? '245, 158, 11' : '239, 68, 68'}, 0.2)`,
                color: forecast.confidence >= 85 ? '#10b981' : forecast.confidence >= 70 ? '#f59e0b' : '#ef4444',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {forecast.confidence}% Confidence
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Predicted Demand</div>
                <div style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: 'var(--cosmic-primary)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  {forecast.predictedDemand.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Recommended Production</div>
                <div style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: '#10b981',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  {forecast.recommendedProduction.toLocaleString()}
                </div>
              </div>
            </div>

            <div>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '14px', marginBottom: '12px' }}>Raw Material Requirements</h5>
              {forecast.rawMaterialNeeds.map((material, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: index < forecast.rawMaterialNeeds.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>
                      {material.leafType}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {material.quantity.toLocaleString()} kg
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: 'var(--cosmic-primary)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  }}>
                    ${material.estimatedCost.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderQualityTrends = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', margin: 0 }}>
          <Award size={28} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Quality Trends Analysis
        </h3>
        <button className="cosmic-button" style={{ padding: '12px 24px' }}>
          <Download size={16} style={{ marginRight: '8px' }} />
          Export Report
        </button>
      </div>

      <div className="cosmic-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '18px' }}>Quality Metrics Over Time</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          {qualityTrends.map((trend, index) => (
            <div key={index} style={{
              background: 'rgba(26, 26, 46, 0.5)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {trend.date}
              </div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: trend.overallQuality >= 90 ? '#10b981' : trend.overallQuality >= 80 ? '#f59e0b' : '#ef4444',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                marginBottom: '4px'
              }}>
                {trend.overallQuality}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Overall Quality
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div className="cosmic-card" style={{ padding: '24px' }}>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px' }}>Moisture Content Trends</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {qualityTrends.slice(-3).map((trend, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{trend.date}</span>
                <span style={{ 
                  fontSize: '16px', 
                  fontWeight: '600',
                  color: trend.moistureContent > 13 ? '#ef4444' : trend.moistureContent < 11 ? '#f59e0b' : '#10b981',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  {trend.moistureContent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="cosmic-card" style={{ padding: '24px' }}>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px' }}>Defect Rate Analysis</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {qualityTrends.slice(-3).map((trend, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{trend.date}</span>
                <span style={{ 
                  fontSize: '16px', 
                  fontWeight: '600',
                  color: trend.defectRate > 2 ? '#ef4444' : trend.defectRate > 1.5 ? '#f59e0b' : '#10b981',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  {trend.defectRate}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="cosmic-card" style={{ padding: '24px' }}>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px' }}>Customer Complaints</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {qualityTrends.slice(-3).map((trend, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{trend.date}</span>
                <span style={{ 
                  fontSize: '16px', 
                  fontWeight: '600',
                  color: trend.customerComplaints > 5 ? '#ef4444' : trend.customerComplaints > 3 ? '#f59e0b' : '#10b981',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}>
                  {trend.customerComplaints}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const tabs = [
    { id: 'overview', label: 'Analytics Overview', icon: BarChart3 },
    { id: 'blend_performance', label: 'Blend Performance', icon: Target },
    { id: 'market_analysis', label: 'Market Analysis', icon: Globe },
    { id: 'seasonal_forecast', label: 'Seasonal Forecasting', icon: Calendar },
    { id: 'quality_trends', label: 'Quality Trends', icon: Award },
    { id: 'predictive', label: 'Predictive Analytics', icon: TrendingUp }
  ]

  return (
    <div style={{ padding: '24px', maxWidth: '1800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          color: 'var(--text-primary)', 
          margin: '0 0 8px 0',
          fontSize: '32px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            padding: '12px',
            borderRadius: '12px'
          }}>
            <TrendingUp size={32} style={{ color: 'white' }} />
          </div>
          Advanced Tobacco Analytics
        </h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '16px' }}>
          Comprehensive business intelligence and predictive analytics for tobacco operations
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '32px',
        overflowX: 'auto',
        padding: '4px'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: activeTab === tab.id ? 'var(--elegant-gradient)' : 'rgba(26, 26, 46, 0.7)',
              border: `1px solid ${activeTab === tab.id ? 'var(--cosmic-primary)' : 'rgba(0, 212, 255, 0.2)'}`,
              borderRadius: '12px',
              color: 'var(--cosmic-star-white)',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(10px)',
              boxShadow: activeTab === tab.id ? 'var(--cosmic-glow)' : '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'seasonal_forecast' && renderSeasonalForecasting()}
        {activeTab === 'quality_trends' && renderQualityTrends()}
        {activeTab === 'blend_performance' && (
          <div className="cosmic-card" style={{ padding: '48px', textAlign: 'center' }}>
            <Target size={48} style={{ color: 'var(--cosmic-primary)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Blend Performance Module</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Detailed blend performance analytics coming soon...</p>
          </div>
        )}
        {activeTab === 'market_analysis' && (
          <div className="cosmic-card" style={{ padding: '48px', textAlign: 'center' }}>
            <Globe size={48} style={{ color: 'var(--cosmic-primary)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Market Analysis Module</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Advanced market intelligence coming soon...</p>
          </div>
        )}
        {activeTab === 'predictive' && (
          <div className="cosmic-card" style={{ padding: '48px', textAlign: 'center' }}>
            <TrendingUp size={48} style={{ color: 'var(--cosmic-primary)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Predictive Analytics Module</h3>
            <p style={{ color: 'var(--text-secondary)' }}>AI-powered predictive models coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TobaccoAnalytics 