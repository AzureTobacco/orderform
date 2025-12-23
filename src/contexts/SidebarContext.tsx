import React, { createContext, useContext, useState, useCallback } from 'react'

interface SidebarContextType {
  isMinimized: boolean
  setMinimized: (minimized: boolean) => void
  toggleMinimized: () => void
  autoMinimize: () => void
  cancelAutoMinimize: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(false)
  let timeoutId: NodeJS.Timeout | null = null

  const setMinimized = useCallback((minimized: boolean) => {
    setIsMinimized(minimized)
  }, [])

  const toggleMinimized = useCallback(() => {
    setIsMinimized(prev => !prev)
  }, [])

  const autoMinimize = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      setIsMinimized(true)
    }, 5000) // 5 seconds delay
  }, [])

  const cancelAutoMinimize = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    timeoutId = setTimeout(() => {
      setIsMinimized(false)
    }, 500) // Small delay before expanding
  }, [])

  return (
    <SidebarContext.Provider value={{
      isMinimized,
      setMinimized,
      toggleMinimized,
      autoMinimize,
      cancelAutoMinimize
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
} 