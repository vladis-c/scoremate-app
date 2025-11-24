import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import CustomsScreen from '../CustomsScreen';

jest.mock('../../helpers', () => ({
  getRandomColor: jest.fn(() => '#abcdef'),
  getRandomNumber: jest.fn(() => 0),
}));
// const {getRandomColor, getRandomNumber} = require('../../helpers');

jest.mock('../../constants', () => ({
  desireWords: ['Please', 'Kindly'],
}));

jest.mock('../../navigation/navigation-types', () => ({
  DRAWER_NAV: {SCORE: 'Score'},
}));

// Minimal mock for ScrollContainer used by the screen
jest.mock('../../components/ScrollContainer', () => {
  const React = require('react');
  const {View} = require('react-native');
  return React.forwardRef((props: any, ref: any) => {
    // expose a scrollToEnd method so Consumers calling ref.current?.scrollToEnd() won't blow up
    React.useImperativeHandle(ref, () => ({
      scrollToEnd: () => {},
    }));
    return React.createElement(View, {...props}, props.children);
  });
});

// Mock SettingRow to expose testable controls based on `type`
jest.mock('../../components/SettingRow', () => {
  const React = require('react');
  const {View, Text, TextInput, TouchableOpacity} = require('react-native');
  return (props: any) => {
    const {type, title, value, onChange, onBlur, onChangeColor} = props;
    if (type === 'switch') {
      // call onChange asynchronously so the component's state updates propagate
      return React.createElement(
        TouchableOpacity,
        {
          testID: `switch-${title}`,
          onPress: () => {
            setTimeout(() => onChange && onChange(), 0);
          },
        },
        React.createElement(Text, null, title),
      );
    }
    if (type === 'input') {
      return React.createElement(TextInput, {
        testID: `input-${title}`,
        value: String(value ?? ''),
        onChangeText: (t: string) => onChange?.(t),
        onBlur,
      });
    }
    if (type === 'player') {
      return React.createElement(
        View,
        {testID: `player-${title}`},
        React.createElement(Text, null, `player-${value}`),
        React.createElement(TextInput, {
          testID: `player-input-${title}`,
          value: String(value ?? ''),
          onChangeText: (t: string) => onChange?.(t),
        }),
        React.createElement(TouchableOpacity, {
          testID: `player-color-${title}`,
          onPress: () => onChangeColor && onChangeColor('#fff'),
        }),
      );
    }
    if (type === 'score') {
      return React.createElement(
        View,
        {testID: `score-${title}`},
        React.createElement(Text, null, title),
        React.createElement(
          TouchableOpacity,
          {testID: `score-add-${title}`, onPress: () => onChange('+')},
          React.createElement(Text, null, '+'),
        ),
        React.createElement(
          TouchableOpacity,
          {testID: `score-remove-${title}`, onPress: () => onChange('-')},
          React.createElement(Text, null, '-'),
        ),
      );
    }
    return React.createElement(View, null);
  };
});

// Mock react-native-paper Button used in footer
jest.mock('react-native-paper', () => {
  const React = require('react');
  const {TouchableOpacity, Text} = require('react-native');
  const Button = ({onPress, children, testID}: any) =>
    React.createElement(
      TouchableOpacity,
      {onPress, testID: testID ?? 'button'},
      React.createElement(Text, null, children),
    );
  const IconButton = ({icon, onPress}: any) =>
    React.createElement(TouchableOpacity, {onPress, testID: `icon-${icon}`});
  return {Button, IconButton};
});

// Mock useScore context
jest.mock('../../context/ScoreContext', () => {
  return {
    useScore: jest.fn(),
  };
});
const {useScore} = require('../../context/ScoreContext');

