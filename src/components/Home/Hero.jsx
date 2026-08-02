import { Link } from "react-router-dom";

// Landing hero section with headline, privacy badge, and call to action.
export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 md:px-12 pt-20">
      {/* === (Hero Glow) === */}
      <div className="absolute inset-0 z-0 hero-glow"></div>

      {/* === Main Content === */}
      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center gap-4 md:gap-6">
        {/* privacy badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-surface/80 backdrop-blur-sm rounded-full border border-border/40 mb-1">
          <span className="material-symbols-outlined text-m3-tertiary text-[18px]">
            verified_user
          </span>
          <span className="text-label-md text-text-muted text-xs md:text-sm font-medium">
            خصوصية تامة. معالجة محلية بالكامل.
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-m3-inverse-surface leading-tight tracking-tight">
          أُفق.. يوم واحد <br className="hidden sm:block" />
          <span className="text-primary">قد يغير عامك للأفضل</span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-base lg:text-base text-text-muted max-w-2xl leading-relaxed">
          رحلة تحول شخصية تمر عبر ثلاث مراحل دقيقة: الصفاء الصباحي، التركيز
          الظهري، والامتنان المسائي.
          <br className="hidden md:block" />
          بروتوكول مصمم ليعيد تعريف إنتاجيتك ووعيك الذاتي.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <Link
            to="/protocol"
            className="px-8 md:px-12 py-3 md:py-4 bg-primary text-text rounded-xl font-semibold text-lg md:text-xl shadow-lg shadow-primary/25 hover:brightness-110 active:scale-95 transition-all duration-200"
          >
            ابدأ رحلتك الآن
          </Link>

          {/* Privacy Notice*/}
          <p className="text-xs md:text-sm text-text-muted/70 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            جميع بياناتك تُحفظ محلياً في متصفحك فقط لضمان الخصوصية التامة.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </section>
  );
}
