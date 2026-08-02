import BlockRenderer from "./BlockRenderer";

// A theory chapter with its title, subtitle, and rendered blocks.
export default function ChapterCard({ chapter, index }) {
  return (
    <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
      <div className="flex items-start gap-4 mb-6 pb-5 border-b border-border/30">
        <span className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 text-primary font-bold text-lg flex items-center justify-center">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-text">
            {chapter.title}
          </h2>
          {chapter.subtitle && (
            <p className="text-sm md:text-base text-text-muted mt-1 leading-relaxed">
              {chapter.subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-5">
        {chapter.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>
    </section>
  );
}
