import React, { useState } from 'react';
import { Briefcase, MapPin, ArrowRight, CheckCircle2, Send } from 'lucide-react';
import { useApp, type CareerItem } from '../context/AppContext';
import { GlassCard, GlassBadge, GlassButton, GlassModal, GlassInput } from './ui';

export const CareersPage: React.FC = () => {
  const { careers } = useApp();
  const [selectedRole, setSelectedRole] = useState<CareerItem | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedRole(null);
      setApplicantName('');
      setApplicantEmail('');
      setPortfolioUrl('');
    }, 2000);
  };

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <GlassBadge variant="violet" pulse className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
          Join Ethereal Gear Pods
        </GlassBadge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-heading tracking-tight leading-tight">
          Build the <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Future of Web</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-body">
          We are looking for elite 3D WebGL engineers, motion designers, and growth architects obsessed with quality.
        </p>
      </div>

      {/* Careers List */}
      <div className="space-y-6">
        {careers.map((role) => (
          <GlassCard key={role.id} variant="obsidian" hoverEffect className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white font-heading">{role.title}</h3>
                <GlassBadge variant="emerald">{role.type}</GlassBadge>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                  <span>{role.department}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>{role.location}</span>
                </span>
              </div>

              <p className="text-sm text-slate-300 font-body line-clamp-2">{role.description}</p>
            </div>

            <GlassButton variant="primary" size="md" onClick={() => setSelectedRole(role)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Apply Now
            </GlassButton>
          </GlassCard>
        ))}
      </div>

      {/* Application Modal */}
      {selectedRole && (
        <GlassModal isOpen={Boolean(selectedRole)} onClose={() => setSelectedRole(null)} title={`Apply: ${selectedRole.title}`} maxWidth="lg">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">Application Received</h3>
              <p className="text-xs text-slate-300">Our engineering leads will review your portfolio within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="space-y-4">
              <GlassInput label="Full Name" required value={applicantName} onChange={(e) => setApplicantName(e.target.value)} placeholder="Alexander Vance" />
              <GlassInput label="Email Address" type="email" required value={applicantEmail} onChange={(e) => setApplicantEmail(e.target.value)} placeholder="alexander@domain.com" />
              <GlassInput label="GitHub / Portfolio URL" type="url" required value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} placeholder="https://github.com/alexander" />
              
              <div className="pt-4 flex justify-end gap-3">
                <GlassButton variant="ghost" type="button" onClick={() => setSelectedRole(null)}>Cancel</GlassButton>
                <GlassButton variant="primary" type="submit" rightIcon={<Send className="w-4 h-4" />}>Submit Application</GlassButton>
              </div>
            </form>
          )}
        </GlassModal>
      )}

    </div>
  );
};
