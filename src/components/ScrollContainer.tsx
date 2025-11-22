import React, {useEffect, useRef} from 'react';
import {ScrollView, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {setShouldScrollToEnd} from '../store/service';

type ScrollContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};
const ScrollContainer = ({children, style}: ScrollContainerProps) => {
  const dispatch = useAppDispatch();
  const {shouldScrollToEnd} = useAppSelector(({service}) => service);
  const ref = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (shouldScrollToEnd && ref.current) {
      ref.current.scrollToEnd();
      dispatch(setShouldScrollToEnd(false));
    }
  }, [shouldScrollToEnd]);

  return (
    <ScrollView
      style={{margin: 1, marginBottom: 90}}
      contentContainerStyle={[styles.container, style]}
      ref={ref}>
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
