import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Compass } from "lucide-react";

// 404 page shown when no route matches the current URL.
export default function ErrorPage() {
  // Set the browser tab title when the page mounts.
  useEffect(() => {
    document.title = "الصفحة غير موجودة | أُفق Ofoq";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-70"></div>

      {/* Main card container with glass effect */}
      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center gap-6">
        {/* Large 404 error number */}
        <h1 className="text-[120px] md:text-[180px] font-bold leading-none tracking-tight text-primary/20 select-none">
          ٤٠٤
        </h1>

        {/* Inner glass card with message and action */}
        <div className="glass-card w-full rounded-2xl p-8 md:p-12 flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
            <Compass className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-text">
            عذراً.. الصفحة غير موجودة
          </h2>

          <p className="text-text-muted text-base md:text-lg max-w-md leading-relaxed">
            يبدو أنك انحرفت عن مسار الرحلة. <br />
            العودة إلى الأُفق قد تكون الخطوة التالية.
          </p>

          {/* Back to home button */}
          <Link
            to="/"
            className="mt-3 px-8 py-3.5 bg-primary text-text rounded-xl font-semibold text-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-2xl">
              arrow_forward
            </span>
            العودة إلى الأُفق
          </Link>
        </div>

        {/* Small hint at the bottom */}
        <p className="text-text-muted/60 text-sm">
          الخطأ ٤٠٤ • يبدو أن هذه الصفحة قد ضاعت في الفضاء الرقمي
        </p>
      </div>
    </div>
  );
}
