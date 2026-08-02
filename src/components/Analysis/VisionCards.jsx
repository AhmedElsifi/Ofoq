// The two vision cards (anti-vision and primary vision) with their accents.
const VISIONS = [
  {
    key: "antiVision",
    accent: "#FB923C",
    icon: "dangerous",
    title: "الرؤية المضادة",
    fallback: "الحياة التي ترفضها بكل كيانك. اكتب إجابات قسم الرؤية المضادة لتظهر هنا.",
  },
  {
    key: "primaryVision",
    accent: "#FBBF24",
    icon: "auto_awesome",
    title: "الرؤية الأولية",
    fallback: "الحياة التي تبنيها بوعي. اكتب إجابات قسم الرؤية الأولية لتظهر هنا.",
  },
];

// Prominent cards showing the anti-vision and primary vision summaries.
export default function VisionCards({ analysis }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {VISIONS.map((v) => {
        const data = analysis[v.key];
        return (
          <div key={v.key} className="glass-card p-6 rounded-xl relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-1 h-full"
              style={{ backgroundColor: v.accent }}
            />
            <div className="flex items-center gap-3 mb-3">
              <span
                className="material-symbols-outlined"
                style={{ color: v.accent, fontVariationSettings: "'FILL' 1" }}
              >
                {v.icon}
              </span>
              <h2 className="text-xl font-semibold" style={{ color: v.accent }}>
                {v.title}
              </h2>
            </div>
            <p className="text-text-muted leading-relaxed text-sm md:text-base">
              {data.main || v.fallback}
            </p>
            {data.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {data.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs border"
                    style={{
                      color: v.accent,
                      backgroundColor: `${v.accent}1a`,
                      borderColor: `${v.accent}33`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
