import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AddCard from '../components/AddCard';
import ScoreCard from '../components/ScoreCard';
import ScrollContainer from '../components/ScrollContainer';
import ViewContainer from '../components/ViewContainer';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {setNewPlayersOrder} from '../store/score';

const ScoreScreen = () => {
  const players = useAppSelector(({score: {players}}) => players);
  const [addCardHeight, setAddCardHeight] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const {scoreCardsDraggable} = useAppSelector(({service}) => service);

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
              <ViewContainer
                key={player.id}
                id={player.id}
                draggable={scoreCardsDraggable}
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
              </ViewContainer>
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
