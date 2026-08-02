import { Link } from "react-router-dom";

// Empty state shown when a phase has no questions.
export default function QuestionsEmpty() {
  return (
    <div className="glass-card max-w-md w-full rounded-2xl p-8 text-center">
      <p className="text-text-muted">لا توجد أسئلة في هذه المرحلة.</p>
      <Link
        to="/questions"
        className="inline-block mt-4 px-6 py-2.5 bg-primary text-text rounded-xl text-sm font-semibold"
      >
        العودة إلى الأسئلة
      </Link>
    </div>
  );
}
