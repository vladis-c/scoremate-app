import {useFocusEffect} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {format} from 'date-fns';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {useScore} from '../context/ScoreContext';
import {DRAWER_NAV, HistoryScreenProps} from '../navigation/navigation-types';

const HistoryScreen = ({navigation}: HistoryScreenProps) => {
  const scoreContext = useScore();

  const [page, setPage] = useState(1);

  const {gamesHistory, hasMoreGames} = scoreContext;

  useEffect(() => {
    scoreContext.fetchGamesHistory({page});
  }, [page]);

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      scoreContext.resetGamesHistory();
    }, []),
  );

  return (
    <FlashList
      data={gamesHistory}
      contentContainerStyle={styles.listContainer}
      onEndReached={() => {
        if (hasMoreGames) {
          setPage(prev => prev + 1);
        }
      }}
      onEndReachedThreshold={0.5}
      renderItem={({item}) => {
        const {createdAt, name, hasCustomScoring, amountOfPlayers, id} = item;

        const date = createdAt
          ? format(new Date(createdAt), 'dd.MM.yyyy HH:mm')
          : '';

        return (
          <Card
            style={styles.container}
            onPress={() => {
              scoreContext.clearStates();
              scoreContext.fetchGame(id);
              navigation.navigate(DRAWER_NAV.SCORE, {isNew: false});
            }}>
            <Card.Content style={styles.content}>
              <View>
                {name ? <Text>{name}</Text> : null}
                <Text>{date}</Text>
              </View>

              <View style={{alignItems: 'flex-end'}}>
                <Text>
                  {amountOfPlayers}{' '}
                  {amountOfPlayers === 1 ? 'player' : 'players'}
                </Text>
                <Text>{hasCustomScoring ? 'Custom' : 'Default'} scoring</Text>
              </View>
            </Card.Content>
          </Card>
        );
      }}
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
