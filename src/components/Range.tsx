import React from "react";
import { Range as ReactRange } from "react-range";

interface Props {
  max: number;
  values: number[];
  onChange: (values: number[]) => void;
}

const Track = ({ props, children }) => (
  <div
    {...props}
    style={{
      ...props.style,
      height: "2px",
      width: "100%",
      backgroundColor: "#ccc",
    }}
  >
    {children}
  </div>
);

const Thumb = ({ props }) => (
  <div
    {...props}
    style={{
      ...props.style,
      height: "24px",
      width: "24px",
      backgroundColor: "#999",
    }}
  />
);

export const Range = ({ max, values, onChange }) => {
  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <ReactRange
        step={1}
        min={0}
        max={max}
        values={values}
        onChange={onChange}
        renderTrack={Track}
        renderThumb={Thumb}
      />
    </div>
  );
};
