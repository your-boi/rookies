import React, { useState } from "react";
import { useParams } from "react-router";
import cheerioTableParser from "cheerio-tableparser";
import axios from "axios";
import cheerio from "cheerio";
import { NAMES } from "../../../parsing/NAMES";
import { FasterSelect } from "../../FasterSelect";
import { getPlayerIdFromName } from "src/parsing/getPlayerIdFromName";
import { getPlayerGameLogTable } from "src/parsing/getPlayerGameLogTable";
import useSWR from "swr";
import { range } from "lodash";
import {
  aggregateGameLogsToAverageStats,
  aggregateGameLogsToCountableStats,
} from "src/parsing/nbaStatUtils";
import { fetchRookieGameLogs } from "src/fetchRookieGameLogs";

interface SelectOption {
  value: string;
  label: string;
}

// const years = range(2003, 2021);

// const test = () => {
//   const foo = years.map((y) =>
//     import(`src/parsing/hardcodedData/RookieGameLogs-${y}.json`).then((a) =>
//       console.log("what me", a)
//     )
//   );
//   return foo;
// };

// const currentYearFetcher = (pid) => getPlayerGameLogTable(pid, "2022");
const selectOptions = NAMES.map((o) => ({ value: o, label: o }));

export const PlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selected, setSelected] = useState<SelectOption>();
  const [selected2, setSelected2] = useState<SelectOption>();

  const { data: glog1 = [] } = useSWR(
    selected?.value || null,
    fetchRookieGameLogs
  );
  const { data: glog2 = [] } = useSWR(
    selected2?.value || null,
    fetchRookieGameLogs
  );

  const average1 = aggregateGameLogsToAverageStats(glog1);
  const average2 = aggregateGameLogsToAverageStats(glog2);
  const total1 = aggregateGameLogsToCountableStats(glog1);
  const total2 = aggregateGameLogsToCountableStats(glog2);

  return (
    <div>
      <h1 style={{ fontSize: 50, fontWeight: "bold", textAlign: "center" }}>
        Player {id}
      </h1>
      <FasterSelect
        options={selectOptions}
        onChange={setSelected}
        value={selected}
      />
      <FasterSelect
        options={selectOptions}
        onChange={setSelected2}
        value={selected2}
      />
      <div>
        lol
        <pre>{JSON.stringify(average1, null, 2)}</pre>
        <pre>{JSON.stringify(total1, null, 2)}</pre>
      </div>
    </div>
  );
};
