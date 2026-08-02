import { richText } from "../../util/richText";

// Render a single theory block according to its type.
export default function BlockRenderer({ block }) {
  switch (block.type) {
    case "quote":
      return (
        <blockquote className="border-r-4 border-primary/50 bg-bg-surface/40 rounded-lg py-5 pr-6 pl-4">
          <p className="text-base md:text-lg text-text leading-relaxed">
            {richText(block.content)}
          </p>
          {block.author && (
            <footer className="mt-3 text-sm text-text-muted">
              — {block.author}
            </footer>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-text-muted leading-relaxed">
              <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                arrow_back_ios_new
              </span>
              <span className="text-sm md:text-base">{richText(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "ordered_list":
      return (
        <ol className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-text-muted leading-relaxed">
              <span className="w-7 h-7 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm md:text-base">{richText(item)}</span>
            </li>
          ))}
        </ol>
      );
    default:
      return (
        <p className="text-text-muted leading-relaxed text-sm md:text-base">
          {richText(block.content)}
        </p>
      );
  }
}
