import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type ObjectValues<T> = T[keyof T];
/**
 * The followng constant-type pairs are analogue of Typescript Enums.
 * For the navigation:
 * the constants in CAPITAL letters are the names of screens to be set in the navigation;
 * the type pair is for use if you create other type or interface with it to reference.
 */
/** */
export const MAIN_NAV = {
  SCORE: 'Score',
  SETTINGS: 'Settings',
  RANDOM: 'Randomizer',
  DICE: 'Dice',
  COIN: 'Coin',
} as const;
export type MainNavProps = ObjectValues<typeof MAIN_NAV>;

// Navigatior Params List

/** Main navigator, which holds all the navigators inside */
export type MainNavParamList = {
  [MAIN_NAV.SCORE]: undefined;
  [MAIN_NAV.SETTINGS]: undefined;
  [MAIN_NAV.RANDOM]: undefined;
  [MAIN_NAV.DICE]: undefined;
  [MAIN_NAV.COIN]: undefined;
};

// Navigation Props without useNavigation hook
export type ScoreScreenProps = NativeStackScreenProps<
  MainNavParamList,
  'Score'
>;
// Navigation props with useNavigation hook

// Param Props
