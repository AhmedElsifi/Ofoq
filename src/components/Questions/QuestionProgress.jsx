// Progress bar showing the current question's position within the phase.
export default function QuestionProgress({ meta, index, total }) {
  const progressPercent = total ? ((index + 1) / total) * 100 : 0;
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-primary text-xs tracking-wider font-medium">
          {meta.english}
        </span>
        <span className="text-text-muted text-xs">
          السؤال {index + 1} من {total}
        </span>
      </div>
      <div className="h-1.5 w-full bg-bg-surface rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: meta.color,
            boxShadow: `0 0 10px ${meta.color}66`,
          }}
        />
      </div>
    </div>
  );
}
