// The six plan components that make up the roadmap.
const ROADMAP_STEPS = [
  { n: "01", title: "الرؤية المضادة", hint: "الحياة التي ترفض أن تعيشها أبداً" },
  { n: "02", title: "الرؤية", hint: "الحياة المثالية التي تبنيها بوعي" },
  { n: "03", title: "هدف السنة", hint: "الأولوية الوحيدة للعام القادم" },
  { n: "04", title: "مشروع الشهر", hint: "ما سيعمل عليه هذا الشهر" },
  { n: "05", title: "الروافع اليومية", hint: "المهام المُحرِّكة للإبرة" },
  { n: "06", title: "القيود", hint: "ما لن تضحّي به" },
];

const ACCENTS = ["text-text", "text-primary", "text-text", "text-text", "text-m3-tertiary", "text-text"];
const BACKGROUNDS = ["", "bg-primary/5", "", "", "bg-m3-tertiary/5", ""];

// Grid of roadmap cards showing each plan component's saved answer.
export default function RoadmapGrid({ roadmap }) {
  return (
    <section className="mb-12">
      <h3 className="text-xl font-semibold mb-6 text-text border-r-4 border-primary pr-3">
        خارطة الطريق
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROADMAP_STEPS.map((step, i) => {
          const item = roadmap[i];
          return (
            <div key={step.n} className={`glass-card p-6 rounded-xl ${BACKGROUNDS[i]}`}>
              <span className="text-xs text-text-muted block mb-2">{step.n}</span>
              <h4 className={`text-lg font-semibold mb-1 ${ACCENTS[i]}`}>{step.title}</h4>
              <p className="text-xs text-text-muted mb-3">{step.hint}</p>
              <p className="text-sm text-m3-on-surface-variant leading-relaxed">
                {item?.answer ? (
                  item.answer
                ) : (
                  <span className="text-text-muted/40">لم تُكتب هذه الرؤية بعد</span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
