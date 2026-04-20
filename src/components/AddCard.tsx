import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Divider, IconButton, Text} from 'react-native-paper';
import {useScore} from '../context/ScoreContext';
import {colors} from '../theme';
import QuickOptions from './QuickOptions';

type AddCardProps = {
  onDelete: () => void;
};

const AddCard = ({onDelete}: AddCardProps) => {
  const scoreContext = useScore();
  const {players} = scoreContext;
  const amountOfPlayers = players.length;
  const gameName = scoreContext.currentGame?.name ?? '';

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.content}>
        <QuickOptions
          value={gameName}
          onChange={e => scoreContext.updateGame({gameName: e})}
          onEndEditing={() =>
            scoreContext.updateGame({gameName, saveToDb: true})
          }
          onDelete={async () => {
            const deleted = await scoreContext.deleteCurrentGame();
            if (deleted) {
              onDelete();
            }
          }}
        />
        <Divider style={{backgroundColor: colors.Black}} />
        <Text style={{textAlign: 'center'}}>Add or remove players</Text>
        <View style={styles.addRemove}>
          <IconButton
            disabled={amountOfPlayers === 0}
            size={12}
            icon="minus"
            onPress={() => {
              // removing last player
              scoreContext.removePlayer(players[amountOfPlayers - 1].id);
            }}
            iconColor={colors.Black}
          />
          <Text variant="headlineMedium">{amountOfPlayers}</Text>
          <IconButton
            size={12}
            icon="plus"
            onPress={() => {
              scoreContext.setNewPlayer({
                score: 0,
                name: '',
              });
            }}
            iconColor={colors.Black}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  content: {
    flexDirection: 'column',
    width: '100%',
    gap: 4,
  },
  addRemove: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});
