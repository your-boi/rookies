import namesToInfo from "src/parsing/hardcodedData/rookies.json";
import { getPlayerGameLogTable } from "./getPlayerGameLogTable";
import { GameLog } from "./types";

const currentYear = "2022";

export const fetchRookiesGameLogs = async (
  names: string
): Promise<GameLog[][]> => {
  const promises = [];
  const namesSplit = names.split("|");

  namesSplit.forEach((name) => {
    promises.push(fetchRookieGameLogs(name));
  });

  return Promise.all(promises);
};

export const fetchRookieGameLogs = async (name: string): Promise<GameLog[]> => {
  const { y: rookieYear, id } = namesToInfo[name];
  return new Promise((res, rej) => {
    if (rookieYear === currentYear) {
      getPlayerGameLogTable(id, currentYear).then(res).catch(rej);
      return;
    }
    import(`src/parsing/hardcodedData/RookieGameLogs-${rookieYear}.json`)
      .then((module) => {
        const playerList = module.default;

        const logs = playerList.find(
          (player) => player.name.replace("*", "") === name
        )?.logs;
        if (!logs) {
          rej("Logs not found");
        }
        res(logs);
      })
      .catch((e) => rej("No logs stored"));
  });
};
