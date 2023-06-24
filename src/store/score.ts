import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {Player} from '../types';
import {getRandomColor, shuffleArray} from '../helpers';

type ScoreInitialStateProps = {
  players: Player[];
};

const initialState: ScoreInitialStateProps = {
  players: [
    {
      id: 1,
      name: '',
      color: getRandomColor([]),
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
    setShuffledArray: state => {
      // In the future we can also return to initial state, as the ids are staying the same 1, 2, 3
      const shuffled = shuffleArray([...state.players]);
      state.players = shuffled;
    },
  },
});

export const {
  clearScoreSlice,
  setPlayerSettings,
  setNewPlayer,
  removePlayer,
  setShuffledArray,
} = score.actions;
export default score;
