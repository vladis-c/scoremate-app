import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MAIN_NAV, MainNavParamList} from './navigation-types';
import DrawerNavigator from './DrawerNavigator';
import StartScreen from '../screens/StartScreen';
import CustomsScreen from '../screens/CustomsScreen';
import {IconButton} from 'react-native-paper';

const Main = createNativeStackNavigator<MainNavParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator screenOptions={{headerShown: true}}>
      <Main.Screen
        name={MAIN_NAV.START}
        component={StartScreen}
        options={{headerShown: false, statusBarTranslucent: true}}
      />
      <Main.Screen
        name={MAIN_NAV.DRAWER}
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
    </Main.Navigator>
  );
};

export default MainNavigator;
