import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type ServiceInitialStateProps = {appIsReady: boolean};

const initialState: ServiceInitialStateProps = {
  appIsReady: false,
};

const service = createSlice({
  name: 'service',
  initialState: initialState,
  reducers: {
    clearService: state => {
      Object.assign(state, initialState);
    },
    setAppIsReady: (state, action: PayloadAction<boolean>) => {
      state.appIsReady = action.payload;
    },
  },
});

export const {clearService, setAppIsReady} = service.actions;
export default service;
