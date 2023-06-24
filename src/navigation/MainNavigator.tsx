import React from 'react';
import {IconButton} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {MAIN_NAV, MainNavParamList} from './navigation-types';
import ScoreScreen from '../screens/ScoreScreen';
import {fonts} from '../theme';
import RandomizerScreen from '../screens/RandomizerScreen';

const MainStack = createDrawerNavigator<MainNavParamList>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={({navigation}) => ({
        headerShown: true,
        drawerType: 'front',
        headerTitleStyle: {
          ...fonts.SmallHeading,
        },
        drawerLabelStyle: {
          ...fonts.BasicText,
        },
        headerLeft: () => (
          <IconButton
            icon="menu"
            size={20}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}>
      <MainStack.Screen
        name={MAIN_NAV.SCORE}
        component={ScoreScreen}
        options={{
          drawerIcon: () => <IconButton icon="star" />,
        }}
      />
      <MainStack.Screen
        name={MAIN_NAV.RANDOM}
        component={RandomizerScreen}
        options={{
          drawerIcon: () => <IconButton icon="refresh" />,
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
