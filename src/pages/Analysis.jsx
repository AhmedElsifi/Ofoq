import { useMemo, useState } from "react";
import { getAnalysis } from "../util/analysis";
import { generateAnalysisPdf } from "../util/analysisPdf";
import { clearAnswers } from "../util/storage";
import { useQuestionsData } from "../hooks/useQuestionsData";
import LoadingState from "../components/UI/LoadingState";
import AnalysisHeader from "../components/Analysis/AnalysisHeader";
import VisionCards from "../components/Analysis/VisionCards";
import RoadmapGrid from "../components/Analysis/RoadmapGrid";
import InsightsVisuals from "../components/Analysis/InsightsVisuals";
import AnalysisActions from "../components/Analysis/AnalysisActions";
import AnalysisEmpty from "../components/Analysis/AnalysisEmpty";

// Insights page rendering the daily analysis derived from user answers.
export default function Analysis() {
  const { questions, answers, setAnswers, loading } = useQuestionsData();
  const [downloading, setDownloading] = useState(false);

  // Compute the analysis object from questions and answers.
  const analysis = useMemo(
    () => (questions.length ? getAnalysis(questions, answers) : null),
    [questions, answers],
  );

  // Generate and download the analysis as a styled PDF.
  const handleDownload = async () => {
    if (!analysis) return;
    setDownloading(true);
    try {
      await generateAnalysisPdf({
        analysis,
        filename: `ofoq-analysis-${new Date().toISOString().slice(0, 10)}.pdf`,
      });
    } catch (err) {
      console.error("فشل إنشاء ملف PDF", err);
    } finally {
      setDownloading(false);
    }
  };

  // Clear all locally stored answers after user confirmation.
  const handleReset = () => {
    if (!window.confirm("سيتم حذف جميع إجاباتك المحفوظة محلياً. هل أنت متأكد؟")) return;
    clearAnswers();
    setAnswers({});
  };

  // True when the user has not answered anything yet.
  const noData = !loading && analysis && analysis.completion.answered === 0;

  return (
    <main className="min-h-screen flex-grow px-4 md:px-12 pt-40 pb-16 md:pb-20 max-w-[1440px] mx-auto w-full">
      <AnalysisHeader />
      {loading ? (
        <LoadingState message="جاري تحليل استجاباتك..." />
      ) : !analysis ? (
        <div className="glass-card max-w-md mx-auto rounded-2xl p-8 text-center">
          <p className="text-text-muted">تعذر تحميل البيانات.</p>
        </div>
      ) : noData ? (
        <AnalysisEmpty />
      ) : (
        <>
          <VisionCards analysis={analysis} />
          <RoadmapGrid roadmap={analysis.roadmap} />
          <InsightsVisuals
            keywords={analysis.keywords}
            clarity={analysis.clarity}
          />
          <AnalysisActions
            onDownload={handleDownload}
            onReset={handleReset}
            downloading={downloading}
          />
        </>
      )}
    </main>
  );
}
