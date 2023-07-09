import {commonColors} from '../constants';
import {colors} from '../theme';

type Props<A, U> = {
  useDefault?: A extends string[] ? never : U;
};

type Options<U> = {
  useDefault?: U;
};

export const getRandomColor = <
  A extends string[] | undefined,
  U extends boolean | undefined,
  P extends Props<A, U> | A | undefined,
>(
  props?: P,
  options?: P extends Props<A, U> ? never : Options<U>,
): string => {
  const appliedColors = Array.isArray(props) ? props : undefined;
  const useDefault = options
    ? options.useDefault
    : !Array.isArray(props)
    ? props?.useDefault
    : undefined;

  // use default colors from common colors array
  if (useDefault) {
    const randomNumber = getRandomNumber(0, commonColors.length - 1);
    return commonColors[randomNumber];
  }

  if (appliedColors !== undefined) {
    // it first returns a color from commonColors list
    for (const color of commonColors) {
      if (!appliedColors.includes(color)) {
        return color;
      }
    }
  }

  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const handleHexToRgb = (hexColor: string) => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

export const handleTextColorForBackground = (bgcolor: string) => {
  if (bgcolor.startsWith('#')) {
    bgcolor = handleHexToRgb(bgcolor);
  }

  let r, g, b;
  if (bgcolor.startsWith('rgb')) {
    [r, g, b] = bgcolor
      .replace(/rgba?\(|\s+|\)/g, '')
      .split(',')
      .map(Number);
  }

  //@ts-ignore
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  if (luminance > 0.5) {
    return colors.Black;
  } else {
    return colors.White;
  }
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const handleCreateDropdownArray = (
  min: number = 0,
  max: number = 10,
  step: number = 1,
): {value: string; label: string}[] => {
  const length = Math.floor((max - min) / step) + 1;
  const newArray = Array.from({length}, (_, i) => {
    const value = max - i * step;
    return {
      value: value.toString(),
      label: value.toString(),
    };
  });
  const removeZeroIndex = newArray.findIndex(i => i.value === '0');
  if (removeZeroIndex !== -1) {
    newArray.splice(removeZeroIndex, 1);
  }
  return newArray;
};

export const handleSplitArray = <T extends Record<string, any>>(
  arr: T[],
): [string[], string[]] => {
  const result: [string[], string[]] = [[], []];
  arr.reduce((acc, {label}) => {
    if (label === '') {
      // Skip empty strings
      return acc;
    }
    const numValue = Number(label);
    if (isNaN(numValue)) {
      // Skip non-numeric strings
      return acc;
    }
    if (numValue < 0) {
      result[0].push(label); // Negative values
    } else {
      result[1].push(label); // Positive values (includes zero)
    }
    return acc; // Return the accumulated value
  }, undefined);
  return result;
};

export const swapArrayItems = <T extends Record<string, any>>(
  arr: T[],
  id1: number,
  id2: number,
): T[] => {
  const newArray = [...arr]; // Create a new array to avoid modifying the original array
  // Find the indices of the objects with the provided ids
  const index1 = newArray.findIndex(obj => obj.id === id1);
  const index2 = newArray.findIndex(obj => obj.id === id2);
  // If either of the ids is not found, return the original array
  if (index1 === -1 || index2 === -1) {
    return newArray;
  }
  // Swap the objects at the found indices
  [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];

  return newArray;
};
