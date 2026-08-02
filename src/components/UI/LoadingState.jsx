// Reusable full-area loading spinner with an optional message.
export default function LoadingState({ message = "جاري التحميل..." }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
      <span className="material-symbols-outlined animate-spin text-primary text-4xl">
        sync
      </span>
      <p className="text-text-muted text-sm">{message}</p>
    </div>
  );
}
