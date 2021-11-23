import React, { useState } from "react";
import { FasterSelect } from "src/components/FasterSelect";
import useSWR from "swr";
import { StatLiteral, timeSeriesAverageStats } from "src/parsing/nbaStatUtils";
import { LineGraph } from "src/components/LineGraph";
import styled from "styled-components";
import { playerLogsToLineData } from "src/parsing/playerLogsToLineData";
import { range } from "lodash";
import { fetchAllRookieGameLogsFromYears } from "src/parsing/fetchAllRookieGameLogsFromYear";

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

const selectOptions = range(2015, 2022).map((n) => ({
  value: n.toString(),
  label: n.toString(),
}));

export const YearComparisonPage: React.FC = () => {
  const [selected, setSelected] = useState<SelectOption[]>();

  const years = selected?.map((o) => o.value) || [];
  console.log("selected: ", selected);
  console.log("years: ", years);
  console.log('years?.join("|"): ', years?.join("|"));

  const { data: glogs = [] } = useSWR(
    years?.join("|") || null,
    fetchAllRookieGameLogsFromYears
  );
  console.log("glogs: ", glogs);

  return (
    <div>
      <h1 style={{ fontSize: 50, fontWeight: "bold", textAlign: "center" }}>
        Years
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
                years,
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
