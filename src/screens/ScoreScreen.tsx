import {useFocusEffect} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import AddCard from '../components/AddCard';
import ScoreCard from '../components/ScoreCard';
import ScrollContainer from '../components/ScrollContainer';
import {useScore} from '../context/ScoreContext';
import {ScoreScreenProps} from '../navigation/navigation-types';

const ScoreScreen = ({navigation, route}: ScoreScreenProps) => {
  const ref = useRef<ScrollView | null>(null);
  const scoreContext = useScore();
  const [addCardHeight, setAddCardHeight] = useState<number | null>(null);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: '',
  //     headerLeft: () => (
  //       <TextInput
  //         mode="outlined"
  //         value={scoreContext.currentGame?.name}
  //         onChangeText={scoreContext.updateGame}
  //       />
  //     ),
  //   });
  // }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.isNew) {
        scoreContext.createNewGame();
      }
    }, [route.params]),
  );

  // resetting the navigation param state when moving away from the screen
  useEffect(
    () =>
      navigation.addListener('blur', () => {
        navigation.setParams({isNew: false});
      }),
    [navigation],
  );

  useEffect(() => {
    ref.current?.scrollToEnd();
  }, [scoreContext.players.length]);

  return (
    <>
      <View
        style={styles.add}
        onLayout={e => setAddCardHeight(e.nativeEvent.layout.height)}>
        <AddCard />
      </View>
      {addCardHeight !== null ? (
        <ScrollContainer style={{paddingTop: addCardHeight}} ref={ref}>
          <View style={styles.cardsContainer}>
            {scoreContext.players.map(player => (
              <View key={player.id}>
                <ScoreCard
                  id={player.id}
                  color={player.color}
                  name={player.name}
                />
              </View>
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
