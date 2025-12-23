import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            margin: '1rem',
          }}>
            <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>
              🚨 Something went wrong
            </h2>
            <p style={{ color: '#7f1d1d', marginBottom: '1rem' }}>
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              style={{
                padding: '0.5rem 1rem',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                <summary style={{ cursor: 'pointer', color: '#7f1d1d' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{
                  background: '#fef2f2',
                  padding: '1rem',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.8rem',
                  color: '#7f1d1d',
                }}>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 