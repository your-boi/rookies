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
import styled from "styled-components";

const GraphTitle = styled.div`
  font-size: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GraphGrid = styled.div`
  padding: 8px;
  border: 1px solid hsl(0, 0%, 80%);
`;
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
    <GraphGrid>
      <GraphTitle>{desiredStat}</GraphTitle>
      <div style={{ height: "400px" }}>
        <ResponsiveContainer width="100%">
          <LineChart
            syncId="arbitraryId"
            height={400}
            data={lineGraphData || []}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <Legend verticalAlign="bottom" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="game" />
            <YAxis />
            <Tooltip
              content={<LineGraphTooltip statType={desiredStat} />}
              isAnimationActive={false}
            />
            {names.map((name, i) => {
              return (
                <Line
                  type="monotone"
                  dataKey={name}
                  stroke={`hsl(${(i * 37) % 360}, 70%, 50%)`}
                  strokeOpacity={0.8}
                  isAnimationActive={false}
                  activeDot={{ r: 6 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GraphGrid>
  );
};
