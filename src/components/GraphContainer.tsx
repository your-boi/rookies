import React from "react";
// import { LegendContextProvider } from "./LegendContext";
import styled from "styled-components";

const GraphGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 8px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: auto;
  }
}

`;

export const GraphContainer: React.FC = ({ children }) => {
  return (
    // <LegendContextProvider>
    <GraphGrid>{children}</GraphGrid>
    // </LegendContextProvider>
  );
};
