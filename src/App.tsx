import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, Package, ShoppingCart, Factory, Users, 
  FileText, Shield, TrendingUp, UserCheck, Warehouse,
  Truck, Award, Activity, Brain, Clock, Building, Zap, Leaf, Thermometer, Beaker, Globe,
  Menu, X, Home as HomeIcon, Settings, LogOut, User, Bell, ChevronLeft, ChevronRight, Presentation,
  Sun, Moon
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
import PitchDeck from './components/SimplePitchDeck'

interface SidebarItem {
  id: string
  name: string
  icon: React.ComponentType<any>
  category: string
}

// Salesforce-style organization
const sidebarItems: SidebarItem[] = [
  // Home & Overview (Similar to Salesforce Home)
  { id: 'home', name: 'Home', icon: HomeIcon, category: 'Home' },
  
  // Sales Cloud (Salesforce CRM equivalent)
  { id: 'crm', name: 'Sales Cloud', icon: Users, category: 'Sales Cloud' },
  { id: 'orders', name: 'Opportunities', icon: ShoppingCart, category: 'Sales Cloud' },
  { id: 'pitch-deck', name: 'Presentations', icon: Presentation, category: 'Sales Cloud' },
  
  // Service Cloud (Customer Service)
  { id: 'quality', name: 'Service Cases', icon: Beaker, category: 'Service Cloud' },
  { id: 'compliance', name: 'Service Contracts', icon: Shield, category: 'Service Cloud' },
  
  // Commerce Cloud (Products & Orders)
  { id: 'inventory', name: 'Products', icon: Package, category: 'Commerce Cloud' },
  { id: 'production', name: 'Manufacturing', icon: Factory, category: 'Commerce Cloud' },
  { id: 'assets', name: 'Assets', icon: Award, category: 'Commerce Cloud' },
  
  // Analytics Cloud (Reports & Dashboards)
  { id: 'dashboard', name: 'Dashboards', icon: BarChart3, category: 'Analytics Cloud' },
  { id: 'business-intelligence', name: 'Reports', icon: Brain, category: 'Analytics Cloud' },
  { id: 'financial', name: 'Financial Reports', icon: TrendingUp, category: 'Analytics Cloud' },
  
  // Platform & Admin (Salesforce Setup equivalent)
  { id: 'hr', name: 'Human Resources', icon: UserCheck, category: 'Platform' },
  { id: 'admin', name: 'Setup', icon: Settings, category: 'Platform' },
]

