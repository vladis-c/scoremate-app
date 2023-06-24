import {colors} from '../theme';

export const getRandomColor = (appliedColors?: string[]): string => {
  const commonColors: string[] = [
    '#c26e73', // Soft Red
    '#728cb9', // Soft Blue
    '#89a77f', // Soft Green
    '#d5c87d', // Soft Yellow
    '#f0f0f0', // Whitish
    '#1a1a1a', // Blackish
    '#db8f6c', // Soft Orange
    '#a994b8', // Soft Purple
  ];

  // it first returns a color from commonColors list
  if (appliedColors !== undefined) {
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
