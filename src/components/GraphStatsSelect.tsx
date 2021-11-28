import React, { useState } from "react";
import { StatLiteral } from "src/parsing/nbaStatUtils";
import { useCallback } from "react";
import { FasterSelect } from "./FasterSelect";
import { SelectOption, toSelectOption } from "src/util/toSelectOption";

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

export const GRAPHS_KEY = "selectedGraphs";
export const graphOptions = possibleStats.map(toSelectOption);

interface Props {
  selectedGraphs: SelectOption<StatLiteral>[];
  setSelectedGraphs: React.Dispatch<
    React.SetStateAction<SelectOption<StatLiteral>[]>
  >;
}

export const GraphStatsSelect: React.FC<Props> = ({
  selectedGraphs,
  setSelectedGraphs,
}) => {
  const onSelectGraphs = useCallback(
    (val) => {
      localStorage.setItem(GRAPHS_KEY, JSON.stringify(val));
      setSelectedGraphs(val);
    },
    [setSelectedGraphs]
  );

  return (
    <FasterSelect
      isMulti
      options={graphOptions}
      onChange={onSelectGraphs}
      value={selectedGraphs}
    />
  );
};
