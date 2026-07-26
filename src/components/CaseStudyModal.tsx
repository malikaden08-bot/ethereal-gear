import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GlassModal, GlassButton, GlassBadge } from './ui';
import type { PortfolioProject } from '../types/database.types';

export interface CaseStudyModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenContact,
}) => {
  if (!project) return null;

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      subtitle={`Client: ${project.client} • Category: ${project.category}`}
      maxWidth="2xl"
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
        {/* Cover Image */}
        <div className="relative rounded-2xl overflow-hidden border border-white/20 h-64">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4">
            <GlassBadge variant="violet" pulse>{project.category}</GlassBadge>
          </div>
        </div>

        {/* Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="glass-card-subtle p-4 rounded-2xl text-center border border-white/10">
                <p className="text-2xl font-bold text-purple-400 font-heading">{m.value}</p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Executive Summary</h4>
          <p className="text-sm text-slate-200 leading-relaxed font-body">
            {project.summary}
          </p>
        </div>

        {/* Content Body */}
        {project.content && (
          <div className="glass-card-obsidian p-6 rounded-2xl border border-white/10 space-y-3 font-body text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {project.content}
          </div>
        )}

        {/* Live URL Link & Contact Trigger */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white transition-colors"
            >
              <span>Visit Live Showcase</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="text-xs text-slate-400">Internal Enterprise Project</span>
          )}

          <GlassButton
            variant="primary"
            size="md"
            onClick={() => {
              onClose();
              onOpenContact();
            }}
          >
            Build Similar Solution
          </GlassButton>
        </div>
      </div>
    </GlassModal>
  );
};
