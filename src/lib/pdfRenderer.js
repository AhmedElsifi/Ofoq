import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Escape HTML entities to safely embed user answers in PDF markup.
export function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Rasterize an off-screen HTML document and save it as a PDF.
// Expects one or more .pdf-page elements inside the given markup.
export async function generatePdfFromHtml({
  html,
  filename,
  backgroundColor = "#0f172a",
}) {
  if (!html.trim()) return;
  // Hidden container used to lay out the report for screenshotting.
  const container = document.createElement("div");
  container.style.cssText =
    "position:absolute;top:0;left:-9999px;width:794px;z-index:-9999;pointer-events:none;";
  try {
    container.innerHTML = html;
    document.body.appendChild(container);
    await document.fonts.ready;
    const pages = Array.from(container.querySelectorAll(".pdf-page"));
    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });
    const pageWidth = 210;
    // Rasterize each page to an image and add it to the PDF document.
    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], {
        scale: 2,
        useCORS: true,
        backgroundColor,
        windowWidth: 794,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      if (i > 0) pdf.addPage();
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        "FAST",
      );
    }
    pdf.save(filename);
  } finally {
    document.body.removeChild(container);
  }
}
