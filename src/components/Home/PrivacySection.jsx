import PrivacyFigure from "./PrivacyFigure";

// Privacy/value propositions displayed as a feature list.
const FEATURES = [
  {
    id: "sovereignty",
    title: "خصوصية كاملة",
    icon: "shield",
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    description: "بياناتك محفوظة محليًا على جهازك فقط، ولا يتم إرسالها إلى أي خادم.",
  },
  {
    id: "calm",
    title: "تصميم هادئ",
    icon: "psychology",
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
    description: "تصميم هادئ وواضح يقلل المشتتات البصرية ويساعدك على التركيز على ما يهمك.",
  },
];

// Home section for the privacy message with a feature list and visual.
export default function PrivacySection() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Features text column */}
          <div className="flex flex-col gap-6 md:gap-8 order-2 md:order-1">
            <h2 className="text-2xl md:text-4xl font-bold text-text leading-tight">
              البساطة أولًا، والخصوصية دائمًا
            </h2>
            <ul className="flex flex-col gap-5">
              {FEATURES.map((feature) => (
                <li key={feature.id} className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full ${feature.bgColor} flex items-center justify-center mt-1`}
                  >
                    <span
                      className={`material-symbols-outlined text-2xl ${feature.iconColor}`}
                    >
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold text-text">
                      {feature.title}
                    </h4>
                    <p className="text-sm md:text-base text-text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <PrivacyFigure />
        </div>
      </div>
    </section>
  );
}
