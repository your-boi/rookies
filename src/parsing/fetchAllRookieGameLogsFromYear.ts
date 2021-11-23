import { GameLog } from "./parsing/types";

export const fetchAllRookieGamesLogsFromYears = async (
  years: string
): Promise<GameLog[][]> => {
  const promises = [];
  const yearsSplit = years.split("|");
  console.log("lmao", years);

  yearsSplit.forEach((year) => {
    promises.push(fetchAllRookieGameLogsFromYear(year));
  });

  return Promise.all(promises);
};

export const fetchAllRookieGameLogsFromYear = async (
  year: string
): Promise<GameLog[]> => {
  return new Promise((res, rej) => {
    import(`src/parsing/hardcodedData/RookieGameLogs-${year}.json`)
      .then((module) => {
        const playerList = module.default;
        const logs = playerList?.reduce((acc, player) => {
          acc.push(...player.logs);
          return acc;
        }, [] as GameLog[]);
        console.log("fetching logs", logs);

        if (!logs) {
          rej("Logs not found");
        }
        res(logs);
      })
      .catch((e) => rej("No logs stored"));
  });
};
