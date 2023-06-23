import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import {useClickOutside} from 'react-native-click-outside';

import {colors} from '../theme';
import ColorPalette from './ColorPalette';
import {Player} from '../types';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {removePlayer, setPlayerSettings} from '../store/score';
import {getRandomColor, handleTextColorForBackground} from '../helpers';
import TextModal from './TextModal';

type ScoreCardProps = {
  id: Player['id'];
  color: Player['color'];
  name: Player['name'];
  onOutOfScreen?: (value: boolean) => void;
};

const ScoreCard = ({id, color, name, onOutOfScreen}: ScoreCardProps) => {
  const dispatch = useAppDispatch();
  const players = useAppSelector(({score: {players}}) => players);
  const currentPlayer = players.find(player => player.id === id);
  const [secondaryColor, setSecondaryColor] = useState(colors.Black);

  if (!currentPlayer) {
    return null;
  }

  const [count, setCount] = useState<number>(0);
  const [isEditState, setIsEditState] = useState(false);
  const [colorPaletteIsOpen, setColorPaletteIsOpen] = useState(false);
  const [textModalIsOpen, setTextModalIsOpen] = useState(false);
  const ref = useClickOutside<View>(() => setIsEditState(false));

  useEffect(() => {
    // setting new color for the text and icons based on background
    const textColorForBg = handleTextColorForBackground(color);
    setSecondaryColor(textColorForBg);
  }, [color]);

  const renderEditState = () => {
    const deletePlayer = () => {
      dispatch(removePlayer(id));
    };
    return (
      <Card.Content style={[styles.content, styles.contentInEdit]}>
        {/* Color randomizer */}
        <IconButton
          icon="invert-colors"
          onPress={() =>
            dispatch(
              setPlayerSettings({id, key: 'color', value: getRandomColor()}),
            )
          }
          iconColor={secondaryColor}
        />
        {/* Color picker */}
        <>
          <IconButton
            icon="palette"
            onPress={() => setColorPaletteIsOpen(true)}
            iconColor={secondaryColor}
          />
          <ColorPalette
            color={color}
            onColorChangeComplete={color =>
              dispatch(setPlayerSettings({id, key: 'color', value: color}))
            }
            onDismiss={() => {
              setColorPaletteIsOpen(false);
            }}
            visible={colorPaletteIsOpen}
          />
        </>
        <>
          <IconButton
            icon="account-edit"
            onPress={() => setTextModalIsOpen(true)}
            iconColor={secondaryColor}
          />
          <TextModal
            value={name}
            onValueChange={value =>
              dispatch(setPlayerSettings({id, key: 'name', value}))
            }
            visible={textModalIsOpen}
            onDismiss={() => {
              setTextModalIsOpen(false);
              setIsEditState(false);
            }}
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
        <View style={styles.center}>
          {name ? (
            <Text variant="bodyLarge" style={{color: secondaryColor}}>
              {name}
            </Text>
          ) : null}
          <Text variant="headlineLarge" style={{color: secondaryColor}}>
            {count}
          </Text>
        </View>
        <IconButton
          icon="plus"
          onPress={() => setCount(prev => prev + 1)}
          iconColor={secondaryColor}
        />
      </Card.Content>
    );
  };

  return (
    <View
      ref={ref}
      onLayout={e => {
        if (onOutOfScreen) {
          const height = Dimensions.get('screen').height;
          const currentY = e.nativeEvent.layout.y;
          if (currentY > height * 0.7) {
            onOutOfScreen(true);
          } else {
            onOutOfScreen(false);
          }
        }
      }}>
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
    </View>
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
    height: 100,
  },
  contentInEdit: {
    justifyContent: 'flex-start',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    position: 'absolute',
    bottom: 75,
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
