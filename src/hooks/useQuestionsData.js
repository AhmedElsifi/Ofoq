import { useEffect, useState } from "react";
import { fetchQuestions } from "../lib/questions";
import { loadAnswers } from "../lib/storage";

// Loads questions and all stored answers once; exposes them with a setter.
export function useQuestionsData() {
  // Questions, answers, and loading state.
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch questions and load saved answers on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const qs = await fetchQuestions();
        if (cancelled) return;
        setQuestions(qs);
        setAnswers(loadAnswers());
      } catch {
        // keep empty
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { questions, answers, setAnswers, loading };
}
