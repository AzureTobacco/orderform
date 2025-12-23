import React, { useState, useRef, useEffect } from 'react'

interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: string
  suggestions?: string[]
}

interface BusinessInsight {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  category: string
  action?: string
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your Azure Tobacco Industrial FZCO AI Assistant. I can help you with inventory management, order processing, financial analysis, and business insights. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString(),
      suggestions: [
        'Show inventory status',
        'Analyze sales trends',
        'Generate financial report',
        'Check order status'
      ]
    }
  ])

  const [currentMessage, setCurrentMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'insights' | 'analytics'>('chat')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [businessInsights] = useState<BusinessInsight[]>([
    {
      id: '1',
      title: 'Low Inventory Alert',
      description: 'Cuban Wrapper Leaves are running low (15 units remaining). Consider reordering soon.',
      priority: 'high',
      category: 'Inventory',
      action: 'Create Purchase Order'
    },
    {
      id: '2',
      title: 'Sales Trend Analysis',
      description: 'Premium cigar sales increased by 23% this month. Consider expanding production.',
      priority: 'medium',
      category: 'Sales',
      action: 'View Detailed Report'
    },
    {
      id: '3',
      title: 'Cost Optimization',
      description: 'Raw material costs can be reduced by 8% by switching to bulk purchasing.',
      priority: 'medium',
      category: 'Financial',
      action: 'Review Suppliers'
    },
    {
      id: '4',
      title: 'Quality Metrics',
      description: 'Quality control pass rate is 98.5%, exceeding industry standards.',
      priority: 'low',
      category: 'Quality',
      action: 'View Quality Report'
    }
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase()
    let response = ''
    let suggestions: string[] = []

    if (lowerMessage.includes('inventory') || lowerMessage.includes('stock')) {
      response = 'Based on current inventory data:\n\n• Total Inventory Value: $51,500\n• Low Stock Items: 1 (Cuban Wrapper Leaves)\n• Active Formulas: 1 (Premium Cigar Blend)\n• Recommended Action: Reorder Cuban Wrapper Leaves\n\nWould you like me to create a purchase order or show detailed inventory analysis?'
      suggestions = ['Create purchase order', 'Show inventory details', 'Analyze usage patterns']
    } else if (lowerMessage.includes('sales') || lowerMessage.includes('revenue')) {
      response = 'Sales Performance Summary:\n\n• Monthly Revenue: $125,000 (+15% vs last month)\n• Top Product: Premium Cigar Blend (35.6% profit margin)\n• Average Order Value: $2,450\n• Customer Satisfaction: 94%\n\nSales are trending upward with strong profit margins. Consider expanding premium product lines.'
      suggestions = ['View sales report', 'Analyze customer trends', 'Product performance']
    } else if (lowerMessage.includes('financial') || lowerMessage.includes('profit')) {
      response = 'Financial Overview:\n\n• Gross Profit Margin: 35.6%\n• Monthly Expenses: $8,700\n• Net Profit: $42,300\n• Cash Flow: Positive\n• ROI: 28%\n\nFinancial health is excellent. Consider reinvestment opportunities for growth.'
      suggestions = ['Generate P&L report', 'Cash flow analysis', 'Budget planning']
    } else {
      response = 'I understand you\'re asking about "' + userMessage + '". Let me analyze your ERP data to provide relevant insights.\n\nBased on current business metrics, I recommend focusing on:\n\n• Inventory optimization\n• Sales growth opportunities\n• Cost reduction strategies\n• Quality improvements\n\nWould you like me to elaborate on any of these areas?'
      suggestions = ['Inventory analysis', 'Sales opportunities', 'Cost optimization', 'Quality metrics']
    }

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date().toLocaleTimeString(),
      suggestions
    }
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentMessage('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(currentMessage)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
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

  const chatContainerStyle = {
    background: '#ffffff',
    borderRadius: '15px',
    height: '500px',
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
  }

  const messagesStyle = {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto' as const,
    borderBottom: '1px solid #e9ecef'
  }

  const messageStyle = (type: 'user' | 'assistant') => ({
    display: 'flex',
    justifyContent: type === 'user' ? 'flex-end' : 'flex-start',
    marginBottom: '1rem'
  })

  const messageBubbleStyle = (type: 'user' | 'assistant') => ({
    maxWidth: '70%',
    padding: '1rem',
    borderRadius: '15px',
    background: type === 'user' 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : '#f8f9fa',
    color: type === 'user' ? '#ffffff' : '#2c3e50',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  })

  const inputContainerStyle = {
    padding: '1rem',
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-end'
  }

  const inputStyle = {
    flex: 1,
    padding: '0.75rem',
    borderRadius: '10px',
    border: '2px solid #e9ecef',
    fontSize: '1rem',
    resize: 'none' as const,
    minHeight: '40px',
    maxHeight: '120px'
  }

  const sendButtonStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  const suggestionStyle = {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    margin: '0.25rem',
    background: 'rgba(102, 126, 234, 0.1)',
    color: '#667eea',
    borderRadius: '20px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    border: '1px solid rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease'
  }

  const insightCardStyle = (priority: string) => ({
    background: '#ffffff',
    borderRadius: '15px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    borderLeft: `4px solid ${
      priority === 'high' ? '#ff6b6b' : 
      priority === 'medium' ? '#feca57' : '#48dbfb'
    }`
  })

  const priorityBadgeStyle = (priority: string) => ({
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '15px',
    fontSize: '0.8rem',
    fontWeight: '600',
    background: priority === 'high' ? '#ff6b6b' : 
                priority === 'medium' ? '#feca57' : '#48dbfb',
    color: '#ffffff'
  })

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '2rem' }}>🤖 AI Assistant</h2>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d' }}>Your intelligent business companion</p>
        </div>
        <div>
          <button
            style={tabStyle(activeTab === 'chat')}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat
          </button>
          <button
            style={tabStyle(activeTab === 'insights')}
            onClick={() => setActiveTab('insights')}
          >
            💡 Insights
          </button>
          <button
            style={tabStyle(activeTab === 'analytics')}
            onClick={() => setActiveTab('analytics')}
          >
            📊 Analytics
          </button>
        </div>
      </div>

      {activeTab === 'chat' && (
        <div style={chatContainerStyle}>
          <div style={messagesStyle}>
            {messages.map(message => (
              <div key={message.id} style={messageStyle(message.type)}>
                <div style={messageBubbleStyle(message.type)}>
                  <div style={{ whiteSpace: 'pre-line', marginBottom: '0.5rem' }}>
                    {message.content}
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    opacity: 0.7,
                    marginBottom: message.suggestions ? '1rem' : '0'
                  }}>
                    {message.timestamp}
                  </div>
                  {message.suggestions && (
                    <div>
                      {message.suggestions.map((suggestion, index) => (
                        <span
                          key={index}
                          style={suggestionStyle}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={messageStyle('assistant')}>
                <div style={messageBubbleStyle('assistant')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#667eea',
                      animation: 'pulse 1.5s infinite'
                    }} />
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#667eea',
                      animation: 'pulse 1.5s infinite 0.2s'
                    }} />
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#667eea',
                      animation: 'pulse 1.5s infinite 0.4s'
                    }} />
                    <span style={{ marginLeft: '0.5rem', color: '#6c757d' }}>AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={inputContainerStyle}>
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your business..."
              style={inputStyle}
            />
            <button
              style={sendButtonStyle}
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
            >
              🚀 Send
            </button>
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>🔍 Business Insights</h3>
            <p style={{ margin: 0, color: '#6c757d' }}>
              AI-powered recommendations based on your ERP data
            </p>
          </div>

          {businessInsights.map(insight => (
            <div key={insight.id} style={insightCardStyle(insight.priority)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>{insight.title}</h4>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={priorityBadgeStyle(insight.priority)}>
                      {insight.priority.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                      📁 {insight.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <p style={{ margin: '0 0 1rem 0', color: '#6c757d', lineHeight: '1.6' }}>
                {insight.description}
              </p>
              
              {insight.action && (
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#ffffff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {insight.action}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>📊 AI Analytics Dashboard</h3>
            <p style={{ margin: 0, color: '#6c757d' }}>
              Real-time business intelligence and predictive analytics
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '15px', padding: '1.5rem', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>📈 Revenue Prediction</h4>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#28a745', marginBottom: '0.5rem' }}>
                $142,000
              </div>
              <p style={{ margin: 0, color: '#6c757d' }}>
                Predicted next month revenue (+13.6% growth)
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '15px', padding: '1.5rem', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>🎯 Efficiency Score</h4>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#667eea', marginBottom: '0.5rem' }}>
                94.2%
              </div>
              <p style={{ margin: 0, color: '#6c757d' }}>
                Overall operational efficiency (Excellent)
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '15px', padding: '1.5rem', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>⚠️ Risk Assessment</h4>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#feca57', marginBottom: '0.5rem' }}>
                Low
              </div>
              <p style={{ margin: 0, color: '#6c757d' }}>
                Business risk level (2 minor alerts)
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '15px', padding: '1.5rem', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>🚀 Growth Opportunities</h4>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ff6b6b', marginBottom: '0.5rem' }}>
                5
              </div>
              <p style={{ margin: 0, color: '#6c757d' }}>
                AI-identified expansion opportunities
              </p>
            </div>
          </div>

          <div style={{ marginTop: '2rem', background: '#ffffff', borderRadius: '15px', padding: '1.5rem', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>🧠 AI Recommendations</h4>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#6c757d', lineHeight: '1.8' }}>
              <li>Increase premium product inventory by 20% based on demand trends</li>
              <li>Implement automated reordering for Cuban Wrapper Leaves</li>
              <li>Consider expanding to 2 new client segments with high profit potential</li>
              <li>Optimize production schedule to reduce costs by 12%</li>
              <li>Implement predictive maintenance to prevent equipment downtime</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIAssistant 