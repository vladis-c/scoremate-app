import React, {useState} from 'react';
import {View, StyleSheet, KeyboardTypeOptions} from 'react-native';
import {Text, Switch, IconButton, Button, TextInput} from 'react-native-paper';

import {colors} from '../theme';
import {getRandomColor} from '../helpers';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ColorPalette from './ColorPalette';

type SettingType = 'input' | 'switch' | 'player';

type SettingRowProps<S> = {
  type: S;
  value: S extends 'input' ? string : S extends 'player' ? string : boolean;
  onChange: S extends 'input'
    ? (v: string) => void
    : S extends 'player'
    ? (v: string) => void
    : () => void;
  onChangeColor?: S extends 'player' ? string : never;
  title?: S extends 'player' ? never : string;
  keyboardType?: S extends 'input' ? KeyboardTypeOptions : never;
};

const SettingRow = <T extends SettingType>({
  type,
  title,
  onChange,
  value,
  keyboardType,
}: SettingRowProps<T>) => {
  const [colorOpen, setColorOpen] = useState(false);

  if (type === 'input') {
    return (
      <View style={styles.row}>
        <Text>{title}</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          value={value as string}
          onChangeText={e => {
            if (keyboardType === 'numeric' && !isNaN(+e) && +e > 0) {
              onChange(e);
            } else {
              onChange(e);
            }
          }}
          keyboardType={keyboardType ?? 'numeric'}
        />
      </View>
    );
  }
  if (type === 'player') {
    const backgroundColor = getRandomColor();
    return (
      <>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.nameInput]}
            mode="outlined"
            value={value as string}
            onChangeText={e => onChange(e)}
          />
          <TouchableOpacity
            style={[styles.colorBox, {backgroundColor}]}
            onPress={() => setColorOpen(true)}
          />
        </View>
        <ColorPalette
          color={backgroundColor}
          onColorChangeComplete={() => {}}
          visible={colorOpen}
          onDismiss={() => setColorOpen(false)}
        />
      </>
    );
  }
  return (
    <View style={styles.row}>
      <Text>{title}</Text>
      <Switch
        value={value as boolean}
        color={colors.LightBlue}
        onChange={onChange as () => void}
      />
    </View>
  );
};

export default SettingRow;

const styles = StyleSheet.create({
  row: {
    height: 60,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.LightBlue,
    borderBottomWidth: 1,
  },
  input: {
    width: '15%',
    paddingVertical: -10,
    height: 35,
    textAlign: 'center',
  },
  nameInput: {
    width: '40%',
    textAlign: 'left',
  },
  colorBox: {
    width: 32,
    height: 32,
    borderColor: colors.LightBlue,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 10,
  },
});
