import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import AddCard from '../AddCard';

jest.mock('../../context/ScoreContext', () => ({useScore: jest.fn()}));
const {useScore} = require('../../context/ScoreContext');

jest.mock('react-native-paper', () => {
  const React = require('react');
  const {TouchableOpacity, View, Text} = require('react-native');

  const Card = (props: any) => React.createElement(View, props, props.children);
  Card.Content = (props: any) =>
    React.createElement(View, props, props.children);

  const IconButton = ({icon, onPress, disabled}: any) =>
    React.createElement(
      TouchableOpacity,
      {
        onPress: disabled ? undefined : onPress,
        testID: `icon-${icon}`,
        accessible: true,
      },
      React.createElement(Text, null, icon),
    );

  const TextComp = ({children, ...rest}: any) =>
    React.createElement(Text, rest, children);

  return {Card, IconButton, Text: TextComp};
});

describe('AddCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls shufflePlayerOrder when shuffle pressed (with >=2 players)', () => {
    const shufflePlayerOrder = jest.fn();
    useScore.mockReturnValue({
      players: [
        {id: 1, name: 'April', score: 0, color: '#000'},
        {id: 2, name: 'Ben', score: 0, color: '#FFF'},
      ],
      shufflePlayerOrder,
      removePlayer: jest.fn(),
      setNewPlayer: jest.fn(),
      resetPlayersScores: jest.fn(),
    });

    const {getByTestId} = render(<AddCard />);
    fireEvent.press(getByTestId('icon-shuffle'));
    expect(shufflePlayerOrder).toHaveBeenCalled();
  });

  it('calls removePlayer with last player id when minus pressed', () => {
    const removePlayer = jest.fn();
    useScore.mockReturnValue({
      players: [
        {id: 1, name: 'April', score: 0, color: '#000'},
        {id: 2, name: 'Ben', score: 0, color: '#FFF'},
      ],
      shufflePlayerOrder: jest.fn(),
      removePlayer,
      setNewPlayer: jest.fn(),
      resetPlayersScores: jest.fn(),
    });

    const {getByTestId} = render(<AddCard />);
    fireEvent.press(getByTestId('icon-minus'));
    expect(removePlayer).toHaveBeenCalledWith(2);
  });

  it('calls setNewPlayer with next id when plus pressed', () => {
    const setNewPlayer = jest.fn();
    useScore.mockReturnValue({
      players: [{id: 1, name: 'April', score: 0, color: '#000'}],
      shufflePlayerOrder: jest.fn(),
      removePlayer: jest.fn(),
      setNewPlayer,
      resetPlayersScores: jest.fn(),
    });

    const {getByTestId} = render(<AddCard />);
    fireEvent.press(getByTestId('icon-plus'));
    expect(setNewPlayer).toHaveBeenCalledWith({id: 2, score: 0, name: ''});
  });

  it('calls resetPlayersScores when refresh pressed', () => {
    const resetPlayersScores = jest.fn();
    useScore.mockReturnValue({
      players: [
        {id: 1, name: 'April', score: 5, color: '#000'},
        {id: 2, name: 'Ben', score: 7, color: '#FFF'},
      ],
      shufflePlayerOrder: jest.fn(),
      removePlayer: jest.fn(),
      setNewPlayer: jest.fn(),
      resetPlayersScores,
    });

    const {getByTestId} = render(<AddCard />);
    fireEvent.press(getByTestId('icon-refresh'));
    expect(resetPlayersScores).toHaveBeenCalled();
  });
});
