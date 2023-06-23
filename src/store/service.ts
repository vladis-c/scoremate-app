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
  },
});

export const {clearService} = service.actions;
export default service;
