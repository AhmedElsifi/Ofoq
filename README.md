# أُفق Ofoq

A daily self-improvement journaling app with a full Arabic (RTL) interface. Ofoq guides you through three daily phases — morning mining, midday autopilot interrupts, and evening insight smelting — to help you discover what you actually want and build your goals step by step.

## Features

- **Guided daily questions** across morning, midday, and evening phases, selected automatically by time of day
- **Protocol page** explaining the theory behind the questions (sourced from "How To Fix Your Entire Life" by Dan Koe), with links to the reference material
- **Daily report page** with an animated progress ring, per-phase progress cards, a review of your answers, and a branded PDF export
- **Insights (analysis) page** that derives your anti-vision, primary vision, six-component game plan roadmap, lens goals, keywords, and clarity score — exportable as a styled PDF
- **100% local privacy**: everything is stored in your browser's `localStorage` — no servers, no cloud, no tracking
- **About and privacy pages**, glass-morphism dark UI, IBM Plex Sans Arabic + Material Symbols

## Tech Stack

- React 19 + Vite 8
- Tailwind CSS 4
- react-router v7
- html2canvas + jsPDF (PDF exports)

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build
