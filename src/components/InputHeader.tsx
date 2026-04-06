import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {TextInput as RNTextInput} from 'react-native';
import {IconButton, TextInput} from 'react-native-paper';
import {colors} from '../theme';
import ConfirmationDialog from './ConfirmationDialog';

type InputHeaderProps = {
  value: string;
  onChange: (v: string) => void;
  onEndEditing: () => void;
  onDelete: () => void;
};

const InputHeader = ({
  value,
  onChange,
  onEndEditing,
  onDelete,
}: InputHeaderProps) => {
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
    <View style={styles.container}>
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
      <IconButton
        icon="delete"
        size={12}
        iconColor={colors.Blue}
        onPress={() => setIsConfirmationVisible(true)}
        style={styles.edit}
        containerColor={colors.White}
      />
      <ConfirmationDialog
        isConfirmationVisible={isConfirmationVisible}
        setIsConfirmationVisible={setIsConfirmationVisible}
        text="Are you sure you want to delete this game? This action cannot be undone. You will be redirected to the start screen."
        leftText="Cancel"
        rightText="Delete"
        onPressLeft={() => setIsConfirmationVisible(false)}
        onPressRight={() => {
          setIsConfirmationVisible(false);
          onDelete();
        }}
      />
    </View>
  );
};

export default InputHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 16,
  },
  containerWithText: {
    flexDirection: 'row',
    flex: 1,
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
