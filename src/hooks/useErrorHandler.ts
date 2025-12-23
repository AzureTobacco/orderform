import { useState, useCallback } from 'react';

interface UseErrorHandlerReturn {
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  handleError: (error: unknown) => void;
  isError: boolean;
}

export const useErrorHandler = (): UseErrorHandlerReturn => {
  const [error, setErrorState] = useState<string | null>(null);

  const setError = useCallback((error: string | null) => {
    setErrorState(error);
  }, []);

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      setErrorState(error.message);
    } else if (typeof error === 'string') {
      setErrorState(error);
    } else {
      setErrorState('An unexpected error occurred');
    }
    
    // Log error for debugging
    console.error('Error handled:', error);
  }, []);

  return {
    error,
    setError,
    clearError,
    handleError,
    isError: error !== null,
  };
};

// Hook for async operations with error handling
export const useAsyncError = () => {
  const { handleError } = useErrorHandler();

  const executeAsync = useCallback(
    async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
      try {
        return await asyncFn();
      } catch (error) {
        handleError(error);
        return null;
      }
    },
    [handleError]
  );

  return { executeAsync, handleError };
}; 