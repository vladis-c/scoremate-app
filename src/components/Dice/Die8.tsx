import React from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

import Triangle from './Triangle';

type Die8Props = {
  dots: number;
};

const Die8 = ({dots}: Die8Props) => {
  return (
    <Triangle>
      <Text style={styles.text}>{dots}</Text>
    </Triangle>
  );
};

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    left: 30,
    top: 26,
    fontSize: 40,
  },
});

export default Die8;
