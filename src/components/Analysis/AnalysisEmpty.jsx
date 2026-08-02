import { Link } from "react-router-dom";

// Empty state prompting the user to answer questions before insights appear.
export default function AnalysisEmpty() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-6 text-center">
      <div className="glass-card max-w-md w-full rounded-2xl p-10 flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-primary text-5xl">
          psychology
        </span>
        <h2 className="text-xl font-bold text-text">لا توجد بصائر بعد</h2>
        <p className="text-text-muted text-sm leading-relaxed">
          لم تكتب استجاباتك بعد. ابدأ رحلتك عبر الأسئلة اليومية لتتمكن من
          استخلاص رؤيتك المضادة وخارطة طريقك.
        </p>
        <Link
          to="/questions"
          className="mt-2 px-8 py-3 bg-primary text-text rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all"
        >
          ابدأ بكتابة استجاباتك
        </Link>
      </div>
    </div>
  );
}
