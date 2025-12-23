import React, { useState } from 'react'

interface EDITBAData {
  period: string
  revenue: number
  costOfGoodsSold: number
  grossProfit: number
  operatingExpenses: {
    salaries: number
    rent: number
    utilities: number
    marketing: number
    insurance: number
    other: number
  }
  ebitda: number
  depreciation: number
  amortization: number
  ebit: number
  interestExpense: number
  interestIncome: number
  ebt: number
  taxes: number
  netIncome: number
  businessMetrics: {
    grossMargin: number
    operatingMargin: number
    netMargin: number
    returnOnAssets: number
    returnOnEquity: number
    debtToEquity: number
  }
}

const EDITBAReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-Q4')
  const [viewType, setViewType] = useState<'summary' | 'detailed' | 'comparison' | 'trends'>('summary')

  const [editbaData] = useState<Record<string, EDITBAData>>({
    '2024-Q4': {
      period: '2024-Q4',
      revenue: 375000,
      costOfGoodsSold: 241875,
      grossProfit: 133125,
      operatingExpenses: {
        salaries: 45000,
        rent: 12000,
        utilities: 3500,
        marketing: 8000,
        insurance: 2500,
        other: 6000
      },
      ebitda: 56125,
      depreciation: 8500,
      amortization: 2000,
      ebit: 45625,
      interestExpense: 3200,
      interestIncome: 500,
      ebt: 42925,
      taxes: 10731,
      netIncome: 32194,
      businessMetrics: {
        grossMargin: 35.5,
        operatingMargin: 12.2,
        netMargin: 8.6,
        returnOnAssets: 15.2,
        returnOnEquity: 18.7,
        debtToEquity: 0.45
      }
    },
    '2024-Q3': {
      period: '2024-Q3',
      revenue: 350000,
      costOfGoodsSold: 227500,
      grossProfit: 122500,
      operatingExpenses: {
        salaries: 43000,
        rent: 12000,
        utilities: 3200,
        marketing: 7500,
        insurance: 2500,
        other: 5500
      },
      ebitda: 50800,
      depreciation: 8500,
      amortization: 2000,
      ebit: 40300,
      interestExpense: 3200,
      interestIncome: 400,
      ebt: 37500,
      taxes: 9375,
      netIncome: 28125,
      businessMetrics: {
        grossMargin: 35.0,
        operatingMargin: 11.5,
        netMargin: 8.0,
        returnOnAssets: 14.1,
        returnOnEquity: 17.2,
        debtToEquity: 0.48
      }
    },
    '2024-Q2': {
      period: '2024-Q2',
      revenue: 325000,
      costOfGoodsSold: 211250,
      grossProfit: 113750,
      operatingExpenses: {
        salaries: 41000,
        rent: 12000,
        utilities: 3000,
        marketing: 7000,
        insurance: 2500,
        other: 5200
      },
      ebitda: 43050,
      depreciation: 8500,
      amortization: 2000,
      ebit: 32550,
      interestExpense: 3200,
      interestIncome: 300,
      ebt: 29650,
      taxes: 7412,
      netIncome: 22238,
      businessMetrics: {
        grossMargin: 35.0,
        operatingMargin: 10.0,
        netMargin: 6.8,
        returnOnAssets: 11.2,
        returnOnEquity: 13.6,
        debtToEquity: 0.52
      }
    }
  })

  const currentData = editbaData[selectedPeriod]
  const totalOperatingExpenses = Object.values(currentData.operatingExpenses).reduce((sum, val) => sum + val, 0)

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

  const getGrowthRate = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100
    return growth
  }

  const containerStyle = {
    padding: '2rem',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    borderRadius: '20px',
    minHeight: '600px'
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    padding: '1rem 0',
    borderBottom: '2px solid #dee2e6'
  }

  const tabStyle = (isActive: boolean) => ({
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: isActive 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'transparent',
    color: isActive ? '#ffffff' : '#6c757d',
    marginRight: '0.5rem'
  })

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '15px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e9ecef'
  }

  const metricCardStyle = (isPositive?: boolean) => ({
    background: '#ffffff',
    borderRadius: '15px',
    padding: '1.5rem',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e9ecef',
    textAlign: 'center' as const,
    borderLeft: `4px solid ${isPositive === true ? '#28a745' : isPositive === false ? '#dc3545' : '#667eea'}`
  })

  const selectStyle = {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '2px solid #e9ecef',
    fontSize: '1rem',
    cursor: 'pointer',
    background: '#ffffff'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '2rem' }}>📊 EDITBA Financial Analysis</h2>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d' }}>
            Earnings, Depreciation, Interest, Taxes & Business Analysis
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={selectStyle}
          >
            <option value="2024-Q4">Q4 2024</option>
            <option value="2024-Q3">Q3 2024</option>
            <option value="2024-Q2">Q2 2024</option>
          </select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          style={tabStyle(viewType === 'summary')}
          onClick={() => setViewType('summary')}
        >
          📋 Summary
        </button>
        <button
          style={tabStyle(viewType === 'detailed')}
          onClick={() => setViewType('detailed')}
        >
          📊 Detailed
        </button>
        <button
          style={tabStyle(viewType === 'comparison')}
          onClick={() => setViewType('comparison')}
        >
          📈 Comparison
        </button>
        <button
          style={tabStyle(viewType === 'trends')}
          onClick={() => setViewType('trends')}
        >
          📉 Trends
        </button>
      </div>

      {viewType === 'summary' && (
        <div>
          {/* Key Metrics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={metricCardStyle(true)}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>Revenue</h4>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#28a745' }}>
                {formatCurrency(currentData.revenue)}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                +7.1% vs Q3
              </div>
            </div>

            <div style={metricCardStyle(true)}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>EBITDA</h4>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#28a745' }}>
                {formatCurrency(currentData.ebitda)}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                {formatPercentage((currentData.ebitda / currentData.revenue) * 100)} margin
              </div>
            </div>

            <div style={metricCardStyle(true)}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>Net Income</h4>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#28a745' }}>
                {formatCurrency(currentData.netIncome)}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                {formatPercentage(currentData.businessMetrics.netMargin)} margin
              </div>
            </div>

            <div style={metricCardStyle()}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>ROE</h4>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#667eea' }}>
                {formatPercentage(currentData.businessMetrics.returnOnEquity)}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                Return on Equity
              </div>
            </div>
          </div>

          {/* EDITBA Breakdown */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#2c3e50' }}>💰 EDITBA Breakdown</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0', fontWeight: '600' }}>Revenue</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#28a745' }}>
                        {formatCurrency(currentData.revenue)}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0' }}>Cost of Goods Sold</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#dc3545' }}>
                        ({formatCurrency(currentData.costOfGoodsSold)})
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '2px solid #dee2e6', fontWeight: '600' }}>
                      <td style={{ padding: '0.75rem 0' }}>Gross Profit</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#28a745' }}>
                        {formatCurrency(currentData.grossProfit)}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0' }}>Operating Expenses</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#dc3545' }}>
                        ({formatCurrency(totalOperatingExpenses)})
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '2px solid #dee2e6', fontWeight: '600', background: '#f8f9fa' }}>
                      <td style={{ padding: '0.75rem 0' }}>EBITDA</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#667eea' }}>
                        {formatCurrency(currentData.ebitda)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0' }}>Depreciation</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#dc3545' }}>
                        ({formatCurrency(currentData.depreciation)})
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0' }}>Amortization</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#dc3545' }}>
                        ({formatCurrency(currentData.amortization)})
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '2px solid #dee2e6', fontWeight: '600' }}>
                      <td style={{ padding: '0.75rem 0' }}>EBIT</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#667eea' }}>
                        {formatCurrency(currentData.ebit)}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0' }}>Interest (Net)</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#dc3545' }}>
                        ({formatCurrency(currentData.interestExpense - currentData.interestIncome)})
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0' }}>Taxes</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#dc3545' }}>
                        ({formatCurrency(currentData.taxes)})
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '2px solid #dee2e6', fontWeight: '600', background: '#f8f9fa' }}>
                      <td style={{ padding: '0.75rem 0' }}>Net Income</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#28a745' }}>
                        {formatCurrency(currentData.netIncome)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Business Metrics */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#2c3e50' }}>📈 Key Business Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                  {formatPercentage(currentData.businessMetrics.grossMargin)}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>Gross Margin</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                  {formatPercentage(currentData.businessMetrics.operatingMargin)}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>Operating Margin</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                  {formatPercentage(currentData.businessMetrics.returnOnAssets)}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>ROA</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                  {currentData.businessMetrics.debtToEquity.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>Debt/Equity</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewType === 'detailed' && (
        <div>
          {/* Detailed Operating Expenses */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#2c3e50' }}>💼 Operating Expenses Breakdown</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0' }}>Salaries & Benefits</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>
                        {formatCurrency(currentData.operatingExpenses.salaries)}
                      </td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#6c757d' }}>
                        {formatPercentage((currentData.operatingExpenses.salaries / totalOperatingExpenses) * 100)}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0' }}>Rent & Facilities</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>
                        {formatCurrency(currentData.operatingExpenses.rent)}
                      </td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#6c757d' }}>
                        {formatPercentage((currentData.operatingExpenses.rent / totalOperatingExpenses) * 100)}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0' }}>Utilities</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>
                        {formatCurrency(currentData.operatingExpenses.utilities)}
                      </td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#6c757d' }}>
                        {formatPercentage((currentData.operatingExpenses.utilities / totalOperatingExpenses) * 100)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0' }}>Marketing & Sales</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>
                        {formatCurrency(currentData.operatingExpenses.marketing)}
                      </td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#6c757d' }}>
                        {formatPercentage((currentData.operatingExpenses.marketing / totalOperatingExpenses) * 100)}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0' }}>Insurance</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>
                        {formatCurrency(currentData.operatingExpenses.insurance)}
                      </td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#6c757d' }}>
                        {formatPercentage((currentData.operatingExpenses.insurance / totalOperatingExpenses) * 100)}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '0.75rem 0' }}>Other Expenses</td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right' }}>
                        {formatCurrency(currentData.operatingExpenses.other)}
                      </td>
                      <td style={{ padding: '0.75rem 0', textAlign: 'right', color: '#6c757d' }}>
                        {formatPercentage((currentData.operatingExpenses.other / totalOperatingExpenses) * 100)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Cash Flow Analysis */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#2c3e50' }}>💰 Cash Flow Analysis</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>Operating Cash Flow</h4>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#28a745', marginBottom: '0.5rem' }}>
                  {formatCurrency(currentData.ebitda)}
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6c757d' }}>
                  Strong operating cash generation
                </p>
              </div>
              
              <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>Free Cash Flow</h4>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea', marginBottom: '0.5rem' }}>
                  {formatCurrency(currentData.ebitda - currentData.depreciation - 5000)}
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6c757d' }}>
                  After capital expenditures
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewType === 'comparison' && (
        <div>
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#2c3e50' }}>📊 Quarter-over-Quarter Comparison</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Metric</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Q4 2024</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Q3 2024</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Q2 2024</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>QoQ Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '600' }}>Revenue</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(editbaData['2024-Q4'].revenue)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(editbaData['2024-Q3'].revenue)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(editbaData['2024-Q2'].revenue)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: '#28a745' }}>
                      +{formatPercentage(getGrowthRate(editbaData['2024-Q4'].revenue, editbaData['2024-Q3'].revenue))}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '600' }}>EBITDA</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(editbaData['2024-Q4'].ebitda)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(editbaData['2024-Q3'].ebitda)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(editbaData['2024-Q2'].ebitda)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: '#28a745' }}>
                      +{formatPercentage(getGrowthRate(editbaData['2024-Q4'].ebitda, editbaData['2024-Q3'].ebitda))}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '600' }}>Net Income</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(editbaData['2024-Q4'].netIncome)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(editbaData['2024-Q3'].netIncome)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(editbaData['2024-Q2'].netIncome)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: '#28a745' }}>
                      +{formatPercentage(getGrowthRate(editbaData['2024-Q4'].netIncome, editbaData['2024-Q3'].netIncome))}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '600' }}>Gross Margin</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatPercentage(editbaData['2024-Q4'].businessMetrics.grossMargin)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatPercentage(editbaData['2024-Q3'].businessMetrics.grossMargin)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatPercentage(editbaData['2024-Q2'].businessMetrics.grossMargin)}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: '#28a745' }}>
                      +0.5pp
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {viewType === 'trends' && (
        <div>
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#2c3e50' }}>📈 Financial Trends & Projections</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>Revenue Trend</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#28a745' }}>
                      {formatCurrency(375000)}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>Current Quarter</div>
                  </div>
                  <div style={{ fontSize: '2rem', color: '#28a745' }}>📈</div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6c757d' }}>
                  Consistent growth: +15.4% over 2 quarters
                </div>
              </div>

              <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>Profitability Trend</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                      {formatPercentage(8.6)}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>Net Margin</div>
                  </div>
                  <div style={{ fontSize: '2rem', color: '#28a745' }}>📊</div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6c757d' }}>
                  Improving margins: +1.8pp improvement
                </div>
              </div>
            </div>

            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '10px' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>🔮 AI-Powered Projections</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#667eea' }}>Q1 2025</div>
                  <div style={{ fontSize: '1.1rem', color: '#2c3e50' }}>{formatCurrency(395000)}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>Projected Revenue</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#667eea' }}>EBITDA</div>
                  <div style={{ fontSize: '1.1rem', color: '#2c3e50' }}>{formatCurrency(62000)}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>15.7% margin</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#667eea' }}>Growth</div>
                  <div style={{ fontSize: '1.1rem', color: '#28a745' }}>+5.3%</div>
                  <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>QoQ Growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EDITBAReports 