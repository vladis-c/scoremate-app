import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

const ScrollContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
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
