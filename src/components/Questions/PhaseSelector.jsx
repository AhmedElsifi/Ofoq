import { Link } from "react-router-dom";
import { PHASES, PHASE_ORDER } from "../../util/questions";

// Tab bar to switch between the three daily phases.
export default function PhaseSelector({ phase }) {
  return (
    <div className="w-full max-w-3xl mb-10">
      <div className="flex items-center gap-1.5 bg-bg-surface/60 backdrop-blur rounded-xl p-1.5 border border-border/40">
        {PHASE_ORDER.map((pid) => {
          const meta = PHASES[pid];
          const active = pid === phase;
          return (
            <Link
              key={pid}
              to={`/questions/${pid}`}
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
              <span className="material-symbols-outlined text-lg">
                {meta.icon}
              </span>
              <span>{meta.arabic}</span>
            </Link>
          );
        })}
      </div>
      <p className="text-center text-xs text-text-muted/60 mt-3">
        مرحلة {PHASES[phase].arabic} · تُعرض الأسئلة تلقائياً حسب وقت اليوم
        (صباحاً / ظهراً / مساءً)
      </p>
    </div>
  );
}
