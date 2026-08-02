import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";

// Desktop navigation links.
const DESKTOP_LINKS = [
  { to: "/", label: "الرئيسية" },
  { to: "/protocol", label: "البروتوكول" },
  { to: "/report", label: "التقرير" },
  { to: "/analysis", label: "البصائر" },
  { to: "/about", label: "عن أُفق" },
  { to: "/privacy", label: "الخصوصية" },
];

// Active/inactive style helper for desktop nav links.
const desktopLinkClass = ({ isActive }) =>
  `text-base transition-colors duration-200 ${
    isActive
      ? "text-m3-primary font-bold border-b-2 border-m3-primary pb-1"
      : "text-text-muted hover:text-m3-primary"
  }`;

// Fixed top navigation bar with desktop links and a mobile hamburger.
export default function NavBar() {
  // Menu open/close state plus a ref for the delayed unmount timer.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timeoutRef = useRef(null);

  // Open the mobile menu, cancelling any pending close.
  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsClosing(false);
    setIsMenuOpen(true);
  };

  // Close the mobile menu: animate out, then unmount after 300ms.
  const closeMenu = () => {
    if (isClosing) return;
    setIsClosing(true);
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
      timeoutRef.current = null;
    }, 300);
  };

  // Toggle the mobile menu open state.
  const toggleMenu = () => {
    if (isMenuOpen) closeMenu();
    else openMenu();
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-12 h-20 bg-bg-surface/80 backdrop-blur-md border-b border-border/50 shadow-sm">
        <NavLink to="/" className="text-2xl md:text-3xl font-bold text-m3-primary">
          أُفق Ofoq
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {DESKTOP_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={desktopLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* CTA button + mobile hamburger toggle */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/protocol"
            className="bg-primary text-text px-4 py-2 md:px-6 md:py-2.5 rounded-xl font-semibold text-sm md:text-base hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            ابدأ رحلتك الآن
          </NavLink>
          <button
            onClick={toggleMenu}
            className="md:hidden text-text-muted hover:text-primary transition-colors p-1"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {(isMenuOpen || isClosing) && (
        <MobileMenu isClosing={isClosing} onClose={closeMenu} />
      )}
    </>
  );
}
