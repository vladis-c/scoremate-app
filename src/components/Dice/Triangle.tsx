import React from 'react';
import {View} from 'react-native';
import {Polygon, Svg} from 'react-native-svg';
import {colors} from '../../theme';

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

export default Triangle;
