import { Link } from "react-router-dom";

const PILLARS = [
  {
    icon: "lightbulb",
    title: "الفكرة",
    desc: "أُفق يرشدك خلال ثلاث مراحل يومية: تنقيب صباحي، مقاطعات النهار، وصهر المساء — عشان تفكر بوضوح وتبني أهدافك خطوة بخطوة.",
  },
  {
    icon: "auto_awesome",
    title: "المنهج",
    desc: "أسئلتنا مستوحاة من مصادر راسخة في تطوير الذات وعلم النفس والإنتاجية، وتُشرح بالتفصيل في صفحة البروتوكول.",
  },
  {
    icon: "lock",
    title: "الخصوصية",
    desc: "كل شيء يحدث على جهازك. لا سحابة، لا حسابات، ولا تتبع — إجاباتك ملكك أنت وحدك.",
  },
];

// About page: explains what Ofoq is and the thinking behind it.
export default function About() {
  return (
    <main className="min-h-screen flex-grow px-4 md:px-12 pt-40 pb-16 md:pb-20 max-w-[1440px] mx-auto w-full">
      <header className="mb-12 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs tracking-widest mb-6">
          <span className="material-symbols-outlined text-sm">explore</span>
          عن أُفق
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-m3-primary glowing-text mb-4">
          لماذا أُنشئ أُفق؟
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
          «أُفق» — وتعني الأفق — أداة تأمّل يومي تبقيك واضحاً مع نفسك، مبنية على
          أفكار تغيير السلوك وعلم النفس والإنتاجية لمساعدتك على اكتشاف ما تريده
          فعلاً.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {PILLARS.map((p) => (
          <div key={p.title} className="glass-card rounded-2xl p-6 flex flex-col gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">
              {p.icon}
            </span>
            <h2 className="text-lg font-semibold text-text">{p.title}</h2>
            <p className="text-sm text-text-muted leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </section>

      <section className="glass-card rounded-2xl p-6 md:p-8 mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-text mb-4">رحلتك</h2>
        <p className="text-text-muted leading-relaxed mb-6">
          كل يوم تبدأ مرحلة التنقيب الصباحي بتحديد أهدافك، ثم تعترض طريقك مقاطعات
          النهار لإعادة التركيز، وتُنهي يومك بمرحلة صهر المساء لتلخيص ما تعلمته.
          ثلاث لحظات قصيرة تجعل وجهتك أوضح يوماً بعد يوم.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/protocol"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-text rounded-xl font-semibold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/25"
          >
            <span className="material-symbols-outlined">menu_book</span>
            اكتشف البروتوكول
          </Link>
          <Link
            to="/questions"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border/50 text-text rounded-xl font-semibold hover:bg-bg-hover active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">play_arrow</span>
            ابدأ الآن
          </Link>
        </div>
      </section>
    </main>
  );
}
