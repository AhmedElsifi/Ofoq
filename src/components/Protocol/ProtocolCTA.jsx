import { Link } from "react-router-dom";

// Closing call-to-action that starts the questions for the current time of day.
export default function ProtocolCTA() {
  return (
    <section className="glass-card rounded-2xl p-8 md:p-12 text-center mt-12">
      <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">
        هل أنت مستعد لبدء البروتوكول؟
      </h2>
      <p className="text-text-muted max-w-2xl mx-auto leading-relaxed mb-6">
        ابدأ رحلتك اليوم عبر أسئلة تُعرض تلقائياً حسب وقت اليوم: الصباح، منتصف
        النهار، والمساء.
      </p>
      <Link
        to="/questions"
        className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-text rounded-xl font-semibold text-lg shadow-lg shadow-primary/25 hover:brightness-110 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined">rocket_launch</span>
        ابدأ أسئلة اليوم
      </Link>
    </section>
  );
}
