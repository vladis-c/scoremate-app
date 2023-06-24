import {configureStore} from '@reduxjs/toolkit';
import service from './service';
import score from './score';
import random from './random';
import dice from './dice';

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
