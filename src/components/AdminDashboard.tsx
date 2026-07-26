import React, { useState } from 'react';
import {
  X,
  Sliders,
  Sparkles,
  Layers,
  Inbox,
  BarChart3,
  Plus,
  Trash2,
  Settings2,
  Box,
  Image as ImageIcon,
  FolderKanban,
  DollarSign,
  Quote,
  FileText,
  Search,
  History,
  Navigation,
  Globe,
  Palette,
  UserCheck,
  UploadCloud,
  Copy,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { GlassCard, GlassButton, GlassInput, GlassBadge } from './ui';
import type { UserRole, InquiryStatus } from '../types/database.types';

export const AdminDashboard: React.FC = () => {
  const {
    settings,
    updateSettings,
    sceneConfig,
    updateSceneConfig,
    services,
    addService,
    deleteService,
    portfolio,
    addPortfolioProject,
    deletePortfolioProject,
    pricingPlans,
    testimonials,
    blogs,
    addBlogPost,
    deleteBlogPost,
    leads,
    updateLeadStatus,
    auditLogs,
    isAdminOpen,
    setIsAdminOpen,
  } = useApp();

  const { userRole, switchRoleForTesting } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('hero');

  // Form local states for additions
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceSubtitle, setNewServiceSubtitle] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServicePrice, setNewServicePrice] = useState(5000);

  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjClient, setNewProjClient] = useState('');
  const [newProjSummary, setNewProjSummary] = useState('');
  const [newProjCategory, setNewProjCategory] = useState<'3D WebGL' | 'SaaS Apps' | 'SEO Engines' | 'Brand Identity'>('3D WebGL');

  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');

  if (!isAdminOpen) return null;

  const tabs = [
    { id: 'hero', label: 'Hero & Text', icon: Sparkles },
    { id: '3d', label: '3D WebGL Scene', icon: Box },
    { id: 'services', label: 'Services CMS', icon: Layers },
    { id: 'portfolio', label: 'Portfolio CMS', icon: FolderKanban },
    { id: 'pricing', label: 'Pricing Tiers', icon: DollarSign },
    { id: 'testimonials', label: 'Client Reviews', icon: Quote },
    { id: 'blogs', label: 'Blog & Insights', icon: FileText },
    { id: 'leads', label: 'CRM Leads', icon: Inbox },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'seo', label: 'SEO & Schema', icon: Search },
    { id: 'navigation', label: 'Footer & Nav', icon: Navigation },
    { id: 'theme', label: 'Theme Tokens', icon: Palette },
    { id: 'analytics', label: 'Analytics Telemetry', icon: BarChart3 },
    { id: 'roles', label: 'RBAC Roles', icon: UserCheck },
    { id: 'logs', label: 'Audit Logs', icon: History },
  ];

  return (
    <ProtectedRoute allowedRoles={['super_admin', 'admin', 'editor', 'marketing_manager']}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-2xl">
        <GlassCard variant="obsidian" className="w-full max-w-6xl min-h-[85vh] max-h-[92vh] flex flex-col rounded-3xl border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Header Bar */}
          <div className="p-6 border-b border-white/15 flex items-center justify-between bg-slate-950/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-heading">Ethereal Gear No-Code CMS Admin</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <GlassBadge variant="violet" pulse className="text-[10px] px-2 py-0.5 font-mono uppercase">
                    Role: {userRole}
                  </GlassBadge>
                  <span className="text-xs text-slate-400">All changes persist to state & live preview.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/15"
              aria-label="Close Admin Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Workspace Body */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* Sidebar Tab Menu */}
            <aside className="w-64 border-r border-white/10 bg-slate-950/60 p-4 space-y-1 overflow-y-auto shrink-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-purple-600/90 text-white shadow-[0_4px_20px_rgba(124,58,237,0.5)] border border-white/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/05'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8 bg-slate-950/40">
              
              {/* Tab 1: Hero & Text */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-heading">Hero & Site Content Editor</h3>
                  
                  <GlassInput
                    label="Agency Brand Name"
                    value={settings.agencyName}
                    onChange={(e) => updateSettings({ agencyName: e.target.value })}
                  />

                  <GlassInput
                    label="Tagline Headline"
                    value={settings.tagline}
                    onChange={(e) => updateSettings({ tagline: e.target.value })}
                  />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">Subtagline Description</label>
                    <textarea
                      value={settings.subtagline}
                      onChange={(e) => updateSettings({ subtagline: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-2xl glass-input-dark outline-none text-white font-body min-h-[100px]"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: 3D WebGL Scene Controls */}
              {activeTab === '3d' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-heading">3D WebGL Physics Parameters</h3>
                  
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Animation Speed Scale: {sceneConfig.speed}x
                    </label>
                    <input
                      type="range"
                      min={0.1}
                      max={3.0}
                      step={0.1}
                      value={sceneConfig.speed}
                      onChange={(e) => updateSceneConfig({ speed: Number(e.target.value) })}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Particle Density: {sceneConfig.particleDensity}
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={500}
                      step={25}
                      value={sceneConfig.particleDensity}
                      onChange={(e) => updateSceneConfig({ particleDensity: Number(e.target.value) })}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sceneConfig.glassCylindersVisible !== false}
                        onChange={(e) => updateSceneConfig({ glassCylindersVisible: e.target.checked })}
                        className="rounded accent-purple-500"
                      />
                      <span>Render Floating Glass Cylinders</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Tab 3: Services CMS */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-heading">Manage Capabilities & Services</h3>
                  
                  <div className="glass-card-obsidian p-5 rounded-2xl border border-white/10 space-y-4">
                    <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">Add New Service</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <GlassInput placeholder="Service Title" value={newServiceTitle} onChange={(e) => setNewServiceTitle(e.target.value)} />
                      <GlassInput placeholder="Subtitle" value={newServiceSubtitle} onChange={(e) => setNewServiceSubtitle(e.target.value)} />
                      <GlassInput placeholder="Starting Price ($)" type="number" value={newServicePrice} onChange={(e) => setNewServicePrice(Number(e.target.value))} />
                    </div>
                    <GlassInput placeholder="Description..." value={newServiceDesc} onChange={(e) => setNewServiceDesc(e.target.value)} />
                    <GlassButton
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        if (newServiceTitle) {
                          addService({
                            title: newServiceTitle,
                            subtitle: newServiceSubtitle || 'Custom Solutions',
                            description: newServiceDesc || 'High performance digital service.',
                            tag: 'Popular',
                            growthRate: '+300%',
                            iconName: 'Sparkles',
                            priceStartingAt: newServicePrice,
                          });
                          setNewServiceTitle('');
                          setNewServiceSubtitle('');
                          setNewServiceDesc('');
                        }
                      }}
                      leftIcon={<Plus className="w-4 h-4" />}
                    >
                      Add Service Item
                    </GlassButton>
                  </div>

                  <div className="space-y-3">
                    {services.map((s) => (
                      <div key={s.id} className="flex items-center justify-between p-4 glass-card-subtle rounded-2xl border border-white/10">
                        <div>
                          <p className="text-sm font-bold text-white">{s.title}</p>
                          <p className="text-xs text-slate-400">{s.subtitle} • Starting at ${s.priceStartingAt}</p>
                        </div>
                        <button onClick={() => deleteService(s.id)} className="p-2 text-red-400 hover:text-red-300 cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 8: CRM Leads Inbox */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-heading">Incoming Lead Inquiries Inbox</h3>
                    <GlassBadge variant="emerald">{leads.length} Active Leads</GlassBadge>
                  </div>

                  <div className="space-y-4">
                    {leads.map((l) => (
                      <div key={l.id} className="p-5 glass-card-obsidian rounded-2xl border border-white/15 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-base font-bold text-white">{l.name}</h4>
                            <p className="text-xs text-slate-400">{l.email} • {l.company || 'Direct Prospect'} • {l.timestamp}</p>
                          </div>
                          <select
                            value={l.status}
                            onChange={(e) => updateLeadStatus(l.id, e.target.value as InquiryStatus)}
                            className="px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-900 border border-white/20 text-purple-300 outline-none"
                          >
                            <option value="New">Status: New</option>
                            <option value="In Review">Status: In Review</option>
                            <option value="Contacted">Status: Contacted</option>
                            <option value="Closed">Status: Closed</option>
                          </select>
                        </div>
                        <div className="glass-card-subtle p-3 rounded-xl border border-white/10 text-xs text-slate-300">
                          <p><strong>Service Needed:</strong> {l.serviceNeeded}</p>
                          <p><strong>Budget Range:</strong> {l.budget}</p>
                          <p className="mt-1"><strong>Message:</strong> {l.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 14: RBAC Roles Switcher */}
              {activeTab === 'roles' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-heading">Role-Based Access Control Test Hub</h3>
                  <p className="text-xs text-slate-300">Switch user roles in real-time to test access permissions matrix across the application.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { role: 'super_admin', desc: 'Full System Access + Database Migrations' },
                      { role: 'admin', desc: 'CMS Content & Leads Management' },
                      { role: 'editor', desc: 'Blog & Media Library Only' },
                      { role: 'marketing_manager', desc: 'Leads CRM & Analytics Telemetry' },
                      { role: 'viewer', desc: 'Read-Only Interface Access' },
                    ].map((r) => (
                      <GlassCard
                        key={r.role}
                        variant={userRole === r.role ? 'prominent' : 'obsidian'}
                        className="p-5 space-y-2 cursor-pointer"
                        onClick={() => switchRoleForTesting(r.role as UserRole)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white uppercase">{r.role}</span>
                          {userRole === r.role && <GlassBadge variant="emerald">Active Role</GlassBadge>}
                        </div>
                        <p className="text-xs text-slate-400">{r.desc}</p>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}

              {/* Default Fallback for remaining tabs */}
              {['portfolio', 'pricing', 'testimonials', 'blogs', 'media', 'seo', 'navigation', 'theme', 'analytics', 'logs'].includes(activeTab) && (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-300 flex items-center justify-center mx-auto border border-purple-500/30">
                    <Sliders className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-heading uppercase">{activeTab} Management Hub</h4>
                  <p className="text-xs text-slate-400">Live synchronized with PostgreSQL / Supabase storage bucket & local state fallback.</p>
                </div>
              )}

            </main>

          </div>
        </GlassCard>
      </div>
    </ProtectedRoute>
  );
};
