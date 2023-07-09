import React from 'react';
import {IconButton} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {DRAWER_NAV, DrawerNavParamList} from './navigation-types';
import ScoreScreen from '../screens/ScoreScreen';
import {fonts} from '../theme';
import RandomizerScreen from '../screens/RandomizerScreen';
import DiceScreen from '../screens/DiceScreen';
import CustomsScreen from '../screens/CustomsScreen';

const Drawer = createDrawerNavigator<DrawerNavParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
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
      <Drawer.Screen
        name={DRAWER_NAV.SCORE}
        component={ScoreScreen}
        options={{
          drawerIcon: () => <IconButton icon="star" />,
        }}
      />
      <Drawer.Screen
        name={DRAWER_NAV.RANDOM}
        component={RandomizerScreen}
        options={{
          drawerIcon: () => <IconButton icon="refresh" />,
        }}
      />
      <Drawer.Screen
        name={DRAWER_NAV.DICE}
        component={DiceScreen}
        options={{
          drawerIcon: () => <IconButton icon="dice-6" />,
        }}
      />
      <Drawer.Screen
        name={DRAWER_NAV.CUSTOMS}
        component={CustomsScreen}
        options={{
          drawerIcon: () => <IconButton icon="cog" />,
        }}
        initialParams={{fromStart: false, label: 'Amazing custom settings'}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
