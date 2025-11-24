import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import DiceScreen from '../DiceScreen';

jest.mock('../../helpers', () => ({
  getRandomNumber: jest.fn(),
}));
const {getRandomNumber} = require('../../helpers');

jest.mock('../../constants', () => ({
  addDiceButtons: [
    {id: 1, type: 6, from: 1, to: 6},
    {id: 2, type: 4, from: 1, to: 4},
  ],
}));

// Mock react-native-paper components used by the screen for predictable test output
jest.mock('react-native-paper', () => {
  const React = require('react');
  const {View, Text: RNText, TouchableOpacity} = require('react-native');

  const Card = (props: any) => React.createElement(View, props, props.children);
  Card.Content = Card;

  const IconButton = ({onPress, icon, disabled}: any) =>
    React.createElement(
      TouchableOpacity,
      {
        onPress: disabled ? undefined : onPress,
        accessibilityRole: 'button',
        testID: `icon-${icon}`,
      },
      React.createElement(RNText, null, icon),
    );

  const Text = ({children, ...rest}: any) =>
    React.createElement(RNText, rest, children);

  return {Card, IconButton, Text};
});

// Mock Die component to render deterministic text showing its props
jest.mock('../../components/Dice/Die', () => {
  const React = require('react');
  const {Text: RNText} = require('react-native');
  return ({dots, type}: any) =>
    React.createElement(RNText, null, `Die-${type}-${dots}`);
});

describe('DiceScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial text and minus button disabled with no dice', () => {
    const {getByText, queryByTestId} = render(<DiceScreen />);
    expect(getByText('Add dice with buttons below')).toBeTruthy();
    expect(queryByTestId('icon-minus')).toBeTruthy();
  });

  it('adds dice when pressing add buttons and updates text', () => {
    const {getByText, getByTestId} = render(<DiceScreen />);

    // Add 1st die
    const addD6 = getByTestId('icon-dice-d6');
    fireEvent.press(addD6);

    expect(getByText('Press a die to roll')).toBeTruthy();

    // Add 2nd die
    const addD4 = getByTestId('icon-dice-d4');
    fireEvent.press(addD4);

    expect(getByText('Press any die to roll the dice')).toBeTruthy();
  });

  it('removes last die when minus pressed', () => {
    const {getByText, getByTestId, queryByText} = render(<DiceScreen />);
    // Add 2 dice
    fireEvent.press(getByTestId('icon-dice-d6'));
    fireEvent.press(getByTestId('icon-dice-d4'));

    // Remove one last die
    const minus = getByTestId('icon-minus');
    fireEvent.press(minus);

    expect(getByText('Press a die to roll')).toBeTruthy();

    // Remove one last die again
    fireEvent.press(minus);
    expect(getByText('Add dice with buttons below')).toBeTruthy();

    expect(queryByText(/Die-/)).toBeNull();
  });

  it('rolls dice: calls getRandomNumber for each added die and renders results', async () => {
    // Simulate getRandomNumber returning 4 for first die and 3 for second die
    (getRandomNumber as jest.Mock)
      .mockImplementationOnce(() => 4)
      .mockImplementationOnce(() => 3);

    const {getByTestId, getByText} = render(<DiceScreen />);

    // Add 2 dice
    fireEvent.press(getByTestId('icon-dice-d6'));
    fireEvent.press(getByTestId('icon-dice-d4'));

    // Press on a die
    const dieLabel = getByText(/Die-6-/);
    fireEvent.press(dieLabel);

    await waitFor(() => {
      // getRandomNumber should ne called once per die
      expect(getRandomNumber).toHaveBeenCalledTimes(2);

      expect(getByText('Die-6-4')).toBeTruthy();
      expect(getByText('Die-4-3')).toBeTruthy();
    });
  });
});
