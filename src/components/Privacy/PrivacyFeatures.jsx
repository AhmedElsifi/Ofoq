const FEATURES = [
  {
    icon: "storage",
    title: "تخزين محلي بالكامل",
    desc: "تُحفظ إجاباتك في localStorage داخل متصفحك فقط، ولا تُرسل إلى أي جهة.",
  },
  {
    icon: "cloud_off",
    title: "لا خوادم ولا سحابة",
    desc: "لا توجد خوادم خلفية، ولا حسابات، ولا خدمات سحابية. بياناتك لا تغادر جهازك أبداً.",
  },
  {
    icon: "visibility_off",
    title: "لا تتبّع ولا إعلانات",
    desc: "الموقع لا يستخدم ملفات تعريف الارتباط للتتبع، ولا خدمات تحليل خارجية.",
  },
  {
    icon: "delete_sweep",
    title: "تحكم كامل بالبيانات",
    desc: "يمكنك مسح جميع إجاباتك نهائياً في أي وقت من صفحة البصائر.",
  },
];

// Feature cards summarizing how the app handles user data.
export default function PrivacyFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {FEATURES.map((f) => (
        <div key={f.title} className="glass-card rounded-2xl p-6 flex gap-4">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-2xl">
              {f.icon}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text mb-1">{f.title}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
