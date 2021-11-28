import { useState, useMemo } from "react";
import {
  timeSeriesAverageStats,
  timeSeriesCountableStats,
} from "src/parsing/nbaStatUtils";

const viewTypes = ["averages", "summed", "game by game"] as const;

export const useViewTypeStats = () => {
  const [viewType, setViewType] = useState<typeof viewTypes[number] | string>(
    viewTypes[0]
  );

  const statMapper = useMemo(() => {
    if (viewType === "averages") {
      return timeSeriesAverageStats;
    }
    if (viewType === "summed") {
      return timeSeriesCountableStats;
    }
    return (s) => s;
  }, [viewType]);

  return useMemo(
    () => ({
      viewType,
      setViewType,
      viewTypes,
      statMapper,
    }),
    [viewType, setViewType, viewTypes, statMapper]
  );
};
