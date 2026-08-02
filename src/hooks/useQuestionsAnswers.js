import { useEffect, useState } from "react";
import { fetchQuestions } from "../util/questions";
import { getAnswer, saveAnswer } from "../util/storage";

// Loads questions and per-question saved answers; provides an update helper.
export function useQuestionsAnswers() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch questions and hydrate answers from storage on mount.
  useEffect(() => {
    let cancelled = false;
    fetchQuestions()
      .then((qs) => {
        if (cancelled) return;
        setQuestions(qs);
        const map = {};
        for (const q of qs) map[q.id] = getAnswer(q.id);
        setAnswers(map);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "تعذر تحميل الأسئلة");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Update an answer in state and persist it to storage.
  const updateAnswer = (id, text) => {
    setAnswers((prev) => ({ ...prev, [id]: text }));
    saveAnswer(id, text);
  };

  return { questions, answers, updateAnswer, loading, error };
}
