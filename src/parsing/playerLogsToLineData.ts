import { StatLiteral } from "src/parsing/nbaStatUtils";

export const playerLogsToLineData = (
  names: string[],
  timeSeriesStats: Record<string, number>[][] = [],
  desiredStat: StatLiteral
) => {
  console.debug("timeSeriesStats: ", timeSeriesStats);
  const lineGraphData = timeSeriesStats.reduce((allData, playerData, i) => {
    const name = names[i];

    for (let j = 0; j < playerData.length; j++) {
      if (!allData[j]) {
        allData[j] = { game: j + 1 };
      }
      allData[j][name] = playerData[j][desiredStat];
    }
    return allData;
  }, []);

  return {
    names,
    desiredStat,
    lineGraphData,
  };
};
