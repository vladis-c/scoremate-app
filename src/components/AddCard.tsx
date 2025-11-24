import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import {useScore} from '../context/ScoreContext';

const AddCard = () => {
  const scoreContext = useScore();
  const {players} = scoreContext;
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
            scoreContext.shufflePlayerOrder();
          }}
        />
        <View style={styles.plusMinus}>
          <IconButton
            disabled={players.length === 0}
            size={16}
            icon="minus"
            onPress={() => {
              // removing last player
              scoreContext.removePlayer(players[players.length - 1].id);
            }}
          />
          <Text variant="headlineMedium">{amountOfPlayers}</Text>
          <IconButton
            size={16}
            icon="plus"
            onPress={() => {
              scoreContext.setNewPlayer({
                id: amountOfPlayers + 1,
                score: 0,
                name: '',
              });
            }}
          />
        </View>
        <IconButton
          size={24}
          icon="refresh"
          onPress={() => scoreContext.resetPlayersScores()}
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
