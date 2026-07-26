import React, { useState } from 'react';
import { useApp, type AppRoute } from '../context/AppContext';
import { GlassInput, GlassButton } from './ui';

export const Footer: React.FC = () => {
  const { settings, setCurrentRoute } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const navLinks: { label: string; route: AppRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About Us', route: 'about' },
    { label: 'Services', route: 'services' },
    { label: 'Portfolio', route: 'portfolio' },
    { label: 'Pricing Tiers', route: 'pricing' },
    { label: 'Insights & Blog', route: 'blog' },
    { label: 'Careers', route: 'careers' },
    { label: 'FAQ', route: 'faq' },
  ];

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#07080d] relative z-10 pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand & Status */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white font-heading">{settings.agencyName}</h3>
            <p className="text-xs text-slate-400 font-body leading-relaxed">{settings.tagline}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Navigation</h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((l) => (
                <li key={l.route}>
                  <button onClick={() => setCurrentRoute(l.route)} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Subscribe to Insights</h4>
            {subscribed ? (
              <p className="text-xs text-emerald-400 font-semibold">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <GlassInput placeholder="Enter work email..." value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} required />
                <GlassButton variant="primary" type="submit">Join</GlassButton>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/05 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {settings.agencyName}. All rights reserved.</p>
          <p>Engineered with Apple iOS 26 Liquid Glass Architecture.</p>
        </div>

      </div>
    </footer>
  );
};
