import {useFocusEffect} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import ScrollContainer from '../components/ScrollContainer';
import SettingRow from '../components/SettingRow';
import {desireWords} from '../constants';
import {useScore} from '../context/ScoreContext';
import {getRandomNumber} from '../helpers';
import {CustomsScreenProps, DRAWER_NAV} from '../navigation/navigation-types';
import {colors} from '../theme';

const CustomsScreen = ({navigation, route}: CustomsScreenProps) => {
  const {isNew, label} = route.params;
  const scoreContext = useScore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: label,
      headerLeft: () => (
        <IconButton icon="arrow-left" onPress={navigation.goBack} />
      ),
    });
  }, [navigation, route.params]);

  useEffect(
    () =>
      navigation.addListener('blur', () => {
        navigation.setParams({isNew: false});
      }),
    [navigation],
  );

  useFocusEffect(
    useCallback(() => {
      if (isNew) {
        scoreContext.createNewGame();
      }
    }, [isNew]),
  );

  const ref = useRef<ScrollView | null>(null);
  const {players, customScore} = scoreContext;
  const [customScoreIsShown, setCustomScoreIsShown] = useState(false);

  const [ownScoresSettingTitle] = useState(
    desireWords[getRandomNumber(0, desireWords.length - 1)] +
      ' set my own scores',
  );

  useEffect(() => {
    ref.current?.scrollToEnd();
  }, [players.length, customScoreIsShown, customScore.length]);

  return (
    <>
      <ScrollContainer style={styles.container} ref={ref}>
        <SettingRow
          type="increment"
          title="Add players"
          onChange={v => {
            const value = v as '+' | '-';
            if (value === '+') {
              scoreContext.setNewPlayer({
                id: players.length + 1,
                score: 0,
                name: '',
              });
            } else {
              scoreContext.removePlayer(players[players.length - 1].id);
            }
          }}
          value={players.length - 1}
        />
        {players.map(player => (
          <SettingRow
            key={player.id}
            type="player"
            onChange={e =>
              scoreContext.setPlayerSettings({
                ...player,
                name: e,
              })
            }
            onChangeColor={c =>
              scoreContext.setPlayerSettings({
                ...player,
                color: c,
              })
            }
            value={player.name}
            color={player.color}
            onBlur={() => scoreContext.savePlayerSettings(player)}
          />
        ))}
        <SettingRow
          type="switch"
          title={ownScoresSettingTitle}
          onChange={() => {
            scoreContext.clearCustomScores();
            setCustomScoreIsShown(prev => !prev);
          }}
          value={customScoreIsShown}
        />
        {customScoreIsShown ? (
          <>
            <SettingRow
              type="increment"
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
                onChange={e => {
                  if (typeof e !== 'number') {
                    return;
                  }
                  scoreContext.updateCustomScore({value: e, id: el.id});
                }}
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
          navigation.navigate(DRAWER_NAV.SCORE, {isNew: false});
          players.forEach(player => scoreContext.savePlayerSettings(player));
        }}>
        {isNew ? 'Continue' : 'Apply'}
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
