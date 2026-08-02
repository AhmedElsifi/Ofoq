import { useMemo } from "react";
import { PHASES } from "../../util/questions";
import QuestionProgress from "./QuestionProgress";
import QuestionActions from "./QuestionActions";

// Placeholder text for each phase's journal input.
const PLACEHOLDERS = {
  morning: "اكتب تأملاتك هنا بكل صدق...",
  midday: "دوّن ما تراه الآن بصدق...",
  evening: "اكتب استبصارك هنا...",
};

// Journal entry card: question, textarea, autosave badge, and navigation.
export default function QuestionCard({
  question,
  index,
  total,
  value = "",
  onChange,
  onPrevious,
  onNext,
  isFirst,
  isLast,
}) {
  // Phase meta used for colors and labels.
  const meta = PHASES[question.phase] || PHASES.morning;

  // Count words in the current answer.
  const wordCount = useMemo(() => {
    const trimmed = value.trim();
    return trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  }, [value]);

  return (
    <div className="w-full max-w-3xl flex flex-col gap-10">
      <QuestionProgress meta={meta} index={index} total={total} />

      {/* Journal entry */}
      <section className="flex flex-col gap-6">
        {/* Question header */}
        <div className="space-y-3">
          <span className="text-xs md:text-sm text-text-muted">
            {question.section}
          </span>
          {question.title && (
            <h2 className="text-base md:text-lg font-bold text-primary">
              {question.title}
            </h2>
          )}
          <h1 className="text-xl md:text-3xl font-semibold text-text leading-relaxed">
            {question.question}
          </h1>
        </div>

        {/* Auto-save indicator */}
        <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full w-fit">
          <span className="material-symbols-outlined text-accent text-[18px]">
            cloud_done
          </span>
          <span className="text-accent text-xs">
            يتم الحفظ تلقائياً في متصفحك لضمان الخصوصية
          </span>
        </div>

        {/* Input */}
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={PLACEHOLDERS[question.phase] || PLACEHOLDERS.morning}
            className="w-full min-h-[300px] md:min-h-[400px] bg-bg-surface/70 backdrop-blur border border-border/50 rounded-xl p-5 text-text text-base md:text-lg leading-loose placeholder:text-text-muted/40 focus:outline-none focus:border-primary/70 focus:shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_15%,transparent)] transition-all duration-300 resize-y"
          />
          <div className="absolute bottom-4 left-4 text-text-muted text-xs bg-bg-surface/60 backdrop-blur px-2.5 py-1 rounded-lg border border-border/40">
            {wordCount} كلمة
          </div>
        </div>

        {/* Actions */}
        <QuestionActions
          meta={meta}
          onPrevious={onPrevious}
          onNext={onNext}
          isFirst={isFirst}
          isLast={isLast}
        />
      </section>
    </div>
  );
}
