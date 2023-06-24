import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ScoreCard from '../components/ScoreCard';
import {useAppSelector} from '../hooks/redux-hooks';
import AddCard from '../components/AddCard';
import ScrollContainer from '../components/ScrollContaner';

const ScoreScreen = () => {
  const players = useAppSelector(({score: {players}}) => players);
  const [addCardHeight, setAddCardHeigth] = useState<number | null>(null);

  return (
    <>
      <View
        style={styles.add}
        onLayout={e => setAddCardHeigth(e.nativeEvent.layout.height)}>
        <AddCard />
      </View>
      {addCardHeight !== null ? (
        <ScrollContainer style={{paddingTop: addCardHeight}}>
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
      ) : null}
    </>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  add: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
    width: '100%',
    paddingHorizontal: 20,
  },
  cardsContainer: {width: '100%'},
});
