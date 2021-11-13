import namesToYears from "src/parsing/hardcodedData/rookieNameToYear.json";
import { getPlayerGameLogTable } from "./parsing/getPlayerGameLogTable";
import { getPlayerIdFromName } from "./parsing/getPlayerIdFromName";
import { GameLog } from "./parsing/types";

const currentYear = "2022";

export const fetchRookieGameLogs = async (name: string): Promise<GameLog[]> => {
  const pid = getPlayerIdFromName(name);
  const rookieYear = namesToYears[name];
  return new Promise((res, rej) => {
    if (rookieYear === currentYear) {
      getPlayerGameLogTable(pid, currentYear).then(res).catch(rej);
      return;
    }
    import(`src/parsing/hardcodedData/RookieGameLogs-${rookieYear}.json`)
      .then((module) => {
        const playerList = module.default;

        const logs = playerList.find((player) => player.name === name)?.logs;
        if (!logs) {
          rej("Logs not found");
        }
        res(logs);
      })
      .catch((e) => rej("No logs stored"));
  });
};
