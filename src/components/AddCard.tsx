import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {removePlayer, setNewPlayer} from '../store/score';
import {getRandomColor} from '../helpers';

const AddCard = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector(({score: {players}}) => players);
  const amountOfPlayers = players.length;

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.content}>
        <View style={styles.halfContainer}>
          <Text variant="headlineMedium">Players: </Text>
        </View>
        <View style={styles.halfContainer}>
          <IconButton
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
                  color: getRandomColor(),
                }),
              );
            }}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {width: '100%', height: 50, marginVertical: 10},
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 4,
    width: '100%',
  },
  halfContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
