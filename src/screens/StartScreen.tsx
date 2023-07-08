import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import ScrollContainer from '../components/ScrollContaner';
import {
  DRAWER_NAV,
  MAIN_NAV,
  StartScreenProps,
} from '../navigation/navigation-types';

const StartScreen = ({navigation}: StartScreenProps) => {
  return (
    <ScrollContainer>
      <Button
        onPress={() => {
          navigation.navigate(MAIN_NAV.DRAWER, {screen: DRAWER_NAV.SCORE});
        }}>
        Test
      </Button>
    </ScrollContainer>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {},
});
