import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { StatLiteral } from "src/parsing/nbaStatUtils";
import { LegendContext } from "./LegendContext";
import { LineGraphTooltip } from "./LineGraphTooltip";

interface Props {
  data?: {
    names: string[];
    lineGraphData: Record<string, number>[];
    desiredStat: StatLiteral;
  };
}

export const LineGraph: React.FC<Props> = ({ data }) => {
  const { highlightedKey, onLegendMouseEnter, onLegendMouseLeave } =
    React.useContext(LegendContext);
  const { lineGraphData, desiredStat, names } = data || {};
  return (
    <div style={{ width: "500px" }}>
      {desiredStat}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          syncId="anyId"
          width={500}
          height={300}
          data={lineGraphData || []}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="game" />
          <YAxis />
          <Tooltip
            content={<LineGraphTooltip statType={desiredStat} />}
            isAnimationActive={false}
          />
          <Legend
            onMouseOver={onLegendMouseEnter}
            onMouseOut={onLegendMouseLeave}
          />
          {names.map((name, i) => {
            const strokeOpacity = highlightedKey
              ? highlightedKey === name
                ? 1
                : 0.3
              : 0.8;
            return (
              <Line
                type="monotone"
                dataKey={name}
                stroke={`hsl(${(i * 30) % 360}, 70%, 50%)`}
                strokeOpacity={strokeOpacity}
                isAnimationActive={false}
                activeDot={{ r: 6 }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
