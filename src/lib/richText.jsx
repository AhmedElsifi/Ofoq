// Render a string as React nodes, converting **bold** markers to <strong>.
export function richText(text) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold text-text">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
