import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, Button} from 'react-native-paper';

import ScrollContainer from '../components/ScrollContaner';
import {colors} from '../theme';
import {
  CustomsScreenProps,
  DRAWER_NAV,
  MAIN_NAV,
} from '../navigation/navigation-types';
import SettingRow from '../components/SettingRow';
import {getRandomNumber} from '../helpers';
import {desireWords} from '../constants';

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

  const [rowsTitle, setRowsTitle] = useState<string[]>([]);

  useEffect(() => {
    const newRows: string[] = [];
    const row1 =
      desireWords[getRandomNumber(0, desireWords.length - 1)] +
      ' get random colors';
    newRows.push(row1);
    const row2 =
      desireWords[getRandomNumber(0, desireWords.length - 1)] +
      ' set my own scores';
    newRows.push(row2);
    setRowsTitle(newRows);
  }, []);

  return (
    <>
      <ScrollContainer style={styles.container}>
        <SettingRow
          type="input"
          title="Amount of players"
          onChange={e => console.log('input ', e)}
          value={'1'}
        />
        <SettingRow
          type="switch"
          title={rowsTitle[0]}
          onChange={() => console.log('sw 1 change')}
          value={true}
        />
        <SettingRow
          type="switch"
          title={rowsTitle[1]}
          onChange={() => console.log('sw 2 change')}
          value={false}
        />
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
  continue: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
  },
});
