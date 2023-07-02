import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Card, Text, TextInput} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {setRandomNumber, setRandomizerLimit} from '../store/random';

const RandomizerScreen = () => {
  const dispatch = useAppDispatch();
  const {randomNumber, from, to} = useAppSelector(({random}) => random);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <View style={styles.inputs}>
              <TextInput
                value={from}
                keyboardType="numeric"
                onChangeText={t =>
                  dispatch(setRandomizerLimit({type: 'from', value: t}))
                }
                mode="outlined"
                label="From"
                style={styles.input}
                autoComplete="off"
              />
              <TextInput
                value={to}
                keyboardType="numeric"
                onChangeText={t =>
                  dispatch(setRandomizerLimit({type: 'to', value: t}))
                }
                mode="outlined"
                label="To"
                style={styles.input}
                autoComplete="off"
              />
            </View>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => dispatch(setRandomNumber())}>
              {randomNumber !== null ? (
                <Text variant="bodySmall">
                  Press on number to randomize again
                </Text>
              ) : null}
              <Text variant={randomNumber !== null ? 'bodyLarge' : 'bodySmall'}>
                {randomNumber !== null
                  ? randomNumber
                  : 'Press here to randomize'}
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RandomizerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputs: {
    marginTop: 50,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    width: '100%',
    minHeight: 200,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '40%',
    textAlign: 'center',
  },
});
