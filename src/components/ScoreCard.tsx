import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useClickOutside} from 'react-native-click-outside';
import {Button, Card, IconButton, Text} from 'react-native-paper';
import {useScore} from '../context/ScoreContext';
import {
  getRandomColor,
  handleSplitArray,
  handleTextColorForBackground,
} from '../helpers';
import {colors} from '../theme';
import {Player} from '../types';
import ColorPalette from './ColorPalette';
import TextModal from './TextModal';

type ScoreCardProps = {
  id: Player['id'];
  color: Player['color'];
  name: Player['name'];
};

const ScoreCard = ({id, color, name}: ScoreCardProps) => {
  const scoreContext = useScore();
  const {players, customScore} = scoreContext;
  const currentPlayer = players.find(player => player.id === id);

  if (!currentPlayer) {
    return null;
  }

  const [secondaryColor, setSecondaryColor] = useState(colors.Black);
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
    return (
      <Card.Content style={[styles.content, styles.contentIsEditMode]}>
        <View style={styles.leftInEdit}>
          {/* Color randomizer */}
          <IconButton
            icon="invert-colors"
            onPress={() =>
              scoreContext.setPlayerSettings('color', getRandomColor(), id)
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
                scoreContext.setPlayerSettings('color', color, id)
              }
              onDismiss={() => setColorPaletteIsOpen(false)}
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
                scoreContext.setPlayerSettings('name', value, id)
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
            onPress={() => scoreContext.removePlayer(id)}
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
        <Button key={v} onPress={() => scoreContext.setPlayerScore(id, v)}>
          <Text variant="bodySmall" style={{color: secondaryColor}}>
            {v}
          </Text>
        </Button>
      ));
    }
    return positiveValues.map(v => (
      <Button key={v} onPress={() => scoreContext.setPlayerScore(id, v)}>
        <Text variant="bodySmall" style={{color: secondaryColor}}>
          +{v}
        </Text>
      </Button>
    ));
  };

  const renderNonEditState = () => {
    return (
      <Card.Content style={styles.content}>
        <View style={styles.topContainer}>
          <IconButton
            icon="minus"
            onPress={() => scoreContext.setPlayerScore(id, -1)}
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
            onPress={() => scoreContext.setPlayerScore(id, 1)}
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
    <View ref={ref}>
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
