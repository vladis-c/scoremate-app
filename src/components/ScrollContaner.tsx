import React, {useEffect, useRef} from 'react';
import {ScrollView, StyleProp, StyleSheet, ViewStyle} from 'react-native';

type ScrollContainerProps = {
  children: React.ReactNode;
  scrollToEnd?: boolean;
  onScrolledToEnd?: () => void;
  style?: StyleProp<ViewStyle>;
};
const ScrollContainer = ({
  children,
  style,
  scrollToEnd,
  onScrolledToEnd,
}: ScrollContainerProps) => {
  const ref = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (scrollToEnd && ref.current) {
      ref.current.scrollToEnd();
      onScrolledToEnd && onScrolledToEnd();
    }
  }, [scrollToEnd]);

  return (
    <ScrollView contentContainerStyle={[styles.container, style]} ref={ref}>
      {children}
    </ScrollView>
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
