import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Card,
  Dialog,
  IconButton,
  Portal,
  Text,
} from 'react-native-paper';

type ConfirmationDialogProps = {
  isConfirmationVisible: boolean;
  setIsConfirmationVisible: (v: boolean) => void;
  text: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  leftText: string;
  rightText: string;
};

const ConfirmationDialog = ({
  isConfirmationVisible,
  setIsConfirmationVisible,
  text,
  onPressLeft,
  onPressRight,
  leftText,
  rightText,
}: ConfirmationDialogProps) => {
  return (
    <Portal>
      <Dialog
        visible={isConfirmationVisible}
        onDismiss={() => setIsConfirmationVisible(false)}>
        <Dialog.Content>
          <Text>{text}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onPressLeft}>{leftText}</Button>
          <Button onPress={onPressRight} textColor="red">
            {rightText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmationDialog;

const styles = StyleSheet.create({});
