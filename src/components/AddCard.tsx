import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {
  removePlayer,
  resetPlayersScores,
  setNewPlayer,
  setShuffledArray,
} from '../store/score';

const AddCard = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector(({score: {players}}) => players);
  const amountOfPlayers = players.length;

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.content}>
        <IconButton
          disabled={players.length === 0 || players.length === 1}
          size={24}
          icon="shuffle"
          onPress={() => {
            // shuffles the array of players in random order
            dispatch(setShuffledArray());
          }}
        />
        <View style={styles.plusMinus}>
          <IconButton
            disabled={players.length === 0}
            size={16}
            icon="minus"
            onPress={() => {
              // removing last player
              dispatch(removePlayer(players[players.length - 1].id));
            }}
          />
          <Text variant="headlineMedium">{amountOfPlayers}</Text>
          <IconButton
            size={16}
            icon="plus"
            onPress={() => {
              dispatch(
                setNewPlayer({
                  id: amountOfPlayers + 1,
                  score: 0,
                  name: '',
                }),
              );
            }}
          />
        </View>
        <IconButton
          size={24}
          icon="refresh"
          onPress={() => dispatch(resetPlayersScores())}
        />
      </Card.Content>
    </Card>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 0,
    width: '100%',
  },
  plusMinus: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
