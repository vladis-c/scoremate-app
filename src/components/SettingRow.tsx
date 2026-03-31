import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton, Switch, Text, TextInput} from 'react-native-paper';
import {colors} from '../theme';
import ColorPalette from './ColorPalette';

type SettingType = 'input' | 'switch' | 'player' | 'increment' | 'game';

type SettingRowProps<S> = {
  type: S;
  value: S extends 'switch'
    ? boolean
    : S extends 'increment'
      ? number
      : S extends 'input'
        ? number
        : string;
  onChange: S extends 'switch' ? () => void : (v: string) => void;
  onEndEditing?: S extends 'input'
    ? () => void
    : S extends 'player'
      ? () => void
      : S extends 'game'
        ? () => void
        : never;
  onChangeColor?: S extends 'player' ? (c: string) => void : never;
  color?: S extends 'player' ? string : never;
  title?: S extends 'player' ? never : string;
  collapse?:
    | {
        collapsed: boolean;
        onCollapse: () => void;
      }
    | undefined;
};

const ViewWrapper = ({children}: {children: React.ReactNode}) => {
  return <View style={styles.row}>{children}</View>;
};

const SettingRow = <T extends SettingType>({
  type,
  title,
  onChange,
  onEndEditing,
  onChangeColor,
  value,
  color,
  collapse,
}: SettingRowProps<T>) => {
  const [colorOpen, setColorOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const Title = <Text>{title}</Text>;

  if (type === 'increment') {
    return (
      <ViewWrapper>
        {Title}
        <View style={styles.right}>
          <IconButton
            disabled={value === 0}
            size={18}
            icon="minus"
            onPress={() => onChange('-')}
            style={styles.iconButton}
          />
          <IconButton
            size={18}
            icon="plus"
            onPress={() => onChange('+')}
            style={styles.iconButton}
          />
        </View>
      </ViewWrapper>
    );
  }

  if (type === 'input') {
    return (
      <ViewWrapper>
        {Title}
        <View style={styles.right}>
          <TextInput
            onEndEditing={onEndEditing}
            value={isFocused && value === 0 ? '' : (value as string)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              if (value.toString().trim() === '' || value.toString() === '-') {
                onChange('0');
              }
            }}
            onChangeText={text => {
              if (text === '' || text === '-' || /^-?\d+$/.test(text)) {
                onChange(text);
              }
            }}
            style={styles.input}
            mode="outlined"
            keyboardType="numbers-and-punctuation"
          />
          {collapse !== undefined ? (
            <IconButton
              icon={collapse.collapsed ? 'arrow-expand' : 'arrow-collapse'}
              onPress={collapse.onCollapse}
            />
          ) : null}
        </View>
      </ViewWrapper>
    );
  }
  if (type === 'player') {
    return (
      <>
        <ViewWrapper>
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
        </ViewWrapper>
        <ColorPalette
          color={color as string}
          onColorChangeComplete={c => onChangeColor?.(c)}
          visible={colorOpen}
          onDismiss={() => setColorOpen(false)}
        />
      </>
    );
  }
  if (type === 'game') {
    return (
      <>
        <ViewWrapper>
          <TextInput
            style={[styles.input, styles.gameInput]}
            mode="outlined"
            value={value as string}
            onChangeText={e => onChange(e)}
            label="Game title"
            onEndEditing={onEndEditing}
          />
        </ViewWrapper>
      </>
    );
  }
  return (
    <ViewWrapper>
      {Title}
      <Switch
        value={value as boolean}
        color={colors.LightBlue}
        onChange={onChange as () => void}
      />
    </ViewWrapper>
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
    width: '50%',
    height: 35,
    textAlign: 'center',
    marginTop: -5,
  },
  nameInput: {
    width: '40%',
    textAlign: 'left',
  },
  gameInput: {
    width: '100%',
    textAlign: 'left',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '30%',
  },
  colorBox: {
    width: 32,
    height: 32,
    borderColor: colors.LightBlue,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 10,
  },
  iconButton: {
    backgroundColor: colors.White,
    borderWidth: 1,
    borderColor: colors.LightBlue,
    borderRadius: 4,
    marginRight: 0,
  },
});
