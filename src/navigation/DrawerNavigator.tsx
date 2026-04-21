import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {IconButton} from 'react-native-paper';
import CurrentSessionScreen from '../screens/CurrentSessionScreen';
import CustomsScreen from '../screens/CustomsScreen';
import DiceScreen from '../screens/DiceScreen';
import HistoryScreen from '../screens/HistoryScreen';
import RandomizerScreen from '../screens/RandomizerScreen';
import {fonts} from '../theme';
import {DRAWER_NAV, DrawerNavParamList, MAIN_NAV} from './navigation-types';

const Drawer = createDrawerNavigator<DrawerNavParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            labelStyle={{...fonts.BasicText}}
            label={DRAWER_NAV.HOME}
            icon={() => <IconButton icon="home" />}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.getParent()?.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: MAIN_NAV.START}],
                }),
              );
            }}
          />
        </DrawerContentScrollView>
      )}
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
        name={DRAWER_NAV.CURRENT}
        component={CurrentSessionScreen}
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
      {/* <Drawer.Screen
        name={DRAWER_NAV.DICE}
        component={DiceScreen}
        options={{
          drawerIcon: () => <IconButton icon="dice-6" />,
        }}
      /> */}
      <Drawer.Screen
        name={DRAWER_NAV.CUSTOMISATION}
        component={CustomsScreen}
        options={{
          drawerIcon: () => <IconButton icon="cog" />,
        }}
        initialParams={{isNew: false, label: 'Custom settings'}}
      />
      <Drawer.Screen
        name={DRAWER_NAV.HISTORY}
        component={HistoryScreen}
        options={{
          drawerIcon: () => <IconButton icon="view-list" />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
