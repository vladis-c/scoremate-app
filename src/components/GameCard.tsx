import {format} from 'date-fns';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {
  Button,
  Card,
  Dialog,
  IconButton,
  Portal,
  Text,
} from 'react-native-paper';
import {Game} from '../types';
import ConfirmationDialog from './ConfirmationDialog';

type GameCardProps = {
  item: Game;
  onPress: () => void;
  onDelete: () => void;
};

const GameCard = ({
  onPress,
  onDelete,
  item: {name, createdAt, amountOfPlayers, hasCustomScoring},
}: GameCardProps) => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const date = createdAt ? format(new Date(createdAt), 'dd.MM.yyyy HH:mm') : '';

  const renderRightActions = () => (
    <View style={styles.rightActionContainer}>
      <IconButton
        icon="delete"
        iconColor="#ffffff"
        size={28}
        onPress={() => setIsConfirmationVisible(true)}
        style={styles.deleteActionButton}
      />
    </View>
  );

  return (
    <>
      <Swipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        overshootFriction={8}
        renderRightActions={() => renderRightActions()}>
        <Card style={styles.container} onPress={onPress}>
          <Card.Content style={styles.content}>
            <View>
              {name ? <Text>{name}</Text> : null}
              <Text>{date}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text>
                {amountOfPlayers} {amountOfPlayers === 1 ? 'player' : 'players'}
              </Text>
              <Text>{hasCustomScoring ? 'Custom' : 'Default'} scoring</Text>
            </View>
          </Card.Content>
        </Card>
      </Swipeable>
      <ConfirmationDialog
        isConfirmationVisible={isConfirmationVisible}
        setIsConfirmationVisible={setIsConfirmationVisible}
        text="Are you sure you want to delete this game from history? This action cannot be undone."
        leftText="Cancel"
        rightText="Delete"
        onPressLeft={() => {
          setIsConfirmationVisible(false);
        }}
        onPressRight={() => {
          setIsConfirmationVisible(false);
          onDelete();
        }}
      />
    </>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  container: {
    width: '100%',
    marginVertical: 10,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightActionContainer: {
    backgroundColor: '#d32f2f',
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  deleteActionButton: {
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
  },
});
