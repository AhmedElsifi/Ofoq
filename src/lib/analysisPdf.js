import { escapeHtml, generatePdfFromHtml } from "./pdfRenderer";
import { buildDateString } from "./reportData";

// Inline styles for the off-screen analysis PDF markup (dark theme, RTL).
const ANALYSIS_PDF_CSS = `
  .pdf-root { background:#0f172a; color:#f8fafc; font-family:'IBM Plex Sans Arabic',sans-serif; }
  .pdf-page { box-sizing:border-box; width:100%; min-height:1100px; padding:42px 46px; display:flex; flex-direction:column; position:relative; background:#0f172a; }
  .page-header { display:flex; justify-content:space-between; align-items:center; padding-bottom:18px; border-bottom:1px solid #334155; }
  .brand { font-size:26px; font-weight:700; color:#c0c1ff; }
  .brand-en { color:#f8fafc; }
  .counter { font-size:13px; color:#94a3b8; }
  .page-body { flex:1; display:flex; flex-direction:column; justify-content:flex-start; align-items:center; gap:18px; min-height:0; }
  .phase-chip { display:inline-block; box-sizing:border-box; height:34px; line-height:34px; padding:0 18px; color:#818cf8; font-size:13px; text-align:center; }
  .q-title { font-size:19px; font-weight:700; color:#fbbf24; text-align:center; }
  .q-text { font-size:19px; line-height:2; font-weight:600; color:#f8fafc; text-align:center; max-width:92%; }
  .answer-box { width:100%; margin-top:6px; background:#1e293b; border:1px solid #475569; border-radius:16px; padding:24px; font-size:15px; line-height:2.1; color:#e2e8f0; white-space:pre-wrap; word-break:break-word; text-align:right; }
  .answer-empty { color:#64748b; font-style:italic; }
  .tags-row { text-align:center; }
  .tag-chip { display:inline-block; margin:4px; padding:6px 14px; border-radius:9999px; background:#1e293b; border:1px solid #475569; color:#94a3b8; font-size:12px; line-height:1; }
  .keyword-row { padding:8px 0; border-bottom:1px solid #334155; }
  .keyword-word { font-weight:700; color:#fbbf24; }
  .keyword-count { color:#64748b; margin-right:8px; }
  .page-footer { margin-top:auto; padding-top:22px; border-top:1px solid #334155; color:#64748b; font-size:12px; }
  .cover { align-items:center; justify-content:center; text-align:center; gap:18px; background:linear-gradient(160deg,#0b1326 0%,#151f38 55%,#1e293b 100%); }
  .cover-logo { font-size:36px; font-weight:700; color:#c0c1ff; }
  .cover-title { font-size:32px; font-weight:700; color:#f8fafc; }
  .cover-date { font-size:16px; color:#94a3b8; }
  .cover-stats { display:flex; gap:28px; margin-top:16px; }
  .stat { background:#1e293b; border:1px solid #475569; border-radius:16px; padding:18px 30px; min-width:130px; }
  .stat-num { font-size:28px; font-weight:700; color:#6366f1; }
  .stat-label { font-size:12px; color:#94a3b8; margin-top:4px; }
`;

// Shared page shell: header, centered body, and footer.
function pageShell(inner) {
  return `
    <div class="pdf-page">
      <div class="page-header">
        <div class="brand">أُفق <span class="brand-en">Ofoq</span></div>
        <div class="counter">بصائر اليوم</div>
      </div>
      <div class="page-body">${inner}</div>
      <div class="page-footer">أُفق Ofoq — جميع البيانات تُحفظ محلياً في متصفحك</div>
    </div>`;
}

// Empty-state answer markup reused across pages.
function answerBox(text) {
  return `<div class="answer-box">${
    text ? escapeHtml(text) : '<span class="answer-empty">لم تُكتب إجابة بعد</span>'
  }</div>`;
}

// Build the full HTML document: cover plus one page per insight section.
function buildAnalysisHtml(analysis, dateString) {
  const { completion, clarity, antiVision, primaryVision, roadmap, lens, keywords } =
    analysis;

  const cover = `
    <div class="pdf-page cover">
      <div class="cover-logo">أُفق <span class="brand-en">Ofoq</span></div>
      <div class="cover-title">بصائر اليوم</div>
      <div class="cover-date">${escapeHtml(dateString)}</div>
      <div class="cover-stats">
        <div class="stat"><div class="stat-num">${completion.percent}%</div><div class="stat-label">إكمال اليوم</div></div>
        <div class="stat"><div class="stat-num">${clarity.percent}%</div><div class="stat-label">وضوح الرؤية</div></div>
      </div>
    </div>`;

  const visionPage = (chip, vision) => `
    ${pageShell(`
      <div class="phase-chip">${escapeHtml(chip)}</div>
      <div class="q-title">${escapeHtml(chip)}</div>
      <div class="q-text">${
        vision.main
          ? escapeHtml(vision.main)
          : '<span class="answer-empty">لم تُكتب إجابة بعد</span>'
      }</div>
      ${
        vision.tags.length
          ? `<div class="tags-row">${vision.tags
              .map((t) => `<span class="tag-chip">${escapeHtml(t)}</span>`)
              .join("")}</div>`
          : ""
      }
    `)}`;

  const roadmapPages = roadmap.map(
    (r) => pageShell(`
      <div class="phase-chip">خطة اللعبة · المكونات الستة</div>
      <div class="q-title">${escapeHtml(r.title)}</div>
      ${r.question ? `<div class="q-text">${escapeHtml(r.question)}</div>` : ""}
      ${answerBox(r.answer)}
    `),
  );

  const lensPages = lens.map(
    (l) => pageShell(`
      <div class="phase-chip">الأهداف كعدسات</div>
      <div class="q-title">${escapeHtml(l.title)}</div>
      ${answerBox(l.answer)}
    `),
  );

  const keywordsBox = `
    <div class="answer-box">${
      keywords.length
        ? keywords
            .map(
              (k) =>
                `<div class="keyword-row"><span class="keyword-word">${escapeHtml(k.word)}</span><span class="keyword-count">× ${k.count}</span></div>`,
            )
            .join("")
        : '<span class="answer-empty">لا توجد كلمات مفتاحية بعد</span>'
    }</div>`;

  const keywordsPage = pageShell(`
    <div class="phase-chip">الكلمات المفتاحية</div>
    <div class="q-text">أكثر الكلمات تكرراً في إجاباتك</div>
    ${keywordsBox}
  `);

  return `<div class="pdf-root">${cover}${visionPage(
    "الرؤية المضادة",
    antiVision,
  )}${visionPage("الرؤية الأولية", primaryVision)}${roadmapPages.join(
    "",
  )}${lensPages.join("")}${keywordsPage}</div>`;
}

// Render the analysis markup off-screen, rasterize each page, and save a PDF.
export async function generateAnalysisPdf({ analysis, dateString, filename }) {
  await generatePdfFromHtml({
    html: `<style>${ANALYSIS_PDF_CSS}</style>${buildAnalysisHtml(
      analysis,
      dateString || buildDateString(),
    )}`,
    filename,
  });
}
