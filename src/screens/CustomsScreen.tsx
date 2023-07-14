import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, Button} from 'react-native-paper';

import ScrollContainer from '../components/ScrollContaner';
import {colors} from '../theme';
import {
  CustomsScreenProps,
  DRAWER_NAV,
  MAIN_NAV,
} from '../navigation/navigation-types';
import SettingRow from '../components/SettingRow';
import {getRandomNumber} from '../helpers';
import {desireWords} from '../constants';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {removePlayer, setNewPlayer, setPlayerSettings} from '../store/score';

const CustomsScreen = ({navigation, route}: CustomsScreenProps) => {
  const {fromStart, label} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: label,
      headerLeft: () => (
        <IconButton
          icon="arrow-left"
          onPress={() => {
            if (fromStart) {
              // TODO: check the types
              //@ts-ignore
              navigation.navigate(MAIN_NAV.START);
            } else {
              // TODO: check the types
              //@ts-ignore
              navigation.goBack();
            }
          }}
        />
      ),
    });
  }, [navigation, route.params]);

  const dispatch = useAppDispatch();
  const [rowsTitle, setRowsTitle] = useState<string[]>([]);
  const players = useAppSelector(({score}) => score.players);
  const [amountOfPlayers, setAmountOfPlayers] = useState<number>(
    players.length,
  );

  useEffect(() => {
    const newRows: string[] = [];
    const row1 =
      desireWords[getRandomNumber(0, desireWords.length - 1)] +
      ' get random colors';
    newRows.push(row1);
    const row2 =
      desireWords[getRandomNumber(0, desireWords.length - 1)] +
      ' set my own scores';
    newRows.push(row2);
    setRowsTitle(newRows);
  }, []);

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

  const [playerListCollapsed, setPlayerListCollapsed] = useState(false);

  return (
    <>
      <ScrollContainer style={styles.container}>
        <SettingRow
          type="input"
          title="Amount of players"
          onChange={e => setAmountOfPlayers(+e)}
          onBlur={handleSetNewPlayers}
          value={amountOfPlayers.toString()}
          collapse={
            fromStart
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
          title={rowsTitle[0]}
          onChange={() => console.log('sw 1 change')}
          value={true}
        />
        <SettingRow
          type="switch"
          title={rowsTitle[1]}
          onChange={() => console.log('sw 2 change')}
          value={false}
        />
      </ScrollContainer>
      <Button
        mode="elevated"
        style={styles.continue}
        buttonColor={colors.LightBlue}
        textColor={colors.Black}
        onPress={() => navigation.navigate(DRAWER_NAV.SCORE)}>
        Continue
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
