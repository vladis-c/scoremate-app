import React, {useRef} from 'react';
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
  style?: StyleProp<ViewStyle>;
  ref?: React.RefObject<ScrollView | null>;
};

const ScrollContainer = ({children, style, ref}: ScrollContainerProps) => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={30}>
      <ScrollView
        style={{margin: 1, marginBottom: 90}}
        contentContainerStyle={[styles.container, style]}
        ref={ref}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ScrollContainer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
});
