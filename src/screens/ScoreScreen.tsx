import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {DraxView} from 'react-native-drax';

import ScoreCard from '../components/ScoreCard';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import AddCard from '../components/AddCard';
import ScrollContainer from '../components/ScrollContaner';
import {setNewPlayersOrder} from '../store/score';

const ScoreScreen = () => {
  const players = useAppSelector(({score: {players}}) => players);
  const [addCardHeight, setAddCardHeigth] = useState<number | null>(null);
  const dispatch = useAppDispatch();

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
              <DraxView
                key={player.id}
                receiverPayload={player.id}
                dragPayload={player.id}
                onDragDrop={e => {
                  dispatch(
                    setNewPlayersOrder({
                      id1: e.dragged.payload,
                      id2: e.receiver.payload,
                    }),
                  );
                }}>
                <ScoreCard
                  id={player.id}
                  color={player.color}
                  name={player.name}
                />
              </DraxView>
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
