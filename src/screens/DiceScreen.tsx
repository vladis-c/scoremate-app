import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import Die from '../components/Dice/Die';
import {addDiceButtons} from '../constants';
import {getRandomNumber} from '../helpers';
import {Dice} from '../types';

const DiceScreen = () => {
  const [diceArray, setDiceArray] = useState<Dice[]>([]);
  const handleRollDice = () => {
    setDiceArray(prev => {
      return prev.map(die => {
        const randomNumber = getRandomNumber(die.from, die.to);
        return {...die, randomNumber};
      });
    });
  };

  const handleAddDie = (die: Dice) => {
    setDiceArray(prev => [...prev, die]);
  };

  const handleRemoveLastDie = () => {
    setDiceArray(prev => {
      const diceArray = prev;
      diceArray.splice(-1);
      return diceArray;
    });
  };

  const text =
    diceArray.length === 0
      ? 'Add dice with buttons below'
      : diceArray.length === 1
        ? 'Press a die to roll'
        : 'Press any die to roll the dice';

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Text variant="bodySmall">{text}</Text>
          <TouchableOpacity style={styles.dice} onPress={handleRollDice}>
            {diceArray.map(die => (
              <Die key={die.id} dots={die.randomNumber} type={die.type} />
            ))}
          </TouchableOpacity>
          <View style={styles.addDice}>
            <View style={styles.buttons}>
              <IconButton
                disabled={diceArray.length === 0}
                size={24}
                icon="minus"
                onPress={handleRemoveLastDie}
              />
              {addDiceButtons.map(die => (
                <IconButton
                  key={die.id}
                  size={24}
                  icon={`dice-d${die.type}`}
                  onPress={() => {
                    handleAddDie({
                      ...die,
                      id: diceArray.length + 1,
                    });
                  }}
                />
              ))}
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default DiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: '50%',
    marginBottom: 100,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dice: {
    marginVertical: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addDice: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
