import {useFocusEffect} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {format} from 'date-fns';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {useScore} from '../context/ScoreContext';

const HistoryScreen = () => {
  const scoreContext = useScore();

  useFocusEffect(
    useCallback(() => {
      scoreContext.fetchGamesHistory();
    }, []),
  );

  return (
    <FlashList
      contentContainerStyle={styles.listContainer}
      renderItem={({
        item: {createdAt, name, hasCustomScoring, amountOfPlayers},
      }) => {
        const date = createdAt
          ? format(new Date(createdAt), 'd.M.yyyy H:mm')
          : '';
        return (
          <Card style={styles.container} onPress={() => {}}>
            <Card.Content style={styles.content}>
              <View>
                <Text>{name}</Text>
                <Text>{date}</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text>
                  {amountOfPlayers}{' '}
                  {amountOfPlayers === 1 ? 'player' : 'players'}
                </Text>
                <Text>{`${hasCustomScoring ? 'Custom' : 'Default'} scoring`}</Text>
              </View>
            </Card.Content>
          </Card>
        );
      }}
      data={scoreContext.gamesHistory}
    />
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
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
