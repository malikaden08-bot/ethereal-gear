import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { trackLeadSubmission } from '../lib/analytics';
import { sendLeadNotificationEmail } from '../lib/email';
import { GlassModal, GlassInput, GlassButton } from './ui';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
  prefilledBudget?: string;
  onOpenCalendly?: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  prefilledService = '',
  prefilledBudget = '',
}) => {
  const { addLead, services } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceNeeded: prefilledService || (services[0]?.title || 'Performance SEO & Data Engines'),
    budget: prefilledBudget || '$10,000 - $25,000',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: prefilledService }));
    }
    if (prefilledBudget) {
      setFormData((prev) => ({ ...prev, budget: prefilledBudget }));
    }
  }, [prefilledService, prefilledBudget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addLead(formData);
      trackLeadSubmission(formData.serviceNeeded, formData.budget);
      await sendLeadNotificationEmail(formData);

      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="Request Enterprise Proposal" subtitle="We review incoming inquiries within 2 hours." maxWidth="lg">
      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white font-heading">Proposal Request Dispatched</h3>
          <p className="text-sm text-slate-300 font-body">Our team will reach out directly to {formData.email}.</p>
          <GlassButton variant="primary" onClick={onClose}>Close Window</GlassButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <GlassInput label="Full Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Alexander Vance" />
          <GlassInput label="Work Email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="alexander@company.com" />
          <GlassInput label="Company Name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Enterprise Inc." />
          
          <div className="space-y-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">Target Service</label>
            <select
              value={formData.serviceNeeded}
              onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
              className="w-full px-4 py-3 text-sm rounded-2xl glass-input-dark outline-none text-white font-body"
            >
              {services.map((s) => (
                <option key={s.id} value={s.title} className="bg-slate-900 text-white">{s.title}</option>
              ))}
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <GlassButton variant="ghost" type="button" onClick={onClose}>Cancel</GlassButton>
            <GlassButton variant="primary" type="submit" isLoading={isSubmitting} rightIcon={<Send className="w-4 h-4" />}>Send Inquiry</GlassButton>
          </div>
        </form>
      )}
    </GlassModal>
  );
};
