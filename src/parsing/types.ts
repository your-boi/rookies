export type HTMLString = string;

export interface GameLog {
  Date: Date;
  Rk: number;
  G?: number;
  Age?: string;
  Tm: string;
  Opp: string;
  GS?: number;
  MP?: string;
  FG?: number;
  FGA?: number;
  "FG%"?: number;
  "3P"?: number;
  "3PA"?: number;
  "3P%"?: number;
  FT?: number;
  FTA?: number;
  "FT%"?: number;
  ORB?: number;
  DRB?: number;
  TRB?: number;
  AST?: number;
  STL?: number;
  BLK?: number;
  TOV?: number;
  PF?: number;
  PTS?: number;
  GmSc?: number;
  DNP: boolean;
}
