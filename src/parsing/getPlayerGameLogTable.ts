import { axiosFetch, getPlayerGameLogByYearUrl } from "./urlUtil";
import cheerio from "cheerio";
import cheerioTableParser from "cheerio-tableparser";
import { unzip } from "lodash";
import { GameLog } from "./types";
import { parseUnit } from "./unitParsing";
import axios from "axios";

export const getPlayerGameLogTable = async (
  playerId: string,
  year: string
): Promise<GameLog[]> => {
  if (!playerId || !year) {
    return [];
  }
  const url = getPlayerGameLogByYearUrl(playerId, year);
  try {
    const result = await axiosFetch(url);
    const $ = cheerio.load(result.data);
    cheerioTableParser($);
    // @ts-ignore
    const table = $("#pgl_basic").parsetable(true, true, true);
    return parseTable(table);
  } catch (e) {
    console.error("Error fetching game log table");
    throw e;
  }
};

export const parseTable = (table: string[][]): GameLog[] => {
  const transposed = unzip(table);
  const headers = transposed[0];
  const logs: GameLog[] = [];
  transposed.forEach((row, i) => {
    if (i === 0) {
      return;
    }
    const log: Partial<GameLog> = {};
    const isDNP = isNaN(Number(row[headers.findIndex((a) => a === "GS")]));
    log.DNP = isDNP;
    row.forEach((cell, j) => {
      const headerKey = headers[j] as keyof GameLog;
      if (headerKey) {
        const parsedVal = parseUnit(headerKey, cell);
        // @ts-ignore
        log[headerKey] = parsedVal;
      }
    });
    logs.push(log as GameLog);
  });
  return logs;
};
