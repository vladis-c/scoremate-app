import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import StartScreen from '../StartScreen';

jest.mock('../../constants', () => ({
  startButton1Labels: ['Start Game'],
  startButton2Labels: ['Customize'],
}));

jest.mock('../../helpers', () => ({
  getRandomColor: jest.fn(() => '#ffffff'),
  getRandomNumber: jest.fn(() => 0),
  handleTextColorForBackground: jest.fn(() => '#000000'),
}));

jest.mock('../../navigation/navigation-types', () => ({
  MAIN_NAV: {DRAWER: 'MainDrawer'},
  DRAWER_NAV: {SCORE: 'Score', CUSTOMS: 'Customs'},
}));

jest.mock('expo-image', () => {
  const React = require('react');
  return {
    Image: (props: any) => React.createElement('Image', props, props.children),
  };
});

jest.mock('../../components/ScrollContainer', () => {
  const React = require('react');
  const {View} = require('react-native');
  return (props: any) => React.createElement(View, props, props.children);
});

describe('StartScreen', () => {
  const navigationMock = {navigate: jest.fn()} as any;
  const routeMock = {params: {}} as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Text renders correctly on StartScreen', () => {
    const {getByText} = render(
      <StartScreen navigation={navigationMock} route={routeMock} />,
    );
    expect(
      getByText(
        /Embark on an extraordinary Scoremate experience by choosing one of the following options\./i,
      ),
    ).toBeTruthy();
  });

  it('Buttons render with labels from constants', () => {
    const {getByText} = render(
      <StartScreen navigation={navigationMock} route={routeMock} />,
    );
    expect(getByText('Start Game')).toBeTruthy();
    expect(getByText('Customize')).toBeTruthy();
  });

  it('Pressing first button navigates to ScoreScreen', () => {
    const {getByText} = render(
      <StartScreen navigation={navigationMock} route={routeMock} />,
    );
    fireEvent.press(getByText('Start Game'));
    expect(navigationMock.navigate).toHaveBeenCalledWith('MainDrawer', {
      screen: 'Score',
    });
  });

  it('Pressing second button navigates to CustomsScreen with params', () => {
    const {getByText} = render(
      <StartScreen navigation={navigationMock} route={routeMock} />,
    );
    fireEvent.press(getByText('Customize'));
    expect(navigationMock.navigate).toHaveBeenCalledWith('MainDrawer', {
      screen: 'Customs',
      params: {fromStart: true, label: 'Customize'},
    });
  });
});
