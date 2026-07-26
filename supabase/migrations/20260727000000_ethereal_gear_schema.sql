-- Ethereal Gear — Production PostgreSQL Migration & RLS Security Script
-- Version: 1.0.0
-- Target Engine: PostgreSQL 16 / Supabase BaaS

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Define Custom Enums
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'editor', 'marketing_manager', 'viewer');
CREATE TYPE inquiry_status AS ENUM ('New', 'In Review', 'Contacted', 'Closed');
CREATE TYPE blog_status AS ENUM ('Draft', 'Published', 'Archived');

--------------------------------------------------------------------------------
-- 3. Profiles & RBAC
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 4. Hero Content
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hero_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    badge_text TEXT NOT NULL DEFAULT 'Apple iOS 26 Liquid Glass Architecture',
    headline TEXT NOT NULL DEFAULT 'Grow Your Business With Smart Digital Solutions',
    subheadline TEXT NOT NULL,
    primary_cta_text TEXT NOT NULL DEFAULT 'Explore Solutions',
    primary_cta_link TEXT NOT NULL DEFAULT '#services',
    secondary_cta_text TEXT NOT NULL DEFAULT 'View Live Demos',
    secondary_cta_link TEXT NOT NULL DEFAULT '#portfolio',
    preset_3d TEXT NOT NULL DEFAULT 'glass_sphere',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 5. Services Table
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT NOT NULL,
    tag TEXT NOT NULL DEFAULT 'Popular',
    growth_rate TEXT NOT NULL DEFAULT '+300%',
    icon_name TEXT NOT NULL DEFAULT 'Sparkles',
    price_starting_at NUMERIC(10,2) DEFAULT 5000.00,
    delivery_time TEXT DEFAULT '2-4 Weeks',
    is_featured BOOLEAN NOT NULL DEFAULT TRUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 6. Portfolio Projects
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT,
    cover_image TEXT NOT NULL,
    metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
    live_url TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 7. Pricing Plans
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pricing_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    monthly_price NUMERIC(10,2) NOT NULL,
    annual_price NUMERIC(10,2) NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_popular BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 8. Testimonials
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_role TEXT NOT NULL,
    client_company TEXT NOT NULL,
    avatar_url TEXT,
    quote TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    is_featured BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 9. Blog Posts
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Antigravity Engineering',
    category TEXT NOT NULL DEFAULT 'Design Systems',
    read_time_minutes INT NOT NULL DEFAULT 5,
    status blog_status NOT NULL DEFAULT 'Published',
    published_at DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 10. Lead Inquiries (CRM)
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    service_needed TEXT NOT NULL,
    budget TEXT,
    message TEXT NOT NULL,
    status inquiry_status NOT NULL DEFAULT 'New',
    internal_notes TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 11. Site Settings
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 12. Audit Logs
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email TEXT NOT NULL,
    action TEXT NOT NULL,
    target_entity TEXT NOT NULL,
    details TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 13. High Performance Indexes
--------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(timestamp DESC);

--------------------------------------------------------------------------------
-- 14. ROW LEVEL SECURITY (RLS) POLICIES
--------------------------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public read services" ON services FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read portfolio" ON portfolio_projects FOR SELECT USING (TRUE);
CREATE POLICY "Public read pricing" ON pricing_plans FOR SELECT USING (TRUE);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_featured = TRUE);
CREATE POLICY "Public read blog" ON blog_posts FOR SELECT USING (status = 'Published');
CREATE POLICY "Public read hero" ON hero_content FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (TRUE);

-- Public Insert Policy for Lead Inquiries
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (TRUE);

-- Admin Staff Write Policies
CREATE POLICY "Admin write services" ON services FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('super_admin', 'admin', 'editor'))
);
CREATE POLICY "Admin write portfolio" ON portfolio_projects FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('super_admin', 'admin', 'editor'))
);
CREATE POLICY "Admin write pricing" ON pricing_plans FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('super_admin', 'admin'))
);
CREATE POLICY "Admin write testimonials" ON testimonials FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('super_admin', 'admin', 'marketing_manager'))
);
CREATE POLICY "Admin write blog" ON blog_posts FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('super_admin', 'admin', 'editor'))
);
CREATE POLICY "Admin manage inquiries" ON inquiries FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('super_admin', 'admin', 'marketing_manager'))
);

--------------------------------------------------------------------------------
-- 15. Storage Bucket Configuration
--------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media-assets', 'media-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access Storage" ON storage.objects FOR SELECT USING (bucket_id = 'media-assets');
CREATE POLICY "Admin Insert Storage" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'media-assets' AND EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('super_admin', 'admin', 'editor'))
);
