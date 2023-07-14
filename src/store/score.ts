import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {CustomScore, Player} from '../types';
import {getRandomColor, shuffleArray, swapArrayItems} from '../helpers';

type ScoreInitialStateProps = {
  players: Player[];
  customScore: CustomScore[];
  customScoreIsShown: boolean;
  randomizeColorIsSet: boolean;
};

const initialState: ScoreInitialStateProps = {
  players: [
    {
      id: 1,
      name: '',
      color: getRandomColor([]), // empty array to get first color from the list
      score: 0,
    },
  ],
  customScore: [],
  customScoreIsShown: false,
  randomizeColorIsSet: false,
};

const score = createSlice({
  name: 'score',
  initialState: initialState,
  reducers: {
    setPlayerScore: (
      state,
      action: PayloadAction<{increment: number; id: Player['id']}>,
    ) => {
      const {id, increment} = action.payload;
      const objIndex = state.players.findIndex(el => el.id === id);
      if (objIndex === -1) {
        return;
      }
      const found = state.players[objIndex];
      state.players.splice(objIndex, 1, {
        ...found,
        score: found.score + increment,
      });
    },
    resetPlayersScores: state => {
      state.players.forEach(player => {
        player.score = 0;
      });
    },
    setNewPlayer: (
      state,
      action: PayloadAction<MakeOptional<Player, 'color'>>,
    ) => {
      const newPlayer = action.payload;
      const objIndex = state.players.findIndex(el => el.id === newPlayer.id);
      if (objIndex === -1) {
        const appliedColors = state.players.map(player => player.color);
        const randomizeColorIsSet = state.randomizeColorIsSet;
        const newColor =
          newPlayer?.color ??
          getRandomColor(randomizeColorIsSet ? undefined : appliedColors);
        state.players.push({...newPlayer, color: newColor});
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
    setNewPlayersOrder: (
      state,
      action: PayloadAction<{id1: number; id2: number}>,
    ) => {
      const {id1, id2} = action.payload;
      const newPlayers = swapArrayItems([...state.players], id1, id2);
      state.players = newPlayers;
    },
    toggleCustomScoreIsShown: state => {
      state.customScoreIsShown = !state.customScoreIsShown;
    },
    setCustomScore: (
      state,
      action: PayloadAction<Omit<CustomScore, 'label'>>,
    ) => {
      const {id, value} = action.payload;
      const newScoreObj = state.customScore.findIndex(el => el.id === id);
      if (newScoreObj !== -1) {
        state.customScore[newScoreObj].value = value;
        state.customScore[newScoreObj].label = value;
      }
    },
    addNewCustomScore: state => {
      state.customScore.push({
        label: '',
        value: '0',
        id: state.customScore.length + 1,
      });
    },
    toggleRandomizeColorIsSet: state => {
      state.randomizeColorIsSet = !state.randomizeColorIsSet;
    },
    removeCustomScore: state => {
      state.customScore.pop();
    },
  },
});

export const {
  setPlayerScore,
  resetPlayersScores,
  setPlayerSettings,
  setNewPlayer,
  removePlayer,
  setShuffledArray,
  setNewPlayersOrder,
  toggleCustomScoreIsShown,
  addNewCustomScore,
  setCustomScore,
  removeCustomScore,
  toggleRandomizeColorIsSet,
} = score.actions;
export default score;
