import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Menu, Divider, IconButton} from 'react-native-paper';
import {MAIN_NAV, MainNavParamList} from './navigation-types';
import ScoreScreen from '../screens/ScoreScreen';

const MainStack = createNativeStackNavigator<MainNavParamList>();

const MainNavigator = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
      }}>
      <MainStack.Screen
        name={MAIN_NAV.SCORE}
        component={ScoreScreen}
        options={{
          headerLeft: () => (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              style={{top: 90, left: 35}}
              anchor={<IconButton icon="menu" size={20} onPress={openMenu} />}>
              <Menu.Item onPress={() => {}} title="Item 1" />
              <Menu.Item onPress={() => {}} title="Item 2" />
              <Divider />
              <Menu.Item onPress={() => {}} title="Item 3" />
            </Menu>
          ),
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
