import { PHASE_ORDER } from "./questions";

// Build aggregate report stats: totals plus per-phase progress and status.
export function buildReportStats(questions, answers) {
  const isAnswered = (q) => (answers[q.id] || "").trim();
  const total = questions.length;
  const answered = questions.filter(isAnswered).length;
  const byPhase = PHASE_ORDER.map((pid) => {
    const qs = questions.filter((q) => q.phase === pid);
    const count = qs.filter(isAnswered).length;
    const status =
      qs.length === 0
        ? "empty"
        : count >= qs.length
          ? "completed"
          : count > 0
            ? "in-progress"
            : "not-started";
    return {
      phase: pid,
      total: qs.length,
      answered: count,
      percent: qs.length ? Math.round((count / qs.length) * 100) : 0,
      status,
    };
  });
  return {
    total,
    answered,
    percent: total ? Math.round((answered / total) * 100) : 0,
    byPhase,
  };
}

// Localized date string used in the report header.
export function buildDateString() {
  try {
    return new Intl.DateTimeFormat("ar-SA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      calendar: "islamic-uma",
    }).format(new Date());
  } catch {
    return new Date().toLocaleDateString("ar");
  }
}

// Filename for the downloaded PDF, e.g. "الأحد 15 أغسطس 2026 Ofoq Report.pdf".
export function buildPdfFilename() {
  const d = new Date();
  let day;
  let date;
  try {
    day = new Intl.DateTimeFormat("ar", { weekday: "long" }).format(d);
    date = new Intl.DateTimeFormat("ar", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    day = d.toLocaleDateString("ar");
    date = d.toLocaleDateString("ar");
  }
  return `${day} ${date} Ofoq Report.pdf`;
}

// Status message reflecting the current completion level.
export function buildStatusMessage(stats) {
  if (stats.total === 0) return "لم يتم تحميل البيانات بعد.";
  if (stats.answered === 0)
    return "مسار «الأفق» اليوم في مرحلة السكون. قم بإنهاء مهمتك الأولى لتفعيل الرؤية التحليلية.";
  if (stats.answered === stats.total)
    return "اكتمل مسار «الأفق» لهذا اليوم. رؤيتك التحليلية جاهزة.";
  return `أكملت ${stats.answered} من ${stats.total} أسئلة. تابع رحلتك لتكتمل الرؤية التحليلية.`;
}
