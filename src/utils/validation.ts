// Import React for the hook
import React from 'react'

// Validation utility functions
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  min?: number
  max?: number
  custom?: (value: any) => string | null
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export const validateField = (value: any, rules: ValidationRule): ValidationResult => {
  const errors: string[] = []

  // Required validation
  if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    errors.push('This field is required')
  }

  // Skip other validations if field is empty and not required
  if (!value && !rules.required) {
    return { isValid: true, errors: [] }
  }

  // String validations
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`Minimum length is ${rules.minLength} characters`)
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`Maximum length is ${rules.maxLength} characters`)
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push('Invalid format')
    }
  }

  // Number validations
  if (typeof value === 'number') {
    if (rules.min !== undefined && value < rules.min) {
      errors.push(`Minimum value is ${rules.min}`)
    }
    if (rules.max !== undefined && value > rules.max) {
      errors.push(`Maximum value is ${rules.max}`)
    }
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value)
    if (customError) {
      errors.push(customError)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateForm = (data: Record<string, any>, rules: Record<string, ValidationRule>): ValidationResult => {
  const allErrors: string[] = []
  let isValid = true

  Object.keys(rules).forEach(field => {
    const fieldResult = validateField(data[field], rules[field])
    if (!fieldResult.isValid) {
      isValid = false
      allErrors.push(...fieldResult.errors.map(error => `${field}: ${error}`))
    }
  })

  return {
    isValid,
    errors: allErrors
  }
}

// Common validation patterns
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  currency: /^\d+(\.\d{1,2})?$/,
  percentage: /^(100|[1-9]?\d)(\.\d+)?$/
}

// Common validation rules
export const commonRules = {
  email: {
    required: true,
    pattern: patterns.email
  },
  phone: {
    required: true,
    pattern: patterns.phone
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  currency: {
    required: true,
    pattern: patterns.currency,
    min: 0
  },
  percentage: {
    required: true,
    pattern: patterns.percentage,
    min: 0,
    max: 100
  }
}

// Form field validation hook
export const useFormValidation = (initialData: Record<string, any>, rules: Record<string, ValidationRule>) => {
  const [data, setData] = React.useState(initialData)
  const [errors, setErrors] = React.useState<Record<string, string[]>>({})
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})

  const validateSingleField = (field: string, value: any): boolean => {
    if (rules[field]) {
      const result: ValidationResult = validateField(value, rules[field])
      setErrors(prev => ({
        ...prev,
        [field]: result.errors
      }))
      return result.isValid
    }
    return true
  }

  const handleChange = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }))
    if (touched[field]) {
      validateSingleField(field, value)
    }
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    validateSingleField(field, data[field])
  }

  const validateAll = () => {
    const result = validateForm(data, rules)
    const fieldErrors: Record<string, string[]> = {}
    
    Object.keys(rules).forEach(field => {
      const fieldResult = validateField(data[field], rules[field])
      fieldErrors[field] = fieldResult.errors
    })
    
    setErrors(fieldErrors)
    setTouched(Object.keys(rules).reduce((acc, field) => ({ ...acc, [field]: true }), {}))
    
    return result.isValid
  }

  const reset = () => {
    setData(initialData)
    setErrors({})
    setTouched({})
  }

  return {
    data,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.values(errors).every(fieldErrors => fieldErrors.length === 0)
  }
} 