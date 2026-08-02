// Decorative privacy stats visual (progress ring + mini dashboard cards).
export default function PrivacyFigure() {
  return (
    <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden glass-card order-1 md:order-2 flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"></div>

      <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-4">
        {/* Daily progress ring */}
        <div className="relative w-28 h-28 md:w-32 md:h-32">
          <div className="absolute inset-0 rounded-full border-4 border-bg-surface"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent rotate-45"></div>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl md:text-2xl font-bold text-text">٥٠٪</span>
            <span className="text-[10px] text-text-muted">تقدم اليوم</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full mt-2">
          <div className="bg-bg-surface/50 backdrop-blur-sm rounded-lg p-2 text-center border border-border/30">
            <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
            <p className="text-[10px] text-text-muted">مكتمل</p>
            <p className="text-sm font-bold text-text">٣</p>
          </div>
          <div className="bg-bg-surface/50 backdrop-blur-sm rounded-lg p-2 text-center border border-border/30">
            <span className="material-symbols-outlined text-secondary text-xl">pending</span>
            <p className="text-[10px] text-text-muted">معلق</p>
            <p className="text-sm font-bold text-text">٢</p>
          </div>
          <div className="bg-bg-surface/50 backdrop-blur-sm rounded-lg p-2 text-center border border-border/30">
            <span className="material-symbols-outlined text-accent text-xl">bolt</span>
            <p className="text-[10px] text-text-muted">التركيز</p>
            <p className="text-sm font-bold text-text">٨٠%</p>
          </div>
        </div>

        <p className="text-xs text-text-muted/60 mt-1 border-t border-border/20 pt-2 w-full text-center">
          واجهة تحكم شفافة • بياناتك محلية بالكامل
        </p>
      </div>
    </div>
  );
}
