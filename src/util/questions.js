// Fetch the question list from the bundled JSON data file.
export async function fetchQuestions() {
  const res = await fetch("/data/questions.json");
  if (!res.ok) throw new Error("تعذر تحميل الأسئلة");
  const data = await res.json();
  return data.questions || [];
}

// Phase metadata: labels, icons, colors, and descriptions.
export const PHASES = {
  morning: {
    id: "morning",
    arabic: "الصباح",
    english: "MORNING MINING PHASE",
    icon: "light_mode",
    color: "#fbbf24",
    buttonText: "#1e293b",
    title: "التنقيب الصباحي",
    description: "استكشاف الأهداف وتحديد مسار اليوم.",
    reportIcon: "wb_twilight",
  },
  midday: {
    id: "midday",
    arabic: "منتصف النهار",
    english: "AUTOPILOT INTERRUPT",
    icon: "wb_sunny",
    color: "#fb923c",
    buttonText: "#1e293b",
    title: "مقاطعات النهار",
    description: "إدارة التركيز خلال فترات النشاط القصوى.",
    reportIcon: "grid_view",
  },
  evening: {
    id: "evening",
    arabic: "المساء",
    english: "INSIGHT SMELTING",
    icon: "nightlight",
    color: "#6366f1",
    buttonText: "#ffffff",
    title: "صهر المساء",
    description: "تحليل البيانات اليومية واستخلاص البصائر.",
    reportIcon: "nightlight",
  },
};

// Canonical order in which phases appear.
export const PHASE_ORDER = ["morning", "midday", "evening"];

// Return whether the given id is a valid phase id.
export function isPhase(id) {
  return Object.prototype.hasOwnProperty.call(PHASES, id);
}

// Return the phase matching the hour of the given date.
export function getPhaseByTime(date = new Date()) {
  const h = date.getHours();
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 18) return "midday";
  return "evening";
}
