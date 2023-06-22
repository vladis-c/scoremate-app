import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const ScoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ScoreScreen</Text>
    </View>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
