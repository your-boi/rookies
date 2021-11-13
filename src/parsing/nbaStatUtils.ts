import { GameLog } from "./types";

const SUMMABLE_STATS = [
  "GS",
  "MP",
  "FG",
  "FGA",
  "3P",
  "3PA",
  "FT",
  "FTA",
  "ORB",
  "DRB",
  "TRB",
  "AST",
  "STL",
  "BLK",
  "TOV",
  "PF",
  "PTS",
  "GmSc",
] as const;
const PERCENTAGE_STATS = ["FG%", "3P%", "FT%"] as const;

const summableSet = new Set(SUMMABLE_STATS);
const countableStats = {
  gamesPlayed: 0,
  ...SUMMABLE_STATS.reduce((acc, stat) => {
    acc[stat] = 0;
    return acc;
  }, {}),
};

export const aggregateGameLogsToCountableStats = (logs: GameLog[]) => {
  const counts = logs.reduce(
    (acc, log) => {
      const entries = Object.entries(log);
      if (log.DNP) {
        return acc;
      }
      acc.gamesPlayed += 1;

      for (const [stat, value] of entries) {
        if (summableSet.has(stat)) {
          acc[stat] += value;
        }
      }

      return acc;
    },
    { ...countableStats }
  );

  return counts;
};

export const aggregateGameLogsToAverageStats = (logs: GameLog[]) => {
  const stats = aggregateGameLogsToCountableStats(logs);

  SUMMABLE_STATS.forEach((stat) => {
    stats[stat] = stats[stat] / stats.gamesPlayed;
  });

  PERCENTAGE_STATS.forEach((stat) => {
    // hack
    const [rawKey] = stat.split("%");
    const attemptedKey = `${rawKey}A`;

    stats[stat] = stats[rawKey] / stats[attemptedKey];
  });
  return stats;
};
