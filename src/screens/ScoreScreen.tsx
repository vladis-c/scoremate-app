import React from 'react';
import {View, StyleSheet} from 'react-native';
import ScoreCard from '../components/ScoreCard';
import {useAppSelector} from '../hooks/redux-hooks';
import AddCard from '../components/AddCard';
import ScrollContainer from '../components/ScrollContaner';

const ScoreScreen = () => {
  const players = useAppSelector(({score: {players}}) => players);

  return (
    <ScrollContainer>
      <AddCard />
      <View style={styles.cardsContainer}>
        {players.map(player => (
          <ScoreCard
            key={player.id}
            id={player.id}
            color={player.color}
            name={player.name}
          />
        ))}
      </View>
    </ScrollContainer>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  cardsContainer: {width: '100%'},
});
