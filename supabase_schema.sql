-- ============================================================================
-- NourishX - Full Production Supabase Database Schema
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

-- 6. SYMPTOM ASSESSMENTS TABLE (Stores clinical micronutrient evaluations)
CREATE TABLE IF NOT EXISTS public.symptom_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symptoms JSONB NOT NULL DEFAULT '[]'::jsonb,
    detected_deficiencies JSONB NOT NULL DEFAULT '[]'::jsonb,
    recommended_foods JSONB NOT NULL DEFAULT '[]'::jsonb,
    assessed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. DECODED LABELS TABLE (Stores packaged food ingredient analyses)
CREATE TABLE IF NOT EXISTS public.decoded_labels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name TEXT NOT NULL,
    raw_ingredients TEXT,
    nova_group INTEGER DEFAULT 4,
    flagged_additives JSONB DEFAULT '[]'::jsonb,
    healthy_alternative TEXT,
    decoded_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. USER MEAL PLANS TABLE (Stores personalized meal schedules & custom swaps)
CREATE TABLE IF NOT EXISTS public.user_meal_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    diet_type TEXT NOT NULL DEFAULT 'balanced',
    day_name TEXT NOT NULL,
    meal_type TEXT NOT NULL,
    title TEXT NOT NULL,
    calories INTEGER NOT NULL DEFAULT 0,
    protein NUMERIC NOT NULL DEFAULT 0,
    carbs NUMERIC NOT NULL DEFAULT 0,
    fat NUMERIC NOT NULL DEFAULT 0,
    superfood TEXT,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. FOOD REFERENCE LIBRARY TABLE (100% verified clinical nutrition database)
CREATE TABLE IF NOT EXISTS public.food_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    portion TEXT NOT NULL,
    calories INTEGER NOT NULL,
    protein NUMERIC NOT NULL,
    carbs NUMERIC NOT NULL,
    fat NUMERIC NOT NULL,
    fiber NUMERIC NOT NULL,
    glycemic_index INTEGER NOT NULL,
    nutri_score TEXT NOT NULL,
    nova_group INTEGER NOT NULL,
    key_superfood_nutrient TEXT
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grocery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decoded_labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_library ENABLE ROW LEVEL SECURITY;

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

DROP POLICY IF EXISTS "Allow public all on symptom_assessments" ON public.symptom_assessments;
CREATE POLICY "Allow public all on symptom_assessments" ON public.symptom_assessments FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all on decoded_labels" ON public.decoded_labels;
CREATE POLICY "Allow public all on decoded_labels" ON public.decoded_labels FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all on user_meal_plans" ON public.user_meal_plans;
CREATE POLICY "Allow public all on user_meal_plans" ON public.user_meal_plans FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all on food_library" ON public.food_library;
CREATE POLICY "Allow public all on food_library" ON public.food_library FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- AGGREGATE POSTGRES VIEW
-- ============================================================================

CREATE OR REPLACE VIEW public.daily_nutrition_summary AS
SELECT 
    CURRENT_DATE AS summary_date,
    COALESCE(COUNT(m.id), 0) AS total_meals_logged,
    COALESCE(SUM(m.calories), 0) AS total_calories,
    COALESCE(SUM(m.protein), 0) AS total_protein,
    COALESCE(SUM(m.carbs), 0) AS total_carbs,
    COALESCE(SUM(m.fat), 0) AS total_fat,
    COALESCE(SUM(m.fiber), 0) AS total_fiber
FROM public.meals m
WHERE DATE(m.logged_at) = CURRENT_DATE;

-- ============================================================================
-- SEED DATA
-- ============================================================================

INSERT INTO public.user_targets (calories, protein, carbs, fat, fiber, water_glasses, goal)
SELECT 2150, 135, 230, 65, 35, 8, 'maintain'
WHERE NOT EXISTS (SELECT 1 FROM public.user_targets);

INSERT INTO public.food_library (name, category, portion, calories, protein, carbs, fat, fiber, glycemic_index, nutri_score, nova_group, key_superfood_nutrient)
VALUES
('Wild Alaskan Salmon', 'Fish / Seafood', '1 fillet (180g)', 360, 42.0, 0.0, 20.0, 0.0, 0, 'A', 1, 'Omega-3 EPA/DHA & Astaxanthin'),
('Hass Avocado', 'Healthy Fats', '1 medium (150g)', 240, 3.0, 12.0, 22.0, 10.0, 15, 'A', 1, 'Oleic Acid & Potassium'),
('Tricolor Quinoa', 'Whole Grains', '1 cup cooked (185g)', 222, 8.1, 39.4, 3.6, 5.2, 53, 'A', 1, 'Complete Plant Protein & Folate'),
('Strained Greek Yogurt', 'Fermented Dairy', '1 cup (200g)', 170, 20.0, 6.0, 7.0, 0.0, 14, 'A', 1, 'Bioavailable Probiotics & Casein'),
('Organic Blueberries', 'Fruits & Berries', '1 cup (148g)', 84, 1.1, 21.4, 0.5, 3.6, 53, 'A', 1, 'Anthocyanins & Vitamin C'),
('Baby Spinach', 'Dark Leafy Greens', '2 cups raw (60g)', 14, 1.7, 2.2, 0.2, 1.3, 15, 'A', 1, 'Lutein, Zeaxanthin & Folate'),
('Sprouted Tempeh', 'Plant Protein', '100g', 195, 20.0, 7.6, 11.0, 8.0, 20, 'A', 1, 'Fermented Isoflavones'),
('Chia Seeds', 'Seeds & Nuts', '2 tbsp (28g)', 138, 4.7, 12.0, 8.7, 9.8, 1, 'A', 1, 'Soluble Mucilage & Alpha-Linolenic Acid'),
('Extra Virgin Olive Oil', 'Oils & Fats', '1 tbsp (15ml)', 119, 0.0, 0.0, 13.5, 0.0, 0, 'A', 2, 'Polyphenol Oleocanthal'),
('Pasture-Raised Whole Eggs', 'Eggs', '2 large (100g)', 144, 12.6, 0.8, 9.6, 0.0, 0, 'A', 1, 'Choline, Lutein & Vitamin D3')
ON CONFLICT (name) DO NOTHING;
