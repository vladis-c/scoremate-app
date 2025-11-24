import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {Alert} from 'react-native';
import RandomizerScreen from '../RandomizerScreen';

jest.mock('../../helpers', () => ({
  getRandomNumber: jest.fn(),
}));

const {getRandomNumber} = require('../../helpers');

describe('RandomizerScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('renders initial screen', () => {
    const {getByText, getByDisplayValue} = render(<RandomizerScreen />);
    expect(getByText('Press here to randomize')).toBeTruthy();
    expect(getByDisplayValue('1')).toBeTruthy();
    expect(getByDisplayValue('10')).toBeTruthy();
  });

  it('gets random number and shows displays it', async () => {
    (getRandomNumber as jest.Mock).mockReturnValueOnce(5);
    const {getByText, queryByText} = render(<RandomizerScreen />);

    expect(queryByText('5')).toBeNull();

    fireEvent.press(getByText('Press here to randomize'));

    await waitFor(() => {
      expect(getRandomNumber).toHaveBeenCalledWith(1, 10);
      expect(getByText('5')).toBeTruthy();
      expect(getByText('Press on number to randomize again')).toBeTruthy();
    });
  });

  it('gets random number again using same limits', async () => {
    (getRandomNumber as jest.Mock)
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(7);

    const {getByText} = render(<RandomizerScreen />);

    fireEvent.press(getByText('Press here to randomize'));

    await waitFor(() => expect(getByText('3')).toBeTruthy());

    fireEvent.press(getByText('3'));

    await waitFor(() => {
      expect(getRandomNumber).toHaveBeenLastCalledWith(1, 10);
      expect(getByText('7')).toBeTruthy();
    });
  });

  it('triggers alert and resets to defaults when invalid limits', async () => {
    const {getByDisplayValue} = render(<RandomizerScreen />);

    const fromInput = getByDisplayValue('1');
    const toInput = getByDisplayValue('10');

    fireEvent.changeText(fromInput, '20');
    fireEvent(fromInput, 'blur');

    fireEvent.changeText(toInput, '10');
    fireEvent(toInput, 'blur');

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Left limit cannot be equal or more than right limit',
      );
      expect(getByDisplayValue('1')).toBeTruthy();
      expect(getByDisplayValue('10')).toBeTruthy();
    });
  });
});
