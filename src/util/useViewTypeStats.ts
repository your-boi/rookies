import { useState, useMemo } from "react";
import {
  timeSeriesAverageStats,
  timeSeriesCountableStats,
  timeSeriesRollingAverageStats,
} from "src/parsing/nbaStatUtils";
import { GameLog } from "src/parsing/types";

const viewTypes = [
  "averages",
  "summed",
  "game by game",
  "rolling average",
] as const;

export const useViewTypeStats = () => {
  const [viewType, setViewType] = useState<typeof viewTypes[number] | string>(
    viewTypes[0]
  );
  const [rollingAverageN, setRollingAverageN] = useState<number>(5);

  const statMapper = useMemo(() => {
    if (viewType === "averages") {
      return timeSeriesAverageStats;
    }
    if (viewType === "summed") {
      return timeSeriesCountableStats;
    }
    if (viewType === "rolling average") {
      return (logs: GameLog[]) =>
        timeSeriesRollingAverageStats(logs, rollingAverageN);
    }
    return (s) => s;
  }, [viewType, rollingAverageN]);

  return useMemo(
    () => ({
      viewType,
      setViewType,
      viewTypes,
      statMapper,
      rollingAverageN,
      setRollingAverageN,
    }),
    [
      viewType,
      setViewType,
      viewTypes,
      statMapper,
      rollingAverageN,
      setRollingAverageN,
    ]
  );
};
