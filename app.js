/**
 * NourishX - AI Nutrition Assistant & Balanced Diet Engine
 * Core Application Logic, AI Simulation, Gemini API Integration, and Interactive Modules
 */

// ==========================================
// 1. DATA REPOSITORY & PRESET FOOD SCANS
// ==========================================

const FOOD_PRESETS = [
  {
    id: "avocado-egg-toast",
    name: "Artisan Avocado Toast & Poached Egg",
    category: "Breakfast / Brunch",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    portion: "1 serving (240g)",
    portionMultiplier: 1.0,
    baseCalories: 385,
    macros: { protein: 16, carbs: 29, fiber: 9, fat: 23, sugar: 3, sodium: 380 },
    nutriScore: "A",
    novaGroup: 1,
    novaLabel: "Minimally Processed",
    gi: 34,
    giLabel: "Low Glycemic",
    micros: [
      { name: "Vitamin C", amount: "18% DV", percent: 18 },
      { name: "Vitamin D", amount: "28% DV", percent: 28 },
      { name: "Iron", amount: "22% DV", percent: 22 },
      { name: "Potassium", amount: "540mg (16% DV)", percent: 16 },
      { name: "Magnesium", amount: "65mg (16% DV)", percent: 16 },
      { name: "Choline", amount: "155mg (28% DV)", percent: 28 }
    ],
    highlights: [
      "Rich in heart-protective monounsaturated oleic acid from ripe avocado.",
      "Whole egg yolk provides bioavailable choline essential for cognitive & liver health.",
      "High dietary fiber (9g) blunts blood glucose spikes and fuels beneficial gut microbiota."
    ],
    dietitianVerdict: "An exemplary balanced meal! High satiety index ensures 4-5 hours of stable mental energy without an insulin slump. Tip: Sprinkle hemp seeds or squeeze fresh lemon for boosted zinc and non-heme iron uptake."
  },
  {
    id: "salmon-quinoa-bowl",
    name: "Wild Salmon & Quinoa Super-Bowl",
    category: "Lunch / Dinner",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    portion: "1 power bowl (440g)",
    portionMultiplier: 1.0,
    baseCalories: 550,
    macros: { protein: 44, carbs: 46, fiber: 10, fat: 21, sugar: 4, sodium: 490 },
    nutriScore: "A",
    novaGroup: 1,
    novaLabel: "Minimally Processed",
    gi: 28,
    giLabel: "Low Glycemic",
    micros: [
      { name: "Omega-3 EPA/DHA", amount: "2,450mg (160% DV)", percent: 100 },
      { name: "Vitamin D", amount: "95% DV", percent: 95 },
      { name: "Vitamin B12", amount: "140% DV", percent: 100 },
      { name: "Potassium", amount: "920mg (26% DV)", percent: 26 },
      { name: "Magnesium", amount: "115mg (29% DV)", percent: 29 },
      { name: "Zinc", amount: "32% DV", percent: 32 }
    ],
    highlights: [
      "Clinical-grade anti-inflammatory profile with over 2.4g of marine omega-3 fatty acids.",
      "Tricolor quinoa delivers all 9 essential amino acids with low glycemic impact.",
      "Glucosinolates from steamed broccoli stimulate hepatic detoxification enzymes."
    ],
    dietitianVerdict: "A nutritional powerhouse and benchmark for balanced sports nutrition. Excellent 44g bioavailable protein for muscular protein synthesis. High potassium to sodium ratio supports healthy blood pressure."
  },
  {
    id: "paneer-brown-rice",
    name: "Spiced Paneer Tikka & Brown Basmati Bowl",
    category: "Vegetarian Lunch / Dinner",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    portion: "1 plate (410g)",
    portionMultiplier: 1.0,
    baseCalories: 510,
    macros: { protein: 28, carbs: 54, fiber: 8, fat: 19, sugar: 5, sodium: 540 },
    nutriScore: "A",
    novaGroup: 2,
    novaLabel: "Processed Culinary Ingredients",
    gi: 42,
    giLabel: "Low Glycemic",
    micros: [
      { name: "Calcium", amount: "520mg (52% DV)", percent: 52 },
      { name: "Vitamin C", amount: "65% DV", percent: 65 },
      { name: "Iron", amount: "26% DV", percent: 26 },
      { name: "Phosphorus", amount: "38% DV", percent: 38 },
      { name: "Potassium", amount: "640mg (18% DV)", percent: 18 },
      { name: "Probiotics", amount: "L. acidophilus live cultures", percent: 85 }
    ],
    highlights: [
      "Vegetarian calcium champion: 520mg builds bone mineral density and assists muscular contractions.",
      "Brown basmati preserves the nutrient-dense aleurone and bran layer with B-complex vitamins.",
      "Cucumber mint raita provides live prebiotic-probiotic symbiosis for digestive wellness."
    ],
    dietitianVerdict: "Outstanding vegetarian macro balance. The complex carbohydrates paired with dairy casein provide sustained overnight recovery or sustained afternoon mental focus."
  },
  {
    id: "acai-berry-bowl",
    name: "Antioxidant Acai & Hemp Superfood Bowl",
    category: "Energy Breakfast / Snack",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
    portion: "1 bowl (340g)",
    portionMultiplier: 1.0,
    baseCalories: 395,
    macros: { protein: 18, carbs: 52, fiber: 13, fat: 14, sugar: 18, sodium: 95 },
    nutriScore: "A",
    novaGroup: 1,
    novaLabel: "Minimally Processed",
    gi: 33,
    giLabel: "Low Glycemic",
    micros: [
      { name: "Anthocyanins", amount: "460mg ORAC High", percent: 95 },
      { name: "Vitamin C", amount: "80% DV", percent: 80 },
      { name: "Iron", amount: "28% DV", percent: 28 },
      { name: "Magnesium", amount: "98mg (24% DV)", percent: 24 },
      { name: "Omega-3 (ALA)", amount: "1,800mg (110% DV)", percent: 100 }
    ],
    highlights: [
      "Extreme antioxidant density scavenges free radicals and supports vascular flexibility.",
      "Contains 13g prebiotic dietary fiber, exceeding 40% of adult daily target.",
      "All sugars are intact intrinsic fruit sugars from whole wild berries, avoiding sharp glucose spikes."
    ],
    dietitianVerdict: "An ideal cellular rejuvenation meal. Great as a pre-workout fuel 90 minutes before endurance training or a guilt-free sweet tooth satisfy-er with high polyphenol index."
  },
  {
    id: "fast-food-burger-meal",
    name: "Classic Cheeseburger & Salted Fries",
    category: "Fast Food / Cheat Meal",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    portion: "1 standard combo (460g)",
    portionMultiplier: 1.0,
    baseCalories: 1020,
    macros: { protein: 31, carbs: 108, fiber: 4, fat: 54, sugar: 18, sodium: 1620 },
    nutriScore: "E",
    novaGroup: 4,
    novaLabel: "Ultra-Processed Food",
    gi: 78,
    giLabel: "High Glycemic",
    micros: [
      { name: "Sodium", amount: "1,620mg (70% DV Limit)", percent: 90 },
      { name: "Saturated Fat", amount: "21g (105% DV Max)", percent: 100 },
      { name: "Trans Fat", amount: "1.6g (Avoid)", percent: 85 },
      { name: "Iron", amount: "24% DV", percent: 24 },
      { name: "Potassium", amount: "480mg (10% DV)", percent: 10 }
    ],
    highlights: [
      "Ultra-processed bun made of refined white flour with high glycemic shock (GI 78).",
      "Dangerous 1,620mg sodium load triggers transient arterial stiffness and fluid retention.",
      "High ratio of saturated fat and refined carbohydrates promotes visceral fat storage."
    ],
    dietitianVerdict: "Nutritional Red Flag (NOVA 4). Lacks micronutrients and protective fiber. Smart NourishX Swap: Switch to a grilled turkey or portobello burger on sourdough with baked air-fried sweet potato wedges to save 480 kcal and cut sodium in half!"
  }
];

// ==========================================
// 2. 7-DAY BALANCED DIET PLANS DATABASE
// ==========================================

const MEAL_PLANS = {
  balanced: {
    title: "All-Round Balanced Vitality",
    desc: "Optimized 50/25/25 macro split designed for sustainable energy, gut health, and metabolic longevity.",
    targetKcal: "2,050 kcal/day",
    days: [
      {
        day: "Monday",
        meals: [
          { type: "Breakfast", title: "Overnight Rolled Oats with Chia, Blueberries & Almonds", kcal: 420, p: 16, c: 62, f: 12, superfood: "Beta-Glucan & Anthocyanins" },
          { type: "Lunch", title: "Mediterranean Grilled Lemon Chicken Bowl with Quinoa & Tzatziki", kcal: 580, p: 46, c: 52, f: 18, superfood: "Lean Poultry & Probiotics" },
          { type: "Dinner", title: "Pan-Seared Rainbow Trout with Roasted Asparagus & Sweet Potato", kcal: 620, p: 42, c: 48, f: 22, superfood: "Astaxanthin & Vitamin A" },
          { type: "Snack", title: "Greek Yogurt with Raw Walnuts & 1/2 Sliced Apple", kcal: 230, p: 17, c: 18, f: 9, superfood: "Probiotics & ALA Omega-3" }
        ]
      },
      {
        day: "Tuesday",
        meals: [
          { type: "Breakfast", title: "2 Poached Eggs on Sourdough with Smashed Avocado & Microgreens", kcal: 390, p: 18, c: 30, f: 22, superfood: "Choline & Healthy MUFAs" },
          { type: "Lunch", title: "Warm Lentil & Roasted Beetroot Salad with Crumbled Goat Cheese", kcal: 540, p: 26, c: 64, f: 16, superfood: "Folate & Dietary Nitrates" },
          { type: "Dinner", title: "Turkey Keema Stuffed Bell Peppers with Brown Rice & Fresh Herbs", kcal: 590, p: 44, c: 46, f: 19, superfood: "Lycopene & Vitamin C" },
          { type: "Snack", title: "Handful Roasted Spiced Edamame & Green Tea", kcal: 180, p: 14, c: 11, f: 5, superfood: "EGCG Polyphenols" }
        ]
      },
      {
        day: "Wednesday",
        meals: [
          { type: "Breakfast", title: "Golden Turmeric Superfood Smoothie with Banana, Whey & Spinach", kcal: 380, p: 32, c: 44, f: 7, superfood: "Curcumin & Chlorophyll" },
          { type: "Lunch", title: "Wild Salmon Poke Bowl with Edamame, Seaweed Salad & Brown Rice", kcal: 610, p: 42, c: 56, f: 20, superfood: "Iodine & Marine Omega-3" },
          { type: "Dinner", title: "Moroccan Chickpea & Butternut Squash Tagine with Toasted Couscous", kcal: 560, p: 22, c: 78, f: 14, superfood: "Soluble Fiber & Carotenoids" },
          { type: "Snack", title: "85% Dark Chocolate Squares (20g) & Pumpkin Seeds", kcal: 220, p: 7, c: 14, f: 16, superfood: "Magnesium & Flavonols" }
        ]
      },
      {
        day: "Thursday",
        meals: [
          { type: "Breakfast", title: "Spinach, Mushroom & Feta 3-Egg Frittata with 1 slice Rye Bread", kcal: 430, p: 28, c: 24, f: 24, superfood: "Lutein & Zeaxanthin" },
          { type: "Lunch", title: "Grilled Herb Chicken Breast Wrap with Hummus, Tomato & Mixed Greens", kcal: 570, p: 42, c: 49, f: 18, superfood: "Prebiotic Fiber & Protein" },
          { type: "Dinner", title: "Baked Cod Fillet with Lemon Caper Sauce, Green Beans & Baby Red Potatoes", kcal: 540, p: 46, c: 42, f: 14, superfood: "Lean Marine Protein" },
          { type: "Snack", title: "Organic Carrot Sticks with 3 tbsp Roasted Garlic Hummus", kcal: 190, p: 6, c: 22, f: 8, superfood: "Beta-Carotene" }
        ]
      },
      {
        day: "Friday",
        meals: [
          { type: "Breakfast", title: "Warm Chia Seed Pudding with Coconut Milk, Raspberries & Pumpkin Seeds", kcal: 370, p: 14, c: 32, f: 21, superfood: "Omega-3 ALA & Zinc" },
          { type: "Lunch", title: "Hearty Minestrone Soup with White Beans, Kale & Whole Grain Sourdough", kcal: 520, p: 24, c: 72, f: 12, superfood: "Resistant Starch & Kale" },
          { type: "Dinner", title: "Grass-Fed Lean Beef Sirloin with Chimichurri, Broccolini & Baked Yam", kcal: 660, p: 52, c: 44, f: 26, superfood: "Heme Iron & Zinc" },
          { type: "Snack", title: "Cottage Cheese with Pineapple Chunks & Cinnamon", kcal: 210, p: 22, c: 19, f: 3, superfood: "Bromelain & Casein" }
        ]
      },
      {
        day: "Saturday",
        meals: [
          { type: "Breakfast", title: "Buckwheat Blueberry Protein Pancakes with Pure Maple Drizzle", kcal: 460, p: 28, c: 62, f: 10, superfood: "Rutin & Antioxidants" },
          { type: "Lunch", title: "Mediterranean Mezze Platter: Falafel, Tabbouleh, Baba Ganoush & Warm Pita", kcal: 590, p: 21, c: 68, f: 24, superfood: "Extra Virgin Olive Oil" },
          { type: "Dinner", title: "Grilled Jumbo Prawns with Garlic Cauliflower Mash & Sautéed Spinach", kcal: 520, p: 48, c: 22, f: 18, superfood: "Selenium & B12" },
          { type: "Snack", title: "Kefir Smoothie with Strawberries & Crushed Chia", kcal: 200, p: 12, c: 24, f: 5, superfood: "12 Strains of Probiotics" }
        ]
      },
      {
        day: "Sunday",
        meals: [
          { type: "Breakfast", title: "Shakshuka (Eggs poached in spiced tomato, bell pepper & cumin sauce)", kcal: 410, p: 22, c: 28, f: 22, superfood: "Bioavailable Lycopene" },
          { type: "Lunch", title: "Slow-Cooked Bone Broth Chicken Noodle & Vegetable Soup with Herbs", kcal: 510, p: 44, c: 42, f: 14, superfood: "Collagen & Glycine" },
          { type: "Dinner", title: "Herb-Crusted Baked Salmon with Quinoa Pilaf & Steamed Zucchini", kcal: 630, p: 46, c: 44, f: 25, superfood: "Astaxanthin & Omega-3" },
          { type: "Snack", title: "Mixed Raw Almonds, Walnuts & Dried Tart Cherries", kcal: 240, p: 7, c: 20, f: 16, superfood: "Melatonin & Vitamin E" }
        ]
      }
    ]
  },
  highProtein: {
    title: "High-Protein Athletic Fuel",
    desc: "160g+ daily protein designed for muscle protein synthesis, athletic recovery, and body recomposition.",
    targetKcal: "2,350 kcal/day",
    days: [
      {
        day: "Monday",
        meals: [
          { type: "Breakfast", title: "4 Egg White & 2 Whole Egg Scramble with Turkey Breast & Spinach", kcal: 480, p: 48, c: 14, f: 22, superfood: "High Biological Value Protein" },
          { type: "Lunch", title: "Double Grilled Chicken Breast (250g) with Sweet Potato & Green Beans", kcal: 680, p: 68, c: 58, f: 14, superfood: "Carnitine & Potassium" },
          { type: "Dinner", title: "Pan-Seared Tuna Steak with Brown Rice, Avocado & Edamame", kcal: 690, p: 62, c: 48, f: 21, superfood: "Selenium & Omega-3" },
          { type: "Snack", title: "Whey Isolate Protein Shake with Frozen Berries & Creatine", kcal: 260, p: 35, c: 22, f: 3, superfood: "Rapid Leucine Spike" }
        ]
      },
      {
        day: "Tuesday",
        meals: [
          { type: "Breakfast", title: "Protein Power Oatmeal with Egg Whites folded in, Whey & Peanut Butter", kcal: 520, p: 45, c: 54, f: 16, superfood: "Complex Carbs & Leucine" },
          { type: "Lunch", title: "Lean Ground Turkey (93/7) Burrito Bowl with Black Beans & Guacamole", kcal: 710, p: 58, c: 62, f: 22, superfood: "Zinc & Fiber" },
          { type: "Dinner", title: "Grilled Salmon Fillet (220g) with Quinoa & Steamed Broccoli", kcal: 670, p: 54, c: 42, f: 26, superfood: "Omega-3 & Vitamin D" },
          { type: "Snack", title: "1.5 cups Fat-Free Greek Yogurt with Cinnamon & Walnuts", kcal: 260, p: 32, c: 14, f: 7, superfood: "Slow Casein Digestion" }
        ]
      },
      {
        day: "Wednesday",
        meals: [
          { type: "Breakfast", title: "Smoked Salmon (150g) & Cottage Cheese on Toasted Rye", kcal: 460, p: 46, c: 28, f: 16, superfood: "B12 & Essential Fatty Acids" },
          { type: "Lunch", title: "Sous-Vide Beef Tenderloin Bowl with Jasmine Rice & Roasted Peppers", kcal: 720, p: 64, c: 55, f: 24, superfood: "Creatine & Bioavailable Iron" },
          { type: "Dinner", title: "Grilled Chicken Thighs (Skinless) with Baked Sweet Potato & Kale", kcal: 640, p: 56, c: 46, f: 20, superfood: "Zinc & Vitamin K" },
          { type: "Snack", title: "Chocolate Casein Protein Pudding with Chia Seeds", kcal: 240, p: 30, c: 16, f: 5, superfood: "Overnight Anti-Catabolic" }
        ]
      },
      {
        day: "Thursday",
        meals: [
          { type: "Breakfast", title: "Protein French Toast made with Egg Whites & Cinnamon swirl sourdough", kcal: 490, p: 44, c: 58, f: 8, superfood: "Cinnamon Glycemic Control" },
          { type: "Lunch", title: "Garlic Prawn & Cod Skewers with Farro & Grilled Zucchini", kcal: 630, p: 60, c: 48, f: 14, superfood: "Lean Marine Amino Acids" },
          { type: "Dinner", title: "Extra-Lean Bison Burger (No Bun) with Baked Sweet Potato Wedges & Slaw", kcal: 680, p: 58, c: 52, f: 21, superfood: "Conjugated Linoleic Acid" },
          { type: "Snack", title: "Hard Boiled Eggs (3) with Everything Bagel Seasoning", kcal: 230, p: 20, c: 2, f: 15, superfood: "Lutein & Biotin" }
        ]
      },
      {
        day: "Friday",
        meals: [
          { type: "Breakfast", title: "Steak & Eggs: 120g Flat Iron Steak + 3 Sunny Side Eggs & Tomato", kcal: 540, p: 52, c: 6, f: 32, superfood: "Heme Iron & CoQ10" },
          { type: "Lunch", title: "Grilled Chicken & Quinoa Tabouli Bowl with Tahini Drizzle", kcal: 680, p: 62, c: 50, f: 22, superfood: "Sesame Lignans" },
          { type: "Dinner", title: "Blackened Mahi Mahi with Black Rice & Mango-Avocado Salsa", kcal: 620, p: 52, c: 54, f: 18, superfood: "Low-Mercury Apex Fish" },
          { type: "Snack", title: "Icelandic Skyr with Handful Blueberries", kcal: 210, p: 26, c: 18, f: 1, superfood: "Dense Bacterial Cultures" }
        ]
      },
      {
        day: "Saturday",
        meals: [
          { type: "Breakfast", title: "Protein Waffles topped with Greek Yogurt & Fresh Strawberries", kcal: 510, p: 42, c: 56, f: 11, superfood: "Polyphenols & Calcium" },
          { type: "Lunch", title: "Pulled Chicken Burrito with Pinto Beans, Brown Rice & Salsa Verde", kcal: 730, p: 64, c: 66, f: 19, superfood: "Soluble Fiber & Capsaicin" },
          { type: "Dinner", title: "Pan-Seared Duck Breast (trimmed) with Wild Rice & Asparagus", kcal: 660, p: 48, c: 42, f: 26, superfood: "Monounsaturated Duck Fat" },
          { type: "Snack", title: "Beef Biltong / Jerky (50g) & Almonds", kcal: 240, p: 32, c: 4, f: 9, superfood: "Bioavailable B-Vitamins" }
        ]
      },
      {
        day: "Sunday",
        meals: [
          { type: "Breakfast", title: "High-Protein Scramble: Eggs, Smoked Salmon, Feta & Herbs", kcal: 470, p: 46, c: 8, f: 27, superfood: "DHA Brain Fats" },
          { type: "Lunch", title: "Herb Roasted Turkey Breast with Quinoa Stuffing & Cranberry Relish", kcal: 660, p: 64, c: 52, f: 16, superfood: "Tryptophan & Anthocyanins" },
          { type: "Dinner", title: "Slow-Cooked Beef Pot Roast with Carrots, Turnips & Baby Potatoes", kcal: 710, p: 58, c: 48, f: 26, superfood: "Collagen & Gelatin" },
          { type: "Snack", title: "Micellar Casein Shake with Unsweetened Almond Milk", kcal: 210, p: 30, c: 6, f: 3, superfood: "7-Hour Sustained Release" }
        ]
      }
    ]
  },
  plantBased: {
    title: "Plant-Powered Vegetarian & Vegan",
    desc: "100% whole food plant-based plan high in polyphenols, microbiome-fueling fiber, and complete plant proteins.",
    targetKcal: "1,950 kcal/day",
    days: [
      {
        day: "Monday",
        meals: [
          { type: "Breakfast", title: "Tofu Scramble with Nutritional Yeast, Spinach, Turmeric & Whole Grain Toast", kcal: 380, p: 26, c: 34, f: 15, superfood: "Curcumin & Vitamin B12" },
          { type: "Lunch", title: "Rainbow Buddha Bowl: Roasted Chickpeas, Sweet Potato, Kale & Tahini", kcal: 560, p: 22, c: 74, f: 18, superfood: "Sesamin & Lutein" },
          { type: "Dinner", title: "Creamy Red Lentil Coconut Dahl with Brown Basmati & Steamed Greens", kcal: 610, p: 28, c: 82, f: 17, superfood: "Folate & Iron" },
          { type: "Snack", title: "Chia Seed Pudding with Soy Milk & Blackberries", kcal: 220, p: 10, c: 24, f: 9, superfood: "Soluble Mucilage Fiber" }
        ]
      },
      {
        day: "Tuesday",
        meals: [
          { type: "Breakfast", title: "Green Goddess Smoothie: Spirulina, Banana, Plant Protein & Flaxseed", kcal: 370, p: 30, c: 42, f: 8, superfood: "Spirulina Phycocyanin" },
          { type: "Lunch", title: "Tempeh BLT with Avocado, Butter Lettuce & Tomato on Sprouted Bread", kcal: 540, p: 32, c: 48, f: 22, superfood: "Fermented Isoflavones" },
          { type: "Dinner", title: "Spicy Mexican Black Bean & Mushroom Chili with Avocado Slices", kcal: 580, p: 26, c: 78, f: 16, superfood: "Resistant Starch & Beta-Glucans" },
          { type: "Snack", title: "Roasted Tamari Almonds & Organic Apple", kcal: 210, p: 7, c: 24, f: 12, superfood: "Quercetin" }
        ]
      },
      {
        day: "Wednesday",
        meals: [
          { type: "Breakfast", title: "Warm Quinoa Breakfast Bowl with Cinnamon, Walnuts & Stewed Pears", kcal: 410, p: 14, c: 64, f: 13, superfood: "Pectin & Plant Flavonoids" },
          { type: "Lunch", title: "Mediterranean Falafel Wrap with Beet Hummus, Cucumber & Mint", kcal: 570, p: 20, c: 72, f: 20, superfood: "Betalains & Olive Oil" },
          { type: "Dinner", title: "Crispy Sesame Tofu with Sautéed Bok Choy, Shiitake & Soba Noodles", kcal: 590, p: 32, c: 68, f: 18, superfood: "Ergothioneine Antioxidant" },
          { type: "Snack", title: "Steamed Edamame in the Pod with Sea Salt", kcal: 180, p: 17, c: 13, f: 6, superfood: "Complete Plant Amino Acids" }
        ]
      },
      {
        day: "Thursday",
        meals: [
          { type: "Breakfast", title: "Avocado & Hemp Heart Toast on Sprouted Rye with Sliced Radish", kcal: 390, p: 16, c: 38, f: 21, superfood: "Complete Plant GLA" },
          { type: "Lunch", title: "Moroccan Spiced Chickpea & Carrot Soup with Seeded Sourdough", kcal: 530, p: 22, c: 76, f: 13, superfood: "Beta-Carotene & Fiber" },
          { type: "Dinner", title: "Lentil Shepherd's Pie with Mashed Sweet Potato & Cauliflower Crust", kcal: 610, p: 27, c: 84, f: 15, superfood: "Potassium & Vitamin C" },
          { type: "Snack", title: "Peanut Butter Spread on Celery Sticks & Raisins ('Ants on a Log')", kcal: 200, p: 8, c: 18, f: 12, superfood: "Resveratrol & Hydration" }
        ]
      },
      {
        day: "Friday",
        meals: [
          { type: "Breakfast", title: "Acai Berry Bowl with Granola, Chia Seeds, Coconut Flakes & Kiwi", kcal: 420, p: 12, c: 68, f: 14, superfood: "Anthocyanins & Vitamin C" },
          { type: "Lunch", title: "Grilled Vegetable & White Bean Panini with Basil Pesto", kcal: 560, p: 24, c: 66, f: 21, superfood: "Allicin & Pine Nut Pinolenic Acid" },
          { type: "Dinner", title: "Thai Green Curry with Tempeh, Bamboo Shoots, Thai Basil & Jasmine Rice", kcal: 620, p: 32, c: 64, f: 24, superfood: "MCTs from Coconut & Basil" },
          { type: "Snack", title: "Cacao & Medjool Date Energy Truffle (2 homemade balls)", kcal: 190, p: 5, c: 28, f: 8, superfood: "Raw Theobromine" }
        ]
      },
      {
        day: "Saturday",
        meals: [
          { type: "Breakfast", title: "Buckwheat Crêpes with Sliced Banana, Dark Chocolate & Almond Butter", kcal: 440, p: 14, c: 62, f: 18, superfood: "Rutin Flavonoid" },
          { type: "Lunch", title: "Cuban Black Bean Bowl with Plantains, Guacamole & Brown Rice", kcal: 590, p: 22, c: 84, f: 18, superfood: "Potassium & Polyphenols" },
          { type: "Dinner", title: "Portobello Mushroom Steak with Chimichurri, Polenta & Asparagus", kcal: 530, p: 18, c: 62, f: 22, superfood: "Selenium & Ergosterol (Vitamin D)" },
          { type: "Snack", title: "Raw Pistachios (1/4 cup) & Dried Figs", kcal: 230, p: 7, c: 26, f: 13, superfood: "Lutein & Potassium" }
        ]
      },
      {
        day: "Sunday",
        meals: [
          { type: "Breakfast", title: "Warm Coconut Millet Porridge with Cardamom, Mango & Toasted Pepitas", kcal: 410, p: 13, c: 66, f: 12, superfood: "Ancient Grain Minerals" },
          { type: "Lunch", title: "Golden Turmeric Spiced Cauliflower & Chickpea Salad with Tahini", kcal: 540, p: 21, c: 64, f: 20, superfood: "Sulforaphane & Curcumin" },
          { type: "Dinner", title: "Italian Baked Eggplant Caponata with White Cannellini Beans & Polenta", kcal: 570, p: 24, c: 74, f: 18, superfood: "Nasunin Antioxidant" },
          { type: "Snack", title: "Golden Milk (Warm Oat Milk + Turmeric, Ginger, Black Pepper)", kcal: 160, p: 4, c: 20, f: 6, superfood: "Piperine Curcumin Synergy" }
        ]
      }
    ]
  },
  mediterranean: {
    title: "Mediterranean Longevity Diet",
    desc: "Clinically proven #1 diet for cardiovascular protection, brain health, anti-inflammation and longevity.",
    targetKcal: "2,100 kcal/day",
    days: [
      {
        day: "Monday",
        meals: [
          { type: "Breakfast", title: "Greek Yogurt with Raw Honey, Walnuts, Blackberries & Ground Flax", kcal: 410, p: 24, c: 32, f: 21, superfood: "Probiotics & Ellagic Acid" },
          { type: "Lunch", title: "Sardine & Avocado Tartine on Rustic Olive Bread with Microgreens", kcal: 540, p: 32, c: 36, f: 27, superfood: "Omega-3 & Hydroxytyrosol" },
          { type: "Dinner", title: "Greek Lemon Herb Braised Sea Bass with Roasted Artichokes & Potatoes", kcal: 590, p: 44, c: 38, f: 23, superfood: "Selenium & Cynarin" },
          { type: "Snack", title: "Kalamata Olives & Sliced Cucumber with Oregano & Olive Oil", kcal: 180, p: 3, c: 8, f: 17, superfood: "Polyphenol Oleocanthal" }
        ]
      },
      {
        day: "Tuesday",
        meals: [
          { type: "Breakfast", title: "Spanakopita Egg Muffins (Spinach, Feta, Dill) with Whole Grain Toast", kcal: 390, p: 22, c: 28, f: 21, superfood: "Lutein & Calcium" },
          { type: "Lunch", title: "Classic Greek Horiatiki Salad with Heirloom Tomatoes, Cucumber & Olive Oil", kcal: 520, p: 18, c: 32, f: 36, superfood: "Extra Virgin Olive Oil" },
          { type: "Dinner", title: "Braised Lamb Shank with Rosemary, Green Lentils & Wilted Bitter Greens", kcal: 680, p: 52, c: 36, f: 32, superfood: "Carnosic Acid & Bioavailable Iron" },
          { type: "Snack", title: "Fresh Figs with 2 tbsp Ricotta Cheese & Cinnamon", kcal: 190, p: 8, c: 24, f: 7, superfood: "Dietary Fiber & Calcium" }
        ]
      },
      {
        day: "Wednesday",
        meals: [
          { type: "Breakfast", title: "Steel-Cut Oats cooked in Almond Milk with Sliced Figs & Crushed Hazelnuts", kcal: 430, p: 13, c: 62, f: 16, superfood: "Beta-Glucan & Vitamin E" },
          { type: "Lunch", title: "Spanish Seafood Paella with Mussels, Shrimp, Saffron & Brown Rice", kcal: 610, p: 42, c: 64, f: 18, superfood: "Crocin from Saffron & Zinc" },
          { type: "Dinner", title: "Roasted Chicken Breast with Rosemary Garlic Potatoes & Caponata", kcal: 620, p: 48, c: 42, f: 24, superfood: "Allicin & Carotenoids" },
          { type: "Snack", title: "Roasted Lupini Beans with Lemon & Sea Salt", kcal: 170, p: 18, c: 12, f: 3, superfood: "Low-Carb Prebiotic Protein" }
        ]
      },
      {
        day: "Thursday",
        meals: [
          { type: "Breakfast", title: "Poached Eggs on Grilled Tomatoes with Basil Pesto & Sourdough", kcal: 420, p: 20, c: 30, f: 24, superfood: "Lycopene & Pine Nut Lipids" },
          { type: "Lunch", title: "Tuscan White Bean & Cavolo Nero (Black Kale) Ribollita Soup", kcal: 530, p: 24, c: 68, f: 14, superfood: "Glucosinolates & Resistant Starch" },
          { type: "Dinner", title: "Pan-Grilled Wild Salmon with Fennel-Orange Salad & Steamed Farro", kcal: 640, p: 44, c: 46, f: 26, superfood: "Anethole & Astaxanthin" },
          { type: "Snack", title: "Pomegranate Arils (1/2 cup) with 10 Raw Walnuts", kcal: 200, p: 5, c: 22, f: 13, superfood: "Punicalagins & Neuroprotective Fats" }
        ]
      },
      {
        day: "Friday",
        meals: [
          { type: "Breakfast", title: "Warm Spelt Flakes with Golden Honey, Blueberries & Hemp Seeds", kcal: 390, p: 15, c: 58, f: 12, superfood: "Ancient Grains & Minerals" },
          { type: "Lunch", title: "Grilled Octopus / Calamari Salad with Arugula, Capers & Lemon Olive Oil", kcal: 510, p: 46, c: 18, f: 26, superfood: "Taurine & Polyunsaturated Fats" },
          { type: "Dinner", title: "Stuffed Zucchini Boats with Herbed Quinoa, Pine Nuts & Goat Cheese", kcal: 560, p: 24, c: 54, f: 26, superfood: "Lutein & Conjugated Linoleic Acid" },
          { type: "Snack", title: "Roasted Red Pepper Dip (Muhammara) with Carrot Batons", kcal: 210, p: 6, c: 18, f: 14, superfood: "Capsanthin & Vitamin C" }
        ]
      },
      {
        day: "Saturday",
        meals: [
          { type: "Breakfast", title: "Mediterranean Omelet with Sun-Dried Tomatoes, Kalamata Olives & Basil", kcal: 440, p: 26, c: 12, f: 32, superfood: "Choline & Flavonoids" },
          { type: "Lunch", title: "Grilled Herb Swordfish Steaks with Steamed Couscous & Ratatouille", kcal: 620, p: 48, c: 48, f: 22, superfood: "Lean Selenium & Niacin" },
          { type: "Dinner", title: "Classic Eggplant Moussaka (Lightened with Lean Beef & Greek Yogurt)", kcal: 650, p: 44, c: 42, f: 28, superfood: "Anthocyanins & Protein" },
          { type: "Snack", title: "Chilled Cantaloupe Melon Wrapped with Prosciutto (2 slices)", kcal: 180, p: 12, c: 16, f: 6, superfood: "Electrolytes & Vitamin A" }
        ]
      },
      {
        day: "Sunday",
        meals: [
          { type: "Breakfast", title: "Baked Shakshuka with Poached Farm Eggs, Cumin & Crusty Ciabatta", kcal: 430, p: 22, c: 38, f: 20, superfood: "Bioavailable Lycopene" },
          { type: "Lunch", title: "Grilled Chicken Souvlaki Skewers with Greek Salad & Warm Pita", kcal: 590, p: 46, c: 44, f: 21, superfood: "Allicin & Oregano Carvacrol" },
          { type: "Dinner", title: "Mussels Steamed in White Wine, Garlic, Fresh Parsley & Olive Oil", kcal: 540, p: 46, c: 26, f: 18, superfood: "Vitamin B12 Champion (700% DV)" },
          { type: "Snack", title: "Greek Mountain Herbal Tea with Raw Thyme Honey & Toasted Almonds", kcal: 170, p: 5, c: 16, f: 11, superfood: "Sideritis Flavonoids" }
        ]
      }
    ]
  }
};

// ==========================================
// 3. DEFICIENCY & SYMPTOM CHECKER MAPPINGS
// ==========================================

const SYMPTOM_DATABASE = {
  fatigue: {
    name: "Persistent Fatigue & Low Energy",
    deficiencies: ["Iron / Ferritin", "Vitamin B12", "Vitamin D3", "Magnesium"],
    remedyFoods: [
      { name: "Spinach & Grass-Fed Beef", reason: "Restores hemoglobin and cellular oxygen transport." },
      { name: "Wild Alaskan Salmon", reason: "Provides Vitamin D3 and active B-complex to power mitochondria." },
      { name: "Pumpkin Seeds", reason: "High magnesium unlocks ATP cellular energy currency." }
    ],
    science: "Fatigue is predominantly linked to impaired ATP production in mitochondria due to sub-optimal iron, magnesium, or B-vitamin cofactors."
  },
  brainfog: {
    name: "Brain Fog & Poor Memory",
    deficiencies: ["Omega-3 DHA", "Choline", "Vitamin B6", "Hydration / Electrolytes"],
    remedyFoods: [
      { name: "Whole Pastured Egg Yolks", reason: "Highest food source of acetylcholine precursor (Choline)." },
      { name: "Wild Sardines & Mackerel", reason: "Supplies DHA which comprises 40% of brain polyunsaturated fatty acids." },
      { name: "Raw Walnuts & Blueberries", reason: "Anthocyanins cross the blood-brain barrier to reduce neuroinflammation." }
    ],
    science: "Cognitive sluggishness often reflects low neuronal cell membrane fluidity and reduced neurotransmitter synthesis."
  },
  cramps: {
    name: "Muscle Cramps & Eye Twitches",
    deficiencies: ["Magnesium Glycinate", "Potassium", "Calcium", "Sodium"],
    remedyFoods: [
      { name: "Avocados & Coconut Water", reason: "Rich in bioavailable potassium (nearly double that of bananas)." },
      { name: "Dark Leafy Greens (Swiss Chard)", reason: "Magnesium counterbalances calcium to relax contracted muscle fibers." },
      { name: "Dark Chocolate (85%+)", reason: "Provides 60mg magnesium per ounce with zero refined sugar." }
    ],
    science: "Muscle contractions are governed by the potassium-sodium pump and calcium-magnesium ion exchange. Deficiency induces hyper-excitability."
  },
  brittleNails: {
    name: "Brittle Nails, Hair Thinning & Dry Skin",
    deficiencies: ["Biotin (B7)", "Zinc", "Collagen / Essential Amino Acids", "Omega-3"],
    remedyFoods: [
      { name: "Bone Broth & Gelatin", reason: "Provides proline and glycine peptides for keratin and collagen architecture." },
      { name: "Oysters & Pumpkin Seeds", reason: "Richest dietary sources of bioavailable zinc for cellular division." },
      { name: "Chia & Flax Seeds", reason: "Provides ALA to lock moisture into the stratum corneum skin barrier." }
    ],
    science: "Nails and hair are fast-replicating tissues highly vulnerable to zinc deficiency and inadequate protein sulfur-containing amino acids."
  },
  poorSleep: {
    name: "Restless Sleep & Night Wakings",
    deficiencies: ["Magnesium L-Threonate", "Tryptophan", "Vitamin D", "Vitamin B6"],
    remedyFoods: [
      { name: "Tart Montmorency Cherries", reason: "Natural source of phytomelatonin to regulate circadian phase." },
      { name: "Free-Range Turkey Breast & Pumpkin Seeds", reason: "High tryptophan converts to 5-HTP then serotonin and melatonin." },
      { name: "Chamomile & Passionflower Infusions", reason: "Apigenin binds to GABA receptors in the brain to quiet anxiety." }
    ],
    science: "Sleep architecture requires sufficient GABA neurotransmission and circadian melatonin peaks, which rely heavily on magnesium and B6 coenzymes."
  },
  immunity: {
    name: "Frequent Colds & Slow Wound Healing",
    deficiencies: ["Vitamin C", "Zinc", "Vitamin A", "Vitamin D3"],
    remedyFoods: [
      { name: "Citrus, Guava & Bell Peppers", reason: "Massive Vitamin C stimulates white blood cell phagocyte production." },
      { name: "Shiitake & Reishi Mushrooms", reason: "Beta-glucans modulate innate and adaptive immune cell signaling." },
      { name: "Grass-Fed Beef Liver or Organic Carrots", reason: "Pre-formed Retinol / Beta-Carotene protects mucosal barriers." }
    ],
    science: "Mucosal epithelial defense and neutrophil chemotaxis become compromised within 14 days of low zinc or Vitamin C intake."
  }
};

// ==========================================
// 4. FOOD COMPARISON ARENA DATABASE
// ==========================================

const FOOD_COMPARISONS = {
  "rice-battle": {
    nameA: "Whole Grain Brown Basmati Rice",
    nameB: "Refined White Jasmine Rice",
    portion: "1 cup cooked (195g)",
    a: { cal: 218, p: 4.5, c: 45.8, fiber: 3.5, gi: 50, score: "Winner for Diabetes & Gut" },
    b: { cal: 210, p: 4.2, c: 45.0, fiber: 0.6, gi: 82, score: "Winner for Rapid Post-Workout" },
    verdict: "Brown rice retains the fiber-rich bran and nutrient-dense germ, giving it 6x more dietary fiber and magnesium, keeping blood sugar remarkably stable. However, white rice is easier to digest immediately following intense athletic exertion."
  },
  "yogurt-battle": {
    nameA: "Authentic Greek Strained Yogurt",
    nameB: "Standard Plain Whole Milk Yogurt",
    portion: "1 cup (200g)",
    a: { cal: 170, p: 20.0, c: 6.0, fiber: 0.0, gi: 14, score: "Winner for Protein & Satiety" },
    b: { cal: 150, p: 8.5, c: 12.0, fiber: 0.0, gi: 35, score: "Winner for Calcium" },
    verdict: "Greek yogurt is strained three times to remove liquid whey, resulting in double the protein density (20g vs 8.5g) and half the lactose sugar! Standard yogurt retains slightly more calcium, but Greek yogurt wins for appetite control and muscle recovery."
  },
  "milk-battle": {
    nameA: "Unsweetened Almond Milk",
    nameB: "Whole Grass-Fed Dairy Milk",
    portion: "1 cup (240ml)",
    a: { cal: 35, p: 1.0, c: 1.5, fiber: 1.0, gi: 15, score: "Winner for Low-Calorie & Keto" },
    b: { cal: 150, p: 8.0, c: 12.0, fiber: 0.0, gi: 30, score: "Winner for Muscle & Nutrients" },
    verdict: "If your goal is aggressive fat loss, almond milk saves over 115 calories per cup. However, whole dairy milk provides high-quality complete animal protein, natural Vitamin B12, and bioavailable calcium. Watch out for oat milk which often has high maltose glycemic load."
  },
  "egg-battle": {
    nameA: "Whole Pastured Egg (1 large)",
    nameB: "Egg White Only (2 whites)",
    portion: "50-60g",
    a: { cal: 72, p: 6.3, c: 0.4, fiber: 0.0, gi: 0, score: "Winner for Brain & Micronutrients" },
    b: { cal: 34, p: 7.2, c: 0.5, fiber: 0.0, gi: 0, score: "Winner for Lean Volume" },
    verdict: "The myth that egg yolks are harmful has been thoroughly debunked by modern clinical science! Over 90% of the egg's choline, lutein, zeaxanthin, Vitamin D, and bioavailable iron live in the yolk. Eating whole eggs stimulates 40% greater muscle protein synthesis than whites alone."
  }
};

// ==========================================
// 5. INGREDIENT & FOOD LABEL DECODER
// ==========================================

const SAMPLE_LABELS = {
  energyBar: {
    title: "Commercial 'Fit & Lean' Chocolate Energy Bar",
    rawText: "Soy protein isolate, high fructose corn syrup, palm kernel oil, maltodextrin, cane sugar, fractionated vegetable oil, artificial vanilla flavor, soy lecithin, sucralose, red 40.",
    analysis: {
      novaScore: 4,
      novaText: "Ultra-Processed Food",
      flags: [
        { text: "High Fructose Corn Syrup & Cane Sugar", severity: "danger", note: "Hidden sugars trigger liver fat accumulation and rapid insulin spikes." },
        { text: "Palm Kernel Oil", severity: "warning", note: "High fractionated saturated fat source frequently extracted with hexane." },
        { text: "Maltodextrin", severity: "danger", note: "Glycemic index of 110 (higher than pure table glucose!)." },
        { text: "Artificial Sweetener (Sucralose)", severity: "warning", note: "Alters gut microbiome diversity and increases sweet cravings." },
        { text: "Red 40 (Allura Red)", severity: "danger", note: "Petroleum-derived artificial food coloring with hyperactivity flags." }
      ],
      healthyAlternative: "Switch to 100% whole food bars made solely of dates, almonds, chia seeds, and raw cacao (e.g. Larabar style)."
    }
  },
  dietSoda: {
    title: "Zero Sugar Flavored Diet Soda",
    rawText: "Carbonated water, caramel color, phosphoric acid, aspartame, potassium benzoate (preservative), natural flavors, acesulfame potassium, caffeine.",
    analysis: {
      novaScore: 4,
      novaText: "Ultra-Processed (Chemical Formulation)",
      flags: [
        { text: "Phosphoric Acid", severity: "warning", note: "High dietary phosphorus without calcium can erode dental enamel and leach bone density." },
        { text: "Aspartame & Acesulfame Potassium", severity: "warning", note: "Non-nutritive intense sweeteners that trick cephalic insulin phase release." },
        { text: "Caramel Color IV", severity: "warning", note: "Manufactured with ammonium compounds; contains trace 4-MEI." }
      ],
      healthyAlternative: "Chilled sparkling mineral water with fresh squeezed lime and crushed mint leaves."
    }
  },
  granolaCereal: {
    title: "'Heart-Healthy' Almond Honey Morning Crunch",
    rawText: "Whole grain oats, brown sugar, canola oil, glucose syrup, almonds, defatted wheat germ, honey, salt, modified corn starch, BHT added to preserve freshness.",
    analysis: {
      novaScore: 4,
      novaText: "Ultra-Processed masquerading as health food",
      flags: [
        { text: "Triple Sugar Load (Brown sugar, glucose syrup, honey)", severity: "danger", note: "Contains 16g added sugar per modest 50g bowl." },
        { text: "Refined Canola Oil", severity: "warning", note: "High heat refined seed oil prone to oxidation during high-temp baking." },
        { text: "BHT Preservative", severity: "warning", note: "Synthetic antioxidant used in petroleum and food preservation." }
      ],
      healthyAlternative: "Make 15-minute skillet granola with rolled oats, real crushed walnuts, pure maple syrup, and coconut oil."
    }
  }
};

// ==========================================
// 6. APPLICATION STATE & DASHBOARD TRACKER
// ==========================================

const AppState = {
  theme: localStorage.getItem("nourishx_theme") || "light",
  
  // Daily Targets (Configurable via TDEE Modal)
  targets: {
    calories: 2150,
    protein: 135,
    carbs: 230,
    fat: 65,
    fiber: 35,
    waterGlasses: 8
  },
  
  // Current Consumption Log
  current: {
    calories: 1240,
    protein: 88,
    carbs: 132,
    fat: 42,
    fiber: 21,
    waterDrank: 4
  },

  // Active Plan & Day
  activeDietKey: "balanced",
  activeDayIndex: 0,
  
  // Selected Food in Scanner
  activeFood: FOOD_PRESETS[0],
  
  // Chat History
  chatHistory: [
    { sender: "ai", text: "Hello! I am your NourishX AI Clinical Nutritionist. Ask me anything about balanced diets, macro calculations, nutrient timing, or food swaps!" }
  ]
};

// ==========================================
// 7. INITIALIZATION & DOM BINDINGS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initDashboardRings();
  initFoodScanner();
  initMealPlanner();
  initSymptomChecker();
  initFoodCompare();
  initLabelDecoder();
  initAIChat();
  initTDEECalculator();
  initGroceryModal();
});

// ==========================================
// 8. THEME MANAGEMENT
// ==========================================

function initTheme() {
  document.documentElement.setAttribute("data-theme", AppState.theme);
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    updateThemeIcon(themeBtn);
    themeBtn.addEventListener("click", () => {
      AppState.theme = AppState.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", AppState.theme);
      localStorage.setItem("nourishx_theme", AppState.theme);
      updateThemeIcon(themeBtn);
    });
  }
}

function updateThemeIcon(btn) {
  if (AppState.theme === "dark") {
    btn.innerHTML = `<svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg>`;
  } else {
    btn.innerHTML = `<svg class="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`;
  }
}

// ==========================================
// 9. DAILY MACRO DASHBOARD & RINGS
// ==========================================

function initDashboardRings() {
  renderMacroTracker();

  // Asynchronously fetch targets and daily log from Supabase/LocalStorage
  if (typeof dbFetchTargets === "function") {
    dbFetchTargets().then(savedTargets => {
      if (savedTargets) {
        AppState.targets = Object.assign(AppState.targets, savedTargets);
        renderMacroTracker();
      }
    }).catch(err => console.log("[NourishX] Targets note:", err.message));
  }
  if (typeof dbFetchDailyLog === "function") {
    dbFetchDailyLog().then(savedLog => {
      if (savedLog) {
        AppState.current = Object.assign(AppState.current, savedLog);
        renderMacroTracker();
      }
    }).catch(err => console.log("[NourishX] Daily log note:", err.message));
  }

  const addWaterBtn = document.getElementById("addWaterBtn");
  if (addWaterBtn) {
    addWaterBtn.addEventListener("click", () => {
      AppState.current.waterDrank++;
      renderMacroTracker();
      if (typeof dbSyncDailyLog === "function") dbSyncDailyLog(AppState.current);
      showToast("Hydration updated! +1 Glass of Water");
    });
  }

  const resetDailyBtn = document.getElementById("resetDailyBtn");
  if (resetDailyBtn) {
    resetDailyBtn.addEventListener("click", () => {
      AppState.current = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, waterDrank: 0 };
      renderMacroTracker();
      if (typeof dbSyncDailyLog === "function") dbSyncDailyLog(AppState.current);
      showToast("Daily log reset for new day.");
    });
  }
}

function renderMacroTracker() {
  const { targets, current } = AppState;

  // Calorie calculation
  const calPercent = Math.min(100, Math.round((current.calories / targets.calories) * 100));
  const calRemaining = Math.max(0, targets.calories - current.calories);

  document.getElementById("calConsumedDisplay").textContent = current.calories.toLocaleString();
  document.getElementById("calTargetDisplay").textContent = targets.calories.toLocaleString();
  document.getElementById("calRemainingDisplay").textContent = `${calRemaining.toLocaleString()} kcal left`;

  // Update Main SVG Circle
  const calCircle = document.getElementById("mainCalorieRing");
  if (calCircle) {
    const circumference = 2 * Math.PI * 45; // r=45
    const offset = circumference - (calPercent / 100) * circumference;
    calCircle.style.strokeDasharray = circumference;
    calCircle.style.strokeDashoffset = offset;
  }

  // Update Individual Macro Bars
  updateMacroBar("proteinBar", "proteinVal", current.protein, targets.protein, "g");
  updateMacroBar("carbsBar", "carbsVal", current.carbs, targets.carbs, "g");
  updateMacroBar("fatBar", "fatVal", current.fat, targets.fat, "g");
  updateMacroBar("fiberBar", "fiberVal", current.fiber, targets.fiber, "g");

  // Water glasses
  const waterContainer = document.getElementById("waterGlassesDisplay");
  if (waterContainer) {
    waterContainer.innerHTML = "";
    for (let i = 1; i <= targets.waterGlasses; i++) {
      const isFilled = i <= current.waterDrank;
      const glass = document.createElement("button");
      glass.className = `p-2 rounded-xl transition-all ${isFilled ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20 scale-105' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`;
      glass.innerHTML = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`;
      glass.title = `Glass ${i} of ${targets.waterGlasses}`;
      glass.onclick = () => {
        AppState.current.waterDrank = i;
        renderMacroTracker();
        if (typeof dbSyncDailyLog === "function") dbSyncDailyLog(AppState.current);
      };
      waterContainer.appendChild(glass);
    }
  }
}

function updateMacroBar(barId, valId, cur, target, unit) {
  const bar = document.getElementById(barId);
  const text = document.getElementById(valId);
  const pct = Math.min(100, Math.round((cur / target) * 100));
  if (bar) bar.style.width = `${pct}%`;
  if (text) text.textContent = `${cur} / ${target}${unit}`;
}

// ==========================================
// 10. AI FOOD SCANNER & MEAL ANALYZER
// ==========================================

function initFoodScanner() {
  const presetContainer = document.getElementById("presetFoodChips");
  if (presetContainer) {
    presetContainer.innerHTML = "";
    FOOD_PRESETS.forEach((food) => {
      const chip = document.createElement("button");
      chip.className = `px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all text-left flex items-center gap-2 ${
        food.id === AppState.activeFood.id
          ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm"
          : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-emerald-300"
      }`;
      chip.innerHTML = `
        <span class="w-2.5 h-2.5 rounded-full ${food.nutriScore === 'A' ? 'bg-emerald-500' : 'bg-rose-500'}"></span>
        <span class="truncate max-w-[170px]">${food.name}</span>
      `;
      chip.addEventListener("click", () => {
        selectFoodPreset(food);
      });
      presetContainer.appendChild(chip);
    });
  }

  // Portion slider
  const portionSlider = document.getElementById("portionSlider");
  const portionMultiplierText = document.getElementById("portionMultiplierText");
  if (portionSlider && portionMultiplierText) {
    portionSlider.addEventListener("input", (e) => {
      const mult = parseFloat(e.target.value);
      portionMultiplierText.textContent = `${mult.toFixed(1)}x`;
      renderScannedFood(AppState.activeFood, mult);
    });
  }

  // Log meal button
  const logMealBtn = document.getElementById("logScannedMealBtn");
  if (logMealBtn) {
    logMealBtn.addEventListener("click", () => {
      const mult = parseFloat(document.getElementById("portionSlider").value || 1);
      const food = AppState.activeFood;
      AppState.current.calories += Math.round(food.baseCalories * mult);
      AppState.current.protein += Math.round(food.macros.protein * mult);
      AppState.current.carbs += Math.round(food.macros.carbs * mult);
      AppState.current.fat += Math.round(food.macros.fat * mult);
      AppState.current.fiber += Math.round(food.macros.fiber * mult);
      renderMacroTracker();
      if (typeof dbSaveMeal === "function") dbSaveMeal(food, mult);
      if (typeof dbSyncDailyLog === "function") dbSyncDailyLog(AppState.current);
      triggerConfetti();
      showToast(`🎉 Logged "${food.name}" to your daily intake!`);
    });
  }

  // File upload simulation
  const dropZone = document.getElementById("foodUploadZone");
  const fileInput = document.getElementById("foodFileInput");
  if (dropZone && fileInput) {
    dropZone.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        simulatePhotoScanning(e.target.files[0].name);
      }
    });
  }

  // Camera capture simulation
  const cameraBtn = document.getElementById("openCameraBtn");
  if (cameraBtn) {
    cameraBtn.addEventListener("click", () => {
      simulatePhotoScanning("Live Camera Stream Snap");
    });
  }

  // Natural language meal logger
  const nlLogBtn = document.getElementById("nlLogSubmitBtn");
  const nlInput = document.getElementById("nlLogInput");
  if (nlLogBtn && nlInput) {
    nlLogBtn.addEventListener("click", () => {
      parseNaturalLanguageMeal(nlInput.value);
    });
    nlInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") parseNaturalLanguageMeal(nlInput.value);
    });
  }

  // Quick NL Chips
  document.querySelectorAll(".quick-nl-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (nlInput) {
        nlInput.value = btn.dataset.query;
        parseNaturalLanguageMeal(btn.dataset.query);
      }
    });
  });

  // Render initial food
  renderScannedFood(AppState.activeFood, 1.0);
}

function selectFoodPreset(food) {
  AppState.activeFood = food;
  const portionSlider = document.getElementById("portionSlider");
  const portionMultiplierText = document.getElementById("portionMultiplierText");
  if (portionSlider) portionSlider.value = 1.0;
  if (portionMultiplierText) portionMultiplierText.textContent = "1.0x";
  
  // Highlight active chip
  initFoodScanner();
  renderScannedFood(food, 1.0);
}

function renderScannedFood(food, multiplier = 1.0) {
  const cal = Math.round(food.baseCalories * multiplier);
  const p = Math.round(food.macros.protein * multiplier);
  const c = Math.round(food.macros.carbs * multiplier);
  const f = Math.round(food.macros.fat * multiplier);
  const fib = Math.round(food.macros.fiber * multiplier);
  const sug = Math.round(food.macros.sugar * multiplier);
  const sod = Math.round(food.macros.sodium * multiplier);

  document.getElementById("scanFoodTitle").textContent = food.name;
  document.getElementById("scanFoodCategory").textContent = food.category;
  document.getElementById("scanFoodImage").src = food.image;
  document.getElementById("scanPortionDisplay").textContent = food.portion;

  document.getElementById("scanCaloriesDisplay").textContent = cal;
  document.getElementById("scanProteinDisplay").textContent = `${p}g`;
  document.getElementById("scanCarbsDisplay").textContent = `${c}g`;
  document.getElementById("scanFatDisplay").textContent = `${f}g`;
  document.getElementById("scanFiberDisplay").textContent = `${fib}g`;
  document.getElementById("scanSugarDisplay").textContent = `${sug}g`;
  document.getElementById("scanSodiumDisplay").textContent = `${sod}mg`;

  // NutriScore & NOVA badges
  const nutriBadge = document.getElementById("scanNutriScore");
  nutriBadge.className = `nutriscore-badge nutri-${food.nutriScore.toLowerCase()}`;
  nutriBadge.textContent = food.nutriScore;

  const novaBadge = document.getElementById("scanNovaScore");
  novaBadge.className = `nova-badge nova-${food.novaGroup}`;
  novaBadge.innerHTML = `<span>NOVA ${food.novaGroup}</span> • <span>${food.novaLabel}</span>`;

  // Glycemic Index
  document.getElementById("scanGiDisplay").textContent = `GI ${food.gi} (${food.giLabel})`;

  // Highlights
  const highlightList = document.getElementById("scanHighlightsList");
  highlightList.innerHTML = "";
  food.highlights.forEach((item) => {
    const li = document.createElement("li");
    li.className = "flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300";
    li.innerHTML = `
      <svg class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
      <span>${item}</span>
    `;
    highlightList.appendChild(li);
  });

  // Micros
  const microContainer = document.getElementById("scanMicrosGrid");
  microContainer.innerHTML = "";
  food.micros.forEach((micro) => {
    const item = document.createElement("div");
    item.className = "p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800";
    item.innerHTML = `
      <div class="flex justify-between items-center text-xs font-semibold mb-1">
        <span class="text-slate-700 dark:text-slate-200">${micro.name}</span>
        <span class="text-emerald-600 dark:text-emerald-400 font-bold">${micro.amount}</span>
      </div>
      <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
        <div class="bg-emerald-500 h-full rounded-full" style="width: ${Math.min(100, micro.percent)}%"></div>
      </div>
    `;
    microContainer.appendChild(item);
  });

  // Verdict
  document.getElementById("scanVerdictDisplay").textContent = food.dietitianVerdict;
}

function simulatePhotoScanning(label) {
  const overlay = document.getElementById("scanLoadingOverlay");
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");

  setTimeout(() => {
    overlay.classList.remove("flex");
    overlay.classList.add("hidden");

    // Randomize or select one
    const randomFood = FOOD_PRESETS[Math.floor(Math.random() * (FOOD_PRESETS.length - 1))];
    selectFoodPreset(randomFood);
    showToast(`✨ Food Vision identified: "${randomFood.name}" with 98.4% confidence!`);
  }, 1600);
}

function parseNaturalLanguageMeal(query) {
  if (!query || query.trim() === "") return;
  const q = query.toLowerCase();

  // Smart heuristic nutrition estimator
  let customFood = {
    id: "custom-" + Date.now(),
    name: query.length > 36 ? query.substring(0, 36) + "..." : query,
    category: "Logged Meal",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    portion: "1 custom portion",
    portionMultiplier: 1.0,
    baseCalories: 450,
    macros: { protein: 25, carbs: 45, fiber: 6, fat: 18, sugar: 6, sodium: 520 },
    nutriScore: "B",
    novaGroup: 2,
    novaLabel: "Culinary Preparation",
    gi: 45,
    giLabel: "Moderate GI",
    micros: [
      { name: "Estimated Vitamin C", amount: "35% DV", percent: 35 },
      { name: "Estimated Iron", amount: "20% DV", percent: 20 },
      { name: "Estimated Potassium", amount: "420mg", percent: 14 }
    ],
    highlights: [
      "Natural language ingredients parsed successfully.",
      "Balanced distribution of macronutrients detected.",
      "Adequate protein support for lean muscle retention."
    ],
    dietitianVerdict: `Analysis for "${query}": A solid nutritious choice. Ensure you complement with high-fiber leafy greens or citrus fruits to maximize micronutrient bioavailability.`
  };

  // Keyword modifiers
  if (q.includes("pizza") || q.includes("burger") || q.includes("fries") || q.includes("soda")) {
    customFood.baseCalories = 850;
    customFood.macros = { protein: 22, carbs: 92, fiber: 3, fat: 42, sugar: 14, sodium: 1350 };
    customFood.nutriScore = "D";
    customFood.novaGroup = 4;
    customFood.novaLabel = "Ultra-Processed";
    customFood.gi = 72;
    customFood.giLabel = "High GI";
    customFood.dietitianVerdict = "High caloric density detected. Consider balancing out your next meal with raw fibrous vegetables and extra hydration to flush excess sodium.";
  } else if (q.includes("salad") || q.includes("salmon") || q.includes("quinoa") || q.includes("oats")) {
    customFood.baseCalories = 420;
    customFood.macros = { protein: 32, carbs: 36, fiber: 11, fat: 15, sugar: 4, sodium: 340 };
    customFood.nutriScore = "A";
    customFood.novaGroup = 1;
    customFood.novaLabel = "Whole Unprocessed";
    customFood.gi = 28;
    customFood.giLabel = "Low GI";
  } else if (q.includes("egg") || q.includes("chicken") || q.includes("steak") || q.includes("protein")) {
    customFood.baseCalories = 480;
    customFood.macros = { protein: 42, carbs: 20, fiber: 4, fat: 22, sugar: 2, sodium: 440 };
    customFood.nutriScore = "A";
  }

  AppState.activeFood = customFood;
  renderScannedFood(customFood, 1.0);
  showToast(`Parsed: "${query}" (Est. ${customFood.baseCalories} kcal)`);
}

// ==========================================
// 11. 7-DAY BALANCED DIET PLANNER
// ==========================================

function initMealPlanner() {
  const planNavButtons = document.querySelectorAll(".diet-filter-btn");
  planNavButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      planNavButtons.forEach((b) => b.classList.remove("active", "bg-emerald-500", "text-white"));
      btn.classList.add("active", "bg-emerald-500", "text-white");
      AppState.activeDietKey = btn.dataset.diet;
      renderMealPlan();
    });
  });

  const dayButtons = document.querySelectorAll(".day-pill-btn");
  dayButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      dayButtons.forEach((b) => b.classList.remove("active", "bg-emerald-500", "text-white"));
      btn.classList.add("active", "bg-emerald-500", "text-white");
      AppState.activeDayIndex = index;
      renderMealPlan();
    });
  });

  renderMealPlan();
}

function renderMealPlan() {
  const diet = MEAL_PLANS[AppState.activeDietKey] || MEAL_PLANS.balanced;
  const dayData = diet.days[AppState.activeDayIndex] || diet.days[0];

  document.getElementById("planDietTitle").textContent = diet.title;
  document.getElementById("planDietDesc").textContent = diet.desc;
  document.getElementById("planTargetKcal").textContent = diet.targetKcal;
  document.getElementById("planActiveDayLabel").textContent = `${dayData.day}'s Curated Menu`;

  const mealsGrid = document.getElementById("planMealsContainer");
  mealsGrid.innerHTML = "";

  dayData.meals.forEach((meal, mealIndex) => {
    const card = document.createElement("div");
    card.className = "glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all";
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">${meal.type}</span>
          <span class="text-xs font-bold text-slate-500 dark:text-slate-400">${meal.kcal} kcal</span>
        </div>
        <h4 class="font-bold text-slate-900 dark:text-white text-base mb-2 leading-snug">${meal.title}</h4>
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
          <span class="text-emerald-600 dark:text-emerald-400">P: ${meal.p}g</span> • 
          <span class="text-amber-600 dark:text-amber-400">C: ${meal.c}g</span> • 
          <span class="text-cyan-600 dark:text-cyan-400">F: ${meal.f}g</span>
        </div>
        <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-300 mb-4 border border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
          <span class="text-emerald-500 font-bold">✨ Key Superfood:</span> ${meal.superfood}
        </div>
      </div>
      <div class="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button class="swap-meal-btn text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 transition-colors" data-day="${AppState.activeDayIndex}" data-meal="${mealIndex}">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Swap Alternative
        </button>
        <button class="log-plan-meal-btn ml-auto text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1" data-kcal="${meal.kcal}" data-p="${meal.p}" data-c="${meal.c}" data-f="${meal.f}" data-title="${meal.title}">
          + Add to Tracker
        </button>
      </div>
    `;
    mealsGrid.appendChild(card);
  });

  // Attach event listeners for swap and add buttons
  document.querySelectorAll(".swap-meal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      swapMealItem(parseInt(btn.dataset.day), parseInt(btn.dataset.meal));
    });
  });

  document.querySelectorAll(".log-plan-meal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      AppState.current.calories += parseInt(btn.dataset.kcal);
      AppState.current.protein += parseInt(btn.dataset.p);
      AppState.current.carbs += parseInt(btn.dataset.c);
      AppState.current.fat += parseInt(btn.dataset.f);
      renderMacroTracker();

      const planMeal = {
        name: btn.dataset.title,
        category: "Meal Plan",
        baseCalories: parseInt(btn.dataset.kcal),
        macros: { protein: parseInt(btn.dataset.p), carbs: parseInt(btn.dataset.c), fat: parseInt(btn.dataset.f), fiber: 4, sugar: 2, sodium: 350 },
        nutriScore: "A",
        novaGroup: 1
      };
      if (typeof dbSaveMeal === "function") dbSaveMeal(planMeal, 1.0);
      if (typeof dbSyncDailyLog === "function") dbSyncDailyLog(AppState.current);

      showToast(`Added "${btn.dataset.title}" to daily log!`);
    });
  });
}

function swapMealItem(dayIndex, mealIndex) {
  const alternatives = [
    { title: "Pan-Seared Halibut with Cauliflower Puree & Roasted Asparagus", kcal: 520, p: 44, c: 18, f: 22, superfood: "Selenium & Sulforaphane" },
    { title: "Grilled Tempeh Buddha Bowl with Tahini Drizzle & Sprouted Greens", kcal: 490, p: 28, c: 52, f: 18, superfood: "Prebiotics & Probiotics" },
    { title: "Grass-Fed Beef Chili with Kidney Beans & Diced Avocado", kcal: 580, p: 42, c: 46, f: 20, superfood: "Heme Iron & Zinc" },
    { title: "Chia & Blueberry Protein Parfait with Crushed Raw Walnuts", kcal: 360, p: 26, c: 32, f: 14, superfood: "Polyphenols & Omega-3" }
  ];

  const currentMeal = MEAL_PLANS[AppState.activeDietKey].days[dayIndex].meals[mealIndex];
  const nextAlt = alternatives[Math.floor(Math.random() * alternatives.length)];
  
  currentMeal.title = nextAlt.title;
  currentMeal.kcal = nextAlt.kcal;
  currentMeal.p = nextAlt.p;
  currentMeal.c = nextAlt.c;
  currentMeal.f = nextAlt.f;
  currentMeal.superfood = nextAlt.superfood;

  renderMealPlan();
  showToast("Swapped with a delicious nutritionist-approved alternative!");
}

// ==========================================
// 12. GROCERY LIST GENERATOR
// ==========================================

function initGroceryModal() {
  const openBtn = document.getElementById("openGroceryBtn");
  const modal = document.getElementById("groceryModal");
  const closeBtn = document.getElementById("closeGroceryBtn");
  const copyBtn = document.getElementById("copyGroceryBtn");
  const printBtn = document.getElementById("printGroceryBtn");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      populateGroceryList();
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const items = Array.from(document.querySelectorAll("#groceryChecklistContainer li label")).map(l => l.innerText).join("\n");
      navigator.clipboard.writeText("NourishX Smart Grocery List:\n\n" + items);
      showToast("📋 Grocery list copied to clipboard!");
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

function populateGroceryList() {
  const container = document.getElementById("groceryChecklistContainer");
  if (!container) return;

  const categories = [
    {
      name: "🥦 Fresh Produce & Superfoods",
      items: ["Baby Spinach & Wild Arugula (2 tubs)", "Avocados (4 large)", "Blueberries & Blackberries (3 punnets)", "Broccoli Crowns & Asparagus", "Sweet Potatoes & Japanese Yams (2kg)", "Lemons & Limes (1 bag)", "Fresh Garlic & Ginger Root"]
    },
    {
      name: "🥩 Clean Proteins & Fish",
      items: ["Wild Alaskan Salmon Fillets (600g)", "Organic Pasture-Raised Eggs (2 dozen)", "Free-Range Chicken Breast (1kg)", "Extra-Firm Organic Tofu or Tempeh", "Grass-Fed Lean Beef Sirloin (500g)", "Canned Wild Sardines / Tuna in Olive Oil"]
    },
    {
      name: "🌾 Whole Grains & Pantry Staples",
      items: ["Tricolor Quinoa (1 bag)", "Rolled Steel-Cut Oats (1 bag)", "Brown Basmati Rice", "Chia Seeds & Ground Flaxseed", "Extra Virgin Cold-Pressed Olive Oil", "Raw Walnuts & Pumpkin Seeds", "Raw Organic Honey & Apple Cider Vinegar"]
    },
    {
      name: "🥛 Fermented Dairy & Milks",
      items: ["Plain Whole Milk Greek Yogurt (1kg)", "Unsweetened Almond / Oat Milk (2 cartons)", "Organic Feta Cheese block", "Probiotic Kefir Drink (1 bottle)"]
    }
  ];

  container.innerHTML = "";
  categories.forEach((cat) => {
    const section = document.createElement("div");
    section.className = "mb-4";
    section.innerHTML = `
      <h5 class="font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">${cat.name}</h5>
      <ul class="space-y-1.5 pl-1">
        ${cat.items.map((item, idx) => `
          <li class="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
            <input type="checkbox" id="groc-${cat.name.substring(0,3)}-${idx}" class="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 border-slate-300 dark:border-slate-700">
            <label for="groc-${cat.name.substring(0,3)}-${idx}" class="cursor-pointer select-none">${item}</label>
          </li>
        `).join("")}
      </ul>
    `;
    container.appendChild(section);
  });
}

// ==========================================
// 13. DEFICIENCY & SYMPTOM CHECKER
// ==========================================

function initSymptomChecker() {
  const symptomCheckboxes = document.querySelectorAll(".symptom-toggle-input");
  symptomCheckboxes.forEach((chk) => {
    chk.addEventListener("change", evaluateSymptoms);
  });

  evaluateSymptoms();
}

function evaluateSymptoms() {
  const checked = Array.from(document.querySelectorAll(".symptom-toggle-input:checked")).map(el => el.value);
  const resultCard = document.getElementById("symptomResultsArea");
  if (!resultCard) return;

  if (checked.length === 0) {
    resultCard.innerHTML = `
      <div class="text-center py-10 text-slate-400">
        <svg class="w-12 h-12 mx-auto mb-2 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        <p class="text-sm font-semibold">Select one or more symptoms above to run the AI micronutrient diagnostic.</p>
      </div>
    `;
    return;
  }

  // Aggregate deficiencies and foods
  const detectedDeficiencies = new Set();
  const recommendedFoods = [];
  const explanations = [];

  checked.forEach((symKey) => {
    const data = SYMPTOM_DATABASE[symKey];
    if (data) {
      data.deficiencies.forEach(d => detectedDeficiencies.add(d));
      data.remedyFoods.forEach(f => recommendedFoods.push(f));
      explanations.push(`<strong>${data.name}:</strong> ${data.science}`);
    }
  });

  resultCard.innerHTML = `
    <div class="space-y-4 animate-fade-in">
      <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <h5 class="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
          Likely Sub-Clinical Deficiencies Identified
        </h5>
        <div class="flex flex-wrap gap-2 mt-2">
          ${Array.from(detectedDeficiencies).map(d => `
            <span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300">${d}</span>
          `).join("")}
        </div>
      </div>

      <div>
        <h5 class="font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">🎯 Targeted Nutrient-Dense Superfoods</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          ${recommendedFoods.slice(0, 6).map(f => `
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span class="font-bold text-xs text-emerald-600 dark:text-emerald-400 block mb-0.5">${f.name}</span>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">${f.reason}</p>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3 space-y-1">
        ${explanations.slice(0, 2).map(exp => `<p>${exp}</p>`).join("")}
      </div>
    </div>
  `;
}

// ==========================================
// 14. FOOD COMPARISON ARENA
// ==========================================

function initFoodCompare() {
  const select = document.getElementById("compareSelect");
  if (select) {
    select.addEventListener("change", (e) => {
      renderComparison(e.target.value);
    });
    renderComparison(select.value);
  }
}

function renderComparison(key) {
  const item = FOOD_COMPARISONS[key];
  if (!item) return;

  document.getElementById("compNameA").textContent = item.nameA;
  document.getElementById("compNameB").textContent = item.nameB;
  document.getElementById("compPortion").textContent = `Portion: ${item.portion}`;

  // Food A
  document.getElementById("compCalA").textContent = item.a.cal;
  document.getElementById("compProtA").textContent = `${item.a.p}g`;
  document.getElementById("compCarbA").textContent = `${item.a.c}g`;
  document.getElementById("compFiberA").textContent = `${item.a.fiber}g`;
  document.getElementById("compGiA").textContent = item.a.gi;
  document.getElementById("compBadgeA").textContent = item.a.score;

  // Food B
  document.getElementById("compCalB").textContent = item.b.cal;
  document.getElementById("compProtB").textContent = `${item.b.p}g`;
  document.getElementById("compCarbB").textContent = `${item.b.c}g`;
  document.getElementById("compFiberB").textContent = `${item.b.fiber}g`;
  document.getElementById("compGiB").textContent = item.b.gi;
  document.getElementById("compBadgeB").textContent = item.b.score;

  document.getElementById("compVerdictText").textContent = item.verdict;
}

// ==========================================
// 15. INGREDIENT & FOOD LABEL DECODER
// ==========================================

function initLabelDecoder() {
  const presetButtons = document.querySelectorAll(".label-sample-btn");
  const input = document.getElementById("labelTextInput");
  const decodeBtn = document.getElementById("decodeLabelBtn");

  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const sample = SAMPLE_LABELS[btn.dataset.sample];
      if (sample && input) {
        input.value = sample.rawText;
        renderLabelAnalysis(sample.title, sample.analysis);
      }
    });
  });

  if (decodeBtn && input) {
    decodeBtn.addEventListener("click", () => {
      runCustomLabelDecode(input.value);
    });
  }

  // Initial render
  if (SAMPLE_LABELS.energyBar) {
    renderLabelAnalysis(SAMPLE_LABELS.energyBar.title, SAMPLE_LABELS.energyBar.analysis);
  }
}

function runCustomLabelDecode(text) {
  if (!text || text.trim() === "") return;
  const t = text.toLowerCase();
  const flags = [];

  // Rules
  if (t.includes("corn syrup") || t.includes("fructose") || t.includes("dextrose") || t.includes("sugar")) {
    flags.push({ text: "Added High-Glycemic Sugars", severity: "danger", note: "Spikes blood insulin and causes hepatic metabolic burden." });
  }
  if (t.includes("palm oil") || t.includes("hydrogenated") || t.includes("shortening")) {
    flags.push({ text: "Damaged / Industrial Saturated Fats", severity: "danger", note: "Promotes systemic vascular inflammation." });
  }
  if (t.includes("sucralose") || t.includes("aspartame") || t.includes("acesulfame")) {
    flags.push({ text: "Artificial Non-Nutritive Sweeteners", severity: "warning", note: "May alter gut microbiome profile and insulin sensitivity." });
  }
  if (t.includes("red 40") || t.includes("yellow 5") || t.includes("blue 1") || t.includes("artificial flavor")) {
    flags.push({ text: "Petroleum Food Dyes & Synthetic Flavors", severity: "danger", note: "Flagged by pediatric and digestive health watchdogs." });
  }

  if (flags.length === 0) {
    flags.push({ text: "Clean Whole Food Ingredients", severity: "success", note: "No concerning industrial additives or hidden sugar traps detected." });
  }

  const analysis = {
    novaScore: flags.length > 2 ? 4 : (flags.length > 0 ? 3 : 1),
    novaText: flags.length > 2 ? "Ultra-Processed Formulation" : "Processed / Minimally Processed",
    flags: flags,
    healthyAlternative: "Choose single-ingredient organic whole food snacks whenever possible."
  };

  renderLabelAnalysis("Custom Scanned Product", analysis);
}

function renderLabelAnalysis(title, analysis) {
  const container = document.getElementById("labelAnalysisOutput");
  if (!container) return;

  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h5 class="font-bold text-sm text-slate-900 dark:text-white">${title}</h5>
          <span class="text-xs text-slate-500">${analysis.novaText}</span>
        </div>
        <span class="nova-badge nova-${analysis.novaScore}">NOVA ${analysis.novaScore}</span>
      </div>

      <div class="space-y-2">
        <h6 class="text-xs font-bold uppercase tracking-wider text-slate-500">Decoded Additives & Risk Factors:</h6>
        ${analysis.flags.map(f => `
          <div class="p-3 rounded-xl ${f.severity === 'danger' ? 'bg-rose-500/10 border-rose-500/30' : (f.severity === 'warning' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-emerald-500/30')} border text-xs">
            <span class="font-bold ${f.severity === 'danger' ? 'text-rose-600 dark:text-rose-400' : (f.severity === 'warning' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400')} block mb-0.5">${f.text}</span>
            <p class="text-slate-600 dark:text-slate-300 text-[11px]">${f.note}</p>
          </div>
        `).join("")}
      </div>

      <div class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
        <span class="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">🌿 Healthier NourishX Alternative:</span>
        <p class="text-slate-600 dark:text-slate-300">${analysis.healthyAlternative}</p>
      </div>
    </div>
  `;
}

// ==========================================
// 16. AI CLINICAL NUTRITIONIST CHAT
// ==========================================

function initAIChat() {
  const chatMessages = document.getElementById("chatMessagesContainer");
  const chatInput = document.getElementById("chatInputField");
  const sendBtn = document.getElementById("chatSendBtn");
  const promptChips = document.querySelectorAll(".chat-preset-chip");

  promptChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      sendChatMessage(chip.dataset.prompt);
    });
  });

  if (sendBtn && chatInput) {
    sendBtn.addEventListener("click", () => {
      sendChatMessage(chatInput.value);
    });
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendChatMessage(chatInput.value);
    });
  }
}

async function sendChatMessage(text) {
  if (!text || text.trim() === "") return;
  const input = document.getElementById("chatInputField");
  if (input) input.value = "";

  appendChatBubble("user", text);
  if (typeof dbSaveChatMessage === "function") dbSaveChatMessage("user", text);

  // Show typing indicator
  const typingIndicator = appendTypingIndicator();

  // Instant clinical response with realistic typing delay
  setTimeout(() => {
    const aiResponse = generateOfflineAIResponse(text);
    typingIndicator.remove();
    appendChatBubble("ai", aiResponse);
    if (typeof dbSaveChatMessage === "function") dbSaveChatMessage("ai", aiResponse);
  }, 600);
}

function appendChatBubble(sender, text) {
  const container = document.getElementById("chatMessagesContainer");
  if (!container) return;

  const bubbleWrapper = document.createElement("div");
  bubbleWrapper.className = `flex gap-3 text-xs md:text-sm ${sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`;

  if (sender === "ai") {
    bubbleWrapper.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs border border-emerald-500/30">
        AI
      </div>
      <div class="chat-bubble-ai p-3.5 max-w-[85%] text-slate-800 dark:text-slate-200 leading-relaxed shadow-sm">
        ${formatMarkdown(text)}
      </div>
    `;
  } else {
    bubbleWrapper.innerHTML = `
      <div class="chat-bubble-user p-3.5 max-w-[85%] text-white leading-relaxed shadow-sm">
        ${escapeHtml(text)}
      </div>
      <div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 font-bold text-xs">
        ME
      </div>
    `;
  }

  container.appendChild(bubbleWrapper);
  container.scrollTop = container.scrollHeight;
}

function appendTypingIndicator() {
  const container = document.getElementById("chatMessagesContainer");
  const el = document.createElement("div");
  el.className = "flex gap-3 text-xs justify-start items-center";
  el.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs border border-emerald-500/30">AI</div>
    <div class="p-3 chat-bubble-ai rounded-xl flex gap-1.5 items-center">
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
    </div>
  `;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
  return el;
}

function generateOfflineAIResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("banana") && (q.includes("night") || q.includes("sleep") || q.includes("evening"))) {
    return "Eating a banana before bed is actually highly beneficial! Bananas are rich in **magnesium** (relaxing skeletal muscles) and **vitamin B6** (an essential co-factor to convert dietary tryptophan into serotonin and sleep-inducing melatonin). The small amount of natural carbohydrates also helps ferry tryptophan across the blood-brain barrier.";
  }
  if (q.includes("vegetarian") && (q.includes("protein") || q.includes("100g") || q.includes("muscle"))) {
    return "Reaching 100g+ of vegetarian protein daily is easily achievable without processed powders:\n- **1 cup Cooked Lentils / Edamame:** 18g protein\n- **1 cup Fat-Free Greek Yogurt / Paneer:** 20g - 28g protein\n- **100g Firm Tempeh / Tofu:** 20g protein\n- **3 tbsp Hemp Hearts (sprinkled on meals):** 10g complete protein\n- **2 Pastured Eggs:** 14g high-biological-value protein\n\n*Pro-tip:* Combine legumes with whole grains (e.g., lentils + brown basmati) to achieve a complete amino acid profile!";
  }
  if (q.includes("carbs") && (q.includes("7 pm") || q.includes("night") || q.includes("late"))) {
    return "The myth that carbs turn directly into fat after 7:00 PM has been disproven. Your metabolic rate during sleep is only slightly lower than when resting during the day. What matters is your **24-hour total energy balance** and carbohydrate quality. In fact, moderate complex carbohydrates at dinner lower cortisol and promote deep restorative REM sleep.";
  }
  if (q.includes("sugar") || q.includes("natural vs added") || q.includes("fruit")) {
    return "There is a profound biological difference between **intrinsic fruit sugars (fructose)** and **added high-fructose corn syrup**:\n- Whole fruit encases sugar within an intact dietary **fiber matrix**, slowing stomach emptying and blunting insulin spikes.\n- Refined added sugars enter portal circulation unimpeded, triggering de novo lipogenesis in the liver and systemic inflammation. Never fear whole fruit!";
  }
  if (q.includes("cholesterol") || q.includes("ldl") || q.includes("heart")) {
    return "To lower ApoB and LDL cholesterol naturally through nutrition:\n1. **Increase Viscous Soluble Fiber:** 10g daily from oats, psyllium husk, beans, and apples actively binds bile acids in the intestine.\n2. **Replace Saturated Fats with MUFAs:** Extra virgin olive oil, avocados, and raw nuts.\n3. **Include Plant Sterols:** 2g daily can reduce LDL by 8-10%.\n4. **Exercise:** Aerobic training elevates HDL and clears triglyceride-rich VLDL.";
  }

  // Fallback intelligent response
  return `Thank you for your question regarding **"${query}"**!\n\nFrom a clinical nutrition perspective, a healthy dietary foundation prioritizes:\n1. **Whole-Food Matrix (NOVA 1-2):** Minimizing industrial ultra-processed foods to support insulin sensitivity and the gut microbiome.\n2. **Protein Distribution:** Consuming 25-40g of complete protein every 3-5 hours to stimulate muscle protein synthesis.\n3. **Micronutrient Density:** Meeting your RDA for magnesium, potassium, vitamin D3, and omega-3s.\n\n*Would you like me to generate a tailored meal plan or food swap to help with this?*`;
}

// ==========================================
// 17. TDEE & CALORIE CALCULATOR MODAL
// ==========================================

function initTDEECalculator() {
  const openBtn = document.getElementById("openTdeeModalBtn");
  const modal = document.getElementById("tdeeModal");
  const closeBtn = document.getElementById("closeTdeeModalBtn");
  const form = document.getElementById("tdeeForm");
  const applyBtn = document.getElementById("applyTdeeResultsBtn");

  let calculatedTargets = null;

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const age = parseInt(document.getElementById("calcAge").value);
      const gender = document.getElementById("calcGender").value;
      const weight = parseFloat(document.getElementById("calcWeight").value);
      const height = parseFloat(document.getElementById("calcHeight").value);
      const activity = parseFloat(document.getElementById("calcActivity").value);
      const goal = document.getElementById("calcGoal").value;

      // Mifflin-St Jeor Equation
      let bmr = (10 * weight) + (6.25 * height) - (5 * age);
      if (gender === "male") bmr += 5;
      else bmr -= 161;

      let tdee = bmr * activity;

      // Goal adjustments
      let targetKcal = tdee;
      if (goal === "lose") targetKcal = tdee - 450; // deficit
      else if (goal === "gain") targetKcal = tdee + 350; // surplus

      targetKcal = Math.round(targetKcal);

      // Macro breakdown
      const proteinGrams = Math.round(weight * (goal === "gain" ? 2.2 : 1.8));
      const fatGrams = Math.round((targetKcal * 0.25) / 9);
      const carbsGrams = Math.round((targetKcal - (proteinGrams * 4) - (fatGrams * 9)) / 4);
      const fiberGrams = Math.round(Math.max(30, (targetKcal / 1000) * 15));

      calculatedTargets = {
        calories: targetKcal,
        protein: proteinGrams,
        carbs: carbsGrams,
        fat: fatGrams,
        fiber: fiberGrams,
        waterGlasses: 8
      };

      document.getElementById("tdeeResultsSection").classList.remove("hidden");
      document.getElementById("tdeeBmrDisplay").textContent = `${Math.round(bmr)} kcal`;
      document.getElementById("tdeeTdeeDisplay").textContent = `${Math.round(tdee)} kcal`;
      document.getElementById("tdeeTargetDisplay").textContent = `${targetKcal} kcal`;
      document.getElementById("tdeeProtDisplay").textContent = `${proteinGrams}g`;
      document.getElementById("tdeeCarbDisplay").textContent = `${carbsGrams}g`;
      document.getElementById("tdeeFatDisplay").textContent = `${fatGrams}g`;
    });
  }

  if (applyBtn && modal) {
    applyBtn.addEventListener("click", () => {
      if (calculatedTargets) {
        AppState.targets = calculatedTargets;
        renderMacroTracker();
        modal.classList.remove("flex");
        modal.classList.add("hidden");

        const goal = document.getElementById("calcGoal") ? document.getElementById("calcGoal").value : "maintain";
        if (typeof dbSaveTargets === "function") dbSaveTargets(calculatedTargets, goal);

        triggerConfetti();
        showToast("🎯 Applied personalized calorie & macro targets to your dashboard!");
      }
    });
  }
}

// ==========================================
// 18. UTILITY HELPERS (Confetti, Toast, Markdown)
// ==========================================

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "fixed bottom-6 right-6 z-50 glass-panel px-4 py-3 rounded-xl shadow-xl border border-emerald-500/40 text-xs md:text-sm font-semibold flex items-center gap-2.5 bg-slate-900/90 text-white animate-fade-in";
  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function triggerConfetti() {
  if (window.confetti) {
    window.confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#10b981", "#06b6d4", "#f59e0b", "#34d399"]
    });
  }
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function formatMarkdown(text) {
  let html = escapeHtml(text);
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Lists
  html = html.replace(/^\s*-\s+(.*)$/gm, '<li class="ml-4 list-disc">$1</li>');
  // Newlines
  html = html.replace(/\n\n/g, '<br><br>');
  html = html.replace(/\n/g, '<br>');
  return html;
}
