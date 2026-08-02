import { PHASES, PHASE_ORDER } from "../../util/questions";

// Phase tab bar for filtering the report's question list.
export default function ReportQuestionTabs({ questions, answers, activePhase, onChange }) {
  return (
    <div className="flex items-center gap-1.5 bg-bg-surface/60 backdrop-blur rounded-xl p-1.5 border border-border/40 mb-8">
      {PHASE_ORDER.map((pid) => {
        const meta = PHASES[pid];
        const qs = questions.filter((q) => q.phase === pid);
        const answeredCount = qs.filter(
          (q) => (answers[q.id] || "").trim(),
        ).length;
        const active = pid === activePhase;
        return (
          <button
            key={pid}
            onClick={() => onChange(pid)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ${
              active
                ? "bg-bg-hover shadow"
                : "text-text-muted hover:text-[var(--phase-color)]"
            }`}
            style={{
              color: active ? meta.color : undefined,
              "--phase-color": meta.color,
            }}
          >
            <span className="material-symbols-outlined text-lg">{meta.icon}</span>
            <span className="hidden sm:inline">{meta.arabic}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                active ? "" : "bg-bg-hover/60 text-text-muted"
              }`}
              style={
                active
                  ? { color: meta.color, backgroundColor: `${meta.color}1a` }
                  : undefined
              }
            >
              {answeredCount}/{qs.length}
            </span>
          </button>
        );
      })}
    </div>
  );
}
