import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertTriangle, Info, Loader } from 'lucide-react';

// Modern Glass Card Component
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = true, 
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { 
        scale: 1.01, 
        y: -2,
        transition: { duration: 0.2 }
      } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      className={`glass-card ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
};

// Modern Button Component
interface ModernButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  onClick,
  className = ''
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center gap-2 font-semibold
    rounded-xl transition-all duration-300 overflow-hidden
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
      text-white shadow-lg hover:shadow-xl focus:ring-blue-500
    `,
    secondary: `
      bg-gray-700 hover:bg-gray-600 text-white
      border border-gray-600 hover:border-gray-500 focus:ring-gray-500
    `,
    ghost: `
      bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white
      border border-gray-600 hover:border-gray-500 focus:ring-gray-500
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700
      text-white shadow-lg hover:shadow-xl focus:ring-red-500
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      transition={{ duration: 0.2 }}
    >
      {loading && (
        <Loader className="w-4 h-4 animate-spin" />
      )}
      {!loading && icon && icon}
      {children}
    </motion.button>
  );
};

// Modern Modal Component
interface ModernModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ModernModal: React.FC<ModernModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className = ''
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full ${sizes[size]} ${className}`}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">{title}</h3>
                <button className="modal-close" onClick={onClose}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Floating Input Component
interface FloatingInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`floating-label ${className}`}>
      <motion.input
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="floating-input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        required={required}
        disabled={disabled}
      />
      <label className="floating-label-text">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
    </div>
  );
};

// Status Badge Component
interface StatusBadgeProps {
  children: ReactNode;
  variant: 'success' | 'warning' | 'error' | 'info' | 'pending';
  animate?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  variant,
  animate = true,
  className = ''
}) => {
  const variants = {
    success: 'status-success',
    warning: 'status-warning', 
    error: 'status-error',
    info: 'status-info',
    pending: 'status-pending'
  };

  return (
    <motion.span
      initial={animate ? { opacity: 0, scale: 0.8 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : false}
      className={`status-badge ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );
};

// Animated Counter Component
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1,
  className = ''
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(value * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span className={className}>{count.toLocaleString()}</span>;
};

// Loading Skeleton Component
interface LoadingSkeletonProps {
  height?: string;
  width?: string;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  height = '1rem',
  width = '100%',
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-gray-700 rounded-md animate-pulse ${className}`}
      style={{ height, width }}
    />
  );
};

// Staggered List Component
interface StaggeredListProps {
  children: ReactNode;
  className?: string;
}

export const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Page Transition Component
interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Default export for Fast Refresh compatibility
export default {
  GlassCard,
  ModernButton,
  ModernModal,
  FloatingInput,
  StatusBadge,
  AnimatedCounter,
  LoadingSkeleton,
  StaggeredList,
  PageTransition
}; 