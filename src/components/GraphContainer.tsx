import React from "react";
// import { LegendContextProvider } from "./LegendContext";
import styled from "styled-components";

const GraphGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const GraphContainer: React.FC = ({ children }) => {
  return (
    // <LegendContextProvider>
    <GraphGrid>{children}</GraphGrid>
    // </LegendContextProvider>
  );
};
