import React, { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'obsidian';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  magnetic?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  magnetic = true,
  className = '',
  disabled,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || disabled || isLoading) return;
    const { clientX, clientY } = e;
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (clientX - (rect.left + rect.width / 2)) * 0.25;
      const y = (clientY - (rect.top + rect.height / 2)) * 0.25;
      setPosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out lens-reflection rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs font-semibold tracking-wide gap-1.5',
    md: 'px-6 py-3 text-sm font-semibold tracking-wide gap-2',
    lg: 'px-8 py-4 text-base font-bold tracking-wide gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-blue-600/90 hover:from-violet-500 hover:via-purple-500 hover:to-blue-500 text-white shadow-[0_10px_30px_-5px_rgba(124,58,237,0.5)] border border-white/30 backdrop-blur-md',
    secondary:
      'bg-white/10 hover:bg-white/18 text-slate-100 border border-white/20 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:border-white/40',
    ghost:
      'bg-transparent hover:bg-white/10 text-slate-200 hover:text-white border border-transparent hover:border-white/10 backdrop-blur-sm',
    danger:
      'bg-gradient-to-r from-red-600/90 to-rose-600/90 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_10px_25px_-5px_rgba(225,29,72,0.4)] border border-white/20',
    obsidian:
      'bg-[#0d0e16]/80 hover:bg-[#131522] text-slate-200 hover:text-white border border-white/15 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)]',
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" aria-label="Loading..." />
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};
