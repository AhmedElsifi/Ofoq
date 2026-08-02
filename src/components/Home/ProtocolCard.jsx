import { Link } from "react-router-dom";

// Card that links to a protocol phase, styled by its phase colors.
export default function ProtocolCard({ phase }) {
  // Per-phase styling tokens (icon, border, hover, and glow colors).
  const colorMap = {
    morning: {
      iconColor: "text-primary",
      borderColor: "border-primary/30",
      bgHover: "hover:bg-primary/5",
      glowColor: "from-primary/10",
    },
    midday: {
      iconColor: "text-secondary",
      borderColor: "border-secondary/30",
      bgHover: "hover:bg-secondary/5",
      glowColor: "from-secondary/10",
    },
    evening: {
      iconColor: "text-accent",
      borderColor: "border-accent/30",
      bgHover: "hover:bg-accent/5",
      glowColor: "from-accent/10",
    },
  };

  const colors = colorMap[phase.id] || colorMap.morning;

  // Default link target, overridable per phase via phase.linkTo.
  const linkTo = phase.linkTo || "/questions";

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        p-6 md:p-8
        flex flex-col items-start gap-4
        transition-all duration-300
        border ${colors.borderColor}
        bg-bg-surface/60
        backdrop-blur-sm
        ${colors.bgHover}
        hover:scale-[1.02]
        hover:shadow-xl
        hover:shadow-primary/5
      `}
    >
      {/* Subtle background glow on hover */}
      <div
        className={`
          absolute -top-20 -right-20 w-40 h-40 rounded-full
          bg-gradient-radial ${colors.glowColor} to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        `}
      ></div>

      {/* Phase icon */}
      <div className="relative z-10 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
        <span
          className={`material-symbols-outlined text-3xl md:text-4xl ${colors.iconColor}`}
        >
          {phase.icon}
        </span>
      </div>

      {/* Phase title and description */}
      <h3
        className={`relative z-10 text-xl md:text-2xl font-bold ${colors.iconColor}`}
      >
        {phase.title}
      </h3>
      <p className="relative z-10 text-sm md:text-base text-text-muted leading-relaxed">
        {phase.description}
      </p>

      {/* Link to explore the phase */}
      <Link
        to={linkTo}
        className="
          relative z-10 mt-auto pt-4
          flex items-center gap-2
          text-sm font-semibold
          text-text-muted/40
          group-hover:text-primary
          transition-colors duration-500
          hover:underline hover:underline-offset-4 hover:decoration-primary/60
        "
      >
        <span>استكشف المرحلة</span>
      </Link>
    </div>
  );
}
