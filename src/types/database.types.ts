export type UserRole = 'super_admin' | 'admin' | 'editor' | 'marketing_manager' | 'viewer';
export type InquiryStatus = 'New' | 'In Review' | 'Contacted' | 'Closed';
export type BlogStatus = 'Draft' | 'Published' | 'Archived';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface HeroContent {
  id: string;
  badge_text: string;
  headline: string;
  subheadline: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  preset_3d: 'glass_sphere' | 'quantum_ring' | 'floating_cubes';
  is_active: boolean;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  growthRate: string;
  iconName: string;
  priceStartingAt?: number;
  deliveryTime?: string;
  is_featured?: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: '3D WebGL' | 'SaaS Apps' | 'SEO Engines' | 'Brand Identity';
  summary: string;
  content: string;
  coverImage: string;
  metrics: Array<{ label: string; value: string }>;
  liveUrl?: string;
  is_featured: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isPopular: boolean;
  displayOrder: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  avatarUrl: string;
  quote: string;
  rating: number; // 1 to 5
  isFeatured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  readTimeMinutes: number;
  status: BlogStatus;
  publishedAt: string;
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  company: string;
  serviceNeeded: string;
  budget: string;
  message: string;
  timestamp: string;
  status: InquiryStatus;
  internalNotes?: string;
}

export interface SiteSettings {
  agencyName: string;
  tagline: string;
  subtagline: string;
  phone: string;
  email: string;
  primaryColor: string;
  accentColor: string;
  glassOpacity: number;
  glassBlur: number;
  fontFamily: 'geometric' | 'sans' | 'heading';
  themeMode: 'obsidian' | 'light' | 'auto';
}

export interface AuditLog {
  id: string;
  user_email: string;
  action: string;
  target_entity: string;
  timestamp: string;
  details: string;
}
