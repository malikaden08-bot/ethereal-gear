import React from 'react';

export interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'violet' | 'emerald' | 'amber' | 'obsidian' | 'light';
  pulse?: boolean;
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({
  children,
  variant = 'violet',
  pulse = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide rounded-full border backdrop-blur-md transition-all duration-300';

  const variantStyles = {
    violet: 'bg-purple-950/40 text-purple-200 border-purple-500/30 shadow-[0_2px_10px_rgba(168,85,247,0.2)]',
    emerald: 'bg-emerald-950/40 text-emerald-200 border-emerald-500/30 shadow-[0_2px_10px_rgba(16,185,129,0.2)]',
    amber: 'bg-amber-950/40 text-amber-200 border-amber-500/30 shadow-[0_2px_10px_rgba(245,158,11,0.2)]',
    obsidian: 'bg-slate-900/80 text-slate-300 border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.4)]',
    light: 'bg-white/15 text-white border-white/25 shadow-[0_2px_10px_rgba(255,255,255,0.1)]',
  };

  const pulseColors = {
    violet: 'bg-purple-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    obsidian: 'bg-slate-400',
    light: 'bg-white',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseColors[variant]}`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseColors[variant]}`} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
