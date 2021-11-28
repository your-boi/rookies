import React, { useState } from "react";
import { NAMES } from "../../../parsing/NAMES";
import { FasterSelect } from "../../FasterSelect";
import useSWR from "swr";
import { isPercentageStat, StatLiteral } from "src/parsing/nbaStatUtils";
import { fetchRookiesGameLogs } from "src/parsing/fetchRookieGameLogs";
import { LineGraph } from "src/components/LineGraph";
import { playerLogsToLineData } from "src/parsing/playerLogsToLineData";
import { GraphContainer } from "src/components/GraphContainer";
import { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { SelectOption, toSelectOption } from "src/util/toSelectOption";
import {
  graphOptions,
  GraphStatsSelect,
  GRAPHS_KEY,
} from "src/components/GraphStatsSelect";
import { useViewTypeStats } from "src/util/useViewTypeStats";

const playerOptions = NAMES.map(toSelectOption);
const initialSelectedGraphs = localStorage.getItem(GRAPHS_KEY);

export const PlayerPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const selectedPlayers = Object.values(queryString.parse(location.search));

  const { viewType, setViewType, viewTypes, statMapper } = useViewTypeStats();

  const [selectedGraphs, setSelectedGraphs] = useState<
    SelectOption<StatLiteral>[]
  >(initialSelectedGraphs ? JSON.parse(initialSelectedGraphs) : graphOptions);

  const onSelectPlayers = useCallback(
    (val) => {
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
      <h2 style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
        Rookie Comparison
      </h2>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "2" }}>
          <FasterSelect
            isMulti
            options={playerOptions}
            onChange={onSelectPlayers}
            value={selectedPlayers.map(toSelectOption)}
          />
        </div>
        <div style={{ flex: "1" }}>
          {viewTypes.map((t) => {
            return (
              <>
                <input
                  onChange={(e) => setViewType(e.target.value)}
                  type="radio"
                  id={t}
                  name="dataType"
                  checked={t === viewType}
                  value={t}
                />
                <label htmlFor={t}>{t}</label>
              </>
            );
          })}
        </div>
        <div style={{ flex: "2" }}>
          <GraphStatsSelect
            selectedGraphs={selectedGraphs}
            setSelectedGraphs={setSelectedGraphs}
          />
        </div>
      </div>

      <GraphContainer>
        {selectedGraphs
          .filter((s) => {
            if (viewType === "summed") {
              return !isPercentageStat(s.value);
            }
            return s;
          })
          .map(({ value: statLiteral }) => {
            return (
              <LineGraph
                key={statLiteral}
                data={playerLogsToLineData(
                  names,
                  glogs.map(statMapper),
                  statLiteral
                )}
              />
            );
          })}
      </GraphContainer>
    </div>
  );
};
