import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type ServiceInitialStateProps = {shouldScrollToEnd: boolean};

const initialState: ServiceInitialStateProps = {
  shouldScrollToEnd: false,
};

const service = createSlice({
  name: 'service',
  initialState: initialState,
  reducers: {
    clearService: state => {
      Object.assign(state, initialState);
    },
    setShouldScrollToEnd: (state, action: PayloadAction<boolean>) => {
      state.shouldScrollToEnd = action.payload;
    },
  },
});

export const {clearService, setShouldScrollToEnd} = service.actions;
export default service;
