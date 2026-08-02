// Arabic stop words excluded from keyword extraction.
const STOP_WORDS = new Set([
  "انا", "نحن", "انت", "انت", "انتما", "انتم", "انتن", "هو", "هي", "هم",
  "هن", "هما", "هذا", "هذه", "هذان", "هذين", "ذلك", "تلك", "اولئك", "من",
  "الى", "الي", "عن", "علي", "في", "حتي", "حتى", "منذ", "نحو", "بلا", "ما",
  "لا", "لم", "لن", "ليس", "ليست", "لكن", "اذا", "اذ", "ثم", "او", "ام",
  "قد", "كل", "بعض", "بعد", "قبل", "عند", "مع", "بين", "دون", "خلال",
  "غير", "عندما", "حين", "كيف", "ماذا", "اين", "متي", "اي", "التي", "الذي",
  "الذين", "ان", "ايضا", "جدا", "كان", "كانت", "كانوا", "يكون", "تكون",
  "و", "ف", "ب", "ل", "ك", "ال", "وهو", "وهي", "وفي", "وعن", "وعلي", "ومن",
  "فيه", "فيها", "به", "بها", "له", "لها", "لك", "لي", "لنا", "عليه",
  "عليها", "عندي", "معي", "بان", "بما", "بمن", "لان", "ولكن", "لماذا",
  "بتعبير", "ثم", "كذلك", "بشكل", "انما", "ذات", "كله", "كلها", "فقط",
]);

const LETTERS_ONLY = /[^\u0600-\u06FF]+/g;

// Return whether the value is a non-empty string.
export function isAnswered(value) {
  return typeof value === "string" && value.trim().length > 0;
}

// Normalize Arabic text: remove diacritics and unify letter variants.
export function normalize(text) {
  return text
    .replace(/[\u064B-\u0652]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ئ/g, "ي")
    .replace(/ؤ/g, "و");
}

// Shorten text to maxLen characters, breaking at the last word boundary.
export function summarize(text, maxLen = 90) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLen) return clean;
  const cut = clean.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "…";
}

// Extract the most frequent meaningful words across all answers.
export function extractKeywords(answers, limit = 12) {
  const counts = {};
  const texts = Object.entries(answers)
    .filter(([, v]) => isAnswered(v))
    .map(([, v]) => v)
    .join(" ");
  const words = normalize(texts).split(LETTERS_ONLY);
  for (const w of words) {
    const word = w.trim();
    if (word.length < 3) continue;
    if (STOP_WORDS.has(word)) continue;
    counts[word] = (counts[word] || 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ar"))
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
}

// Collect short clause tags from the answers of the given questions.
function collectTags(questionList, answers) {
  const tags = [];
  for (const q of questionList) {
    const text = (answers[q.id] || "").replace(/\s+/g, " ").trim();
    if (!text) continue;
    const clauses = text
      .split(/[،,.\n؛;:]/)
      .map((s) => s.trim())
      .filter((s) => s.length >= 3 && s.length <= 30);
    if (clauses.length) tags.push(clauses[0]);
  }
  return tags.slice(0, 6);
}

// Build the plain-text summary downloaded from the insights page.
export function buildAnalysisText(analysis) {
  return [
    "بصائر أُفق Ofoq — تحليل اليوم",
    "==========================================",
    "",
    `الإكمال الكلي: ${analysis.completion.percent}%`,
    `وضوح الرؤية: ${analysis.clarity.percent}%`,
    "",
    "الرؤية المضادة:",
    analysis.antiVision.main || "(لم تُجب)",
    "",
    "الرؤية الأولية:",
    analysis.primaryVision.main || "(لم تُجب)",
    "",
    "خارطة الطريق:",
    ...analysis.roadmap.map((r) => `${r.title}\n${r.answer || "(لم تُجب)"}\n`),
  ].join("\n");
}

// Derive the full daily analysis (visions, roadmap, keywords, clarity, completion).
export function getAnalysis(questions, answers) {
  const antiVisionSection = questions.filter(
    (q) => q.section === "الرؤية المضادة",
  );
  const visionSection = questions.filter(
    (q) => q.section === "الرؤية الأولية",
  );
  const compressedAnti = questions.find(
    (q) => q.title === "الرؤية المضادة (مضغوطة)",
  );
  const compressedVision = questions.find(
    (q) => q.title === "الرؤية الأولية (مضغوطة)",
  );
  const planSection = questions.filter(
    (q) => q.section === "خطة اللعبة · المكونات الستة",
  );
  const lensSection = questions.filter(
    (q) => q.section === "الأهداف كعدسات",
  );

  const antiStatements = antiVisionSection
    .map((q) => answers[q.id])
    .concat(compressedAnti ? answers[compressedAnti.id] : "");
  const visionStatements = visionSection
    .map((q) => answers[q.id])
    .concat(compressedVision ? answers[compressedVision.id] : "");

  const antiMain = isAnswered(answers[compressedAnti?.id])
    ? answers[compressedAnti.id]
    : summarize(antiStatements.filter(isAnswered).join(" "));
  const visionMain = isAnswered(answers[compressedVision?.id])
    ? answers[compressedVision.id]
    : summarize(visionStatements.filter(isAnswered).join(" "));

  const roadmap = planSection.map((q) => ({
    id: q.id,
    title: q.title.replace(/^المكون\s*\d+:\s*/, ""),
    question: q.question,
    answer: answers[q.id] || "",
  }));

  const clarityItems = planSection.concat(
    [compressedAnti, compressedVision].filter(Boolean),
  );
  const clarityAnswered = clarityItems.filter((q) => isAnswered(answers[q.id]))
    .length;
  const clarityPercent = clarityItems.length
    ? Math.round((clarityAnswered / clarityItems.length) * 100)
    : 0;

  const total = questions.length;
  const answered = questions.filter((q) => isAnswered(answers[q.id])).length;
  const completionPercent = total ? Math.round((answered / total) * 100) : 0;

  return {
    antiVision: {
      main: isAnswered(antiMain) ? antiMain : "",
      tags: collectTags(
        antiVisionSection.concat(compressedAnti ? [compressedAnti] : []),
        answers,
      ),
    },
    primaryVision: {
      main: isAnswered(visionMain) ? visionMain : "",
      tags: collectTags(
        visionSection.concat(compressedVision ? [compressedVision] : []),
        answers,
      ),
    },
    roadmap,
    lens: lensSection.map((q) => ({
      id: q.id,
      title: q.title,
      answer: answers[q.id] || "",
    })),
    keywords: extractKeywords(answers, 12),
    clarity: { answered: clarityAnswered, total: clarityItems.length, percent: clarityPercent },
    completion: { answered, total, percent: completionPercent },
  };
}
