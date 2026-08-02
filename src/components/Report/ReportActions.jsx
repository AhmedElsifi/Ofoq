import { Link } from "react-router-dom";

// Action buttons for downloading the PDF, viewing insights, and continuing questions.
export default function ReportActions({ onDownload, downloading, hasQuestions }) {
  return (
    <section className="flex flex-col sm:flex-row justify-center items-center gap-4 py-8 border-t border-border/30 mt-8">
      <button
        onClick={onDownload}
        disabled={downloading}
        className="w-full sm:w-auto bg-primary hover:brightness-110 active:scale-95 transition-all text-text px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-60"
      >
        <span className="material-symbols-outlined">
          {downloading ? "sync" : "picture_as_pdf"}
        </span>
        {downloading ? "جاري التجهيز..." : "حمّل تقريرك"}
      </button>
      <Link
        to="/analysis"
        className="w-full sm:w-auto border-2 border-secondary/70 text-secondary hover:bg-secondary/10 active:scale-95 transition-all px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
      >
        <span className="material-symbols-outlined">history</span>
        عرض البصائر والتحليل
      </Link>
      {hasQuestions && (
        <Link
          to="/questions"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">edit_note</span>
          متابعة الأسئلة
        </Link>
      )}
    </section>
  );
}
