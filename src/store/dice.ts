import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {getRandomNumber} from '../helpers';
import {Dice} from '../types';

type DiceInitialStateProps = {
  diceArray: Dice[];
};

const initialState: DiceInitialStateProps = {
  diceArray: [
    {
      id: 1,
      from: 1,
      to: 6,
      randomNumber: 1,
    },
  ],
};

const dice = createSlice({
  name: 'dice',
  initialState: initialState,
  reducers: {
    setRollDice: state => {
      state.diceArray.forEach(die => {
        const randomNumber = getRandomNumber(die.from, die.to);
        die.randomNumber = randomNumber;
      });
    },
    setAddDie: (state, action: PayloadAction<Dice>) => {
      const newDie = action.payload;
      const objIndex = state.diceArray.findIndex(el => el.id === newDie.id);
      if (objIndex === -1) {
        state.diceArray.push(newDie);
      }
    },
    removeDie: (state, action: PayloadAction<Dice['id']>) => {
      const id = action.payload;
      const objIndex = state.diceArray.findIndex(el => el.id === id);
      if (objIndex === -1) {
        return;
      }
      state.diceArray.splice(objIndex, 1);
    },
  },
});

export const {setRollDice, setAddDie, removeDie} = dice.actions;
export default dice;
