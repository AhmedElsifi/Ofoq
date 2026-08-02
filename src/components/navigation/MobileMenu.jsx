import { NavLink } from "react-router-dom";

// Mobile navigation links.
const LINKS = [
  { to: "/", label: "الرئيسية" },
  { to: "/protocol", label: "البروتوكول" },
  { to: "/report", label: "التقرير" },
  { to: "/analysis", label: "البصائر" },
  { to: "/about", label: "عن أُفق" },
  { to: "/privacy", label: "الخصوصية" },
];

// Slide-down mobile menu panel with backdrop and enter/exit animations.
export default function MobileMenu({ isClosing, onClose }) {
  return (
    <>
      {/* Dimmed backdrop behind the panel */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden ${
          isClosing ? "animate-fadeOut" : "animate-fadeIn"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Slide-down panel containing the links */}
      <div
        className={`fixed top-20 left-0 right-0 z-50 md:hidden bg-bg-surface/95 backdrop-blur-xl border-b border-border/50 shadow-2xl rounded-b-2xl overflow-hidden ${
          isClosing ? "animate-slideUp" : "animate-slideDown"
        }`}
      >
        <div className="flex flex-col items-start gap-2 p-6">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={onClose}
              className={({ isActive }) =>
                `w-full text-lg font-medium transition-colors duration-200 py-2 ${
                  isActive
                    ? "text-m3-primary font-bold"
                    : "text-text-muted hover:text-m3-primary"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
