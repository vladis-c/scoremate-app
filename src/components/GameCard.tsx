import {format} from 'date-fns';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {Game} from '../types';

type GameCardProps = {
  item: Game;
  onPress: () => void;
};

const GameCard = ({
  onPress,
  item: {name, createdAt, amountOfPlayers, hasCustomScoring},
}: GameCardProps) => {
  const date = createdAt ? format(new Date(createdAt), 'dd.MM.yyyy HH:mm') : '';

  return (
    <Card style={styles.container} onPress={onPress}>
      <Card.Content style={styles.content}>
        <View>
          {name ? <Text>{name}</Text> : null}
          <Text>{date}</Text>
        </View>

        <View style={{alignItems: 'flex-end'}}>
          <Text>
            {amountOfPlayers} {amountOfPlayers === 1 ? 'player' : 'players'}
          </Text>
          <Text>{hasCustomScoring ? 'Custom' : 'Default'} scoring</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  container: {
    width: '100%',
    marginVertical: 10,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
