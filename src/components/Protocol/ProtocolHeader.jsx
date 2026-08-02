export default function ProtocolHeader({ meta }) {
  return (
    <header className="mb-12 text-center">
      <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs tracking-widest mb-4">
        بروتوكول الأُفق
      </span>
      <h1 className="text-3xl md:text-5xl font-bold text-m3-primary glowing-text mb-4 leading-tight">
        {meta.title}
      </h1>
      <p className="text-text-muted max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
        {meta.subtitle}
      </p>
      <div className="flex items-center justify-center gap-6 mt-6 text-xs text-text-muted/70">
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">person</span>
          {meta.author}
        </span>
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">calendar_today</span>
          {meta.year}
        </span>
      </div>
    </header>
  );
}
