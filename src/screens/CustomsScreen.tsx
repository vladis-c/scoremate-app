import React, {useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Switch, IconButton, Button} from 'react-native-paper';

import ScrollContainer from '../components/ScrollContaner';
import {colors} from '../theme';
import {
  CustomsScreenProps,
  DRAWER_NAV,
  MAIN_NAV,
} from '../navigation/navigation-types';

const CustomsScreen = ({navigation, route}: CustomsScreenProps) => {
  useLayoutEffect(() => {
    const {fromStart, label} = route.params;
    navigation.setOptions({
      headerTitle: label,
      headerLeft: () => (
        <IconButton
          icon="arrow-left"
          onPress={() => {
            if (fromStart) {
              //@ts-ignore
              navigation.navigate(MAIN_NAV.START);
            } else {
              //@ts-ignore
              navigation.goBack();
            }
          }}
        />
      ),
    });
  }, [navigation, route.params]);

  return (
    <>
      <ScrollContainer style={styles.container}>
        <View style={styles.row}>
          <Text>Get random colors for cards</Text>
          <Switch value={true} color={colors.LightBlue} />
        </View>
        <View style={styles.row}>
          <Text>Set custom scores for this game session</Text>
          <Switch />
        </View>
      </ScrollContainer>
      <Button
        mode="elevated"
        style={styles.continue}
        buttonColor={colors.LightBlue}
        textColor={colors.Black}
        onPress={() => navigation.navigate(DRAWER_NAV.SCORE)}>
        Continue
      </Button>
    </>
  );
};

export default CustomsScreen;

const styles = StyleSheet.create({
  container: {alignItems: 'stretch'},
  row: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.LightBlue,
    borderBottomWidth: 1,
  },
  continue: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
  },
});
