import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import ScoreScreen from '../ScoreScreen';

jest.mock('../../context/ScoreContext', () => ({useScore: jest.fn()}));
const {useScore} = require('../../context/ScoreContext');

jest.mock('../../components/AddCard', () => {
  const React = require('react');
  const {View, Text} = require('react-native');
  // expose a wrapper that we can trigger layout on to allow ScoreScreen to render cards
  return () =>
    React.createElement(
      View,
      {testID: 'add-wrapper'},
      React.createElement(
        View,
        {testID: 'add-card'},
        React.createElement(Text, null, 'AddCard'),
      ),
    );
});

jest.mock('../../components/ScoreCard', () => {
  const React = require('react');
  const {View, Text} = require('react-native');
  // return same testID for each instance so tests can count them
  return ({name, color}: any) =>
    React.createElement(
      View,
      {testID: 'scorecard'},
      React.createElement(Text, null, `${name}-${color}`),
    );
});

jest.mock('../../components/ScrollContainer', () => {
  const React = require('react');
  const {View} = require('react-native');
  return React.forwardRef((props: any, ref: any) =>
    React.createElement(
      View,
      {...props, testID: 'scroll-container'},
      props.children,
    ),
  );
});

describe('ScoreScreen', () => {
  const P1 = {id: 1, name: 'P1', color: '#111'};
  const P2 = {id: 2, name: 'P2', color: '#222'};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders 1 ScoreCard for 1 player and 2 ScoreCards for 2 players', async () => {
    // 1
    useScore.mockReturnValue({players: [P1]});
    const {getByTestId, getAllByTestId, rerender} = render(<ScoreScreen />);

    fireEvent(getByTestId('add-wrapper'), 'layout', {
      nativeEvent: {layout: {height: 50}},
    });

    await waitFor(() => {
      expect(getAllByTestId('scorecard').length).toBe(1);
    });

    // 2
    useScore.mockReturnValue({players: [P1, P2]});
    rerender(<ScoreScreen />);

    fireEvent(getByTestId('add-wrapper'), 'layout', {
      nativeEvent: {layout: {height: 50}},
    });

    await waitFor(() => {
      expect(getAllByTestId('scorecard').length).toBe(2);
    });
  });
});
