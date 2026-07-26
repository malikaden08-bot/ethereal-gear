import React from 'react';
import { Clock, User, Calendar } from 'lucide-react';
import { GlassModal, GlassBadge } from './ui';
import type { BlogPost } from '../types/database.types';

export interface BlogDetailModalProps {
  blog: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ blog, isOpen, onClose }) => {
  if (!blog) return null;

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={blog.title}
      subtitle={`Category: ${blog.category} • ${blog.readTimeMinutes} min read`}
      maxWidth="2xl"
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
        {/* Cover Image */}
        <div className="relative rounded-2xl overflow-hidden border border-white/20 h-64">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <GlassBadge variant="violet" pulse>{blog.category}</GlassBadge>
            <GlassBadge variant="obsidian" className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{blog.readTimeMinutes} min read</span>
            </GlassBadge>
          </div>
        </div>

        {/* Metadata Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            <span>By {blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{blog.publishedAt}</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="glass-card-obsidian p-6 rounded-2xl border border-white/10 space-y-4 font-body text-sm text-slate-200 leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>
      </div>
    </GlassModal>
  );
};
