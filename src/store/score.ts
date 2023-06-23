import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {Player} from '../types';
import {colors} from '../theme';
import {getRandomColor} from '../helpers';

type ScoreInitialStateProps = {
  players: Player[];
};

const initialState: ScoreInitialStateProps = {
  players: [
    {
      id: 1,
      name: '',
      color: getRandomColor(),
      score: 0,
    },
  ],
};

const score = createSlice({
  name: 'score',
  initialState: initialState,
  reducers: {
    clearScoreSlice: state => {
      Object.assign(state, initialState);
    },
    setNewPlayer: (state, action: PayloadAction<Player>) => {
      const newPlayer = action.payload;
      const objIndex = state.players.findIndex(el => el.id === newPlayer.id);
      if (objIndex === -1) {
        state.players.push(newPlayer);
      }
    },
    removePlayer: (state, action: PayloadAction<Player['id']>) => {
      const id = action.payload;
      const objIndex = state.players.findIndex(el => el.id === id);
      if (objIndex === -1) {
        return;
      }
      state.players.splice(objIndex, 1);
    },
    setPlayerSettings: (
      state,
      action: PayloadAction<{
        key: keyof Player;
        value: Player[keyof Player];
        id: number;
      }>,
    ) => {
      const {key, id, value} = action.payload;
      const playerIndex = state.players.findIndex(el => el.id === id);
      if (playerIndex === -1) {
        return;
      }
      //@ts-ignore
      state.players[playerIndex][key] = value;
    },
  },
});

export const {clearScoreSlice, setPlayerSettings, setNewPlayer, removePlayer} =
  score.actions;
export default score;
