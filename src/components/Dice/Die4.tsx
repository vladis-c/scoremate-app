import React, {Children} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Polygon} from 'react-native-svg';
import {colors} from '../../theme';
import {Text} from 'react-native-paper';

type Die3Props = {
  dots: number;
};

const Triangle = ({children}: {children: React.ReactNode}) => {
  const size = 80;
  return (
    <View style={{width: size, height: size, margin: 10}}>
      <Svg width="100%" height="100%">
        <Polygon
          points={`0,${size} ${size / 2},0 ${size},${size}`}
          fill={colors.Wooden}
        />
      </Svg>
      {children}
    </View>
  );
};

const Die3 = ({dots}: Die3Props) => {
  const dot1 = dots === 1 ? 1 : dots === 2 ? 2 : dots === 3 ? 3 : 4;
  const dot2 = dots === 1 ? 2 : dots === 2 ? 1 : dots === 3 ? 4 : 3;
  const dot3 = dots === 1 ? 3 : dots === 2 ? 4 : dots === 3 ? 1 : 2;
  
  return (
    <Triangle>
      <Text style={[styles.text, styles.top]}>{dot1}</Text>
      <Text style={[styles.text, styles.right]}>{dot2}</Text>
      <Text style={[styles.text, styles.left]}>{dot3}</Text>
    </Triangle>
  );
};

const styles = StyleSheet.create({
  text: {position: 'absolute', fontSize: 20},
  top: {left: 34, top: 10},
  right: {transform: [{rotate: `135deg`}], bottom: 0, right: 10},
  left: {transform: [{rotate: `225deg`}], bottom: 0, left: 10},
});

export default Die3;
