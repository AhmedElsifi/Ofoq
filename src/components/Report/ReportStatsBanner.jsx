// Banner summarizing today's answered/total questions and percentage.
export default function ReportStatsBanner({ answered, total, percent }) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-2xl">
            today
          </span>
        </div>
        <div>
          <p className="text-lg md:text-xl font-bold text-text">
            أجبت على {answered} من {total} أسئلة اليوم
          </p>
          <p className="text-sm text-text-muted">نسبة إكمال أسئلة اليوم</p>
        </div>
      </div>
      <div className="text-5xl md:text-6xl font-bold text-primary">
        {percent}%
      </div>
    </div>
  );
}
