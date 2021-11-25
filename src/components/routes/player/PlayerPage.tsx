import React, { useState } from "react";
import { NAMES } from "../../../parsing/NAMES";
import { FasterSelect } from "../../FasterSelect";
import useSWR from "swr";
import { StatLiteral, timeSeriesAverageStats } from "src/parsing/nbaStatUtils";
import { fetchRookiesGameLogs } from "src/parsing/fetchRookieGameLogs";
import { LineGraph } from "src/components/LineGraph";
import { playerLogsToLineData } from "src/parsing/playerLogsToLineData";
import { GraphContainer } from "src/components/GraphContainer";
import { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import WindowedSelect from "react-windowed-select";

const possibleStats: StatLiteral[] = [
  "PTS",
  "3P%",
  "FG%",
  "FT%",
  "FT",
  "3PA",
  "ORB",
  "DRB",
  "TRB",
  "AST",
  "STL",
  "BLK",
  "MP",
  "TOV",
  "PF",
  "GmSc",
];

type SelectOption<T = string> = {
  value: T;
  label: string;
};

const GRAPHS_KEY = "selectedGraphs";

const toSelectOption = (o) => ({ value: o, label: o });
const playerOptions = NAMES.map(toSelectOption);
const viewType = ["averages", "totals", "historical"];
const graphOptions = possibleStats.map(toSelectOption);

const initialSelectedGraphs = localStorage.getItem(GRAPHS_KEY);
export const PlayerPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const selectedPlayers = Object.values(queryString.parse(location.search));

  console.log("selectedPlayers: ", selectedPlayers);
  const [selectedGraphs, setSelectedGraphs] = useState<
    SelectOption<StatLiteral>[]
  >(initialSelectedGraphs ? JSON.parse(initialSelectedGraphs) : graphOptions);

  const onSelectGraphs = useCallback(
    (val) => {
      localStorage.setItem(GRAPHS_KEY, JSON.stringify(val));
      setSelectedGraphs(val);
    },
    [setSelectedGraphs]
  );

  const onSelectPlayers = useCallback(
    (val) => {
      console.log("val: ", val);
      history.push({
        pathname: location.pathname,
        search: queryString.stringify(val.map((v) => v.value)),
      });
    },
    [history, location]
  );

  const names = selectedPlayers || [];

  const { data: glogs = [] } = useSWR(
    names?.join("|") || null,
    fetchRookiesGameLogs
  );

  return (
    <div>
      <h1 style={{ fontSize: 50, fontWeight: "bold", textAlign: "center" }}>
        Player
      </h1>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <FasterSelect
            isMulti
            options={playerOptions}
            onChange={onSelectPlayers}
            value={selectedPlayers.map(toSelectOption)}
          />
        </div>
        <div style={{ flex: "1" }}>
          <FasterSelect
            isMulti
            options={graphOptions}
            onChange={onSelectGraphs}
            value={selectedGraphs}
          />
        </div>
      </div>

      <GraphContainer>
        {selectedGraphs.map(({ value: statLiteral }) => {
          return (
            <LineGraph
              key={statLiteral}
              data={playerLogsToLineData(
                names,
                glogs.map(timeSeriesAverageStats),
                statLiteral
              )}
            />
          );
        })}
      </GraphContainer>
    </div>
  );
};
