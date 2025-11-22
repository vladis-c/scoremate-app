import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import StartScreen from '../screens/StartScreen';
import DrawerNavigator from './DrawerNavigator';
import {MAIN_NAV, MainNavParamList} from './navigation-types';

const Main = createNativeStackNavigator<MainNavParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator>
      <Main.Screen
        name={MAIN_NAV.START}
        component={StartScreen}
        options={{headerShown: false}}
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
