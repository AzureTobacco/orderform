import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, Package, ShoppingCart, Factory, Users, 
  FileText, Shield, TrendingUp, UserCheck, Warehouse,
  Truck, Award, Activity, Brain, Clock, Building, Zap, Leaf, Thermometer, Beaker, Globe,
  Menu, X, Home as HomeIcon, Settings, LogOut, User, Bell, ChevronLeft, ChevronRight, Search, Bot, Presentation
} from 'lucide-react'

// Import components
import Home from './components/Home'
import AdvancedDashboard from './components/AdvancedDashboard'
import BusinessIntelligenceDashboard from './components/BusinessIntelligenceDashboard'
import InventoryManagement from './components/InventoryManagement'
import OrdersManagement from './components/OrdersManagement'
import ProductionManagement from './components/ProductionManagement'
import CRMManagement from './components/CRMManagement'
import FinancialReports from './components/FinancialReports'
import HRManagement from './components/HRManagement'
import AssetManagement from './components/AssetManagement'
import QualityControl from './components/QualityControl'
import ComplianceManagement from './components/ComplianceManagement'
import SystemAdmin from './components/SystemAdmin'
import PitchDeck from './components/PitchDeck'

interface SidebarItem {
  id: string
  name: string
  icon: React.ComponentType<any>
  category: string
}

const sidebarItems: SidebarItem[] = [
  { id: 'home', name: 'Home', icon: HomeIcon, category: 'Main' },
  { id: 'pitch-deck', name: 'Pitch Deck', icon: Presentation, category: 'Main' },
  { id: 'dashboard', name: 'Analytics Dashboard', icon: BarChart3, category: 'Core Operations' },
  { id: 'business-intelligence', name: 'Business Intelligence', icon: Brain, category: 'Core Operations' },
  { id: 'inventory', name: 'Inventory Management', icon: Package, category: 'Core Operations' },
  { id: 'orders', name: 'Orders Management', icon: ShoppingCart, category: 'Core Operations' },
  { id: 'production', name: 'Production Management', icon: Factory, category: 'Core Operations' },
  { id: 'crm', name: 'CRM Management', icon: Users, category: 'Business Intelligence' },
  { id: 'financial', name: 'Financial Reports', icon: TrendingUp, category: 'Business Intelligence' },
  { id: 'hr', name: 'HR Management', icon: UserCheck, category: 'Business Intelligence' },
  { id: 'assets', name: 'Asset Management', icon: Award, category: 'Business Intelligence' },
  { id: 'quality', name: 'Quality Control', icon: Beaker, category: 'Core Operations' },
  { id: 'compliance', name: 'Compliance Management', icon: Shield, category: 'Business Intelligence' },
  { id: 'admin', name: 'System Admin', icon: Settings, category: 'System' },
]

