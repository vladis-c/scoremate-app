import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MAIN_NAV, MainNavParamList} from './navigation-types';
import ScoreScreen from '../screens/Score';

const MainStack = createNativeStackNavigator<MainNavParamList>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
      }}>
      <MainStack.Screen
        name={MAIN_NAV.SCORE}
        component={ScoreScreen}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
