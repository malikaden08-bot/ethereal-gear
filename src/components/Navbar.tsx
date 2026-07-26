import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp, type AppRoute } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { GlassButton, GlassBadge } from './ui';
import { LoginPage } from './LoginPage';
import { ProfileModal } from './ProfileModal';

export interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { currentRoute, setCurrentRoute, settings, setIsAdminOpen } = useApp();
  const { user, isAuthenticated, userRole } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navLinks: { label: string; route: AppRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About', route: 'about' },
    { label: 'Services', route: 'services' },
    { label: 'Portfolio', route: 'portfolio' },
    { label: 'Pricing', route: 'pricing' },
    { label: 'Insights', route: 'blog' },
    { label: 'Careers', route: 'careers' },
    { label: 'FAQ', route: 'faq' },
  ];

  const handleNavigate = (route: AppRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-3 sm:px-6 rounded-full glass-nav-dark">
          
          {/* Logo Brand */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500 rounded-full"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-violet-500 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] border border-white/30 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-white block leading-none">
                {settings.agencyName}
              </span>
              <span className="text-[10px] text-purple-300 font-semibold uppercase tracking-widest block mt-0.5">
                Liquid Glass
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/05 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-xl">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavigate(link.route)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-purple-600/80 text-white shadow-[0_2px_12px_rgba(124,58,237,0.4)] border border-white/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Admin CMS Trigger */}
            <GlassButton
              variant="obsidian"
              size="sm"
              onClick={() => setIsAdminOpen(true)}
              leftIcon={<ShieldCheck className="w-4 h-4 text-purple-400" />}
              className="hidden sm:inline-flex text-xs font-bold"
            >
              CMS Admin
            </GlassButton>

            {/* User Auth Profile */}
            {isAuthenticated ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
                title="Account Settings"
              >
                <img
                  src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                  alt={user?.full_name}
                  className="w-7 h-7 rounded-full object-cover border border-purple-400"
                />
                <GlassBadge variant="violet" className="hidden sm:inline-flex text-[10px] px-2 py-0.5">
                  {userRole}
                </GlassBadge>
              </button>
            ) : (
              <GlassButton
                variant="secondary"
                size="sm"
                onClick={() => setIsLoginOpen(true)}
                className="text-xs font-bold"
              >
                Staff Login
              </GlassButton>
            )}

            {/* Proposal CTA */}
            <GlassButton
              variant="primary"
              size="sm"
              onClick={onOpenContact}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="hidden sm:inline-flex text-xs font-bold"
            >
              Get Started
            </GlassButton>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-white/10 text-white border border-white/20 cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-24 z-30 p-6 glass-card-obsidian rounded-3xl border border-white/20 shadow-2xl lg:hidden space-y-4"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.route}
                  onClick={() => handleNavigate(link.route)}
                  className={`p-3 text-left text-sm font-semibold rounded-2xl transition-all ${
                    currentRoute === link.route
                      ? 'bg-purple-600/80 text-white border border-white/20'
                      : 'bg-white/05 text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <GlassButton
                variant="obsidian"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                leftIcon={<ShieldCheck className="w-4 h-4 text-purple-400" />}
                className="w-full justify-center text-xs font-bold"
              >
                Launch CMS Admin Dashboard
              </GlassButton>

              <GlassButton
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full justify-center text-xs font-bold"
              >
                Request Enterprise Proposal
              </GlassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginPage isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};
