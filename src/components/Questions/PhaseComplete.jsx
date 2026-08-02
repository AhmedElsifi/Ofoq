import { Link } from "react-router-dom";
import { PHASES, PHASE_ORDER } from "../../lib/questions";

// Completion screen shown after finishing a phase.
export default function PhaseComplete({ phase, answered, total, onReview }) {
  const meta = PHASES[phase];
  const idx = PHASE_ORDER.indexOf(phase);
  // Determine the following phase, if any.
  const nextPhase =
    idx >= 0 && idx < PHASE_ORDER.length - 1 ? PHASE_ORDER[idx + 1] : null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
      <div className="glass-card w-full max-w-xl rounded-2xl p-8 md:p-12 flex flex-col items-center text-center gap-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${meta.color}1a` }}
        >
          <span
            className="material-symbols-outlined text-3xl"
            style={{ color: meta.color }}
          >
            {meta.icon}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-text">
          أحسنت! أكملت مرحلة {meta.arabic}
        </h1>
        <p className="text-text-muted leading-relaxed">
          أجبت على {answered} من {total} أسئلة.
          {answered < total ? " يمكنك العودة لإكمال البقية." : " بصائرك أصبحت جاهزة للتحليل."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {nextPhase && (
            <Link
              to={`/questions/${nextPhase}`}
              className="flex-1 px-6 py-3 bg-primary text-text rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all"
            >
              الانتقال إلى مرحلة {PHASES[nextPhase].arabic}
            </Link>
          )}
          <Link
            to="/report"
            className="flex-1 px-6 py-3 border-2 border-secondary/60 text-secondary rounded-xl text-sm font-semibold hover:bg-secondary/10 active:scale-95 transition-all"
          >
            عرض التقرير
          </Link>
        </div>
        <button
          onClick={onReview}
          className="text-sm text-text-muted hover:text-primary transition-colors"
        >
          مراجعة إجاباتي
        </button>
      </div>
    </div>
  );
}
