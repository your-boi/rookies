import React, { useState } from "react";
import { useParams } from "react-router";
import { NAMES } from "../../../parsing/NAMES";
import { FasterSelect } from "../../FasterSelect";
import useSWR from "swr";
import { StatLiteral, timeSeriesAverageStats } from "src/parsing/nbaStatUtils";
import { fetchRookiesGameLogs } from "src/parsing/fetchRookieGameLogs";
import { LineGraph } from "src/components/LineGraph";
import styled from "styled-components";
import { playerLogsToLineData } from "src/parsing/playerLogsToLineData";

const GraphContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const desiredStats: StatLiteral[] = [
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

interface SelectOption {
  value: string;
  label: string;
}

const selectOptions = NAMES.map((o) => ({ value: o, label: o }));

export const PlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selected, setSelected] = useState<SelectOption[]>();

  const names = selected?.map((o) => o.value) || [];

  const { data: glogs = [] } = useSWR(
    names?.join("|") || null,
    fetchRookiesGameLogs
  );

  return (
    <div>
      <h1 style={{ fontSize: 50, fontWeight: "bold", textAlign: "center" }}>
        Player {id}
      </h1>
      <FasterSelect
        isMulti
        options={selectOptions}
        onChange={setSelected}
        value={selected}
      />
      <GraphContainer>
        {desiredStats.map((statLiteral) => {
          return (
            <LineGraph
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
