import { Link } from "react-router-dom";
import PrivacyHeader from "../components/Privacy/PrivacyHeader";
import PrivacyFeatures from "../components/Privacy/PrivacyFeatures";

const STEPS = [
  {
    icon: "edit_note",
    title: "الإجابة",
    desc: "تُحفظ كل إجابة تلقائياً على جهازك أثناء الكتابة.",
  },
  {
    icon: "picture_as_pdf",
    title: "التقرير",
    desc: "يُولَّد تقريرك بصيغة PDF داخل متصفحك مباشرة دون أي اتصال بالإنترنت.",
  },
  {
    icon: "restart_alt",
    title: "المسح",
    desc: "يمكنك حذف كل إجاباتك نهائياً من صفحة البصائر في أي وقت.",
  },
];

// Privacy page: explains local-only storage and data ownership.
export default function Privacy() {
  return (
    <main className="min-h-screen flex-grow px-4 md:px-12 pt-40 pb-16 md:pb-20 max-w-[1440px] mx-auto w-full">
      <PrivacyHeader />
      <PrivacyFeatures />

      <section className="glass-card rounded-2xl p-6 md:p-8 mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-text mb-6">
          كيف يعمل ذلك؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.title} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-text-muted/50">
                  0{i + 1}
                </span>
                <span className="material-symbols-outlined text-primary text-2xl">
                  {s.icon}
                </span>
              </div>
              <h3 className="font-semibold text-text">{s.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mb-12">
        <Link
          to="/questions"
          className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-text rounded-xl font-semibold text-lg shadow-lg shadow-primary/25 hover:brightness-110 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">lock</span>
          ابدأ بأمان تام
        </Link>
      </section>
    </main>
  );
}
