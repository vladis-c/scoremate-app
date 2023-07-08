import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import ScrollContainer from '../components/ScrollContaner';
import {
  DRAWER_NAV,
  MAIN_NAV,
  StartScreenProps,
} from '../navigation/navigation-types';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {colors} from '../theme';
import {getRandomColor, handleTextColorForBackground} from '../helpers';

type BtnColorsProps = {bg: string; text: string};

const StartScreen = ({navigation}: StartScreenProps) => {
  const [btnColors, setBtnColors] = useState<BtnColorsProps[]>([]);

  useEffect(() => {
    const newColors: BtnColorsProps[] = [];
    const bg1 = getRandomColor({useDefault: true});
    if (bg1) {
      const text1 = handleTextColorForBackground(bg1);
      newColors.push({bg: bg1, text: text1});
    }
    const bg2 = getRandomColor({useDefault: true});
    if (bg2) {
      const text2 = handleTextColorForBackground(bg2);
      newColors.push({bg: bg2, text: text2});
    }
    setBtnColors(newColors);
  }, []);
  
  return (
    <ScrollContainer>
      {btnColors ? (
        <>
          <Text style={styles.text}>
            Start seamless tracking experience with selecting one of the
            following options.
          </Text>
          <Button
            buttonColor={btnColors[0]?.bg ?? colors.White}
            textColor={btnColors[0]?.text ?? colors.Black}
            style={styles.button}
            mode="elevated"
            onPress={() =>
              navigation.navigate(MAIN_NAV.DRAWER, {screen: DRAWER_NAV.SCORE})
            }>
            Fine Scoremate settings
          </Button>
          <Button
            buttonColor={btnColors[1]?.bg ?? colors.White}
            textColor={btnColors[1]?.text ?? colors.Black}
            style={styles.button}
            mode="elevated"
            onPress={() =>
              navigation.navigate(MAIN_NAV.DRAWER, {
                screen: DRAWER_NAV.CUSTOMS,
                params: {fromStart: true},
              })
            }>
            My amazing custom settings
          </Button>
        </>
      ) : (
        <ActivityIndicator size={40} color={colors.LightBlue} />
      )}
    </ScrollContainer>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  text: {marginVertical: 10},
  button: {width: '100%', marginVertical: 10},
});
