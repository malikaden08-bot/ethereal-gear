import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { GlassCard, GlassButton, GlassBadge } from './ui';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const { setCurrentRoute } = useApp();

  const values = [
    {
      icon: Sparkles,
      title: "Liquid Glass Design Precision",
      description: "We craft every surface with Apple iOS 26 Liquid Glass aesthetic standards—multi-layered blur optical depth, specular lens reflections, and zero compromise.",
    },
    {
      icon: Zap,
      title: "60 FPS Performance Guarantee",
      description: "WebGL 3D canvas rendering optimized for mobile and desktop GPUs with dynamic pixel scaling and zero layout shifts.",
    },
    {
      icon: TrendingUp,
      title: "Measurable Revenue & ROI",
      description: "We don't just build pretty sites. Our clients see an average of +340% organic keyword growth and +280% demo conversion lift.",
    },
    {
      icon: ShieldCheck,
      title: "Zero Code Bottlenecks",
      description: "Marketing teams manage 100% of landing page elements, case studies, pricing tiers, and SEO tags via our protected Admin Suite.",
    },
  ];

  const milestones = [
    { year: "2024", title: "Agency Inception", desc: "Founded with the mission to pioneer real-time WebGL liquid glass interfaces." },
    { year: "2025", title: "Series B Platform Scaling", desc: "Engineered $4.2M pipeline showcases for Spatial AI enterprise clients." },
    { year: "2026", title: "Apple iOS 26 Architecture", desc: "Launched full Supabase BaaS + RLS Liquid Glass SaaS platform engine." },
  ];

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-20">
      
      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <GlassBadge variant="violet" pulse className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
          About Ethereal Gear
        </GlassBadge>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-heading leading-tight">
          Pioneering the Next Era of <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-blue-400 bg-clip-text text-transparent">Immersive Web Engineering</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 font-body leading-relaxed">
          Ethereal Gear is an elite digital engineering studio and SaaS architecture firm. We blend high-end luxury aesthetics, real-time 3D WebGL physics, and high-performance backend automation to build category-defining web applications.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <GlassButton variant="primary" size="lg" onClick={onOpenContact} rightIcon={<ArrowRight className="w-5 h-5" />}>
            Work With Us
          </GlassButton>
          <GlassButton variant="secondary" size="lg" onClick={() => setCurrentRoute('portfolio')}>
            Explore Portfolio
          </GlassButton>
        </div>
      </section>

      {/* Values Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {values.map((v, idx) => {
          const Icon = v.icon;
          return (
            <GlassCard key={idx} variant="obsidian" glow="purple" className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">{v.title}</h3>
              <p className="text-sm text-slate-300 font-body leading-relaxed">{v.description}</p>
            </GlassCard>
          );
        })}
      </section>

      {/* Timeline Section */}
      <section className="space-y-8 glass-card-obsidian p-8 sm:p-12 rounded-3xl border border-white/15">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">Engineering Milestone Arc</h2>
          <p className="text-sm text-slate-400 font-body">Our journey building high-scale digital platforms.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="glass-card-subtle p-6 rounded-2xl border border-white/10 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{m.year}</span>
              <h4 className="text-lg font-bold text-white font-heading">{m.title}</h4>
              <p className="text-xs text-slate-300 font-body leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
