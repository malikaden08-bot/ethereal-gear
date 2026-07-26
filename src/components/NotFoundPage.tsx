import React from 'react';
import { Home, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard, GlassButton, GlassBadge } from './ui';

export const NotFoundPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <GlassCard variant="obsidian" glow="purple" className="p-8 sm:p-14 max-w-xl w-full space-y-6">
        <GlassBadge variant="violet" pulse className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
          404 Error • Liquid Void
        </GlassBadge>

        <div className="space-y-2">
          <h1 className="text-7xl sm:text-9xl font-extrabold text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-blue-400 bg-clip-text font-heading">
            404
          </h1>
          <h2 className="text-2xl font-bold text-white font-heading">Page Transcended Reality</h2>
          <p className="text-sm text-slate-300 font-body leading-relaxed max-w-md mx-auto">
            The page or route you are attempting to access does not exist or has moved into another spatial dimension.
          </p>
        </div>

        <div className="pt-4 flex justify-center">
          <GlassButton
            variant="primary"
            size="lg"
            onClick={() => setCurrentRoute('home')}
            leftIcon={<Home className="w-5 h-5" />}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Return to Homepage
          </GlassButton>
        </div>
      </GlassCard>
    </div>
  );
};
