/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // ضبط الخط الأساسي للمشروع كله
        sans: ['"IBM Plex Sans Arabic"', "sans-serif"],
      },
      colors: {
        // ========== ألوان المشروع الأساسية (Ofoq Dark Theme) ==========
        primary: {
          DEFAULT: "#6366F1", // Indigo Glow
          light: "#818CF8",
          dark: "#4F46E5",
        },
        secondary: {
          DEFAULT: "#FB923C", // Sunset Orange
          light: "#FDBA74",
          dark: "#EA580C",
        },
        accent: {
          DEFAULT: "#FBBF24", // Golden Amber
          light: "#FCD34D",
          dark: "#D97706",
        },
        bg: {
          DEFAULT: "#0F172A", // Midnight (Background)
          surface: "#1E293B", // Dark Slate (Cards/Surfaces)
          hover: "#334155", // Slate (Hover)
        },
        text: {
          DEFAULT: "#F8FAFC", // Soft White
          muted: "#94A3B8", // Cool Gray
        },
        border: {
          DEFAULT: "#475569", // Slate Border
        },

        // ========== ألوان Material Design 3 (من الصفحة النموذجية) ==========
        // تم استخراجها جميعاً بدون أي تكرار
        m3: {
          background: "#0b1326",
          error: "#ffb4ab",
          "error-container": "#93000a",
          "inverse-on-surface": "#283044",
          "inverse-primary": "#494bd6",
          "inverse-surface": "#dae2fd",
          "on-background": "#dae2fd",
          "on-error": "#690005",
          "on-error-container": "#ffdad6",
          "on-primary": "#1000a9",
          "on-primary-container": "#0d0096",
          "on-primary-fixed": "#07006c",
          "on-primary-fixed-variant": "#2f2ebe",
          "on-secondary": "#4f2500",
          "on-secondary-container": "#451f00",
          "on-secondary-fixed": "#301400",
          "on-secondary-fixed-variant": "#713700",
          "on-surface": "#dae2fd",
          "on-surface-variant": "#c7c4d7",
          "on-tertiary": "#402d00",
          "on-tertiary-container": "#372700",
          "on-tertiary-fixed": "#261a00",
          "on-tertiary-fixed-variant": "#5c4300",
          outline: "#908fa0",
          "outline-variant": "#464554",
          primary: "#c0c1ff",
          "primary-container": "#8083ff",
          "primary-fixed": "#e1e0ff",
          "primary-fixed-dim": "#c0c1ff",
          secondary: "#ffb783",
          "secondary-container": "#d97722",
          "secondary-fixed": "#ffdcc5",
          "secondary-fixed-dim": "#ffb783",
          surface: "#0b1326",
          "surface-bright": "#31394d",
          "surface-container": "#171f33",
          "surface-container-high": "#222a3d",
          "surface-container-highest": "#2d3449",
          "surface-container-low": "#131b2e",
          "surface-container-lowest": "#060e20",
          "surface-dim": "#0b1326",
          "surface-tint": "#c0c1ff",
          "surface-variant": "#2d3449",
          tertiary: "#f9bd22",
          "tertiary-container": "#b88900",
          "tertiary-fixed": "#ffdf9f",
          "tertiary-fixed-dim": "#f9bd22",
        },
      },
    },
  },
  plugins: [],
};
