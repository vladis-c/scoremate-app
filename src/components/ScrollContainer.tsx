import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

type ScrollContainerProps = {
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  ref?: React.RefObject<ScrollView | null>;
};

const ScrollContainer = ({
  children,
  contentStyle,
  containerStyle,
  ref,
}: ScrollContainerProps) => {
  return (
    <KeyboardAvoidingView
      style={[styles.container, containerStyle]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={30}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, contentStyle]}
        ref={ref}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ScrollContainer;

const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {margin: 1, marginBottom: 64, paddingHorizontal: 8},
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
