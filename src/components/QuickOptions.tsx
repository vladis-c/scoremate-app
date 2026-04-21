import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {TextInput as RNTextInput} from 'react-native';
import {Card, Divider, IconButton, Text, TextInput} from 'react-native-paper';
import {useScore} from '../context/ScoreContext';
import {colors} from '../theme';
import ConfirmationDialog from './ConfirmationDialog';

type QuickOptionsProps = {
  onDelete: () => void;
};

const QuickOptions = ({onDelete}: QuickOptionsProps) => {
  const scoreContext = useScore();
  const {players} = scoreContext;
  const amountOfPlayers = players.length;
  const gameName = scoreContext.currentGame?.name ?? '';

  const [isEditState, setIsEditState] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const inputRef = useRef<RNTextInput>(null);

  useEffect(() => {
    if (isEditState) {
      inputRef.current?.focus();
    } else {
      Keyboard.dismiss();
    }
  }, [isEditState]);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <View style={styles.topContainer}>
          <View style={styles.containerWithText}>
            <TextInput
              ref={inputRef}
              style={[
                styles.input,
                {
                  backgroundColor: !isEditState ? 'transparent' : undefined,
                },
              ]}
              mode="outlined"
              value={gameName}
              onChangeText={e => scoreContext.updateGame({gameName: e})}
              onEndEditing={() =>
                scoreContext.updateGame({gameName, saveToDb: true})
              }
              disabled={!isEditState}
              outlineStyle={{borderColor: 'transparent'}}
              textColor={colors.Black}
              contentStyle={styles.inputContent}
              placeholder="Game name"
            />
            <IconButton
              icon={isEditState ? 'check' : 'pencil'}
              size={12}
              onPress={() => setIsEditState(prev => !prev)}
              iconColor={colors.White}
              containerColor={colors.Blue}
            />
          </View>
          <IconButton
            icon="delete"
            size={12}
            onPress={() => setIsConfirmationVisible(true)}
            iconColor={colors.White}
            containerColor={colors.Red}
          />
          <ConfirmationDialog
            isConfirmationVisible={isConfirmationVisible}
            setIsConfirmationVisible={setIsConfirmationVisible}
            text="Are you sure you want to delete this game? This action cannot be undone. You will be redirected to the start screen."
            leftText="Cancel"
            rightText="Delete"
            onPressLeft={() => setIsConfirmationVisible(false)}
            onPressRight={async () => {
              const deleted = await scoreContext.deleteCurrentGame();
              if (deleted) {
                onDelete();
              }
              setIsConfirmationVisible(false);
            }}
          />
        </View>
        <Divider style={{backgroundColor: colors.Black}} />
        <View style={styles.bottomContainer}>
          <Text style={{textAlign: 'center'}}>Add or remove players</Text>
          <View style={styles.addRemove}>
            <IconButton
              disabled={amountOfPlayers === 0}
              size={12}
              icon="minus"
              onPress={() => {
                // removing last player
                scoreContext.removePlayer(players[amountOfPlayers - 1].id);
              }}
              iconColor={colors.Black}
            />
            <Text variant="headlineMedium">{amountOfPlayers}</Text>
            <IconButton
              size={12}
              icon="plus"
              onPress={() => {
                scoreContext.setNewPlayer({
                  score: 0,
                  name: '',
                });
              }}
              iconColor={colors.Black}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default QuickOptions;

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  content: {
    paddingHorizontal: 16,
    gap: 4,
  },
  topContainer: {
    flexDirection: 'row',
  },
  bottomContainer: {},
  addRemove: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  containerWithText: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
  },
  input: {
    height: 32,
    flex: 1,
  },
  inputContent: {
    textAlign: 'left',
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 18,
    top: -2,
  },
});
