import {configureStore} from '@reduxjs/toolkit';
import random from './random';
import score from './score';

export const store = configureStore({
  reducer: {
    score: score.reducer,
    random: random.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
