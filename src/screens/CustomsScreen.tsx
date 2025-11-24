import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import ScrollContainer from '../components/ScrollContainer';
import SettingRow from '../components/SettingRow';
import {desireWords} from '../constants';
import {useScore} from '../context/ScoreContext';
import {getRandomColor, getRandomNumber} from '../helpers';
import {CustomsScreenProps, DRAWER_NAV} from '../navigation/navigation-types';
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
  const scoreContext = useScore();
  const [playerListCollapsed, setPlayerListCollapsed] = useState(false);
  const players = scoreContext.players;
  const customScore = scoreContext.customScore;
  const [customScoreIsShown, setCustomScoreIsShown] = useState(false);

  const [amountOfPlayers, setAmountOfPlayers] = useState(0);

  useEffect(() => {
    setAmountOfPlayers(players.length);
  }, [players.length]);

  useEffect(() => {
    ref.current?.scrollToEnd();
  }, [players.length, customScoreIsShown, customScore.length]);

  useEffect(() => {
    if (scoreContext.randomizeColorIsOn) {
      players.forEach(player =>
        scoreContext.setPlayerSettings('color', getRandomColor(), player.id),
      );
    }
  }, [scoreContext.randomizeColorIsOn]);

  const handleSetNewPlayers = () => {
    const difference = amountOfPlayers - players.length;
    if (difference > 0) {
      const newIds = Array.from(
        {length: difference},
        (_, i) => players.length + i + 1,
      );
      const allIds = players.map(player => player.id).concat(newIds);
      allIds.forEach(i =>
        scoreContext.setNewPlayer({
          id: i,
          score: 0,
          name: '',
        }),
      );
      return;
    }
    if (difference < 0) {
      const slicedPlayers = players.slice(amountOfPlayers, players.length);
      slicedPlayers.forEach(player => scoreContext.removePlayer(player.id));
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
          onChange={() => scoreContext.toggleRandomizeColorIsSet()}
          value={scoreContext.randomizeColorIsOn}
        />
        <SettingRow
          type="input"
          title="Amount of players"
          onChange={e => {
            const amount = +e;
            if (!isNaN(amount)) {
              setAmountOfPlayers(+e);
            }
          }}
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
                onChange={e =>
                  scoreContext.setPlayerSettings('name', e, player.id)
                }
                onChangeColor={c =>
                  scoreContext.setPlayerSettings('color', c, player.id)
                }
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
          onChange={() => setCustomScoreIsShown(prev => !prev)}
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
                  scoreContext.addCustomScore();
                } else {
                  scoreContext.removeCustomScore();
                }
              }}
              value={customScore.length}
            />
            {customScore.map((el, i) => (
              <SettingRow
                key={el.id + i}
                type="input"
                title={`Custom score ${i + 1}`}
                onChange={e =>
                  scoreContext.updateCustomScore({value: e, id: el.id})
                }
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
