import React from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'obsidian' | 'light' | 'subtle' | 'prominent';
  glow?: 'purple' | 'blue' | 'none';
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'obsidian',
  glow = 'none',
  hoverEffect = true,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative rounded-3xl transition-all duration-500 ease-out border overflow-hidden backdrop-blur-2xl';

  const variantStyles = {
    obsidian: 'glass-card-obsidian text-slate-100',
    light: 'glass-card-light text-slate-900',
    subtle: 'glass-card-subtle text-slate-200',
    prominent:
      'bg-gradient-to-b from-white/12 to-white/04 border-white/20 text-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
  };

  const glowStyles = {
    purple: 'glass-glow-purple',
    blue: 'glass-glow-blue',
    none: '',
  };

  const hoverStyles = hoverEffect
    ? 'hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-15px_rgba(124,58,237,0.3)] hover:border-white/30'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${glowStyles[glow]} ${hoverStyles} ${className}`}
      {...props}
    >
      {/* Specular top border reflection highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
