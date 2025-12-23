import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, Home as HomeIcon, Presentation
} from 'lucide-react'

// Import only the components that exist
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
]

function SimpleApp() {
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
        return <HomeComponent />
      case 'pitch-deck':
        return <PitchDeck />
      default:
        return <HomeComponent />
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

        <div className="cosmic-header-right">
          <div className="cosmic-user-menu" title="User Menu">
            <div className="cosmic-user-avatar-header">
              <div className="cosmic-user-info-header">
                <div className="cosmic-user-name-header">Admin User</div>
                <div className="cosmic-user-role-header">System Admin</div>
              </div>
            </div>
          </div>
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
          </div>
        )}
      </motion.aside>

      {/* Main Content */}
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

// Simple Home Component
const HomeComponent: React.FC = () => (
  <div className="cosmic-card">
    <div className="cosmic-card-header">
      <h1>Welcome to Azure Tobacco Industrial FZCO</h1>
      <p>Enterprise Resource Planning System</p>
    </div>
    
    <div className="cosmic-card-content">
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2 style={{ color: '#00d4ff', marginBottom: '1rem' }}>Available Modules</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div className="cosmic-module-card">
            <Presentation size={48} style={{ color: '#00d4ff', marginBottom: '1rem' }} />
            <h3>Pitch Deck</h3>
            <p>Professional business presentation with PDF export functionality</p>
            <button 
              className="cosmic-btn"
              onClick={() => window.location.reload()}
              style={{ marginTop: '1rem' }}
            >
              Open Pitch Deck
            </button>
          </div>
          
          <div className="cosmic-module-card">
            <h3>ERP Modules</h3>
            <p>Additional modules coming soon...</p>
            <ul style={{ textAlign: 'left', marginTop: '1rem', color: 'rgba(255,255,255,0.7)' }}>
              <li>📊 Analytics Dashboard</li>
              <li>📦 Inventory Management</li>
              <li>🛒 Orders Management</li>
              <li>🏭 Production Management</li>
              <li>💰 Financial Reports</li>
              <li>👥 HR Management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default SimpleApp


