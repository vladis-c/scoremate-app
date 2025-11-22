import {configureStore} from '@reduxjs/toolkit';
import dice from './dice';
import random from './random';
import score from './score';
import service from './service';

export const store = configureStore({
  reducer: {
    service: service.reducer,
    score: score.reducer,
    random: random.reducer,
    dice: dice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
