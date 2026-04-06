import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {TextInput as RNTextInput} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import {colors} from '../theme';

const InputHeader = ({
  value,
  onChange,
  onEndEditing,
}: {
  value: string;
  onChange: (v: string) => void;
  onEndEditing: () => void;
}) => {
  const [isEditState, setIsEditState] = useState(false);
  const inputRef = useRef<RNTextInput>(null);

  useEffect(() => {
    if (isEditState) {
      inputRef.current?.focus();
    } else {
      Keyboard.dismiss();
    }
  }, [isEditState]);

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          {
            backgroundColor: !isEditState ? 'transparent' : undefined,
          },
        ]}
        mode="outlined"
        value={value}
        onChangeText={onChange}
        onEndEditing={onEndEditing}
        disabled={!isEditState}
        outlineStyle={{borderColor: 'transparent'}}
        textColor={colors.Black}
        contentStyle={styles.inputContent}
      />
      <IconButton
        icon={isEditState ? 'check' : 'pencil'}
        size={12}
        iconColor={colors.Blue}
        onPress={() => setIsEditState(prev => !prev)}
        style={styles.edit}
        containerColor={colors.White}
      />
    </View>
  );
};

export default InputHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 20,
    gap: 8,
  },
  input: {
    height: 35,
    flex: 1,
  },
  inputContent: {
    textAlign: 'left',
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 18,
    top: -2,
  },
  edit: {},
});
