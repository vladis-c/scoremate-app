import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type ServiceInitialStateProps = {
  shouldScrollToEnd: boolean;
  scoreCardsDraggable: boolean;
};

const initialState: ServiceInitialStateProps = {
  shouldScrollToEnd: false,
  scoreCardsDraggable: false,
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
    setScoreCardsDraggable: (state, action: PayloadAction<boolean>) => {
      state.scoreCardsDraggable = action.payload;
    },
  },
});

export const {clearService, setShouldScrollToEnd, setScoreCardsDraggable} =
  service.actions;
export default service;
