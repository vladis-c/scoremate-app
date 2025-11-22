import React from 'react';
import {StyleSheet, View} from 'react-native';
import Square from './Square';

type Die6Props = {
  dots: number;
};
const Dot = () => <View style={styles.dot} />;

const Die6 = ({dots}: Die6Props) => {
  const renderDots = () => {
    switch (dots) {
      case 1:
        return <Dot />;
      case 2:
        return (
          <View style={styles.diagonal}>
            <Dot />
            <Dot />
          </View>
        );
      case 3:
        return (
          <View style={styles.diagonal}>
            <Dot />
            <Dot />
            <Dot />
          </View>
        );
      case 4:
        return (
          <>
            <View style={[styles.twoThreeDots, {marginBottom: 10}]}>
              <Dot />
              <Dot />
            </View>
            <View style={styles.twoThreeDots}>
              <Dot />
              <Dot />
            </View>
          </>
        );
      case 5:
        return (
          <>
            <View style={[styles.twoThreeDots, {marginBottom: 10}]}>
              <Dot />
              <Dot />
            </View>
            <View style={styles.twoThreeDots}>
              <Dot />
              <Dot />
            </View>
            <View style={[styles.dot, styles.absoluteDot]} />
          </>
        );
      case 6:
        return (
          <View style={{transform: [{rotate: `90 deg`}]}}>
            <View style={[styles.twoThreeDots, {marginBottom: 10}]}>
              <Dot />
              <Dot />
              <Dot />
            </View>
            <View style={styles.twoThreeDots}>
              <Dot />
              <Dot />
              <Dot />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return <Square>{renderDots()}</Square>;
};

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'black',
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  diagonal: {
    transform: [{rotate: `45 deg`}],
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  twoThreeDots: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  absoluteDot: {
    position: 'absolute',
    left: 32,
  },
});

export default Die6;
