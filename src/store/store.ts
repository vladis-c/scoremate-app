import {configureStore} from '@reduxjs/toolkit';
import service from './service';
import score from './score';

export const store = configureStore({
  reducer: {
    service: service.reducer,
    score: score.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
