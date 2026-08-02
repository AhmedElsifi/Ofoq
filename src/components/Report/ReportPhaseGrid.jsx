import { Link } from "react-router-dom";
import { PHASES } from "../../util/questions";

// Status label and badge styling for each phase state.
const STATUS_META = {
  completed: { label: "مكتمل", className: "bg-green-400/10 text-green-400 border-green-400/30" },
  "in-progress": { label: "قيد الإكمال", className: "bg-accent/10 text-accent border-accent/30" },
  "not-started": { label: "لم يبدأ بعد", className: "bg-bg-hover text-text-muted border-border/30" },
  empty: { label: "لا توجد أسئلة", className: "bg-bg-hover text-text-muted border-border/30" },
};

// Grid of phase cards linking back to each phase's questions.
export default function ReportPhaseGrid({ byPhase }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {byPhase.map((p) => {
        const meta = PHASES[p.phase];
        const statusMeta = STATUS_META[p.status] || STATUS_META.empty;
        return (
          <Link
            key={p.phase}
            to={`/questions/${p.phase}`}
            className="glass-card p-6 rounded-xl flex flex-col justify-between min-h-[170px] hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <span
                className="material-symbols-outlined text-3xl"
                style={{ color: meta.color }}
              >
                {meta.reportIcon}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs border font-medium ${statusMeta.className}`}
              >
                {statusMeta.label}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text">{meta.title}</h3>
                <span className="text-xs text-text-muted">
                  {p.answered}/{p.total}
                </span>
              </div>
              <div className="h-1.5 w-full bg-bg-hover rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${p.percent}%`, backgroundColor: meta.color }}
                />
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                {meta.description}
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
