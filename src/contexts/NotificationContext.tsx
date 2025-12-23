import React, { createContext, useContext, useState, useEffect } from 'react'

interface NotificationContextType {
  notifications: Array<{id: string, message: string, type: 'info' | 'success' | 'warning' | 'error', timestamp: Date}>
  addNotification: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'info' | 'success' | 'warning' | 'error', timestamp: Date}>>([])

  const addNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error') => {
    const id = Math.random().toString(36).substr(2, 9)
    const notification = { id, message, type, timestamp: new Date() }
    setNotifications(prev => [...prev, notification])
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  // Demo notifications
  useEffect(() => {
    const demoMessages = [
      { message: 'New batch B007 started production', type: 'info' as const },
      { message: 'Quality check passed for Batch B003', type: 'success' as const },
      { message: 'Low stock alert: Virginia Tobacco', type: 'warning' as const },
      { message: 'Daily production target achieved', type: 'success' as const },
      { message: 'New order received from Global Distributors', type: 'info' as const }
    ]

    const interval = setInterval(() => {
      const randomMessage = demoMessages[Math.floor(Math.random() * demoMessages.length)]
      addNotification(randomMessage.message, randomMessage.type)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
} 