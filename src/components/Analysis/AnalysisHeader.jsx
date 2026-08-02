// Insights page heading with an introductory description.
export default function AnalysisHeader() {
  return (
    <header className="mb-12 text-center md:text-right">
      <h1 className="text-3xl md:text-5xl font-bold text-m3-primary glowing-text mb-3">
        بصائرك لهذا اليوم
      </h1>
      <p className="text-text-muted max-w-2xl leading-relaxed">
        تم استخلاص هذه الخارطة بناءً على استجاباتك العميقة المحفوظة محلياً.
        هذه هي خطتك للتحول.
      </p>
    </header>
  );
}
