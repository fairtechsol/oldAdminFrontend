export interface MatchComponentInterface {
  top: boolean;
  blur: boolean;
  match: any;
  onClick: (value: any) => void;
}

export interface TeamDetailRowProps {
  teamName: string;
  runnerNumber: number;
  match: any;
}

export interface SeparateBoxProps {
  color: string;
  value: number | string;
}
