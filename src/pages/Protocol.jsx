import { useEffect, useState } from "react";
import LoadingState from "../components/UI/LoadingState";
import ErrorState from "../components/UI/ErrorState";
import ProtocolHeader from "../components/Protocol/ProtocolHeader";
import ChapterCard from "../components/Protocol/ChapterCard";
import ProtocolCTA from "../components/Protocol/ProtocolCTA";
import ProtocolSources from "../components/Protocol/ProtocolSources";

// Protocol page: explains the theory behind the daily routine.
export default function Protocol() {
  const [theory, setTheory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the theory document from the bundled JSON file.
  useEffect(() => {
    let cancelled = false;
    fetch("/data/theory.json")
      .then((res) => {
        if (!res.ok) throw new Error("تعذر تحميل النظرية");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setTheory(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "تعذر تحميل النظرية");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <LoadingState message="جاري تحميل البروتوكول..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <main className="min-h-screen flex-grow px-4 md:px-12 pt-40 pb-16 md:pb-20 max-w-[1440px] mx-auto w-full">
      <ProtocolHeader meta={theory.metadata} />
      {theory.chapters.map((chapter, i) => (
        <ChapterCard key={chapter.id} chapter={chapter} index={i} />
      ))}
      <ProtocolSources references={theory.metadata.references} />
      <ProtocolCTA />
    </main>
  );
}
