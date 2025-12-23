import { useState, useEffect } from 'react'

export interface BreakpointConfig {
  mobile: number
  tablet: number
  desktop: number
  wide: number
}

const defaultBreakpoints: BreakpointConfig = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
  wide: 1920
}

export const useResponsive = (breakpoints: BreakpointConfig = defaultBreakpoints) => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenSize.width < breakpoints.mobile
  const isTablet = screenSize.width >= breakpoints.mobile && screenSize.width < breakpoints.tablet
  const isDesktop = screenSize.width >= breakpoints.tablet && screenSize.width < breakpoints.desktop
  const isWide = screenSize.width >= breakpoints.desktop

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    isSmallScreen: isMobile || isTablet,
    isLargeScreen: isDesktop || isWide
  }
}

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
} 