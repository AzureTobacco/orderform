import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, Package, ShoppingCart, Factory, Users, 
  FileText, Shield, TrendingUp, UserCheck, Warehouse,
  Truck, Award, Activity, Brain, Clock, Building, Zap, Leaf, Thermometer, Beaker, Globe
} from 'lucide-react'
import { AnimatedCounter, StatusBadge } from './ModernUI'

interface HomeProps {
  onModuleChange?: (moduleId: string) => void
}

interface ModuleShortcut {
  id: string
  name: string
  icon: React.ComponentType<any>
  description: string
  category: string
  stats?: {
    label: string
    value: number
    trend?: 'up' | 'down' | 'stable'
  }
  priority?: 'high' | 'medium' | 'low'
  color: string
}

const Home: React.FC<HomeProps> = ({ onModuleChange = () => {} }) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const moduleShortcuts: ModuleShortcut[] = [
    { 
      id: 'dashboard', 
      name: 'Analytics Dashboard', 
      icon: BarChart3, 
      description: 'Real-time insights and business metrics', 
      category: 'Core Operations', 
      stats: { label: 'Active Users', value: 247, trend: 'up' },
      priority: 'high',
      color: '#06b6d4'
    },
    { 
      id: 'inventory', 
      name: 'Inventory Control', 
      icon: Package, 
      description: 'Advanced stock management and tracking', 
      category: 'Core Operations', 
      stats: { label: 'Items', value: 12847, trend: 'up' },
      priority: 'high',
      color: '#10b981'
    },
    { 
      id: 'orders', 
      name: 'Order Processing', 
      icon: ShoppingCart, 
      description: 'Order management and fulfillment', 
      category: 'Core Operations', 
      stats: { label: 'Today', value: 89, trend: 'up' },
      priority: 'high',
      color: '#8b5cf6'
    },
    { 
      id: 'production', 
      name: 'Production Hub', 
      icon: Factory, 
      description: 'Manufacturing operations and quality control', 
      category: 'Core Operations', 
      stats: { label: 'Efficiency', value: 94, trend: 'up' },
      priority: 'high',
      color: '#f59e0b'
    },
    { 
      id: 'assets', 
      name: 'Asset Management', 
      icon: Award, 
      description: 'Asset tracking and maintenance', 
      category: 'Business Intelligence', 
      stats: { label: 'Assets', value: 1247, trend: 'stable' },
      priority: 'medium',
      color: '#ef4444'
    },
    { 
      id: 'clients', 
      name: 'Client Relations', 
      icon: Users, 
      description: 'Customer relationship management', 
      category: 'Business Intelligence', 
      stats: { label: 'Clients', value: 387, trend: 'up' },
      priority: 'medium',
      color: '#06b6d4'
    },
    { 
      id: 'quality', 
      name: 'Quality Assurance', 
      icon: UserCheck, 
      description: 'Quality control and compliance', 
      category: 'Operations', 
      stats: { label: 'Pass Rate', value: 98, trend: 'stable' },
      priority: 'medium',
      color: '#10b981'
    },
    { 
      id: 'hr', 
      name: 'Human Resources', 
      icon: Users, 
      description: 'Workforce management and development', 
      category: 'Business Intelligence', 
      stats: { label: 'Employees', value: 156, trend: 'up' },
      priority: 'medium',
      color: '#8b5cf6'
    },
    { 
      id: 'financial', 
      name: 'Financial Center', 
      icon: TrendingUp, 
      description: 'Financial analysis and reporting', 
      category: 'Business Intelligence', 
      stats: { label: 'Revenue', value: 2847000, trend: 'up' },
      priority: 'high',
      color: '#f59e0b'
    },
    { 
      id: 'reporting', 
      name: 'AI Analytics', 
      icon: Brain, 
      description: 'AI-powered business intelligence', 
      category: 'Advanced Systems', 
      stats: { label: 'Reports', value: 47, trend: 'up' },
      priority: 'medium',
      color: '#ef4444'
    },
    { 
      id: 'warehouse', 
      name: 'Warehouse Operations', 
      icon: Warehouse, 
      description: 'Warehouse management and logistics', 
      category: 'Operations', 
      stats: { label: 'Locations', value: 12, trend: 'stable' },
      priority: 'low',
      color: '#06b6d4'
    },
    { 
      id: 'supply-chain', 
      name: 'Supply Chain', 
      icon: Truck, 
      description: 'Supply chain optimization and tracking', 
      category: 'Operations', 
      stats: { label: 'Suppliers', value: 67, trend: 'up' },
      priority: 'medium',
      color: '#10b981'
    },
    { 
      id: 'security', 
      name: 'Security Center', 
      icon: Shield, 
      description: 'Security monitoring and compliance', 
      category: 'Advanced Systems', 
      stats: { label: 'Alerts', value: 3, trend: 'down' },
      priority: 'low',
      color: '#8b5cf6'
    },
    { 
      id: 'documents', 
      name: 'Document Hub', 
      icon: FileText, 
      description: 'Document management with AI search', 
      category: 'Advanced Systems', 
      stats: { label: 'Files', value: 8942, trend: 'up' },
      priority: 'low',
      color: '#f59e0b'
    }
  ]

  const categories = ['Core Operations', 'Business Intelligence', 'Operations', 'Advanced Systems']

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <Activity className="w-3 h-3 text-green-400" />
      case 'down': return <Activity className="w-3 h-3 text-red-400 rotate-180" />
      default: return <Activity className="w-3 h-3 text-yellow-400" />
    }
  }

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '1800px',
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.3)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, #06b6d420, transparent)',
            borderRadius: '50%',
            transform: 'translate(50px, -50px)'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Company Logo */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 25px rgba(6, 182, 212, 0.3)'
                }}>
                  <Building style={{ width: '32px', height: '32px', color: 'white' }} />
                </div>
                
                <div>
                  <h1 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: 'white',
                    margin: '0 0 8px 0',
                    background: 'linear-gradient(135deg, #ffffff, #06b6d4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Azure Tobacco Industrial FZCO
                  </h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Factory style={{ width: '20px', height: '20px', color: '#06b6d4' }} />
                    <p style={{
                      color: 'rgba(6, 182, 212, 0.8)',
                      fontSize: '18px',
                      margin: '0'
                    }}>
                      Enterprise Resource Planning System
                    </p>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {/* System Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <StatusBadge variant="success">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#10b981',
                        borderRadius: '50%',
                        animation: 'pulse 2s infinite'
                      }} />
                      Operational
                    </div>
                  </StatusBadge>
                  
                  <StatusBadge variant="info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Shield style={{ width: '12px', height: '12px' }} />
                      Certified
                    </div>
                  </StatusBadge>
                </div>
                
                {/* Current Time */}
                <div style={{
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Clock style={{ width: '16px', height: '16px', color: '#06b6d4' }} />
                    <span style={{ color: '#06b6d4', fontSize: '12px', fontWeight: '500' }}>
                      {formatDate(currentTime)}
                    </span>
                  </div>
                  <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                    {formatTime(currentTime)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Executive Dashboard Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px'
            }}>
              {[
                { label: 'Active Modules', value: 14, icon: Zap, color: '#06b6d4' },
                { label: 'System Uptime', value: 99.8, unit: '%', icon: Activity, color: '#10b981' },
                { label: 'Active Users', value: 247, icon: Users, color: '#8b5cf6' },
                { label: 'Daily Operations', value: 15.6, unit: 'K', icon: TrendingUp, color: '#f59e0b' }
              ].map((metric, index) => {
                const IconComponent = metric.icon
                return (
                  <div key={index} style={{
                    background: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      background: `${metric.color}20`,
                      padding: '8px',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      marginBottom: '8px'
                    }}>
                      <IconComponent size={20} style={{ color: metric.color }} />
                    </div>
                    <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
                      <AnimatedCounter value={metric.value} />
                      {metric.unit || ''}
                    </div>
                    <div style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '12px' }}>
                      {metric.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tobacco Manufacturing Overview */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', 
          borderRadius: '16px', 
          padding: '24px', 
          marginBottom: '32px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Leaf size={32} style={{ marginRight: '12px' }} />
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
              Tobacco Manufacturing Overview
            </h2>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px' 
          }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              padding: '16px', 
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Thermometer size={20} style={{ marginRight: '8px' }} />
                <span style={{ fontSize: '14px', opacity: 0.9 }}>Active Curing</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>3 Batches</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Temperature: 32°C</div>
            </div>
            
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              padding: '16px', 
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Beaker size={20} style={{ marginRight: '8px' }} />
                <span style={{ fontSize: '14px', opacity: 0.9 }}>Quality Tests</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>95% Pass Rate</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Last 24h: 12 tests</div>
            </div>
            
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              padding: '16px', 
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Shield size={20} style={{ marginRight: '8px' }} />
                <span style={{ fontSize: '14px', opacity: 0.9 }}>Compliance</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>100% Compliant</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>UAE/GCC/EU Standards</div>
            </div>
            
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              padding: '16px', 
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Package size={20} style={{ marginRight: '8px' }} />
                <span style={{ fontSize: '14px', opacity: 0.9 }}>Raw Materials</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>2,500 kg</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Virginia Tobacco Stock</div>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '20px', 
            padding: '16px', 
            background: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <Globe size={20} style={{ marginRight: '8px' }} />
              <span style={{ fontWeight: '500' }}>Export Markets Status</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ 
                background: '#10b981', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '12px',
                fontWeight: '500'
              }}>UAE: Compliant</span>
              <span style={{ 
                background: '#10b981', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '12px',
                fontWeight: '500'
              }}>GCC: Compliant</span>
              <span style={{ 
                background: '#10b981', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '12px',
                fontWeight: '500'
              }}>EU: Compliant</span>
              <span style={{ 
                background: '#f59e0b', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '12px',
                fontWeight: '500'
              }}>US: Pending</span>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Brain style={{ width: '24px', height: '24px', color: '#06b6d4' }} />
            Business Modules
          </h2>
          <p style={{
            color: 'rgba(6, 182, 212, 0.7)',
            fontSize: '16px',
            margin: '0 0 24px 0'
          }}>
            Access all enterprise modules and operations
          </p>
        </div>

        {/* Module Categories */}
        {categories.map((category) => {
          const categoryModules = moduleShortcuts.filter(module => module.category === category)
          
          return (
            <div key={category} style={{ marginBottom: '32px' }}>
              <h3 style={{
                color: 'rgba(6, 182, 212, 0.9)',
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px',
                paddingLeft: '4px'
              }}>
                {category}
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px'
              }}>
                {categoryModules.map((module) => {
                  const IconComponent = module.icon
                  const isHovered = hoveredModule === module.id
                  
                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: 'rgba(30, 41, 59, 0.3)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        borderRadius: '12px',
                        padding: '24px',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: isHovered ? '0 20px 40px rgba(6, 182, 212, 0.1)' : 'none'
                      }}
                      onMouseEnter={() => setHoveredModule(module.id)}
                      onMouseLeave={() => setHoveredModule(null)}
                      onClick={() => onModuleChange(module.id)}
                    >
                      {/* Background gradient */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '120px',
                        height: '120px',
                        background: `linear-gradient(135deg, ${module.color}20, transparent)`,
                        borderRadius: '50%',
                        transform: 'translate(40px, -40px)'
                      }} />
                      
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                          <div style={{
                            background: `${module.color}20`,
                            padding: '12px',
                            borderRadius: '8px'
                          }}>
                            <IconComponent size={24} style={{ color: module.color }} />
                          </div>
                          
                          {module.stats && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {getTrendIcon(module.stats.trend || 'stable')}
                              <span style={{ 
                                color: module.stats.trend === 'up' ? '#10b981' : module.stats.trend === 'down' ? '#ef4444' : '#f59e0b',
                                fontSize: '12px', 
                                fontWeight: '500'
                              }}>
                                {module.stats.label}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <h3 style={{ 
                          color: 'white', 
                          margin: '0 0 8px 0', 
                          fontSize: '18px',
                          fontWeight: '600'
                        }}>
                          {module.name}
                        </h3>
                        
                        <p style={{ 
                          color: 'rgba(6, 182, 212, 0.7)', 
                          margin: '0 0 16px 0', 
                          fontSize: '14px',
                          lineHeight: '1.5'
                        }}>
                          {module.description}
                        </p>
                        
                        {module.stats && (
                          <div style={{
                            background: 'rgba(6, 182, 212, 0.05)',
                            border: '1px solid rgba(6, 182, 212, 0.1)',
                            borderRadius: '6px',
                            padding: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{ color: 'rgba(6, 182, 212, 0.7)', fontSize: '12px' }}>
                              {module.stats.label}
                            </span>
                            <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
                              <AnimatedCounter value={module.stats.value} />
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home 