function App() {
  const [sidebarState, setSidebarState] = useState<'expanded' | 'collapsed' | 'closed'>('expanded')
  const [currentModule, setCurrentModule] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : false
  })
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [notificationPosition, setNotificationPosition] = useState({ top: 90, right: 200 })
  const [userMenuPosition, setUserMenuPosition] = useState({ top: 90, right: 20 })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.notifications-dropdown') && !target.closest('.cosmic-header-btn[data-notifications]')) {
        setShowNotifications(false)
      }
      if (!target.closest('.user-dropdown') && !target.closest('.cosmic-user-menu')) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const updateNotificationPosition = () => {
    const btn = document.querySelector('.cosmic-header-btn[data-notifications]')
    if (btn) {
      const rect = btn.getBoundingClientRect()
      setNotificationPosition({
        top: rect.bottom + 10,
        right: window.innerWidth - rect.right
      })
    }
  }

  const updateUserMenuPosition = () => {
    const btn = document.querySelector('.cosmic-user-menu')
    if (btn) {
      const rect = btn.getBoundingClientRect()
      setUserMenuPosition({
        top: rect.bottom + 10,
        right: window.innerWidth - rect.right
      })
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleNotifications = () => {
    if (!showNotifications) {
      updateNotificationPosition()
    }
    setShowNotifications(!showNotifications)
    setShowUserMenu(false)
  }

  const toggleUserMenu = () => {
    if (!showUserMenu) {
      updateUserMenuPosition()
    }
    setShowUserMenu(!showUserMenu)
    setShowNotifications(false)
  }

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

      
      {/* Header */}
      <header className="cosmic-header">
        <div className="cosmic-header-left">
          <button
            onClick={toggleSidebar}
            className="cosmic-sidebar-toggle"
          >
            <Menu size={20} />
          </button>
          <div className="cosmic-company-header">
            <div className="cosmic-company-text">
              <h1>Salesforce-Style ERP</h1>
              <p>Azure Tobacco Industrial FZCO</p>
            </div>
          </div>
        </div>
        
        <div className="cosmic-header-center">
          <div className="cosmic-search-bar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search modules, reports, data..."
              className="cosmic-search-input"
            />
          </div>
        </div>
        
        <div className="cosmic-header-right">
          <div className="cosmic-time-widget">
            <Clock size={16} />
            <div className="cosmic-time-display">
              <div className="cosmic-time">14:30</div>
              <div className="cosmic-date">Dec 15</div>
            </div>
          </div>
          
          <div className="cosmic-temperature-widget">
            <Thermometer size={16} />
            <div>
              <span className="temperature-value">24°C</span>
              <div className="temperature-label">Dubai</div>
            </div>
          </div>
          
          <div style={{ position: 'relative' }}>
            <button 
              className="cosmic-header-btn"
              onClick={toggleNotifications}
              data-notifications
              title="Notifications"
            >
              <Bell size={20} />
              <div className="cosmic-notification-badge">3</div>
            </button>
            
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="notifications-dropdown"
                style={{
                  top: `${notificationPosition.top}px`,
                  right: `${notificationPosition.right}px`
                }}
              >
                <div className="dropdown-header">
                  <h4>Notifications</h4>
                  <div className="notification-count">3</div>
                </div>
                <div className="dropdown-content">
                  <div className="notification-item unread">
                    <div className="notification-icon">
                      <Bell size={16} />
                    </div>
                    <div className="notification-content">
                      <h5>New Order Received</h5>
                      <p>Order #12345 has been placed by Customer ABC</p>
                      <div className="notification-time">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="notification-item unread">
                    <div className="notification-icon">
                      <Bell size={16} />
                    </div>
                    <div className="notification-content">
                      <h5>Inventory Alert</h5>
                      <p>Product XYZ is running low on stock</p>
                      <div className="notification-time">1 hour ago</div>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-icon">
                      <Bell size={16} />
                    </div>
                    <div className="notification-content">
                      <h5>System Update</h5>
                      <p>System maintenance scheduled for tonight</p>
                      <div className="notification-time">3 hours ago</div>
                    </div>
                  </div>
                </div>
                <div className="dropdown-footer">
                  <button className="view-all-btn">View All Notifications</button>
                </div>
              </motion.div>
            )}
          </div>
          
          <button 
            className="cosmic-header-btn"
            onClick={toggleTheme}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{ marginRight: '0.5rem' }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div style={{ position: 'relative' }}>
            <button 
              className="cosmic-user-menu"
              onClick={toggleUserMenu}
              title="User Menu"
            >
              <div className="cosmic-user-avatar-header">
                <User size={16} />
              </div>
              <div className="cosmic-user-info-header">
                <div className="cosmic-user-name-header">Admin User</div>
                <div className="cosmic-user-role-header">System Admin</div>
              </div>
            </button>
            
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="user-dropdown"
                style={{
                  top: `${userMenuPosition.top}px`,
                  right: `${userMenuPosition.right}px`
                }}
              >
                <div className="user-profile-header">
                  <div className="user-avatar-large">
                    <User size={24} />
                  </div>
                  <div className="user-details">
                    <h4>Admin User</h4>
                    <p>admin@azuretobacco.com</p>
                  </div>
                </div>
                <div className="dropdown-content">
                  <div className="user-menu-item">
                    <User size={16} />
                    <span>My Profile</span>
                  </div>
                  <div className="user-menu-item">
                    <Settings size={16} />
                    <span>Settings</span>
                  </div>
                  <div className="user-menu-item logout-item">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      <div className="cosmic-main">
        {/* Sidebar */}
        <motion.aside
          className={`cosmic-sidebar ${sidebarState}`}
          animate={{
            transform: sidebarState === 'closed' ? 'translateX(-100%)' : 'translateX(0)',
            width: `${getSidebarWidth()}px`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {/* Sidebar Header */}
          <div className="cosmic-sidebar-header">
            {sidebarState === 'expanded' ? (
              <div className="cosmic-company-sidebar">
                <div className="cosmic-company-text-sidebar">
                  <h2>ERP Platform</h2>
                  <p>Salesforce-Style Organization</p>
                  <div className="cosmic-company-subtitle">v2.0 - Salesforce Structure</div>
                </div>
              </div>
            ) : (
              <div className="cosmic-company-sidebar-collapsed">
                <div className="cosmic-company-icon">☁️</div>
              </div>
            )}
            
            {/* Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="cosmic-sidebar-toggle-btn"
            >
              {sidebarState === 'expanded' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
          
          {/* Navigation - Grouped by Category (Salesforce-style) */}
          <nav className="cosmic-nav">
            {(() => {
              // Group items by category
              const groupedItems: {[key: string]: SidebarItem[]} = {}
              sidebarItems.forEach(item => {
                if (!groupedItems[item.category]) {
                  groupedItems[item.category] = []
                }
                groupedItems[item.category].push(item)
              })

              return Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} style={{ marginBottom: sidebarState === 'expanded' ? '1.5rem' : '1rem' }}>
                  {sidebarState === 'expanded' && (
                    <div style={{ 
                      padding: '0.5rem 1rem', 
                      fontSize: '0.75rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '1px',
                      color: 'rgba(0, 212, 255, 0.6)',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      {category}
                    </div>
                  )}
                  {items.map((item) => {
                    const Icon = item.icon
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleModuleChange(item.id)}
                        className={`cosmic-nav-item ${currentModule === item.id ? 'active' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        title={sidebarState === 'collapsed' ? item.name : undefined}
                        style={{ marginBottom: '0.25rem' }}
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
                </div>
              ))
            })()}
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
        <motion.main 
          className="cosmic-content"
          animate={{
            marginLeft: `${getSidebarWidth()}px`,
            width: `calc(100% - ${getSidebarWidth()}px)`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
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
        </motion.main>
      </div>

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
