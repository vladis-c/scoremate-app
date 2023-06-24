import React from 'react';
import {View, StyleSheet} from 'react-native';

type DieSideProps = {
  dots: number;
};

const DieSide = ({dots}: DieSideProps) => {
  const renderDots = () => {
    switch (dots) {
      case 1:
        return <View style={styles.dot} />;
      case 2:
        return (
          <View style={styles.diagonal}>
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        );
      case 3:
        return (
          <View style={styles.diagonal}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        );
      case 4:
        return (
          <>
            <View style={[styles.twoThreeDots, {marginBottom: 10}]}>
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
            <View style={styles.twoThreeDots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </>
        );
      case 5:
        return (
          <>
            <View style={[styles.twoThreeDots, {marginBottom: 10}]}>
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
            <View style={styles.twoThreeDots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
            <View style={[styles.dot, styles.absoluteDot]} />
          </>
        );
      case 6:
        return (
          <View style={{transform: [{rotate: `90 deg`}]}}>
            <View style={[styles.twoThreeDots, {marginBottom: 10}]}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
            <View style={styles.twoThreeDots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderDots()}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5DEB3', // Light wooden color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    padding: 10,
    margin: 10,
  },
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

export default DieSide;
