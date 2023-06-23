import React from 'react';
import {View, StyleSheet} from 'react-native';
import ScoreCard from '../components/ScoreCard';
import {useAppSelector} from '../hooks/redux-hooks';
import AddCard from '../components/AddCard';

const ScoreScreen = () => {
  const players = useAppSelector(({score: {players}}) => players);

  return (
    <View style={styles.container}>
      <AddCard />
      <View style={styles.cardsContainer}>
        {players.map(player => (
          <ScoreCard key={player.id} id={player.id} color={player.color} />
        ))}
      </View>
    </View>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-start', alignItems: 'center'},
  cardsContainer: {width: '100%'},
});
