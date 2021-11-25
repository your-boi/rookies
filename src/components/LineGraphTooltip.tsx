import React from "react";
import { isPercentageStat } from "src/parsing/nbaStatUtils";
import styled from "styled-components";

const TooltipContainer = styled.div`
  border: 1px solid #d7d7d7;
  background-color: white;
  padding: 2px;
`;

const PlayerStat = styled.p`
  padding-top: 2px;
`;

export const LineGraphTooltip = ({ statType = "", payload, label }) => {
  if (payload && payload.length) {
    return (
      <TooltipContainer>
        <p>
          {label} Game{label !== 1 ? "s" : ""} Played
        </p>
        {payload.map((p) => {
          return (
            <PlayerStat>
              <span style={{ color: p.stroke }}>{p.name}: </span>
              {isNaN(p.value)
                ? "N/A"
                : `${
                    isPercentageStat(statType)
                      ? p.value.toFixed(3)
                      : p.value.toFixed(1)
                  } ${statType}`}
            </PlayerStat>
          );
        })}
      </TooltipContainer>
    );
  }

  return null;
};
