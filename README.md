# 🥗 NourishX | AI Nutrition Assistant & Balanced Diet Engine

> **Empowering people with real-time food intelligence, computerized meal analysis, and clinically balanced dietary guidance.**  
> Built for the **AI Health & Nutrition Hackathon**.

---

## 🌟 Executive Summary

Most people struggle to maintain a balanced diet not from a lack of desire, but from a **lack of clarity**:
- Nutrition labels are intentionally misleading and loaded with hidden industrial additives.
- Tracking macros manually is tedious and time-consuming.
- Generic diets fail to account for individual metabolic rates, micronutrient deficiencies, and lifestyle constraints.

**NourishX** solves this with an all-in-one, intelligent web platform that combines **Computer Vision food recognition**, **NOVA & NutriScore classifications**, **interactive daily macro balance tracking**, and **hyper-personalized 7-day balanced meal planning**.

---

## 🚀 Core Features & Innovation

### 1. 🍲 AI Food Vision & Plate Analyzer
- **Photo & Camera Scan:** Upload any meal photo or test with chef presets.
- **NutriScore (A–E) & NOVA Level (1–4):** Instantly distinguishes whole, unprocessed meals from dangerous ultra-processed formulations.
- **Portion Size Scaler:** Interactive slider (0.5x to 2.5x) dynamically recalculates calories and macros.
- **Micronutrient Radar:** Measures key bioactives (Iron, Magnesium, Potassium, Calcium, Vitamin D, Omega-3).
- **AI Dietitian Assessment:** Provides clinical feedback and actionable micro-adjustments (e.g., adding vitamin C to enhance non-heme iron absorption).

### 2. 🗣️ Natural Language Meal Logger
- Describe meals in natural everyday phrasing (e.g., *"2 scrambled eggs, sourdough toast, and an oat milk latte"*).
- Smart parsing engine estimates nutritional breakdown and allows 1-click addition to the daily log.

### 3. 📊 Daily Balanced Diet & Macro Tracker
- **Animated SVG Caloric Ring:** Real-time visual progress toward maintenance, deficit, or surplus goals.
- **Target Macro Progress Bars:** Dedicated monitors for **Protein**, **Complex Carbs**, **Healthy Lipids**, and **Dietary Fiber**.
- **Interactive Hydration Counter:** Track daily water intake with 1-click cup increments.

### 4. 🥗 Personalized 7-Day Balanced Diet Planner
- Tailored for multiple dietary protocols:
  - **All-Round Balanced Vitality** (50/25/25 split)
  - **High-Protein Athletic Fuel** (160g+ target)
  - **Plant-Powered Vegetarian & Vegan** (Complete plant amino acids & polyphenols)
  - **Mediterranean Longevity Diet** (Cardiovascular protection & healthy MUFAs)
- **1-Click Meal Swap:** Swap any meal for a dietitian-curated alternative on the fly.
- **Smart Grocery List Generator:** Auto-compiles ingredients across the week, categorized by produce, protein, pantry, and dairy with copy-to-clipboard and print modes.

### 5. 🤖 "Ask NourishX" AI Clinical Nutritionist
- Conversational chat assistant trained on evidence-based dietetic science.
- High-speed built-in clinical intelligence engine with zero setup, zero API keys required, and 100% offline reliability.
- Quick prompt chips for common queries (intermittent fasting, bedtime snacks, glycemic index, lowering LDL cholesterol).

### 6. 🔍 Micronutrient Deficiency & Symptom Checker
- Multi-symptom questionnaire (fatigue, brain fog, muscle cramps, brittle nails, insomnia).
- Identifies likely sub-clinical deficiencies (Magnesium, Iron, B12, Zinc, D3) and prescribes specific nutrient-dense whole foods.

### 7. ⚖️ "Nourish vs. Nourish" Head-to-Head Compare
- Side-by-side food comparisons (Brown Rice vs. White Rice, Greek Yogurt vs. Regular Yogurt, Whole Eggs vs. Egg Whites).
- Highlight badges for highest protein, lowest glycemic impact, and superior micronutrient density.

### 8. 🏷️ Food Label & Hidden Ingredient Decoder
- Analyzes packaged food ingredient lists.
- Flags hidden sugars (maltodextrin, high-fructose corn syrup), synthetic trans fats, petroleum food dyes (Red 40), and artificial sweeteners.

### 9. 🎯 Mifflin-St Jeor TDEE & Target Calculator
- Calculates Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) based on age, gender, height, weight, activity, and goals.
- Directly applies customized macronutrient targets to the live dashboard.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** HTML5, CSS3, Modern Glassmorphism, Responsive Grid System
- **Styling & Icons:** Tailwind CSS, Custom SVG Rings & Animations
- **Interactivity & Logic:** Vanilla ES6+ Modular JavaScript
- **Celebrations:** Canvas-Confetti
- **Backend / Local Server:** Zero-dependency Python 3 HTTP Server with CORS & MIME handling
- **AI Clinical Engine:** Built-in evidence-based dietetics and nutrition expert system (100% reliable, zero keys required)

---

## 🏃 Quick Start Guide

### Option 1: Double-Click Launcher (Windows)
Double-click `run_nourishx.bat` in the project root directory.

### Option 2: Python Local Server
Run in PowerShell / Terminal:
```bash
python server.py
```
Open your browser and navigate to:
```
http://localhost:8000
```

### Option 3: Direct Browser Open
Simply double-click `index.html` to open directly in Google Chrome, Microsoft Edge, or Firefox.

---

## 🎤 Hackathon Pitch & Presentation Highlights

1. **The Problem:** 80% of adults fail to meet daily dietary fiber and micronutrient recommendations, while ultra-processed food accounts for nearly 60% of daily calories in modern diets.
2. **The Innovation:** NourishX bridges the gap between complex clinical nutrition research and daily lifestyle decisions through accessible AI food vision and transparent food grading.
3. **Judge Demo Flow:**
   - **Step 1:** Select the **Avocado Toast** or **Wild Salmon Bowl** in the Food Scanner; show the portion adjuster and NutriScore 'A'.
   - **Step 2:** Click **"+ Log This Meal"** to demonstrate the live update of the animated macro ring and confetti.
   - **Step 3:** Switch to the **7-Day Meal Planner**, pick **Mediterranean Longevity**, swap a meal, and open the **Smart Grocery List**.
   - **Step 4:** Ask the **AI Nutritionist** a question or use the preset chips to demonstrate clinical dietary reasoning.
   - **Step 5:** Use the **Deficiency Checker** to reveal targeted superfood remedies for afternoon fatigue.

---

*© 2026 NourishX. Built with passion for the AI Nutrition & Health Hackathon.*
