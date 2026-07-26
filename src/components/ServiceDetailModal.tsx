import React from 'react';
import { Sparkles, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { GlassModal, GlassButton, GlassBadge } from './ui';
import type { ServiceItem } from '../types/database.types';

export interface ServiceDetailModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onSelectService,
}) => {
  if (!service) return null;

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <span>{service.title}</span>
        </div>
      }
      subtitle={service.subtitle}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Badges Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <GlassBadge variant="violet" pulse>
            Growth Rate: {service.growthRate}
          </GlassBadge>
          <GlassBadge variant="emerald">{service.tag}</GlassBadge>
          {service.deliveryTime && (
            <GlassBadge variant="obsidian" className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{service.deliveryTime}</span>
            </GlassBadge>
          )}
        </div>

        {/* Description */}
        <div className="glass-card-subtle p-5 rounded-2xl border border-white/10 space-y-2">
          <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Service Overview</h4>
          <p className="text-sm text-slate-200 leading-relaxed font-body">
            {service.description}
          </p>
        </div>

        {/* Deliverables Checklist */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Included Deliverables & Architecture</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Custom Liquid Glass UI & Design Tokens",
              "React 19 + TypeScript Clean Code Base",
              "Supabase RLS Database Integration",
              "Lighthouse 95+ Performance Guarantee",
              "SEO Meta Schema & OpenGraph Tokens",
              "Admin Suite Content Controls",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Bar */}
        {service.priceStartingAt && (
          <div className="flex items-center justify-between p-4 glass-card-obsidian rounded-2xl border border-white/15">
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Starting Investment</p>
              <p className="text-2xl font-bold text-white font-heading">${service.priceStartingAt.toLocaleString()}</p>
            </div>
            <GlassButton
              variant="primary"
              size="md"
              onClick={() => {
                onClose();
                onSelectService(service.title);
              }}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Request Proposal
            </GlassButton>
          </div>
        )}
      </div>
    </GlassModal>
  );
};
