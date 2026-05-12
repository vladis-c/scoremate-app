import {CommonActions, useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import AnimatedFab from '../components/AnimatedFab';
import QuickOptions from '../components/QuickOptions';
import ScoreCard from '../components/ScoreCard';
import ScrollContainer from '../components/ScrollContainer';
import {useScore} from '../context/ScoreContext';
import {MAIN_NAV, ScoreScreenProps} from '../navigation/navigation-types';

const CurrentSessionScreen = ({navigation, route}: ScoreScreenProps) => {
  const ref = useRef<ScrollView | null>(null);
  const scoreContext = useScore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
    });
  }, [navigation, scoreContext.currentGame?.name]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.isNew) {
        scoreContext.clearStates();
        scoreContext.createNewGame();
      }
    }, [route.params]),
  );

  // resetting the navigation param state when moving away from the screen
  useEffect(() => {
    const resetParams = () => {
      navigation.setParams({isNew: false});
    };
    navigation.addListener('blur', resetParams);
  }, [navigation]);

  useEffect(() => {
    ref.current?.scrollToEnd();
  }, [scoreContext.players.length]);

  const goToStart = () => {
    navigation.getParent()?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: MAIN_NAV.START}],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <QuickOptions onDelete={goToStart} />
      <ScrollContainer ref={ref} containerStyle={styles.scrollContainer}>
        {scoreContext.players.map(player => (
          <ScoreCard
            key={player.id}
            id={player.id}
            color={player.color}
            name={player.name}
          />
        ))}
      </ScrollContainer>
      <AnimatedFab
        onPress={() => {
          scoreContext.updateGame({saveToDb: true, status: 'finished'});
          goToStart();
        }}
      />
    </View>
  );
};

export default CurrentSessionScreen;

const styles = StyleSheet.create({
  container: {flexGrow: 1, paddingHorizontal: 8},
  scrollContainer: {marginTop: -8},
});
