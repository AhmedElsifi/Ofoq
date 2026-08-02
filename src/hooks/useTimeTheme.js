import { useEffect } from "react";
import { getPhaseByTime } from "../util/questions";

// Keep the document theme in sync with the current time-of-day phase.
export default function useTimeTheme() {
  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = getPhaseByTime(new Date());
    };
    apply();
    const timer = setInterval(apply, 60_000);
    return () => clearInterval(timer);
  }, []);
}
