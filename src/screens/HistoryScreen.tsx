import {useFocusEffect} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import GameCard from '../components/GameCard';
import HistorySearch from '../components/HistorySearch';
import {useScore} from '../context/ScoreContext';
import {DRAWER_NAV, HistoryScreenProps} from '../navigation/navigation-types';

const HistoryScreen = ({navigation}: HistoryScreenProps) => {
  const scoreContext = useScore();
  const {historyFilters, loading} = scoreContext;

  const {gamesHistory, hasMoreGames} = scoreContext;

  useEffect(() => {
    if (historyFilters.page !== 0 && !loading) {
      scoreContext.fetchGamesHistory();
    }
  }, [historyFilters.page]);

  return (
    <View style={styles.screenContainer}>
      <HistorySearch />
      <FlashList
        data={gamesHistory}
        contentContainerStyle={styles.listContainer}
        onEndReached={() => {
          if (hasMoreGames) {
            scoreContext.setPageFilter(historyFilters.page + 1);
          }
        }}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => (
          <GameCard
            item={item}
            onPress={() => {
              scoreContext.setPageFilter(0);
              scoreContext.resetGamesHistory();
              scoreContext.fetchGame(item.id);
              navigation.navigate(DRAWER_NAV.CURRENT, {isNew: false});
            }}
            onDelete={() => {
              scoreContext.setPageFilter(1);
              scoreContext.deleteGame(item.id);
            }}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};
export default HistoryScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  listContainer: {
    paddingBottom: 48,
  },
  container: {
    width: '100%',
    marginVertical: 8,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
