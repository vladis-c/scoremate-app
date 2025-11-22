import {Image} from 'expo-image';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import ScrollContainer from '../components/ScrollContainer';
import {startButton1Labels, startButton2Labels} from '../constants';
import {
  getRandomColor,
  getRandomNumber,
  handleTextColorForBackground,
} from '../helpers';
import {
  DRAWER_NAV,
  MAIN_NAV,
  StartScreenProps,
} from '../navigation/navigation-types';
import {colors} from '../theme';

type BtnProps = {bgColor: string; textColor: string; label: string};

const StartScreen = ({navigation}: StartScreenProps) => {
  const [btnProps, setBtnProps] = useState<BtnProps[]>([]);

  useEffect(() => {
    const newProps: BtnProps[] = [];
    const bg1 = getRandomColor({useDefault: true});
    if (bg1) {
      const textColor1 = handleTextColorForBackground(bg1);
      const label1 =
        startButton1Labels[getRandomNumber(0, startButton1Labels.length - 1)];
      newProps.push({bgColor: bg1, textColor: textColor1, label: label1});
    }
    const bg2 = getRandomColor({useDefault: true});
    if (bg2) {
      const textColor2 = handleTextColorForBackground(bg2);
      const label2 =
        startButton2Labels[getRandomNumber(0, startButton2Labels.length - 1)];
      newProps.push({bgColor: bg2, textColor: textColor2, label: label2});
    }
    setBtnProps(newProps);
  }, []);

  return (
    <>
      <Image
        style={styles.image}
        source={require('../../assets/adaptive-icon.png')}
        contentFit="contain"
        transition={100}
      />
      <ScrollContainer style={styles.container}>
        {btnProps ? (
          <>
            <Text style={styles.text}>
              Embark on an extraordinary Scoremate experience by choosing one of
              the following options.
            </Text>
            <Button
              labelStyle={{fontSize: 16}}
              buttonColor={btnProps[0]?.bgColor ?? colors.White}
              textColor={btnProps[0]?.textColor ?? colors.Black}
              style={styles.button}
              mode="elevated"
              onPress={() =>
                navigation.navigate(MAIN_NAV.DRAWER, {screen: DRAWER_NAV.SCORE})
              }>
              {btnProps[0]?.label}
            </Button>
            <Button
              labelStyle={{fontSize: 16}}
              buttonColor={btnProps[1]?.bgColor ?? colors.White}
              textColor={btnProps[1]?.textColor ?? colors.Black}
              style={styles.button}
              mode="elevated"
              onPress={() =>
                navigation.navigate(MAIN_NAV.DRAWER, {
                  screen: DRAWER_NAV.CUSTOMS,
                  params: {fromStart: true, label: btnProps[1]?.label},
                })
              }>
              {btnProps[1]?.label}
            </Button>
          </>
        ) : (
          <ActivityIndicator size={40} color={colors.LightBlue} />
        )}
      </ScrollContainer>
    </>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  text: {marginVertical: 10},
  button: {width: '100%', marginVertical: 10},
  image: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    width: '50%',
    height: '50%',
    zIndex: -10,
  },
});
