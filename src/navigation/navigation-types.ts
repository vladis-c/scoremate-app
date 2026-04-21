import {NavigatorScreenParams} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export const MAIN_NAV = {
  START: 'Start',
  DRAWER: 'DrawerNav',
} as const;
export type MainNavProps = ObjectValues<typeof MAIN_NAV>;

export const DRAWER_NAV = {
  CUSTOMISATION: 'Customisation',
  CURRENT: 'Current Session',
  RANDOM: 'Randomizer',
  DICE: 'Dice',
  HISTORY: 'History',
  HOME: "Back to Home"
} as const;
export type DrawerNavProps = ObjectValues<typeof DRAWER_NAV>;

// Navigator Params List

export type MainNavParamList = {
  [MAIN_NAV.START]: undefined;
  [MAIN_NAV.DRAWER]: NavigatorScreenParams<DrawerNavParamList>;
};

export type DrawerNavParamList = {
  [DRAWER_NAV.CUSTOMISATION]: {label: string; isNew: boolean};
  [DRAWER_NAV.CURRENT]: {isNew: boolean};
  [DRAWER_NAV.RANDOM]: undefined;
  [DRAWER_NAV.DICE]: undefined;
  [DRAWER_NAV.HISTORY]: undefined;
};

// Navigation Props without useNavigation hook
export type StartScreenProps = NativeStackScreenProps<
  MainNavParamList,
  'Start'
>;
export type ScoreScreenProps = NativeStackScreenProps<
  DrawerNavParamList,
  'Current Session'
>;
export type CustomsScreenProps = NativeStackScreenProps<
  DrawerNavParamList,
  'Customisation'
>;

export type HistoryScreenProps = NativeStackScreenProps<
  DrawerNavParamList,
  'History'
>;
