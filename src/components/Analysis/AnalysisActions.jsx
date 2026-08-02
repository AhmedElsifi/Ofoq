// Download report and reset data buttons for the insights page.
export default function AnalysisActions({ onDownload, onReset, downloading }) {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
      <button
        onClick={onDownload}
        disabled={downloading}
        className="w-full md:w-auto min-w-[320px] bg-primary text-text py-4 px-8 rounded-2xl text-sm font-semibold shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <span className="material-symbols-outlined">
          {downloading ? "sync" : "picture_as_pdf"}
        </span>
        {downloading ? "جاري التجهيز..." : "تحميل التقرير"}
      </button>
      <button
        onClick={onReset}
        className="w-full md:w-auto bg-transparent border-2 border-[#FB923C] text-[#FB923C] py-3.5 px-8 rounded-2xl text-sm font-semibold hover:bg-[#FB923C]/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">restart_alt</span>
        إعادة ضبط البيانات
      </button>
    </section>
  );
}
