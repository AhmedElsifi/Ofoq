// Single question card in the report showing the saved answer or a placeholder.
export default function ReportQuestionItem({ question, answer }) {
  const hasAnswer = (answer || "").trim().length > 0;
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="space-y-1">
          <span className="text-xs text-text-muted">{question.section}</span>
          {question.title && (
            <h4 className="text-base font-semibold text-text">{question.title}</h4>
          )}
        </div>
        {hasAnswer ? (
          <span className="flex items-center gap-1 text-green-400 text-xs shrink-0">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            تمت الإجابة
          </span>
        ) : (
          <span className="flex items-center gap-1 text-text-muted/60 text-xs shrink-0">
            <span className="material-symbols-outlined text-sm">schedule</span>
            لم تُجب
          </span>
        )}
      </div>
      <p className="text-sm text-text-muted mb-3 leading-relaxed">{question.question}</p>
      <div
        className={`rounded-lg px-4 py-3 text-sm leading-relaxed border ${
          hasAnswer
            ? "bg-bg-surface/50 border-border/30 text-text"
            : "bg-bg-surface/30 border-dashed border-border/30 text-text-muted/40 italic"
        }`}
      >
        {hasAnswer ? answer : "لم تكتب إجابة بعد — عدّ للسؤال وأضف تأملك."}
      </div>
    </div>
  );
}