function App() {
  const [sidebarState, setSidebarState] = useState<'expanded' | 'collapsed' | 'closed'>('expanded')
  const [currentModule, setCurrentModule] = useState('home')

  const handleModuleChange = (moduleId: string) => {
    setCurrentModule(moduleId)
    if (sidebarState === 'closed') {
      setSidebarState('collapsed')
    }
  }

  const toggleSidebar = () => {
    if (sidebarState === 'closed') {
      setSidebarState('collapsed')
    } else if (sidebarState === 'collapsed') {
      setSidebarState('expanded')
    } else {
      setSidebarState('collapsed')
    }
  }

  const closeSidebar = () => {
    setSidebarState('closed')
  }

  const getSidebarWidth = () => {
    switch (sidebarState) {
      case 'expanded': return 280
      case 'collapsed': return 80
      case 'closed': return 0
      default: return 280
    }
  }

  const renderComponent = (componentName: string) => {
    switch (componentName) {
      case 'home':
        return <Home onModuleChange={handleModuleChange} />
      case 'pitch-deck':
        return <PitchDeck />
      case 'dashboard':
        return <AdvancedDashboard />
      case 'business-intelligence':
        return <BusinessIntelligenceDashboard />
      case 'inventory':
        return <InventoryManagement />
      case 'orders':
        return <OrdersManagement />
      case 'production':
        return <ProductionManagement />
      case 'crm':
        return <CRMManagement />
      case 'financial':
        return <FinancialReports />
      case 'hr':
        return <HRManagement />
      case 'assets':
        return <AssetManagement />
      case 'quality':
        return <QualityControl />
      case 'compliance':
        return <ComplianceManagement />
      case 'admin':
        return <SystemAdmin />
      default:
        return <Home onModuleChange={handleModuleChange} />
    }
  }

  return (
    <div className="cosmic-app">
      {/* Cosmic Background Elements */}
      <div className="cosmic-background"></div>
      <div className="cosmic-stars"></div>
      <div className="cosmic-nebula"></div>
      <div className="cosmic-aurora"></div>
      
      {/* Header */}
      <header className="cosmic-header">
        <div className="cosmic-header-left">
          <button
            onClick={toggleSidebar}
            className="cosmic-sidebar-toggle"
            title="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>
          
          <div className="cosmic-company-header">
            <div className="cosmic-company-text">
              <h1>Azure Tobacco Industrial FZCO</h1>
              <p>Enterprise Resource Planning System</p>
            </div>
          </div>
        </div>

        <div className="cosmic-header-center">
          <div className="cosmic-search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search modules, reports, or data..."
              className="cosmic-search-input"
            />
          </div>
        </div>

        <div className="cosmic-header-right">
          <div className="cosmic-time-widget">
            <Clock size={16} />
            <div className="cosmic-time-display">
              <div className="cosmic-time">
                {new Date().toLocaleTimeString()}
              </div>
              <div className="cosmic-date">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="cosmic-temperature-widget">
            <Thermometer size={16} />
            <div>
              <span className="temperature-value">24°C</span>
              <div className="temperature-label">Dubai</div>
            </div>
          </div>

          <button className="cosmic-ai-assistant-btn" title="AI Assistant">
            <Bot size={18} />
            <div className="ai-pulse"></div>
          </button>

          <button className="cosmic-header-btn" title="Notifications">
            <Bell size={18} />
            <div className="cosmic-notification-badge">3</div>
          </button>

          <button className="cosmic-header-btn" title="Settings">
            <Settings size={18} />
          </button>

          <button className="cosmic-user-menu" title="User Menu">
            <div className="cosmic-user-avatar-header">
              <User size={16} />
            </div>
            <div className="cosmic-user-info-header">
              <div className="cosmic-user-name-header">Admin User</div>
              <div className="cosmic-user-role-header">System Admin</div>
            </div>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <motion.aside
        className={`cosmic-sidebar ${sidebarState === 'closed' ? 'closed' : sidebarState === 'collapsed' ? 'collapsed' : ''}`}
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Sidebar Header */}
        <div className="cosmic-sidebar-header">
          <div className="cosmic-company-sidebar">
            <div className="cosmic-company-text-sidebar">
              <h2>Azure Tobacco</h2>
              <p>Industrial FZCO</p>
              <span className="cosmic-company-subtitle">ERP System</span>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="cosmic-nav">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                onClick={() => handleModuleChange(item.id)}
                className={`cosmic-nav-item ${currentModule === item.id ? 'active' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title={sidebarState === 'collapsed' ? item.name : undefined}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarState === 'expanded' && (
                  <>
                    <span className="font-medium">{item.name}</span>
                    {currentModule === item.id && <div className="cosmic-nav-indicator"></div>}
                    <div className="cosmic-nav-glow"></div>
                  </>
                )}
              </motion.button>
            )
          })}
        </nav>
        
        {/* Sidebar Footer */}
        {sidebarState === 'expanded' && (
          <div className="cosmic-sidebar-footer">
            <div className="cosmic-system-status">
              <div className="status-indicator"></div>
              <span>System Online</span>
            </div>
            <div className="cosmic-user-info">
              <div className="cosmic-user-avatar">
                <User size={16} />
              </div>
              <div className="cosmic-user-details">
                <div className="cosmic-user-name">Admin User</div>
                <div className="cosmic-user-role">System Administrator</div>
              </div>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main Content - Auto-adjusting layout */}
      <main 
        className={`cosmic-main ${sidebarState === 'closed' ? 'sidebar-closed' : ''}`}
        style={{
          marginLeft: sidebarState === 'closed' ? '0px' : `${getSidebarWidth()}px`,
          width: sidebarState === 'closed' ? '100%' : `calc(100% - ${getSidebarWidth()}px)`
        }}
      >
        <div className="cosmic-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderComponent(currentModule)}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarState !== 'closed' && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSidebar}
        />
      )}
    </div>
  )
}

export default App
