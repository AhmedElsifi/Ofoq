// localStorage key holding all answers as a JSON object keyed by question id.
const STORAGE_KEY = "ofoq-answers";

// Load all answers, returning an empty object if none are stored.
export function loadAnswers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

// Return the saved answer for a single question, or an empty string.
export function getAnswer(questionId) {
  return loadAnswers()[String(questionId)] || "";
}

// Persist an answer for a single question.
export function saveAnswer(questionId, text) {
  const all = loadAnswers();
  all[String(questionId)] = text;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

// Remove all stored answers from localStorage.
export function clearAnswers() {
  localStorage.removeItem(STORAGE_KEY);
}

// Count how many stored answers are non-empty.
export function getStoredAnswerCount() {
  return Object.values(loadAnswers()).filter((v) => v.trim()).length;
}
