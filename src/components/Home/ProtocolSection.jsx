import ProtocolCard from "../UI/ProtocolCard";

// Home section presenting the three protocol phases as cards.
export default function ProtocolSection() {
  // The three protocol phases (morning, midday, evening) and their card data.
  const phases = [
    {
      id: "morning",
      title: "الصباح",
      icon: "light_mode",
      linkTo: "/questions/morning",
      iconColor: "text-primary",
      hoverBorder: "hover:border-primary/50",
      description:
        "مرحلة الاستيقاظ وتحديد النوايا. نركز هنا على صفاء الذهن قبل ضجيج العالم، لبناء درع من التركيز يدوم طوال اليوم.",
    },
    {
      id: "midday",
      title: "منتصف النهار",
      icon: "wb_sunny",
      linkTo: "/questions/midday",
      iconColor: "text-secondary",
      hoverBorder: "hover:border-secondary/50",
      description:
        "ذروة الأداء والمراجعة اللحظية. موازنة بين الإنجاز العميق والتأمل السريع لضمان البقاء على المسار الصحيح.",
    },
    {
      id: "evening",
      title: "المساء",
      icon: "bedtime",
      linkTo: "/questions/evening",
      iconColor: "text-accent",
      hoverBorder: "hover:border-accent/50",
      description:
        "التفكر، الامتنان، والإغلاق الواعي. تفريغ الحمولة الذهنية لليوم استعداداً لراحة عميقة وتجديد حقيقي.",
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-12 bg-bg-variant">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-bold text-m3-primary mb-2">
            بروتوكول الأُفق
          </h2>
          <p className="text-base md:text-lg text-text-muted">
            هيكل زمني متناغم لموازنة العقل والأداء
          </p>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {phases.map((phase) => (
            <ProtocolCard key={phase.id} phase={phase} />
          ))}
        </div>
      </div>
    </section>
  );
}
