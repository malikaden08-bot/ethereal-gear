import React from 'react';
import { Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const IPhoneShowcase: React.FC = () => {
  const { settings } = useApp();

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Text Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile First Glass Physics</span>
          </div>

          <h2 className="font-geometric text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            iPhone Glass Optics & Ultra-Fast Mobile UX
          </h2>

          <p className="font-body text-slate-300 text-base leading-relaxed">
            Every digital campaign and WebGL interface engineered by {settings.agencyName} is optimized to render fluid 60fps glass refraction physics directly on modern mobile browsers.
          </p>

          <ul className="space-y-3 pt-2">
            <li className="flex items-center gap-3 text-sm text-slate-200">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span>Hardware-accelerated liquid glass shaders</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-200">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/40">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <span>Sub-second page loading speed globally</span>
            </li>
          </ul>
        </div>

        {/* Right iPhone Mockup Column */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-72 h-[560px] bg-[#0c0d14] rounded-[50px] border-[10px] border-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden lens-reflection">
            {/* Dynamic Notch / Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#131520] border border-white/20" />
            </div>

            {/* Screen View */}
            <div className="w-full h-full p-4 pt-12 space-y-4 bg-gradient-to-b from-purple-950/40 to-slate-950">
              <div className="glass-card-obsidian p-4 rounded-2xl border border-white/15 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/30 border border-purple-400/40" />
                <p className="text-xs font-bold text-white">Apple iOS 26 Optics</p>
                <p className="text-[10px] text-slate-400">Native 60 FPS spatial physics rendering engine.</p>
              </div>

              <div className="glass-card-subtle p-4 rounded-2xl border border-white/10 space-y-1">
                <p className="text-xs font-bold text-purple-300">+340% Organic Lift</p>
                <p className="text-[10px] text-slate-400">Search engine dominance cluster.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
