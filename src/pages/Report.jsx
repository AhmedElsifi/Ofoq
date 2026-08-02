import { useMemo, useState } from "react";
import { generateReportPdf } from "../util/reportPdf";
import {
  buildReportStats,
  buildDateString,
  buildPdfFilename,
  buildStatusMessage,
} from "../util/reportData";
import { useQuestionsData } from "../hooks/useQuestionsData";
import LoadingState from "../components/UI/LoadingState";
import ReportHeader from "../components/Report/ReportHeader";
import ReportStatsBanner from "../components/Report/ReportStatsBanner";
import ReportPhaseGrid from "../components/Report/ReportPhaseGrid";
import ReportProgressRing from "../components/Report/ReportProgressRing";
import ReportActions from "../components/Report/ReportActions";
import ReportQuestions from "../components/Report/ReportQuestions";

// Daily report page: overall stats, phase progress, and answer review.
export default function Report() {
  const { questions, answers, loading } = useQuestionsData();
  const [downloading, setDownloading] = useState(false);

  // Aggregate report statistics across all questions.
  const stats = useMemo(
    () => buildReportStats(questions, answers),
    [questions, answers],
  );
  const dateString = buildDateString();
  const pdfFilename = buildPdfFilename();
  const statusMessage = buildStatusMessage(stats);

  // Generate and download the report as a PDF.
  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generateReportPdf({
        questions,
        answers,
        dateString,
        percent: stats.percent,
        answered: stats.answered,
        total: stats.total,
        filename: pdfFilename,
      });
    } catch (err) {
      console.error("فشل إنشاء ملف PDF", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="min-h-screen flex-grow px-4 md:px-12 pt-40 pb-16 md:pb-20 max-w-[1440px] mx-auto w-full">
      <ReportHeader dateString={dateString} />
      {loading ? (
        <LoadingState message="جاري تحميل تقريرك..." />
      ) : (
        <>
          <ReportStatsBanner
            answered={stats.answered}
            total={stats.total}
            percent={stats.percent}
          />
          <ReportPhaseGrid byPhase={stats.byPhase} />
          <ReportProgressRing
            percent={stats.percent}
            statusMessage={statusMessage}
          />
          <ReportActions
            onDownload={handleDownload}
            downloading={downloading}
            hasQuestions={stats.total > 0}
          />
          <ReportQuestions
            questions={questions}
            answers={answers}
            answered={stats.answered}
            total={stats.total}
            percent={stats.percent}
          />
        </>
      )}
    </main>
  );
}
