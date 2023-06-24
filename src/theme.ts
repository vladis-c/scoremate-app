import {Theme} from '@react-navigation/native';
import {DefaultTheme} from '@react-navigation/native';
import {MD3LightTheme as PaperDefaultTheme} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/src/types';

export const fonts = {
  BigHeading: {
    fontFamily: 'Quicksand_700Bold',
    fontWeight: '700' as any,
    fontSize: 30,
  },
  SmallHeading: {
    fontFamily: 'Quicksand_700Bold',
    fontWeight: '700' as any,
    fontSize: 20,
  },
  HugeText:  {
    fontFamily: 'Quicksand_700Bold',
    fontWeight: '700' as any,
    fontSize: 144,
  },
  BigText: {
    fontFamily: 'Quicksand_700Bold',
    fontWeight: '700' as any,
    fontSize: 72,
  },
  BasicText: {
    fontFamily: 'Quicksand_500Medium',
    fontWeight: '500' as any,
    fontSize: 16,
  },
  SmallText: {
    fontFamily: 'Quicksand_500Medium',
    fontWeight: '400' as any,
    fontSize: 11,
  },
  SmallLightText: {
    fontFamily: 'Quicksand_300Light',
    fontWeight: '300' as any,
    fontSize: 11,
  },
};

export const colors = {
  BGWhite: '#EFEFEF',
  White: '#FFFFFF',
  Blue: '#4666A9',
  BlueWithOpacity: '#4665a981',
  LightBlue: '#88D3EE',
  Black: '#3B3836',
  DarkGrey: '#757777',
  MidGrey: '#D5D6D7',
  LightGrey: '#F6F6F5',
  Red: '#D23535',
  Green: '#108045',
};

export const NavigationTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.Blue, // should be brand color
    background: colors.BGWhite,
    text: colors.Black,
    card: colors.LightBlue,
  },
};

export const PaperTheme: ThemeProp = {
  ...PaperDefaultTheme,
  fonts: {
    bodyLarge: fonts.HugeText,
    bodyMedium: fonts.BigText,
    bodySmall: fonts.BasicText,
    default: fonts.BasicText,
    displayLarge: fonts.BigHeading,
    displayMedium: fonts.SmallHeading,
    displaySmall: fonts.BasicText,
    headlineLarge: fonts.BigHeading,
    headlineMedium: fonts.SmallHeading,
    headlineSmall: fonts.SmallText,
    titleLarge: fonts.BigHeading,
    titleMedium: fonts.SmallHeading,
    titleSmall: fonts.SmallText,
    labelLarge: fonts.SmallHeading,
    labelMedium: fonts.BasicText,
    labelSmall: fonts.SmallText
  },
  dark: false,
  colors: {
    primary: 'rgb(53, 92, 168)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(217, 226, 255)',
    onPrimaryContainer: 'rgb(0, 25, 67)',
    secondary: 'rgb(0, 103, 127)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(182, 235, 255)',
    onSecondaryContainer: 'rgb(0, 31, 40)',
    tertiary: 'rgb(138, 81, 0)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 220, 189)',
    onTertiaryContainer: 'rgb(44, 22, 0)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(254, 251, 255)',
    onBackground: 'rgb(27, 27, 31)',
    surface: 'rgb(254, 251, 255)',
    onSurface: 'rgb(27, 27, 31)',
    surfaceVariant: 'rgb(225, 226, 236)',
    onSurfaceVariant: 'rgb(68, 70, 79)',
    outline: 'rgb(117, 119, 128)',
    outlineVariant: 'rgb(197, 198, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(48, 48, 52)',
    inverseOnSurface: 'rgb(242, 240, 244)',
    inversePrimary: 'rgb(175, 198, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(244, 243, 251)',
      level2: 'rgb(238, 238, 248)',
      level3: 'rgb(232, 234, 245)',
      level4: 'rgb(230, 232, 245)',
      level5: 'rgb(226, 229, 243)',
    },
    surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
    backdrop: 'rgba(46, 48, 56, 0.4)',
  },
};
