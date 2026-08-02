// Font sizes used for the word cloud, largest first.
const WORD_SIZES = [
  "text-4xl",
  "text-3xl",
  "text-2xl",
  "text-xl",
  "text-lg",
  "text-base",
];

// Colors cycled through for word cloud words.
const WORD_COLORS = [
  "text-m3-primary",
  "text-m3-tertiary",
  "text-m3-on-surface",
  "text-m3-on-surface-variant",
  "text-secondary",
  "text-accent",
  "text-m3-outline",
];

// Word cloud of recurring keywords plus the vision clarity ring.
export default function InsightsVisuals({ keywords, clarity }) {
  return (
    <section className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-card p-6 rounded-xl min-h-[280px] flex flex-col">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-text">
          <span className="material-symbols-outlined text-primary">psychology</span>
          أنماط تفكيرك (سحابة الكلمات)
        </h3>
        <div className="flex-grow flex flex-wrap items-center justify-center gap-5 p-4">
          {keywords.length > 0 ? (
            keywords.map((kw, i) => (
              <span
                key={`${kw.word}-${i}`}
                className={`${WORD_SIZES[i % WORD_SIZES.length]} ${
                  WORD_COLORS[i % WORD_COLORS.length]
                } font-semibold cursor-default transition-transform duration-200 hover:scale-110 hover:text-m3-primary`}
                style={{ opacity: Math.max(0.5, 1 - i * 0.05) }}
                title={`${kw.count} مرة`}
              >
                {kw.word}
              </span>
            ))
          ) : (
            <p className="text-text-muted/50 text-sm">
              اكتب استجاباتك لتظهر الكلمات الأكثر تكراراً هنا.
            </p>
          )}
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl flex flex-col justify-center items-center text-center">
        <div className="w-32 h-32 mb-4 relative">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#2d3449"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#6366F1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${clarity.percent}, 100`}
              style={{ transition: "stroke-dasharray 0.9s ease-in-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-primary">
            {clarity.percent}%
          </div>
        </div>
        <h4 className="text-lg font-semibold mb-1 text-text">وضوح الرؤية</h4>
        <p className="text-sm text-text-muted leading-relaxed">
          {clarity.answered === 0
            ? "أكمل خطة اللعبة (المكونات الستة) لقياس وضوح رؤيتك."
            : clarity.percent >= 80
              ? "وصلت لمستوى عالٍ من الوضوح. أنت الآن جاهز للتنفيذ."
              : `أكملت ${clarity.answered} من ${clarity.total} مكوناً من خطة اللعبة لرفع مستوى وضوح رؤيتك.`}
        </p>
      </div>
    </section>
  );
}
