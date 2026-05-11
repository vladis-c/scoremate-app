import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../theme';

type AnimatedFabProps = {
  onPress: () => void;
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedFab = ({onPress}: AnimatedFabProps) => {
  const [, setExpanded] = useState(false);
  const width = useSharedValue(56);
  const translateX = useSharedValue(56);
  const opacity = useSharedValue(0);

  const toggle = () => {
    setExpanded(prev => {
      const newVal = !prev;
      if (newVal) {
        // expanding
        width.value = withTiming(200, {duration: 300});
        translateX.value = withTiming(0, {duration: 300});
        opacity.value = withDelay(200, withTiming(1, {duration: 150}));
      } else {
        // shrinking
        width.value = withTiming(56, {duration: 300});
        translateX.value = withTiming(56, {duration: 300});
        opacity.value = withTiming(0, {duration: 150});
      }
      return newVal;
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
    opacity: opacity.value,
  }));
  return (
    <Animated.View style={[styles.fabContainer, animatedStyle]}>
      <AnimatedTouchableOpacity
        onPress={() => {
          onPress();
          toggle();
        }}
        style={[styles.textButton, textAnimatedStyle]}>
        <Text style={styles.text}>Finish session</Text>
      </AnimatedTouchableOpacity>
      <TouchableOpacity hitSlop={50} onPress={toggle} style={styles.iconButton}>
        <Icon source="archive" color={colors.White} size={24} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedFab;

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    height: 56,
    backgroundColor: colors.Blue,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.White,
    fontSize: 16,
  },
});
