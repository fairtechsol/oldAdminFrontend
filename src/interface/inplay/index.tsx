export interface MatchComponentInterface {
  top: boolean;
  blur: boolean;
  match: any;
  onClick: (value: any) => void;
}

export interface TeamDetailRow {
  teamName: string;
  runnerNumber: number;
  match: any;
}

export interface SeparateBox {
  color: string;
  value: number | string;
}
