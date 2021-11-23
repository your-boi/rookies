import axios, { AxiosResponse } from "axios";
import { HTMLString } from "./types";
import { setupCache } from "axios-cache-adapter";

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

export const BBRUrl = "https://cors-proxy-bb.herokuapp.com";

const http = axios.create({
  adapter: cache.adapter,
});

export const axiosFetch = (url: string): Promise<AxiosResponse<HTMLString>> =>
  http.get<HTMLString>(url);

export const getSeasonPerGameUrl = (year: string): string =>
  `${BBRUrl}/leagues/NBA_${year}_per_game.html`;

export const getPlayerGameLogByYearUrl = (
  playerId: string,
  year: string
): string => `${BBRUrl}/players/${playerId[0]}/${playerId}/gamelog/${year}`;

export const getRookiesUrl = (year: string): string =>
  `${BBRUrl}/leagues/NBA_${year}_rookies.html`;
