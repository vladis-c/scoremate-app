import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import {Accelerometer, AccelerometerMeasurement} from 'expo-sensors';

import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import Die6 from '../components/Dice/Die6';
import {removeDie, setAddDie, setRollDice} from '../store/dice';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Die4 from '../components/Dice/Die4';
import Die from '../components/Dice/Die';

const DiceScreen = () => {
  const dispatch = useAppDispatch();
  const {diceArray} = useAppSelector(({dice}) => dice);

  // useEffect(() => {
  //   Accelerometer.addListener(handleShake);
  //   return () => {
  //     Accelerometer.removeAllListeners();
  //   };
  // }, []);

  // const handleShake = (data: AccelerometerMeasurement) => {
  //   const acceleration = Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z);
  //   if (acceleration > 3) {
  //     console.log('Device shook');
  //   }
  // };
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
          <TouchableOpacity
            style={styles.dice}
            onPress={() => dispatch(setRollDice())}>
            {diceArray.map(die => (
              <Die key={die.id} dots={die.randomNumber} type={die.to} />
            ))}
          </TouchableOpacity>
          <View style={styles.addDice}>
            <Text variant="bodySmall">Add dice</Text>
            <View style={styles.buttons}>
              <IconButton
                disabled={diceArray.length === 0}
                size={24}
                icon="minus"
                onPress={() => {
                  //Removing last die
                  dispatch(removeDie(diceArray[diceArray.length - 1].id));
                }}
              />
              <IconButton
                size={24}
                icon="plus"
                onPress={() => {
                  dispatch(
                    setAddDie({
                      id: diceArray.length + 1,
                      from: 1,
                      to: 6,
                      randomNumber: 1,
                    }),
                  );
                }}
              />
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
