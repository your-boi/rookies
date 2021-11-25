import React, { createContext } from "react";

interface ILegendContext {
  highlightedKey: string;
  onLegendMouseEnter: (o: any) => void;
  onLegendMouseLeave: (o: any) => void;
}

export const LegendContext = createContext<ILegendContext>({} as any);

export const LegendContextProvider: React.FC = ({ children }) => {
  const [highlightedKey, setHighlightedKey] = React.useState("");
  const onLegendMouseEnter = React.useCallback((o: any) => {
    const { dataKey } = o;
    console.log("how fast");
    setHighlightedKey(dataKey);
  }, []);
  const onLegendMouseLeave = React.useCallback((o: any) => {
    console.log("how fast2");
    setHighlightedKey("");
  }, []);

  const val = React.useMemo(
    () => ({ highlightedKey, onLegendMouseEnter, onLegendMouseLeave }),
    [highlightedKey, onLegendMouseLeave, onLegendMouseEnter]
  );
  return (
    <LegendContext.Provider value={val}>{children}</LegendContext.Provider>
  );
};
