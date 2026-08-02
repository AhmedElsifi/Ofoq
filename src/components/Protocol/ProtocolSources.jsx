// Sources that informed the daily questions and their underlying theory.
export default function ProtocolSources({ references }) {
  if (!references?.length) return null;

  return (
    <section className="mt-12">
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-text mb-2">المصادر</h2>
        <p className="text-sm text-text-muted mb-6">
          الأسئلة اليومية مستوحاة من هذه المصادر وتُبنى على أفكارها.
        </p>
        <ul className="space-y-3">
          {references.map((ref) => (
            <li key={ref.url}>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline break-all"
              >
                <span className="material-symbols-outlined text-base">link</span>
                {ref.label || ref.url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
