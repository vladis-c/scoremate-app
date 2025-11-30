import {Dice} from '../types';

export const addDiceButtons: Dice[] = [
  {
    id: 1,
    from: 1,
    to: 4,
    randomNumber: 1,
    type: 4,
  },
  {
    id: 2,
    from: 1,
    to: 6,
    randomNumber: 1,
    type: 6,
  },
  // {
  //   id: 3,
  //   from: 1,
  //   to: 8,
  //   randomNumber: 1,
  //   type: 8,
  // },
  // {
  //   id: 4,
  //   from: 1,
  //   to: 10,
  //   randomNumber: 1,
  //   type: 10,
  // },
  // {
  //   id: 5,
  //   from: 1,
  //   to: 12,
  //   randomNumber: 1,
  //   type: 12,
  // },
  // {
  //   id: 6,
  //   from: 1,
  //   to: 20,
  //   randomNumber: 1,
  //   type: 20,
  // },
];

export const commonColors: string[] = [
  '#c26e73', // Soft Red
  '#728cb9', // Soft Blue
  '#89a77f', // Soft Green
  '#d5c87d', // Soft Yellow
  '#f0f0f0', // Whitish
  '#1a1a1a', // Blackish
  '#db8f6c', // Soft Orange
  '#a994b8', // Soft Purple
];

export const startButton1Labels: string[] = [
  'Use Scoremate experience',
  'Use Scoremate settings',
  'Use Scoremate preset',
  'Use Scoremate defaults',
];

export const startButton2Labels: string[] = [
  'Customize your experience',
  'Custom settings',
];

export const desireWords: string[] = [
  'I wish to',
  'I would like to',
  'I want to',
  'My desire is to',
  'I would love to',
];
