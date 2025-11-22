import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Square from './Square';

type Die8Props = {
  dots: number;
};

const Die8 = ({dots}: Die8Props) => {
  return (
    <View style={styles.container}>
      <Square style={styles.square}>
        <Text style={styles.text}>{dots}</Text>
      </Square>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{rotate: `-45deg`}],
  },
  square: {
    width: 60,
    height: 60,
  },
  text: {
    position: 'absolute',
    left: 18,
    top: 5,
    fontSize: 40,
    transform: [{rotate: `45deg`}],
  },
});

export default Die8;
