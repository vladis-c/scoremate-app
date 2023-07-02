import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Button, Card, IconButton, Text} from 'react-native-paper';
import {useClickOutside} from 'react-native-click-outside';

import {colors} from '../theme';
import ColorPalette from './ColorPalette';
import {Player} from '../types';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {removePlayer, setPlayerScore, setPlayerSettings} from '../store/score';
import {
  getRandomColor,
  handleSplitArray,
  handleTextColorForBackground,
} from '../helpers';
import TextModal from './TextModal';
import {setShouldScrollToEnd} from '../store/service';

type ScoreCardProps = {
  id: Player['id'];
  color: Player['color'];
  name: Player['name'];
};

const ScoreCard = ({id, color, name}: ScoreCardProps) => {
  const dispatch = useAppDispatch();
  const {
    players,
    scoreSettings: {customScore},
  } = useAppSelector(({score}) => score);
  const currentPlayer = players.find(player => player.id === id);
  const [secondaryColor, setSecondaryColor] = useState(colors.Black);

  if (!currentPlayer) {
    return null;
  }

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
      <Card.Content style={[styles.content, styles.contentIsEditMode]}>
        <View style={styles.leftInEdit}>
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
        </View>
        <IconButton
          icon="check"
          onPress={() => setIsEditState(false)}
          iconColor={secondaryColor}
        />
      </Card.Content>
    );
  };

  const renderScoreButton = (sign: 'negative' | 'positive') => {
    const [negativeValues, positiveValues] = handleSplitArray(customScore);
    if (sign === 'negative') {
      return negativeValues.map(v => (
        <Button
          key={v}
          onPress={() => dispatch(setPlayerScore({id, increment: +v}))}>
          <Text variant="bodySmall">{v}</Text>
        </Button>
      ));
    }
    return positiveValues.map(v => (
      <Button
        key={v}
        onPress={() => dispatch(setPlayerScore({id, increment: +v}))}>
        <Text variant="bodySmall">+{v}</Text>
      </Button>
    ));
  };

  const renderNonEditState = () => {
    return (
      <Card.Content style={styles.content}>
        <View style={styles.topContainer}>
          <IconButton
            icon="minus"
            onPress={() => dispatch(setPlayerScore({id, increment: -1}))}
            iconColor={secondaryColor}
          />
          <View style={styles.center}>
            {name ? (
              <Text variant="bodySmall" style={{color: secondaryColor}}>
                {name}
              </Text>
            ) : null}
            <Text variant="bodyMedium" style={{color: secondaryColor}}>
              {currentPlayer.score}
            </Text>
          </View>
          <IconButton
            icon="plus"
            onPress={() => dispatch(setPlayerScore({id, increment: 1}))}
            iconColor={secondaryColor}
          />
        </View>
        {customScore.filter(el => el.label).length > 0 ? (
          <View style={styles.buttonsContainer}>
            {renderScoreButton('negative')}
            {renderScoreButton('positive')}
          </View>
        ) : null}
      </Card.Content>
    );
  };

  return (
    <View
      ref={ref}
      onLayout={e => {
        const height = Dimensions.get('screen').height;
        const currentY = e.nativeEvent.layout.y;
        if (currentY > height * 0.7) {
          dispatch(setShouldScrollToEnd(true));
        } else {
          dispatch(setShouldScrollToEnd(false));
        }
      }}>
      <Card style={[styles.container, {backgroundColor: color}]}>
        {isEditState ? renderEditState() : renderNonEditState()}
      </Card>
      <IconButton
        icon="pencil"
        size={12}
        iconColor={colors.White}
        onPress={() => setIsEditState(prev => !prev)}
        style={styles.edit}
        containerColor={colors.Blue}
      />
    </View>
  );
};

export default ScoreCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  contentIsEditMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  leftInEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    position: 'absolute',
    right: -10,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
