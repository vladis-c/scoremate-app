import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type ScoreInitialStateProps = {amountOfPlayers: number};

const initialState: ScoreInitialStateProps = {
  amountOfPlayers: 1,
};

const score = createSlice({
  name: 'score',
  initialState: initialState,
  reducers: {
    clearScoreSlice: state => {
      Object.assign(state, initialState);
    },
    setAmountOfPlayers: (state, action: PayloadAction<number>) => {
      state.amountOfPlayers = action.payload;
    },
  },
});

export const {clearScoreSlice, setAmountOfPlayers} =
  score.actions;
export default score;
