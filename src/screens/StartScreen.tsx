import {Image} from 'expo-image';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import ScrollContainer from '../components/ScrollContainer';
import {startButton1Labels, startButton2Labels} from '../constants';
import {useScore} from '../context/ScoreContext';
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
import {colors, fonts} from '../theme';

type BtnProps = {
  bgColor: string;
  textColor: string;
  label: string;
  onPress: () => void;
};

const StartScreen = ({navigation}: StartScreenProps) => {
  const scoreContext = useScore();

  const getBtnProps = (): BtnProps[] => {
    const newProps: BtnProps[] = [];

    if (scoreContext.currentGame) {
      const bg1 = getRandomColor({useDefault: true});
      const textColor1 = handleTextColorForBackground(bg1);
      const label1 =
        'Continue your last game ' + scoreContext.currentGame?.name;
      newProps.push({
        bgColor: bg1,
        textColor: textColor1,
        label: label1,
        onPress: () => {
          navigation.navigate(MAIN_NAV.DRAWER, {
            screen: DRAWER_NAV.CURRENT,
            params: {isNew: false},
          });
        },
      });
    }

    const bg2 = getRandomColor({useDefault: true});
    const textColor2 = handleTextColorForBackground(bg2);
    const label2 =
      startButton1Labels[getRandomNumber(0, startButton1Labels.length - 1)];
    newProps.push({
      bgColor: bg2,
      textColor: textColor2,
      label: label2,
      onPress: () => {
        navigation.navigate(MAIN_NAV.DRAWER, {
          screen: DRAWER_NAV.CURRENT,
          params: {isNew: true},
        });
      },
    });

    const bg3 = getRandomColor({useDefault: true});
    const textColor3 = handleTextColorForBackground(bg3);
    const label3 =
      startButton2Labels[getRandomNumber(0, startButton2Labels.length - 1)];
    newProps.push({
      bgColor: bg3,
      textColor: textColor3,
      label: label3,
      onPress: () => {
        navigation.navigate(MAIN_NAV.DRAWER, {
          screen: DRAWER_NAV.CUSTOMISATION,
          params: {isNew: true, label: btnProps[1]?.label},
        });
      },
    });

    return newProps;
  };

  const btnProps = getBtnProps();

  return (
    <>
      <ScrollContainer contentStyle={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/adaptive-icon.png')}
          contentFit="contain"
          transition={100}
        />
        <View style={styles.textsContainer}>
          <Text style={styles.title}>Scoremate</Text>
          <Text style={styles.text}>
            Scoremate is your mate in tracking boardgames score.
          </Text>
          <Text
            style={
              styles.text
            }>{`Choose between Scoremate preset and Custom experience${scoreContext.currentGame ? `, or continue your last game ${scoreContext.currentGame.name}` : ''}`}</Text>
        </View>
        {btnProps.map(props => {
          return (
            <Button
              key={props.label}
              labelStyle={{fontSize: 16}}
              buttonColor={props?.bgColor ?? colors.White}
              textColor={props?.textColor ?? colors.Black}
              style={styles.button}
              mode="elevated"
              onPress={props.onPress}>
              {props?.label}
            </Button>
          );
        })}
      </ScrollContainer>
    </>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
  },
  title: {...fonts.BigHeading, textAlign: 'center'},
  text: {...fonts.BasicText, textAlign: 'center'},
  textsContainer: {gap: 24, alignItems: 'center', marginBottom: 10},
  button: {width: '100%', marginVertical: 10},
  image: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    width: '50%',
    height: '50%',
    zIndex: -10,
  },
});
