import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AddCard from '../components/AddCard';
import ScoreCard from '../components/ScoreCard';
import ScrollContainer from '../components/ScrollContainer';
import {useAppSelector} from '../hooks/redux-hooks';

const ScoreScreen = () => {
  const players = useAppSelector(({score: {players}}) => players);
  const [addCardHeight, setAddCardHeight] = useState<number | null>(null);

  return (
    <>
      <View
        style={styles.add}
        onLayout={e => setAddCardHeight(e.nativeEvent.layout.height)}>
        <AddCard />
      </View>
      {addCardHeight !== null ? (
        <ScrollContainer style={{paddingTop: addCardHeight}}>
          <View style={styles.cardsContainer}>
            {players.map(player => (
              <View key={player.id}>
                <ScoreCard
                  id={player.id}
                  color={player.color}
                  name={player.name}
                />
              </View>
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
