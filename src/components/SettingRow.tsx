import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardTypeOptions,
  TouchableOpacity,
} from 'react-native';
import {Text, Switch, TextInput} from 'react-native-paper';

import {colors} from '../theme';
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
  onBlur?: S extends 'input' ? () => void : never;
  onChangeColor?: S extends 'player' ? (c: string) => void : never;
  color?: S extends 'player' ? string : never;
  title?: S extends 'player' ? never : string;
  keyboardType?: S extends 'input' ? KeyboardTypeOptions : never;
};

const SettingRow = <T extends SettingType>({
  type,
  title,
  onChange,
  onBlur,
  onChangeColor,
  value,
  color,
  keyboardType,
}: SettingRowProps<T>) => {
  const [colorOpen, setColorOpen] = useState(false);

  if (type === 'input') {
    return (
      <View style={styles.row}>
        <Text>{title}</Text>
        <TextInput
          onBlur={onBlur}
          style={styles.input}
          mode="outlined"
          value={value as string}
          onChangeText={e => {
            if (keyboardType === 'numeric') {
              !isNaN(+e) && +e > 0 && onChange(e);
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
    return (
      <>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.nameInput]}
            mode="outlined"
            value={value as string}
            onChangeText={e => onChange(e)}
            label={'Name'}
          />
          <TouchableOpacity
            style={[styles.colorBox, {backgroundColor: color}]}
            onPress={() => setColorOpen(true)}
          />
        </View>
        <ColorPalette
          color={color as string}
          onColorChangeComplete={c => onChangeColor?.(c)}
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
    height: 35,
    textAlign: 'center',
    marginTop: -5,
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
