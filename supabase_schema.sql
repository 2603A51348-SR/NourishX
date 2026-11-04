-- ============================================================================
-- NourishX - Supabase Complete Database Schema & Security Policies
-- Run this script in the Supabase SQL Editor:
-- Project: https://uxqchiiiirqyukmekyax.supabase.co
-- ============================================================================

-- 1. MEALS TABLE (Stores scanned & logged food items)
CREATE TABLE IF NOT EXISTS public.meals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT,
    calories INTEGER NOT NULL DEFAULT 0,
    protein NUMERIC NOT NULL DEFAULT 0,
    carbs NUMERIC NOT NULL DEFAULT 0,
    fat NUMERIC NOT NULL DEFAULT 0,
    fiber NUMERIC NOT NULL DEFAULT 0,
    sugar NUMERIC NOT NULL DEFAULT 0,
    sodium NUMERIC NOT NULL DEFAULT 0,
    nutri_score TEXT DEFAULT 'A',
    nova_group INTEGER DEFAULT 1,
    portion TEXT,
    logged_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. DAILY LOGS TABLE (Stores daily aggregated consumption & water intake)
CREATE TABLE IF NOT EXISTS public.daily_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    log_date DATE NOT NULL DEFAULT CURRENT_DATE,
    calories_consumed INTEGER NOT NULL DEFAULT 0,
    protein NUMERIC NOT NULL DEFAULT 0,
    carbs NUMERIC NOT NULL DEFAULT 0,
    fat NUMERIC NOT NULL DEFAULT 0,
    fiber NUMERIC NOT NULL DEFAULT 0,
    water_drank INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_daily_log_date UNIQUE (log_date)
);

-- 3. USER TARGETS TABLE (Stores personalized TDEE & macro targets)
CREATE TABLE IF NOT EXISTS public.user_targets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    calories INTEGER NOT NULL DEFAULT 2150,
    protein NUMERIC NOT NULL DEFAULT 135,
    carbs NUMERIC NOT NULL DEFAULT 230,
    fat NUMERIC NOT NULL DEFAULT 65,
    fiber NUMERIC NOT NULL DEFAULT 35,
    water_glasses INTEGER NOT NULL DEFAULT 8,
    goal TEXT DEFAULT 'maintain',
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CHAT HISTORY TABLE (Stores AI Nutritionist conversations)
CREATE TABLE IF NOT EXISTS public.chat_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender TEXT NOT NULL, -- 'user' or 'ai'
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. GROCERY ITEMS TABLE (Stores smart grocery list status)
CREATE TABLE IF NOT EXISTS public.grocery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    is_checked BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enables anonymous public access for hackathon evaluation and demos
-- ============================================================================

ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grocery_items ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads and writes on all tables
DROP POLICY IF EXISTS "Allow public all on meals" ON public.meals;
CREATE POLICY "Allow public all on meals" ON public.meals FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all on daily_logs" ON public.daily_logs;
CREATE POLICY "Allow public all on daily_logs" ON public.daily_logs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all on user_targets" ON public.user_targets;
CREATE POLICY "Allow public all on user_targets" ON public.user_targets FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all on chat_history" ON public.chat_history;
CREATE POLICY "Allow public all on chat_history" ON public.chat_history FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all on grocery_items" ON public.grocery_items;
CREATE POLICY "Allow public all on grocery_items" ON public.grocery_items FOR ALL USING (true) WITH CHECK (true);

-- Insert initial default target row if not exists
INSERT INTO public.user_targets (calories, protein, carbs, fat, fiber, water_glasses, goal)
SELECT 2150, 135, 230, 65, 35, 8, 'maintain'
WHERE NOT EXISTS (SELECT 1 FROM public.user_targets);
