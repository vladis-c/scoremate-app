import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';

const ScoreCard = () => {
  return (
    <Card style={styles.container}>
      <Card.Content style={styles.content}>
        <Text variant="headlineLarge"> Card </Text>
      </Card.Content>
    </Card>
  );
};

export default ScoreCard;

const styles = StyleSheet.create({
  container: {width: '100%'},
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
