import { Link } from "react-router-dom";

// Site footer with brand info and navigation links.
export default function Footer() {
  return (
    <footer className="w-full py-8 md:py-12 px-4 md:px-12 border-t border-border/40 bg-m3-surface-container-lowest backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand and copyright column */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-lg md:text-xl font-bold text-primary">
            أُفق Ofoq
          </span>
          <p className="text-xs md:text-sm text-text-muted/60 text-center md:text-right">
            © 2026 أفق. جميع بياناتك تُحفظ محلياً في متصفحك لضمان الخصوصية
            التامة.
          </p>
        </div>

        {/* Links column */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
          <Link
            to="/about"
            className="text-xs md:text-sm text-text-muted hover:text-primary transition-colors duration-200"
          >
            عن أُفق
          </Link>
          <Link
            to="/privacy"
            className="text-xs md:text-sm text-text-muted hover:text-primary transition-colors duration-200"
          >
            سياسة الخصوصية
          </Link>
        </div>
      </div>
    </footer>
  );
}
