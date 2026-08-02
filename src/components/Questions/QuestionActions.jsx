// Previous/Next navigation buttons for the question card.
export default function QuestionActions({
  meta,
  onPrevious,
  onNext,
  isFirst,
  isLast,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className={`w-full md:w-auto px-10 py-2.5 flex items-center justify-center gap-2 border rounded-xl text-sm font-semibold transition-all active:scale-95 ${
          isFirst
            ? "border-border/30 text-text-muted/30 cursor-not-allowed"
            : "border-secondary/60 text-secondary hover:bg-secondary/10"
        }`}
      >
        <span className="material-symbols-outlined">arrow_forward</span>
        السابق
      </button>
      <button
        onClick={onNext}
        className="w-full md:w-auto px-10 py-2.5 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-95"
        style={{ backgroundColor: meta.color, color: meta.buttonText }}
      >
        {isLast ? "إنهاء المرحلة" : "التالي / حفظ"}
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
    </div>
  );
}
