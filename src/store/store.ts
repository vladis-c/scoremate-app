import {configureStore} from '@reduxjs/toolkit';
import service from './service';

export const store = configureStore({
  reducer: {
    service: service.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
