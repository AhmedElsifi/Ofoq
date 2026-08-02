import { escapeHtml, generatePdfFromHtml } from "./pdfRenderer";

// Inline styles for the off-screen PDF markup (dark theme, RTL).
const PDF_CSS = `
  .pdf-root { background:#0f172a; color:#f8fafc; font-family:'IBM Plex Sans Arabic',sans-serif; }
  .pdf-page { box-sizing:border-box; width:100%; min-height:1100px; padding:42px 46px; display:flex; flex-direction:column; position:relative; background:#0f172a; }
  .page-header { display:flex; justify-content:space-between; align-items:center; padding-bottom:18px; border-bottom:1px solid #334155; }
  .brand { font-size:26px; font-weight:700; color:#c0c1ff; }
  .brand-en { color:#f8fafc; }
  .counter { font-size:13px; color:#94a3b8; }
  .page-body { flex:1; display:flex; flex-direction:column; justify-content:flex-start; align-items:center; gap:16px; min-height:0; }
  .phase-chip { display:inline-block; box-sizing:border-box; height:34px; line-height:34px; padding:0 18px; color:#818cf8; font-size:13px; text-align:center; }
  .q-title { font-size:19px; font-weight:700; color:#fbbf24; text-align:center; }
  .q-text { font-size:21px; line-height:1.9; font-weight:600; color:#f8fafc; text-align:center; max-width:92%; }
  .answer-box { width:100%; margin-top:10px; background:#1e293b; border:1px solid #475569; border-radius:16px; padding:26px; font-size:16px; line-height:2.1; color:#e2e8f0; white-space:pre-wrap; word-break:break-word; text-align:right; }
  .answer-empty { color:#64748b; font-style:italic; }
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

// Build the full HTML document: a cover page plus one page per question.
function buildReportHtml({
  questions,
  answers,
  dateString,
  percent,
  answered,
  total,
}) {
  const questionPages = questions.map((q, i) => {
    const answer = (answers[q.id] || "").trim();
    return `
      <div class="pdf-page">
        <div class="page-header">
          <div class="brand">أُفق <span class="brand-en">Ofoq</span></div>
          <div class="counter">السؤال ${i + 1} من ${total}</div>
        </div>
        <div class="page-body">
          <div class="phase-chip">${escapeHtml(q.section)}</div>
          ${q.title ? `<div class="q-title">${escapeHtml(q.title)}</div>` : ""}
          <div class="q-text">${escapeHtml(q.question)}</div>
          <div class="answer-box">${
            answer
              ? escapeHtml(answer)
              : '<span class="answer-empty">لم تُكتب إجابة بعد</span>'
          }</div>
        </div>
        <div class="page-footer">أُفق Ofoq — جميع البيانات تُحفظ محلياً في متصفحك</div>
      </div>`;
  });

  const cover = `
    <div class="pdf-page cover">
      <div class="cover-logo">أُفق <span class="brand-en">Ofoq</span></div>
      <div class="cover-title">تقرير أسئلة اليوم</div>
      <div class="cover-date">${escapeHtml(dateString)}</div>
      <div class="cover-stats">
        <div class="stat"><div class="stat-num">${percent}%</div><div class="stat-label">إكمال اليوم</div></div>
        <div class="stat"><div class="stat-num">${answered} / ${total}</div><div class="stat-label">أسئلة مُجابة</div></div>
      </div>
    </div>`;

  return `<div class="pdf-root">${cover}${questionPages.join("")}</div>`;
}

// Render the report markup off-screen, rasterize each page, and save a PDF.
export async function generateReportPdf({
  questions,
  answers,
  dateString,
  percent,
  answered,
  total,
  filename,
}) {
  if (!questions.length) return;
  await generatePdfFromHtml({
    html: `<style>${PDF_CSS}</style>${buildReportHtml({
      questions,
      answers,
      dateString,
      percent,
      answered,
      total,
    })}`,
    filename,
  });
}
