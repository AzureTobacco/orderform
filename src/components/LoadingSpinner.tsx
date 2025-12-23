import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
  fullScreen?: boolean
  color?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text = 'Loading...', 
  fullScreen = false,
  color = 'var(--azure-primary)'
}) => {
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32
  }

  const containerStyle = fullScreen ? {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(13, 17, 23, 0.8)',
    backdropFilter: 'blur(4px)',
    zIndex: 9999
  } : {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  }

  return (
    <div style={containerStyle}>
      <Loader2 
        size={sizeMap[size]} 
        color={color}
        style={{
          animation: 'spin 1s linear infinite',
          marginBottom: text ? '12px' : '0'
        }}
      />
      {text && (
        <span style={{
          color: 'var(--text-secondary)',
          fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
          fontWeight: '500'
        }}>
          {text}
        </span>
      )}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

export default LoadingSpinner 