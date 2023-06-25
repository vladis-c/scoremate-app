import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {colors} from '../../theme';

type SquareProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Square = ({children, style}: SquareProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Square;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.Wooden,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    padding: 10,
    margin: 10,
  },
});
