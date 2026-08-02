# أُفق Ofoq

> A private, daily self-improvement journal that turns thirty minutes of honest writing into a clear picture of what you actually want — and a step-by-step plan to get there.

**Ofoq** (Arabic for *horizon*) is a fully Arabic (RTL), browser-based journaling application built around a structured daily routine. It walks you through three short writing sessions — morning, midday, and evening — each tuned to a different stage of your day. Your answers live only in your browser, so your journal is truly yours.

---

## The Idea

Most people set goals in the wrong direction: they change *actions* while keeping the same *identity*, so nothing sticks. Ofoq flips the order. Its questions, drawn from established work on behavior change, psychology, and productivity (see [Sources](#sources)), push you to first define **who you want to become**, then translate that into a concrete daily plan.

The entire experience is built on three daily phases, modeled after a refinement pipeline:

| Phase | Time | Name | Focus |
| ----- | ---- | ---- | ----- |
| 🌅 Morning | 05:00–12:00 | **Morning Mining** (التنقيب الصباحي) | Uncover goals and set the day's direction |
| ☀️ Midday | 12:00–18:00 | **Autopilot Interrupt** (مقاطعات النهار) | Reclaim focus during peak activity |
| 🌙 Evening | 18:00–05:00 | **Insight Smelting** (صهر المساء) | Refine the day's data into insight |

The active phase is selected automatically based on the current time, so the journal always meets you where your day is.

---

## How It Works (User Workflow)

1. **Discover the method.** From the home page, the user reads why the app exists, then opens the **Protocol** page — a full breakdown of the theory behind the questions, structured as chapters with the original source material linked for deeper reading.

2. **Start the journey.** The **Start your journey now** call-to-action routes to the question flow. The app automatically enters the phase matching the time of day (or the user can pick a phase explicitly).

3. **Write honestly.** Each phase presents its questions one at a time. Every keystroke is saved instantly and locally. A progress bar tracks the phase, and a **Phase Complete** screen celebrates finishing before moving on.

4. **Review the day.** The **Report** page aggregates everything: an animated completion ring, per-phase progress cards, a review of every answer, and a branded **PDF export** of the whole report.

5. **Read the insights.** The **Insights** page runs a real analysis over the answers — distilling the **anti-vision**, the **primary vision**, a **six-component game plan**, **lens goals**, **recurring keywords**, and a **clarity score**. The result is also exportable as a styled **PDF**.

6. **Stay in control.** Everything is reversible. The user can wipe all stored data from the Insights page whenever they choose.

---

## Features

- **Guided daily questions** across morning, midday, and evening phases, auto-selected by time of day
- **Protocol page** explaining the underlying theory, rendered from a structured JSON document with links to the reference material
- **Daily report** with an animated progress ring, per-phase progress, an answer review, and a branded PDF export
- **Insights engine** deriving visions, roadmap, lens goals, keywords, and a clarity score — with a styled PDF export
- **Full RTL Arabic interface** using IBM Plex Sans Arabic and Material Symbols
- **100% private by design** — all data stored in browser `localStorage`; no servers, no accounts, no tracking
- **Responsive, glass-morphism dark UI** with a mobile slide-down menu

---

## Project Structure

```
ofoq/
├── public/
│   ├── data/
│   │   ├── questions.json      # The daily question bank
│   │   └── theory.json         # Protocol chapters + sources (metadata)
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.jsx                 # Route table (/, /protocol, /questions/:phase, /report, /analysis, /about, /privacy, *)
│   ├── main.jsx                # App entry point
│   ├── index.css               # Tailwind + design tokens
│   ├── pages/                  # One module per route
│   │   ├── Home.jsx
│   │   ├── Protocol.jsx
│   │   ├── Questions.jsx
│   │   ├── Report.jsx
│   │   ├── Analysis.jsx
│   │   ├── About.jsx
│   │   ├── Privacy.jsx
│   │   └── ErrorPage.jsx
│   ├── components/             # Feature-scoped components
│   │   ├── layout/             #   RootLayout (navbar + outlet + footer)
│   │   ├── UI/                 #   NavBar, MobileMenu, Footer, shared states
│   │   ├── Home/               #   Hero, protocol & privacy sections
│   │   ├── Protocol/           #   Chapter cards, block renderer, sources
│   │   ├── Questions/          #   Phase selector, question card, progress
│   │   ├── Report/             #   Stats banner, phase grid, progress ring
│   │   └── Analysis/           #   Vision cards, roadmap grid, visuals
│   ├── hooks/
│   │   ├── useQuestionsData.js     # Fetch questions + answers
│   │   └── useQuestionsAnswers.js  # Answer state with local persistence
│   └── lib/
│       ├── questions.js        # Phase metadata + time-based selection
│       ├── storage.js          # localStorage read/write/clear
│       ├── reportData.js       # Report stats, dates, filenames, messages
│       ├── analysis.js         # Keyword extraction, visions, clarity, roadmap
│       ├── pdfRenderer.js      # Shared html2canvas/jsPDF rasterizer
│       ├── reportPdf.js        # Report PDF builder
│       ├── analysisPdf.js      # Insights PDF builder
│       └── richText.jsx        # **bold** → <strong> parser
└── public/data/                # Content lives outside code, easy to edit
```

---

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| UI | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | react-router v7 |
| PDF export | html2canvas + jsPDF |
| Fonts | IBM Plex Sans Arabic, Material Symbols |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

### Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## Privacy

Ofoq has no backend. Answers are written to `localStorage` under the `ofoq-answers` key and are never transmitted anywhere. Reports and PDFs are generated entirely inside the browser. Clearing your data is one click away on the Insights page.

---

## Sources

The questions and protocol draw from:

- **How To Fix Your Entire Life In 1 Day** — Dan Koe  
  https://letters.thedankoe.com/p/how-to-fix-your-entire-life-in-1
- **كيف تصلح حياتك في يوم واحد — دروس أونلاين** (video)  
  https://www.youtube.com/watch?v=3acWaDehEiU&t=1285s

Both are listed inside the app on the Protocol page.

---

## License

© 2026 Ofoq. All rights reserved.
