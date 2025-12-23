import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, BarChart3, Package, Users, FileText, TrendingUp, ShoppingCart, 
  Truck, Shield, Factory, UserCheck, Building, Warehouse, Brain, 
  Zap, Globe, X, Menu, HardDrive, Award
} from 'lucide-react'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  sidebarItems: any[]
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose, sidebarItems }) => {
  const location = useLocation()
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const renderSidebarItem = (item: any) => {
    const isActive = location.pathname === item.path
    const hasSubmenu = item.submenu && item.submenu.length > 0
    
    if (hasSubmenu) {
      return (
        <div key={item.path} style={{ marginBottom: '8px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {React.createElement(item.icon, { size: 16, style: { marginRight: '8px' } })}
            {item.label}
          </div>
          {item.submenu.map((subItem: any) => (
            <Link
              key={subItem.path}
              to={subItem.path}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px 12px 40px',
                color: location.pathname === subItem.path ? 'var(--azure-primary)' : 'var(--text-primary)',
                textDecoration: 'none',
                borderRadius: '8px',
                margin: '0 8px',
                background: location.pathname === subItem.path ? 'rgba(77, 208, 225, 0.1)' : 'transparent',
                transition: 'all 0.2s ease',
                minHeight: '44px'
              }}
            >
              {React.createElement(subItem.icon, { size: 18, style: { marginRight: '12px' } })}
              {subItem.label}
            </Link>
          ))}
        </div>
      )
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={onClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          color: isActive ? 'var(--azure-primary)' : 'var(--text-primary)',
          textDecoration: 'none',
          borderRadius: '8px',
          margin: '0 8px 8px 8px',
          background: isActive ? 'rgba(77, 208, 225, 0.1)' : 'transparent',
          transition: 'all 0.2s ease',
          minHeight: '44px'
        }}
      >
        {React.createElement(item.icon, { size: 18, style: { marginRight: '12px' } })}
        {item.label}
      </Link>
    )
  }

  // Handle swipe to close
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    
    if (isLeftSwipe) {
      onClose()
    }
  }

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 998,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s ease'
        }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '280px',
          background: 'var(--sidebar-bg)',
          borderRight: '1px solid var(--border-color)',
          zIndex: 999,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <h2 style={{ color: 'var(--azure-primary)', margin: 0, fontSize: '1.5rem' }}>
            Azure Tobacco Industrial FZCO
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '20px 0' }}>
          {sidebarItems.map(renderSidebarItem)}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid var(--border-color)',
          background: 'rgba(77, 208, 225, 0.05)'
        }}>
          <div style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '12px',
            textAlign: 'center'
          }}>
            Azure Tobacco Industrial FZCO ERP
            <br />
            Version 1.0.0
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileSidebar 