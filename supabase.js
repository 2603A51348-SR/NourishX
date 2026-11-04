/**
 * NourishX - Supabase Backend Integration Layer
 * Connects frontend state seamlessly to Supabase Postgres database.
 * Features graceful fallback to LocalStorage with zero UI blocking.
 */

const SUPABASE_CONFIG = {
  url: "https://uxqchiiiirqyukmekyax.supabase.co",
  anonKey: "sb_publishable_vcII6FFJrwFGOXp7TFX1oA_uUKgJY3l"
};

// Initialize Supabase Client if SDK is loaded
let supabaseClient = null;
let isSupabaseReady = false;

function initSupabase() {
  try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      isSupabaseReady = true;
      updateSyncStatusUI(true, "Cloud Synced");
      console.log("[NourishX] Supabase client initialized successfully.");
    } else {
      console.warn("[NourishX] Supabase JS SDK not loaded; using offline local state.");
      updateSyncStatusUI(false, "Local Mode");
    }
  } catch (err) {
    console.warn("[NourishX] Supabase initialization notice:", err.message);
    updateSyncStatusUI(false, "Local Mode");
  }
}

// Update the visual status badge in the UI
function updateSyncStatusUI(online, label) {
  const badge = document.getElementById("supabaseStatusBadge");
  if (!badge) return;

  if (online) {
    badge.className = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
    badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span><span>${label}</span>`;
  } else {
    badge.className = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700";
    badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span><span>${label}</span>`;
  }
}

// ============================================================================
// 1. MEALS BACKEND LOGGING
// ============================================================================

async function dbSaveMeal(food, multiplier = 1.0) {
  // Always update LocalStorage immediately for instant UX
  try {
    const existing = JSON.parse(localStorage.getItem("nourishx_logged_meals") || "[]");
    const mealRecord = {
      name: food.name,
      category: food.category || "Logged Meal",
      calories: Math.round(food.baseCalories * multiplier),
      protein: Math.round(food.macros.protein * multiplier),
      carbs: Math.round(food.macros.carbs * multiplier),
      fat: Math.round(food.macros.fat * multiplier),
      fiber: Math.round(food.macros.fiber * multiplier),
      sugar: Math.round(food.macros.sugar * multiplier),
      sodium: Math.round(food.macros.sodium * multiplier),
      nutri_score: food.nutriScore || "A",
      nova_group: food.novaGroup || 1,
      portion: food.portion || "1 serving",
      logged_at: new Date().toISOString()
    };
    existing.unshift(mealRecord);
    localStorage.setItem("nourishx_logged_meals", JSON.stringify(existing.slice(0, 50)));

    // Asynchronously push to Supabase
    if (isSupabaseReady && supabaseClient) {
      const { error } = await supabaseClient.from("meals").insert([mealRecord]);
      if (error) {
        console.warn("[NourishX] Supabase meals sync note:", error.message);
      } else {
        updateSyncStatusUI(true, "Meal Synced to Cloud");
      }
    }
  } catch (err) {
    console.warn("[NourishX] Local meal log handled safely:", err.message);
  }
}

// ============================================================================
// 2. DAILY LOGS & HYDRATION BACKEND SYNC
// ============================================================================

async function dbSyncDailyLog(current) {
  // Always update LocalStorage
  try {
    localStorage.setItem("nourishx_current_day", JSON.stringify(current));

    if (isSupabaseReady && supabaseClient) {
      const today = new Date().toISOString().split("T")[0];
      const payload = {
        log_date: today,
        calories_consumed: current.calories,
        protein: current.protein,
        carbs: current.carbs,
        fat: current.fat,
        fiber: current.fiber,
        water_drank: current.waterDrank,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabaseClient
        .from("daily_logs")
        .upsert(payload, { onConflict: "log_date" });

      if (error) {
        console.warn("[NourishX] Supabase daily_logs sync note:", error.message);
      }
    }
  } catch (err) {
    console.warn("[NourishX] Daily log handled safely:", err.message);
  }
}

async function dbFetchDailyLog() {
  // First load from LocalStorage
  let localData = null;
  try {
    const raw = localStorage.getItem("nourishx_current_day");
    if (raw) localData = JSON.parse(raw);
  } catch (e) {}

  // Attempt Supabase fetch
  if (isSupabaseReady && supabaseClient) {
    try {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabaseClient
        .from("daily_logs")
        .select("*")
        .eq("log_date", today)
        .maybeSingle();

      if (!error && data) {
        return {
          calories: data.calories_consumed || 0,
          protein: Number(data.protein) || 0,
          carbs: Number(data.carbs) || 0,
          fat: Number(data.fat) || 0,
          fiber: Number(data.fiber) || 0,
          waterDrank: data.water_drank || 0
        };
      }
    } catch (err) {
      console.warn("[NourishX] Supabase fetch fallback to local:", err.message);
    }
  }

  return localData;
}

// ============================================================================
// 3. USER TARGETS BACKEND SYNC (TDEE / MACROS)
// ============================================================================

async function dbSaveTargets(targets, goal = "maintain") {
  try {
    localStorage.setItem("nourishx_targets", JSON.stringify(targets));

    if (isSupabaseReady && supabaseClient) {
      const payload = {
        calories: targets.calories,
        protein: targets.protein,
        carbs: targets.carbs,
        fat: targets.fat,
        fiber: targets.fiber,
        water_glasses: targets.waterGlasses,
        goal: goal,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabaseClient.from("user_targets").insert([payload]);
      if (error) {
        console.warn("[NourishX] Targets sync note:", error.message);
      } else {
        updateSyncStatusUI(true, "Targets Synced");
      }
    }
  } catch (err) {
    console.warn("[NourishX] Save targets handled safely:", err.message);
  }
}

async function dbFetchTargets() {
  let localTargets = null;
  try {
    const raw = localStorage.getItem("nourishx_targets");
    if (raw) localTargets = JSON.parse(raw);
  } catch (e) {}

  if (isSupabaseReady && supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from("user_targets")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return {
          calories: data.calories,
          protein: Number(data.protein),
          carbs: Number(data.carbs),
          fat: Number(data.fat),
          fiber: Number(data.fiber),
          waterGlasses: data.water_glasses
        };
      }
    } catch (err) {
      console.warn("[NourishX] Target fetch note:", err.message);
    }
  }

  return localTargets;
}

// ============================================================================
// 4. CHAT HISTORY BACKEND SYNC
// ============================================================================

async function dbSaveChatMessage(sender, message) {
  try {
    if (isSupabaseReady && supabaseClient) {
      await supabaseClient.from("chat_history").insert([
        {
          sender: sender,
          message: message,
          created_at: new Date().toISOString()
        }
      ]);
    }
  } catch (err) {
    // Non-blocking
  }
}

// Auto-initialize when document is loaded
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    initSupabase();
  });
}
