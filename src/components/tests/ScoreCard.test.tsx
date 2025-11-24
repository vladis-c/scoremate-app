import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import ScoreCard from '../ScoreCard';

jest.mock('../../context/ScoreContext', () => ({useScore: jest.fn()}));
const {useScore} = require('../../context/ScoreContext');

jest.mock('../../helpers', () => ({
  getRandomColor: jest.fn(() => '#010101'),
  handleSplitArray: jest.fn(() => [[-10], [10]]),
  handleTextColorForBackground: jest.fn(() => '#fff'),
}));
const {getRandomColor, handleSplitArray} = require('../../helpers');

// Mock react-native-paper primitives used by the component
jest.mock('react-native-paper', () => {
  const React = require('react');
  const {TouchableOpacity, View, Text} = require('react-native');

  const Card = (props: any) => React.createElement(View, props, props.children);
  Card.Content = (props: any) =>
    React.createElement(View, props, props.children);

  const IconButton = ({icon, onPress, testID}: any) =>
    React.createElement(
      TouchableOpacity,
      {onPress, testID: testID ?? `icon-${icon}`},
      React.createElement(Text, null, icon),
    );

  const Button = ({onPress, children, testID}: any) =>
    React.createElement(
      TouchableOpacity,
      {onPress, testID: testID ?? 'button'},
      React.createElement(Text, null, children),
    );

  const TextComp = ({children, ...rest}: any) =>
    React.createElement(Text, rest, children);

  return {Card, IconButton, Button, Text: TextComp};
});

// Mock ColorPalette and TextModal used in edit state
jest.mock('../ColorPalette', () => {
  const React = require('react');
  const {TouchableOpacity, View, Text} = require('react-native');
  return ({onColorChangeComplete, visible, onDismiss}: any) =>
    visible
      ? React.createElement(
          View,
          {testID: 'color-palette'},
          React.createElement(
            TouchableOpacity,
            {
              testID: 'color-palette-select',
              onPress: () => onColorChangeComplete('#00ff00'),
            },
            React.createElement(Text, null, 'select'),
          ),
          React.createElement(
            TouchableOpacity,
            {
              testID: 'color-palette-dismiss',
              onPress: onDismiss,
            },
            React.createElement(Text, null, 'dismiss'),
          ),
        )
      : null;
});

jest.mock('../TextModal', () => {
  const React = require('react');
  const {TouchableOpacity, View, Text} = require('react-native');
  return ({onValueChange, visible, onDismiss}: any) =>
    visible
      ? React.createElement(
          View,
          {testID: 'text-modal'},
          React.createElement(
            TouchableOpacity,
            {
              testID: 'text-modal-confirm',
              onPress: () => {
                onValueChange('NewName');
                onDismiss();
              },
            },
            React.createElement(Text, null, 'confirm'),
          ),
        )
      : null;
});

describe('ScoreCard', () => {
  const P1 = {id: 1, name: 'Alice', score: 10, color: '#000'};
  const P2 = {id: 2, name: 'Bob', score: 5, color: '#FFF'};

  let setPlayerScore: jest.Mock;
  let setPlayerSettings: jest.Mock;
  let removePlayer: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    setPlayerScore = jest.fn();
    setPlayerSettings = jest.fn();
    removePlayer = jest.fn();

    useScore.mockReturnValue({
      players: [P1],
      customScore: [],
      setPlayerScore,
      setPlayerSettings,
      removePlayer,
    });
  });

  it('renders non-edit state and toggles edit/non-edit with pencil/check', async () => {
    const {getByTestId} = render(
      <ScoreCard id={1} name="Alice" color="#000" />,
    );

    // non-edit should show minus and plus icons
    expect(getByTestId('icon-minus')).toBeTruthy();
    expect(getByTestId('icon-plus')).toBeTruthy();

    // toggle to edit by pressing pencil
    fireEvent.press(getByTestId('icon-pencil'));
    // edit state should show check icon
    expect(getByTestId('icon-check')).toBeTruthy();

    // close edit by pressing check
    fireEvent.press(getByTestId('icon-check'));
    await waitFor(() => {
      expect(getByTestId('icon-minus')).toBeTruthy();
    });
  });

  it('non-edit actions call setPlayerScore for minus/plus and for custom score buttons', async () => {
    handleSplitArray.mockReturnValueOnce([[-10], [10]]);

    useScore.mockReturnValue({
      players: [P1],
      customScore: [{label: '10', value: 10}],
      setPlayerScore,
      setPlayerSettings,
      removePlayer,
    });

    const {getByTestId, getByText} = render(
      <ScoreCard id={1} name="Alice" color="#000" />,
    );

    fireEvent.press(getByTestId('icon-minus'));
    fireEvent.press(getByTestId('icon-plus'));
    expect(setPlayerScore).toHaveBeenCalledWith(1, -1);
    expect(setPlayerScore).toHaveBeenCalledWith(1, 1);

    expect(getByText('-10')).toBeTruthy();
    expect(getByText('+10')).toBeTruthy();

    fireEvent.press(getByText('-10'));
    fireEvent.press(getByText('+10'));

    expect(setPlayerScore).toHaveBeenCalledWith(1, -10);
    expect(setPlayerScore).toHaveBeenCalledWith(1, 10);
  });

  it('edit actions: randomize color, palette select, name modal and delete call context methods', async () => {
    useScore.mockReturnValue({
      players: [P1, P2],
      customScore: [],
      setPlayerScore,
      setPlayerSettings,
      removePlayer,
    });

    const {getByTestId} = render(
      <ScoreCard id={1} name="Alice" color="#000" />,
    );

    // open edit state
    fireEvent.press(getByTestId('icon-pencil'));

    // delete button
    fireEvent.press(getByTestId('icon-delete'));
    expect(removePlayer).toHaveBeenCalledWith(1);

    // random color
    fireEvent.press(getByTestId('icon-invert-colors'));
    expect(getRandomColor).toHaveBeenCalled();
    expect(setPlayerSettings).toHaveBeenCalledWith('color', '#010101', 1);

    // open color palette then select color
    fireEvent.press(getByTestId('icon-palette'));
    await waitFor(() => expect(getByTestId('color-palette')).toBeTruthy());
    fireEvent.press(getByTestId('color-palette-select'));
    expect(setPlayerSettings).toHaveBeenCalledWith('color', '#00ff00', 1);

    // open text modal and add/edit new name
    fireEvent.press(getByTestId('icon-account-edit'));
    await waitFor(() => expect(getByTestId('text-modal')).toBeTruthy());
    fireEvent.press(getByTestId('text-modal-confirm'));
    expect(setPlayerSettings).toHaveBeenCalledWith('name', 'NewName', 1);
  });
});
