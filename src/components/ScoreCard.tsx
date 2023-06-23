import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import {colors} from '../theme';
import ColorPalette from './ColorPalette';

const ScoreCard = () => {
  const [count, setCount] = useState<number>(0);
  const [isEditState, setIsEditState] = useState(false);
  const [visible, setVisible] = useState(false);

  const renderEditState = () => {
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    return (
      <>
        <IconButton icon="palette" onPress={showModal} />
        <ColorPalette
          color={colors.Blue}
          onColorChangeComplete={color => console.log(color)}
          onDismiss={hideModal}
          visible={visible}
        />
      </>
    );
  };

  const renderNonEditState = () => {
    return (
      <>
        <IconButton icon="minus" onPress={() => setCount(prev => prev - 1)} />
        <Text variant="headlineLarge">{count}</Text>
        <IconButton icon="plus" onPress={() => setCount(prev => prev + 1)} />
      </>
    );
  };

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.content}>
        {isEditState ? renderEditState() : renderNonEditState()}
      </Card.Content>
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
