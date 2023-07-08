import React from 'react';

import {MAIN_NAV, MainNavParamList} from './navigation-types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import StartScreen from '../screens/StartScreen';

const Main = createNativeStackNavigator<MainNavParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator screenOptions={{headerShown: true}}>
      <Main.Screen
        name={MAIN_NAV.START}
        component={StartScreen}
        options={{headerTitle: 'Scoremate'}}
      />
      <Main.Screen
        name={MAIN_NAV.DRAWER}
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Main.Navigator>
  );
};

export default MainNavigator;
