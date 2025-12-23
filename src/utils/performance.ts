import React from 'react'

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()
  private memoryUsage: number[] = []

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Track component render time
  trackRender(componentName: string, renderTime: number): void {
    if (!this.metrics.has(componentName)) {
      this.metrics.set(componentName, [])
    }
    this.metrics.get(componentName)!.push(renderTime)
    
    // Keep only last 100 measurements
    const measurements = this.metrics.get(componentName)!
    if (measurements.length > 100) {
      measurements.shift()
    }
  }

  // Get average render time for a component
  getAverageRenderTime(componentName: string): number {
    const measurements = this.metrics.get(componentName)
    if (!measurements || measurements.length === 0) return 0
    
    const sum = measurements.reduce((acc, time) => acc + time, 0)
    return sum / measurements.length
  }

  // Track memory usage
  trackMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      this.memoryUsage.push(memory.usedJSHeapSize)
      
      // Keep only last 50 measurements
      if (this.memoryUsage.length > 50) {
        this.memoryUsage.shift()
      }
    }
  }

  // Get memory usage trend
  getMemoryTrend(): 'increasing' | 'decreasing' | 'stable' {
    if (this.memoryUsage.length < 10) return 'stable'
    
    const recent = this.memoryUsage.slice(-10)
    const older = this.memoryUsage.slice(-20, -10)
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length
    
    const diff = recentAvg - olderAvg
    const threshold = olderAvg * 0.1 // 10% threshold
    
    if (diff > threshold) return 'increasing'
    if (diff < -threshold) return 'decreasing'
    return 'stable'
  }

  // Get performance report
  getReport(): {
    componentMetrics: Record<string, { avgRenderTime: number; renderCount: number }>
    memoryTrend: string
    slowComponents: string[]
  } {
    const componentMetrics: Record<string, { avgRenderTime: number; renderCount: number }> = {}
    const slowComponents: string[] = []
    
    this.metrics.forEach((measurements, componentName) => {
      const avgRenderTime = this.getAverageRenderTime(componentName)
      componentMetrics[componentName] = {
        avgRenderTime,
        renderCount: measurements.length
      }
      
      // Flag components with render time > 16ms (60fps threshold)
      if (avgRenderTime > 16) {
        slowComponents.push(componentName)
      }
    })
    
    return {
      componentMetrics,
      memoryTrend: this.getMemoryTrend(),
      slowComponents
    }
  }

  // Clear all metrics
  clear(): void {
    this.metrics.clear()
    this.memoryUsage = []
  }
}

// React hook for performance tracking
export const usePerformanceTracking = (componentName: string) => {
  const monitor = PerformanceMonitor.getInstance()
  
  const trackRender = () => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      monitor.trackRender(componentName, endTime - startTime)
    }
  }
  
  return { trackRender }
}

// Debounce utility for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Lazy loading utility
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => {
  return React.lazy(importFunc)
}

// Memory cleanup utility
export const cleanupMemory = () => {
  // Force garbage collection if available (Chrome DevTools)
  if ('gc' in window && typeof (window as any).gc === 'function') {
    (window as any).gc()
  }
  
  // Clear performance entries
  if ('performance' in window && 'clearResourceTimings' in performance) {
    performance.clearResourceTimings()
  }
}

export default PerformanceMonitor 