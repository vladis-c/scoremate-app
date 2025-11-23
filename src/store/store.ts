import {configureStore} from '@reduxjs/toolkit';
import score from './score';

export const store = configureStore({
  reducer: {
    score: score.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
