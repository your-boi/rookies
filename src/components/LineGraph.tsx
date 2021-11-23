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

interface Props {
  data?: {
    names: string[];
    lineGraphData: Record<string, number>[];
    desiredStat: StatLiteral;
  };
}

export const LineGraph: React.FC<Props> = ({ data }) => {
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
          <Tooltip isAnimationActive={false} />
          <Legend
          // onMouseEnter={this.handleMouseEnter}
          // onMouseLeave={this.handleMouseLeave}
          />
          {names.map((name, i) => {
            return (
              <Line
                type="monotone"
                dataKey={name}
                stroke={`hsl(${(i * 30) % 360}, 70%, 50%)`}
                activeDot={{ r: 8 }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
