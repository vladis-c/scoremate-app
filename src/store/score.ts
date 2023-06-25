import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {CustomScore, Player, ScoreSettings} from '../types';
import {
  getRandomColor,
  handleCreateDropdownArray,
  shuffleArray,
} from '../helpers';

type ScoreInitialStateProps = {
  players: Player[];
  scoreSettings: ScoreSettings;
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
  scoreSettings: {
    customScore: [{label: '', value: '0', isShown: false, id: 1}],
    availableScore: handleCreateDropdownArray(-10, 20, 1),
  },
};

const score = createSlice({
  name: 'score',
  initialState: initialState,
  reducers: {
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
    setAddNewCustomScore: (
      state,
      action: PayloadAction<CustomScore | number>,
    ) => {
      if (typeof action.payload === 'number') {
        const cusIndex = state.scoreSettings.customScore.findIndex(
          cs => cs.id === action.payload,
        );
        state.scoreSettings.customScore.splice(cusIndex, 1);
        return;
      }
      state.scoreSettings.customScore.push(action.payload);
    },
    setCustomScore: (state, action: PayloadAction<CustomScore>) => {
      const {id} = action.payload;
      const cusIndex = state.scoreSettings.customScore.findIndex(
        cs => cs.id === id,
      );
      if (cusIndex !== -1) {
        state.scoreSettings.customScore[cusIndex] = action.payload;
      }
    },
    setCustomScoreDropdownIsShown: (
      state,
      action: PayloadAction<{id: number; isShown: boolean}>,
    ) => {
      const {id, isShown} = action.payload;
      const cusIndex = state.scoreSettings.customScore.findIndex(
        cs => cs.id === id,
      );
      if (cusIndex === -1) {
        return;
      }
      state.scoreSettings.customScore[cusIndex].isShown = isShown;
    },
  },
});

export const {
  setPlayerSettings,
  setNewPlayer,
  removePlayer,
  setShuffledArray,
  setCustomScore,
  setCustomScoreDropdownIsShown,
  setAddNewCustomScore,
} = score.actions;
export default score;
