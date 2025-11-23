import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import ScrollContainer from '../components/ScrollContainer';
import SettingRow from '../components/SettingRow';
import {desireWords} from '../constants';
import {getRandomColor, getRandomNumber} from '../helpers';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {CustomsScreenProps, DRAWER_NAV} from '../navigation/navigation-types';
import {
  addNewCustomScore,
  removeCustomScore,
  removePlayer,
  setCustomScore,
  setNewPlayer,
  setPlayerSettings,
  toggleCustomScoreIsShown,
  toggleRandomizeColorIsSet,
} from '../store/score';
import {colors} from '../theme';

const CustomsScreen = ({navigation, route}: CustomsScreenProps) => {
  const {fromStart, label} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: label,
      headerLeft: () => (
        <IconButton icon="arrow-left" onPress={navigation.goBack} />
      ),
    });
  }, [navigation, route.params]);

  const ref = useRef<ScrollView | null>(null);
  const dispatch = useAppDispatch();
  const [playerListCollapsed, setPlayerListCollapsed] = useState(false);
  const players = useAppSelector(({score}) => score.players);
  const customScore = useAppSelector(({score}) => score.customScore);
  const customScoreIsShown = useAppSelector(
    ({score}) => score.customScoreIsShown,
  );
  const randomizeColorIsSet = useAppSelector(
    ({score}) => score.randomizeColorIsSet,
  );
  const [amountOfPlayers, setAmountOfPlayers] = useState(0);

  useEffect(() => {
    setAmountOfPlayers(players.length);
  }, [players.length]);

  useEffect(() => {
    ref.current?.scrollToEnd();
  }, [players.length, customScoreIsShown, customScore.length]);

  useEffect(() => {
    if (randomizeColorIsSet) {
      players.forEach(player => {
        dispatch(
          setPlayerSettings({
            id: player.id,
            key: 'color',
            value: getRandomColor(),
          }),
        );
      });
    }
  }, [randomizeColorIsSet]);

  const handleSetNewPlayers = () => {
    const difference = amountOfPlayers - players.length;
    if (difference > 0) {
      const newIds = Array.from(
        {length: difference},
        (_, i) => players.length + i + 1,
      );
      const allIds = players.map(player => player.id).concat(newIds);
      allIds.forEach(i => {
        dispatch(
          setNewPlayer({
            id: i,
            score: 0,
            name: '',
          }),
        );
      });
      return;
    }
    if (difference < 0) {
      const slicedPlayers = players.slice(amountOfPlayers, players.length);
      slicedPlayers.forEach(player => {
        dispatch(removePlayer(player.id));
      });
      return;
    }
  };

  return (
    <>
      <ScrollContainer style={styles.container} ref={ref}>
        <SettingRow
          type="switch"
          title={
            desireWords[getRandomNumber(0, desireWords.length - 1)] +
            ' get random colors'
          }
          onChange={() => dispatch(toggleRandomizeColorIsSet())}
          value={randomizeColorIsSet}
        />
        <SettingRow
          type="input"
          title="Amount of players"
          onChange={e => setAmountOfPlayers(+e)}
          onBlur={handleSetNewPlayers}
          value={amountOfPlayers.toString()}
          collapse={
            !fromStart
              ? {
                  collapsed: playerListCollapsed,
                  onCollapse: () => setPlayerListCollapsed(prev => !prev),
                }
              : undefined
          }
        />
        {!playerListCollapsed
          ? players.map(player => (
              <SettingRow
                key={player.id}
                type="player"
                onChange={e => {
                  dispatch(
                    setPlayerSettings({
                      key: 'name',
                      value: e,
                      id: player.id,
                    }),
                  );
                }}
                onChangeColor={c => {
                  dispatch(
                    setPlayerSettings({
                      key: 'color',
                      value: c,
                      id: player.id,
                    }),
                  );
                }}
                value={player.name}
                color={player.color}
              />
            ))
          : null}
        <SettingRow
          type="switch"
          title={
            desireWords[getRandomNumber(0, desireWords.length - 1)] +
            ' set my own scores'
          }
          onChange={() => dispatch(toggleCustomScoreIsShown())}
          value={customScoreIsShown}
        />
        {customScoreIsShown ? (
          <>
            <SettingRow
              type="score"
              title="Add custom score count"
              onChange={v => {
                const value = v as '+' | '-';
                if (value === '+') {
                  dispatch(addNewCustomScore());
                } else {
                  dispatch(removeCustomScore());
                }
              }}
              value={customScore.length}
            />
            {customScore.map((el, i) => (
              <SettingRow
                key={el.id + i}
                type="input"
                title={`Custom score ${i + 1}`}
                onChange={e => dispatch(setCustomScore({value: e, id: el.id}))}
                value={el.value}
              />
            ))}
          </>
        ) : null}
      </ScrollContainer>
      <Button
        mode="elevated"
        style={styles.continue}
        buttonColor={colors.LightBlue}
        textColor={colors.Black}
        onPress={() => {
          navigation.setParams({
            fromStart: false,
          });
          navigation.navigate(DRAWER_NAV.SCORE);
        }}>
        {fromStart ? 'Continue' : 'Apply'}
      </Button>
    </>
  );
};

export default CustomsScreen;

const styles = StyleSheet.create({
  container: {alignItems: 'stretch'},
  continue: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
  },
});
