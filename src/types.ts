export type Player = {
  color: string;
  name: string;
  id: number;
  score: number;
};

export type Dice = {
  id: number,
  randomNumber: number;
  from: number;
  to: number;
};
