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
  value: string;
  label: string;
  isShown: boolean;
  id: number;
};

export type AvailableScore = Omit<CustomScore, 'id' | 'isShown'>;

export type ScoreSettings = {
  customScore: CustomScore[];
  availableScore: AvailableScore[];
};
