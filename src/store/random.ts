import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {getRandomNumber} from '../helpers';

type RandomInitialStateProps = {
  randomNumber: number | null;
  from: string;
  to: string;
};

const initialState: RandomInitialStateProps = {
  randomNumber: null,
  from: '1',
  to: '10',
};

const random = createSlice({
  name: 'random',
  initialState: initialState,
  reducers: {
    setRandomNumber: state => {
      state.randomNumber = getRandomNumber(+state.from, +state.to);
    },
    setRandomizerLimit: (
      state,
      action: PayloadAction<{type: 'from' | 'to'; value: string}>,
    ) => {
      const {type, value} = action.payload;
      state[type] = value;
    },
  },
});

export const {setRandomNumber, setRandomizerLimit} = random.actions;
export default random;
