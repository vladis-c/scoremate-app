import React from 'react';
import {View, StyleSheet, KeyboardTypeOptions} from 'react-native';
import {Text, Switch, IconButton, Button, TextInput} from 'react-native-paper';

import {colors} from '../theme';

type SettingType = 'input' | 'switch';

type SettingRowProps<S> = {
  type: S;
  title: string;
  onChange: S extends 'input' ? (v: string) => void : () => void;
  value: S extends 'input' ? string : boolean;
  keyboardType?: S extends 'input' ? KeyboardTypeOptions : never;
};

const SettingRow = <T extends SettingType>({
  type,
  title,
  onChange,
  value,
  keyboardType,
}: SettingRowProps<T>) => {
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
});
