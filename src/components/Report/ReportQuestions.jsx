import { useState } from "react";
import { getPhaseByTime, PHASES } from "../../lib/questions";
import ReportQuestionTabs from "./ReportQuestionTabs";
import ReportQuestionItem from "./ReportQuestionItem";

// Report section listing today's questions and answers, tabbed by phase.
export default function ReportQuestions({ questions, answers, answered, total, percent }) {
  // Active phase tab, defaulting to the current time-of-day phase.
  const [activePhase, setActivePhase] = useState(() => getPhaseByTime());
  const meta = PHASES[activePhase];
  const activeQs = questions.filter((q) => q.phase === activePhase);
  const activeAnswered = activeQs.filter((q) => (answers[q.id] || "").trim()).length;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-text">
          أسئلة اليوم وإجاباتك
        </h2>
        <span className="text-sm text-text-muted">
          {answered} من {total} مُجاب عنها ({percent}%)
        </span>
      </div>

      <ReportQuestionTabs
        questions={questions}
        answers={answers}
        activePhase={activePhase}
        onChange={setActivePhase}
      />

      {activeQs.length > 0 ? (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="material-symbols-outlined text-xl"
              style={{ color: meta.color }}
            >
              {meta.reportIcon}
            </span>
            <h3 className="text-lg font-semibold" style={{ color: meta.color }}>
              {meta.title}
            </h3>
            <span className="text-xs text-text-muted">
              {activeAnswered}/{activeQs.length} سؤال مُجاب
            </span>
          </div>
          <div className="space-y-4">
            {activeQs.map((q) => (
              <ReportQuestionItem
                key={q.id}
                question={q}
                answer={answers[q.id] || ""}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-text-muted/60">لا توجد أسئلة في هذه المرحلة.</p>
      )}
    </section>
  );
}
