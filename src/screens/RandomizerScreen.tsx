import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Card, Text, TextInput} from 'react-native-paper';
import {getRandomNumber} from '../helpers';

const RandomizerScreen = () => {
  const [random, setRandom] = useState<number | null>(null);
  const [limits, setLimits] = useState<[number, number]>([1, 10]);

  const handleValidateLimits = () => {
    // validation of range of numbers and showing alert
    if (limits[0] >= limits[1]) {
      Alert.alert('Left limit cannot be equal or more than right limit');
      setLimits([1, 10]);
      return false;
    }
    return true;
  };

  const handleSetRandom = () => {
    const valid = handleValidateLimits();
    if (!valid) {
      return;
    }
    setRandom(getRandomNumber(limits[0], limits[1]));
  };

  const handleSetLimits = (type: 'from' | 'to', value: number) => {
    setLimits(prev => {
      if (type === 'from') {
        return [value, prev[1]];
      }
      return [prev[0], value];
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <View style={styles.inputs}>
              <TextInput
                value={limits[0].toString()}
                keyboardType="numeric"
                onChangeText={t => {
                  const number = +t;
                  if (!isNaN(number)) {
                    handleSetLimits('from', number);
                  }
                }}
                onBlur={handleValidateLimits}
                mode="outlined"
                label="From"
                style={styles.input}
                autoComplete="off"
              />
              <TextInput
                value={limits[1].toString()}
                keyboardType="numeric"
                onChangeText={t => {
                  const number = +t;
                  if (!isNaN(number)) {
                    handleSetLimits('to', number);
                  }
                }}
                onBlur={handleValidateLimits}
                mode="outlined"
                label="To"
                style={styles.input}
                autoComplete="off"
              />
            </View>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => {
                Keyboard.dismiss();
                handleSetRandom();
              }}>
              {random !== null ? (
                <Text variant="bodySmall">
                  Press on number to randomize again
                </Text>
              ) : null}
              <Text variant={random !== null ? 'bodyLarge' : 'bodySmall'}>
                {random !== null ? random : 'Press here to randomize'}
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
    alignItems: 'center',
    marginTop: 100,
    marginHorizontal: 20,
  },
  card: {width: '100%'},
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
    minHeight: 300,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '40%',
    textAlign: 'center',
  },
});
