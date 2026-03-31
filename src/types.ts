export type Game = {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  amountOfPlayers?: number;
  hasCustomScoring?: boolean;
};

export type Player = {
  color: string;
  name: string;
  id: number;
  score: number;
};

export type Dice = {
  id: number;
  randomNumber: number;
  from: number;
  to: DieType;
  type: DieType;
};

export type DieType = 4 | 6 | 8 | 10 | 12 | 20;

export type CustomScore = {
  value: number;
  label: string;
  id: number;
};
