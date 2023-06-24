import React from 'react';
import {IconButton} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {MAIN_NAV, MainNavParamList} from './navigation-types';
import ScoreScreen from '../screens/ScoreScreen';
import {fonts} from '../theme';

const MainStack = createDrawerNavigator<MainNavParamList>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: true,
        drawerType: 'front',
        headerTitleStyle: {
          ...fonts.SmallHeading,
        },
        drawerLabelStyle: {
          ...fonts.BasicText,
        },
      }}>
      <MainStack.Screen
        name={MAIN_NAV.SCORE}
        component={ScoreScreen}
        options={({navigation}) => ({
          drawerIcon: () => <IconButton icon="star" />,
          headerLeft: () => (
            <IconButton
              icon="menu"
              size={20}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
