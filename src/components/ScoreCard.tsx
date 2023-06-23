import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import {colors} from '../theme';
import ColorPalette from './ColorPalette';
import {Player} from '../types';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {removePlayer, setPlayerSettings} from '../store/score';
import {handleTextColorForBackground} from '../helpers';

type ScoreCardProps = {
  id: Player['id'];
  color: Player['color'];
};

const ScoreCard = ({id, color}: ScoreCardProps) => {
  const dispatch = useAppDispatch();
  const players = useAppSelector(({score: {players}}) => players);
  const currentPlayer = players.find(player => player.id === id);
  const [secondaryColor, setSecondaryColor] = useState(colors.Black);

  if (!currentPlayer) {
    return null;
  }

  const [count, setCount] = useState<number>(0);
  const [isEditState, setIsEditState] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // setting new color for the text and icons based on background
    const textColorForBg = handleTextColorForBackground(color);
    setSecondaryColor(textColorForBg);
  }, [color]);

  const renderEditState = () => {
    const showModal = () => setVisible(true);
    const hideModal = () => {
      setVisible(false);
      setIsEditState(false);
    };
    const deletePlayer = () => {
      dispatch(removePlayer(id));
    };
    return (
      <Card.Content style={[styles.content, styles.contentInEdit]}>
        <>
          <IconButton
            icon="palette"
            onPress={showModal}
            iconColor={secondaryColor}
          />
          <ColorPalette
            color={color}
            onColorChangeComplete={color =>
              dispatch(setPlayerSettings({id, key: 'color', value: color}))
            }
            onDismiss={hideModal}
            visible={visible}
          />
        </>
        <IconButton
          icon="delete"
          onPress={deletePlayer}
          iconColor={secondaryColor}
        />
      </Card.Content>
    );
  };

  const renderNonEditState = () => {
    return (
      <Card.Content style={styles.content}>
        <IconButton
          icon="minus"
          onPress={() => setCount(prev => prev - 1)}
          iconColor={secondaryColor}
        />
        <Text variant="headlineLarge" style={{color: secondaryColor}}>
          {count}
        </Text>
        <IconButton
          icon="plus"
          onPress={() => setCount(prev => prev + 1)}
          iconColor={secondaryColor}
        />
      </Card.Content>
    );
  };

  return (
    <Card style={[styles.container, {backgroundColor: color}]}>
      {isEditState ? renderEditState() : renderNonEditState()}
      <IconButton
        icon="pencil"
        size={12}
        iconColor={colors.White}
        onPress={() => setIsEditState(prev => !prev)}
        style={styles.edit}
        containerColor={colors.Blue}
      />
    </Card>
  );
};

export default ScoreCard;

const styles = StyleSheet.create({
  container: {width: '100%', marginVertical: 10},
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  contentInEdit: {
    justifyContent: 'flex-start',
  },
  edit: {
    position: 'absolute',
    bottom: 45,
    right: -15,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
