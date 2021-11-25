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
export type StatLiteral =
  | typeof SUMMABLE_STATS[number]
  | typeof PERCENTAGE_STATS[number];

export const isPercentageStat = (stat: string) =>
  PERCENTAGE_STATS.includes(stat as typeof PERCENTAGE_STATS[number]);

const summableSet = new Set(SUMMABLE_STATS);
const countableStats: Partial<
  { gamesPlayed: number } & {
    [Key in StatLiteral]: number;
  }
> = {
  gamesPlayed: 0,
  ...SUMMABLE_STATS.reduce((acc, stat) => {
    acc[stat] = 0;
    return acc;
  }, {}),
} as const;

type CountableStats = Record<string, number>;
type AverageStats = Record<string, number>;

export const timeSeriesCountableStats = (logs: GameLog[]): CountableStats[] => {
  const timeseries = [];
  logs.reduce(
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

      timeseries.push({ ...acc });

      return acc;
    },
    { ...countableStats }
  );

  return timeseries;
};

export const aggregateGameLogsToCountableStats = (
  logs: GameLog[]
): CountableStats => {
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

export const timeSeriesAverageStats = (logs: GameLog[]): CountableStats[] => {
  const timeseries = [];
  logs.reduce(
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
      const entry = { ...acc };
      SUMMABLE_STATS.forEach((stat) => {
        entry[stat] = Number(entry[stat] / entry.gamesPlayed);
      });

      PERCENTAGE_STATS.forEach((stat) => {
        // hack
        const [rawKey] = stat.split("%");
        const attemptedKey = `${rawKey}A`;

        entry[stat] = Number((entry[rawKey] / entry[attemptedKey]).toFixed(3));
      });

      delete entry.GS;

      timeseries.push(entry);

      return acc;
    },
    { ...countableStats }
  );

  return timeseries;
};

export const aggregateGameLogsToAverageStats = (
  logs: GameLog[]
): AverageStats => {
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

  delete stats.GS;
  return stats;
};
