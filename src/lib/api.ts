import { supabase, isSupabaseConfigured } from './supabase';
import type {
  ServiceItem,
  PortfolioProject,
  PricingPlan,
  TestimonialItem,
  BlogPost,
  LeadItem,
  AuditLog,
} from '../types/database.types';
import {
  initialServices,
  initialPortfolio,
  initialPricingPlans,
  initialTestimonials,
  initialBlogs,
  initialLeads,
  initialAuditLogs,
} from './initialData';

// -----------------------------------------------------------------------------
// 1. Services API
// -----------------------------------------------------------------------------
export async function fetchServices(): Promise<ServiceItem[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
    if (!error && data && data.length > 0) return data as ServiceItem[];
  }
  const saved = localStorage.getItem('ethereal_services');
  return saved ? JSON.parse(saved) : initialServices;
}

export async function createService(service: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
  const id = `serv-${Date.now()}`;
  const newServ = { ...service, id };
  if (isSupabaseConfigured()) {
    await supabase.from('services').insert([newServ]);
  }
  return newServ;
}

// -----------------------------------------------------------------------------
// 2. Portfolio API
// -----------------------------------------------------------------------------
export async function fetchPortfolio(): Promise<PortfolioProject[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('portfolio_projects').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as PortfolioProject[];
  }
  const saved = localStorage.getItem('ethereal_portfolio');
  return saved ? JSON.parse(saved) : initialPortfolio;
}

export async function createPortfolioProject(project: Omit<PortfolioProject, 'id'>): Promise<PortfolioProject> {
  const id = `port-${Date.now()}`;
  const newProj = { ...project, id };
  if (isSupabaseConfigured()) {
    await supabase.from('portfolio_projects').insert([newProj]);
  }
  return newProj;
}

// -----------------------------------------------------------------------------
// 3. Pricing Plans API
// -----------------------------------------------------------------------------
export async function fetchPricingPlans(): Promise<PricingPlan[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('pricing_plans').select('*').order('display_order', { ascending: true });
    if (!error && data && data.length > 0) return data as PricingPlan[];
  }
  const saved = localStorage.getItem('ethereal_pricing');
  return saved ? JSON.parse(saved) : initialPricingPlans;
}

// -----------------------------------------------------------------------------
// 4. Testimonials API
// -----------------------------------------------------------------------------
export async function fetchTestimonials(): Promise<TestimonialItem[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as TestimonialItem[];
  }
  const saved = localStorage.getItem('ethereal_testimonials');
  return saved ? JSON.parse(saved) : initialTestimonials;
}

// -----------------------------------------------------------------------------
// 5. Blog Posts API
// -----------------------------------------------------------------------------
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('status', 'Published').order('published_at', { ascending: false });
    if (!error && data && data.length > 0) return data as BlogPost[];
  }
  const saved = localStorage.getItem('ethereal_blogs');
  return saved ? JSON.parse(saved) : initialBlogs;
}

// -----------------------------------------------------------------------------
// 6. CRM Lead Inquiries API
// -----------------------------------------------------------------------------
export async function fetchInquiries(): Promise<LeadItem[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('inquiries').select('*').order('timestamp', { ascending: false });
    if (!error && data && data.length > 0) return data as LeadItem[];
  }
  const saved = localStorage.getItem('ethereal_leads');
  return saved ? JSON.parse(saved) : initialLeads;
}

export async function submitInquiry(lead: Omit<LeadItem, 'id' | 'timestamp' | 'status'>): Promise<LeadItem> {
  const newLead: LeadItem = {
    ...lead,
    id: `lead-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
    status: 'New',
  };

  if (isSupabaseConfigured()) {
    await supabase.from('inquiries').insert([newLead]);
  }

  return newLead;
}

// -----------------------------------------------------------------------------
// 7. Audit Logs API
// -----------------------------------------------------------------------------
export async function fetchAuditLogs(): Promise<AuditLog[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('audit_logs').select('*').order('timestamp', { ascending: false });
    if (!error && data && data.length > 0) return data as AuditLog[];
  }
  const saved = localStorage.getItem('ethereal_audit_logs');
  return saved ? JSON.parse(saved) : initialAuditLogs;
}
