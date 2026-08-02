// Reusable error panel with a reload action and optional message.
export default function ErrorState({ message = "تعذر تحميل البيانات." }) {
  return (
    <div className="glass-card max-w-md mx-auto rounded-2xl p-8 text-center space-y-4">
      <span className="material-symbols-outlined text-m3-error text-4xl">
        error
      </span>
      <p className="text-text">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2.5 bg-primary text-text rounded-xl text-sm font-semibold hover:brightness-110 active:scale-95 transition-all"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}