describe('CustomsScreen', () => {
  const defaultPlayers = [{id: 1, name: 'P1', color: '#111'}];

  const navigationMock = {
    setOptions: jest.fn(),
    goBack: jest.fn(),
    setParams: jest.fn(),
    navigate: jest.fn(),
  } as any;
  const route = {params: {fromStart: true, label: 'Customs'}} as any;

  beforeEach(() => {
    jest.clearAllMocks();
    // default mock implementation for useScore
    useScore.mockReturnValue({
      players: [...defaultPlayers],
      customScore: [],
      randomizeColorIsOn: false,
      setPlayerSettings: jest.fn(),
      setNewPlayer: jest.fn(),
      removePlayer: jest.fn(),
      toggleRandomizeColorIsSet: jest.fn(),
      clearCustomScores: jest.fn(),
      addCustomScore: jest.fn(),
      removeCustomScore: jest.fn(),
      updateCustomScore: jest.fn(),
    });
  });

  it('renders Continue when fromStart=true and pressing button navigates and sets params', () => {
    const {getByText} = render(
      <CustomsScreen navigation={navigationMock} route={route} />,
    );

    const btn = getByText('Continue');
    expect(btn).toBeTruthy();

    fireEvent.press(btn);

    expect(navigationMock.setParams).toHaveBeenCalledWith({fromStart: false});
    expect(navigationMock.navigate).toHaveBeenCalledWith('Score');
  });

  it.skip('increases player count on blur and calls setNewPlayer for each new id', async () => {
    const setNewPlayer = jest.fn();
    useScore.mockReturnValueOnce({
      players: [...defaultPlayers], // length 1
      customScore: [],
      randomizeColorIsOn: false,
      setPlayerSettings: jest.fn(),
      setNewPlayer,
      removePlayer: jest.fn(),
      toggleRandomizeColorIsSet: jest.fn(),
      clearCustomScores: jest.fn(),
      addCustomScore: jest.fn(),
      removeCustomScore: jest.fn(),
      updateCustomScore: jest.fn(),
    });

    const {getByTestId} = render(
      <CustomsScreen navigation={navigationMock} route={route} />,
    );

    const input = getByTestId('input-Amount of players');
    fireEvent.changeText(input, '3');

    fireEvent(input, 'blur');

    await waitFor(() => {
      expect(setNewPlayer).toHaveBeenCalledTimes(2);
      expect(setNewPlayer).toHaveBeenCalledWith({id: 2, score: 0, name: ''});
      expect(setNewPlayer).toHaveBeenCalledWith({id: 3, score: 0, name: ''});
    });
  });

  it.skip('decreases player count on blur and calls removePlayer for removed players', async () => {
    const removePlayer = jest.fn();
    useScore.mockReturnValueOnce({
      players: [
        {id: 1, name: 'P1', color: '#111'},
        {id: 2, name: 'P2', color: '#222'},
      ],
      customScore: [],
      randomizeColorIsOn: false,
      setPlayerSettings: jest.fn(),
      setNewPlayer: jest.fn(),
      removePlayer,
      toggleRandomizeColorIsSet: jest.fn(),
      clearCustomScores: jest.fn(),
      addCustomScore: jest.fn(),
      removeCustomScore: jest.fn(),
      updateCustomScore: jest.fn(),
    });

    const {getByTestId} = render(
      <CustomsScreen navigation={navigationMock} route={route} />,
    );

    const input = getByTestId('input-Amount of players');
    fireEvent.changeText(input, '0');
    fireEvent(input, 'blur');

    await waitFor(() => {
      expect(removePlayer).toHaveBeenCalledTimes(2);
      expect(removePlayer).toHaveBeenCalledWith(1);
      expect(removePlayer).toHaveBeenCalledWith(2);
    });
  });

  it('applies random colors to players when randomizeColorIsOn is true on mount', async () => {
    const setPlayerSettings = jest.fn();
    useScore.mockReturnValueOnce({
      players: [
        {id: 1, name: 'P1', color: '#111'},
        {id: 2, name: 'P2', color: '#222'},
      ],
      customScore: [],
      randomizeColorIsOn: true,
      setPlayerSettings,
      setNewPlayer: jest.fn(),
      removePlayer: jest.fn(),
      toggleRandomizeColorIsSet: jest.fn(),
      clearCustomScores: jest.fn(),
      addCustomScore: jest.fn(),
      removeCustomScore: jest.fn(),
      updateCustomScore: jest.fn(),
    });

    render(<CustomsScreen navigation={navigationMock} route={route} />);

    await waitFor(() => {
      expect(setPlayerSettings).toHaveBeenCalledTimes(2);
      expect(setPlayerSettings).toHaveBeenCalledWith('color', '#abcdef', 1);
      expect(setPlayerSettings).toHaveBeenCalledWith('color', '#abcdef', 2);
    });
  });

  it.skip('toggles custom scores and shows score controls, calling clearCustomScores', async () => {
    const clearCustomScores = jest.fn();
    useScore.mockReturnValueOnce({
      players: [...defaultPlayers],
      customScore: [],
      randomizeColorIsOn: false,
      setPlayerSettings: jest.fn(),
      setNewPlayer: jest.fn(),
      removePlayer: jest.fn(),
      toggleRandomizeColorIsSet: jest.fn(),
      clearCustomScores,
      addCustomScore: jest.fn(),
      removeCustomScore: jest.fn(),
      updateCustomScore: jest.fn(),
    });

    const {getByTestId, getByText} = render(
      <CustomsScreen navigation={navigationMock} route={route} />,
    );

    const ownTitle = 'Please set my own scores';
    const switchNode = getByTestId(`switch-${ownTitle}`);
    fireEvent.press(switchNode);

    await waitFor(() => {
      expect(clearCustomScores).toHaveBeenCalled();
      expect(getByText('Add custom score count')).toBeTruthy();
    });
  });
});
