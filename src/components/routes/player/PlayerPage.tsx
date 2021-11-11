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

interface SelectOption {
  value: string;
  label: string;
}

const years = range(2003, 2021);

const test = () => {
  const foo = years.map(
    (y) => import(`src/parsing/hardcodedData/RookieGameLogs-${y}.json`)
  );
  return foo;
};

const selectOptions = NAMES.map((o) => ({ value: o, label: o }));

const currentYearFetcher = (pid) => getPlayerGameLogTable(pid, "2022");

export const PlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selected, setSelected] = useState<SelectOption>();
  const [selected2, setSelected2] = useState<SelectOption>();

  const pid1 = getPlayerIdFromName(selected?.value);
  const pid2 = getPlayerIdFromName(selected2?.value);

  const { data: glog1 } = useSWR(pid1 || null, currentYearFetcher);
  const { data: glog2 } = useSWR(pid2 || null, currentYearFetcher);
  // const test = axios
  //   .get(`${BBRUrl}/leagues/NBA_2021_rookies.html`)
  //   .then((result) => {
  //     const $ = cheerio.load(result.data);
  //     cheerioTableParser($);
  //     // @ts-ignore
  //     const table = $("#rookies").parsetable(true, true, true);
  //     console.log("table: ", table);
  //   });
  console.log("first glog", glog1);
  console.log("second glog", glog2);

  console.log("lmao", test());

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
    </div>
  );
};
