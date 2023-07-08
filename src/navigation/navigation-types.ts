import {NavigatorScreenParams} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

/**
 * The followng constant-type pairs are analogue of Typescript Enums.
 * For the navigation:
 * the constants in CAPITAL letters are the names of screens to be set in the navigation;
 * the type pair is for use if you create other type or interface with it to reference.
 */
/** */

export const MAIN_NAV = {
  START: 'Start',
  DRAWER: 'DrawerNav',
} as const;
export type MainNavProps = ObjectValues<typeof MAIN_NAV>;

export const DRAWER_NAV = {
  SCORE: 'Score',
  SETTINGS: 'Settings',
  RANDOM: 'Randomizer',
  DICE: 'Dice',
  COIN: 'Coin',
} as const;
export type DrawerNavProps = ObjectValues<typeof DRAWER_NAV>;

// Navigatior Params List

/** Main navigator, which holds all the navigators inside */
export type MainNavParamList = {
  [MAIN_NAV.START]: undefined;
  [MAIN_NAV.DRAWER]: NavigatorScreenParams<DrawerNavParamList>;
};

export type DrawerNavParamList = {
  [DRAWER_NAV.SCORE]: undefined;
  [DRAWER_NAV.SETTINGS]: undefined;
  [DRAWER_NAV.RANDOM]: undefined;
  [DRAWER_NAV.DICE]: undefined;
  [DRAWER_NAV.COIN]: undefined;
};

// Navigation Props without useNavigation hook
export type StartScreenProps = NativeStackScreenProps<
  MainNavParamList,
  'Start'
>;
export type ScoreScreenProps = NativeStackScreenProps<
  DrawerNavParamList,
  'Score'
>;
// Navigation props with useNavigation hook

// Param Props
