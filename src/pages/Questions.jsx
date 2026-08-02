import { useState } from "react";
import { useParams } from "react-router-dom";
import QuestionCard from "../components/Questions/QuestionCard";
import PhaseSelector from "../components/Questions/PhaseSelector";
import PhaseComplete from "../components/Questions/PhaseComplete";
import QuestionsEmpty from "../components/Questions/QuestionsEmpty";
import LoadingState from "../components/UI/LoadingState";
import ErrorState from "../components/UI/ErrorState";
import { getPhaseByTime, isPhase } from "../lib/questions";
import { useQuestionsAnswers } from "../hooks/useQuestionsAnswers";

// Question journal flow for a phase, with progress, saving, and completion.
export default function Questions() {
  const { phase: phaseParam } = useParams();
  // Load all questions and answers for the session.
  const { questions, answers, updateAnswer, loading, error } =
    useQuestionsAnswers();
  // Current question index and completion flag.
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  // Resolve the active phase from the route or the current time.
  const phase =
    phaseParam && isPhase(phaseParam) ? phaseParam : getPhaseByTime(new Date());

  // Reset progress whenever the active phase changes.
  const [prevPhase, setPrevPhase] = useState(phase);
  if (phase !== prevPhase) {
    setPrevPhase(phase);
    setIndex(0);
    setFinished(false);
  }

  // Questions of the active phase plus derived progress values.
  const phaseQuestions = questions.filter((q) => q.phase === phase);
  const safeIndex = Math.min(index, Math.max(0, phaseQuestions.length - 1));
  const current = phaseQuestions[safeIndex];
  const answeredInPhase = phaseQuestions.filter((q) =>
    (answers[q.id] || "").trim(),
  ).length;

  // Persist the current answer as the user types.
  const handleChange = (text) => {
    if (!current) return;
    updateAnswer(current.id, text);
  };

  // Move to the next question or mark the phase as finished.
  const handleNext = () => {
    if (!current) return;
    if (safeIndex < phaseQuestions.length - 1) setIndex(safeIndex + 1);
    else setFinished(true);
  };

  // Move back to the previous question.
  const handlePrevious = () => {
    if (safeIndex > 0) setIndex(safeIndex - 1);
  };

  if (loading) return <LoadingState message="جاري تحميل الأسئلة..." />;
  if (error) return <ErrorState message={error} />;

  if (finished) {
    return (
      <PhaseComplete
        phase={phase}
        answered={answeredInPhase}
        total={phaseQuestions.length}
        onReview={() => setFinished(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 md:px-12 pt-28 pb-16">
      <PhaseSelector phase={phase} />
      {current ? (
        <QuestionCard
          question={current}
          index={safeIndex}
          total={phaseQuestions.length}
          value={answers[current.id] || ""}
          onChange={handleChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirst={safeIndex === 0}
          isLast={safeIndex === phaseQuestions.length - 1}
        />
      ) : (
        <QuestionsEmpty />
      )}
    </div>
  );
}
