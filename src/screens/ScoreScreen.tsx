import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import ScoreCard from '../components/ScoreCard';

const ScoreScreen = () => {
  return (
    <View style={styles.container}>
      <ScoreCard />
    </View>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
