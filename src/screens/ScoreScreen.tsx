import React from 'react';
import {View, StyleSheet} from 'react-native';
import ScoreCard from '../components/ScoreCard';
import {useAppSelector} from '../hooks/redux-hooks';
import AddCard from '../components/AddCard';

const ScoreScreen = () => {
  const {amountOfPlayers} = useAppSelector(({score}) => score);
  const numberOfCards: number[] = Array.from(
    {length: amountOfPlayers},
    (_, index) => index + 1,
  );
  return (
    <View style={styles.container}>
      <AddCard />
      <View style={styles.cardsContainer}>
        {numberOfCards.map(card => (
          <ScoreCard key={card} />
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
