import React from "react";
import { useParams } from "react-router";

export const PlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1 style={{ fontSize: 50, fontWeight: "bold", textAlign: "center" }}>
        Player {id}
      </h1>
    </div>
  );
};
