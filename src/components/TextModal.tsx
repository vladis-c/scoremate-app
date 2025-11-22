import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, Modal, Portal, TextInput} from 'react-native-paper';

type TextModalProps = {
  value: string;
  onValueChange: (value: string) => void;
  visible: boolean;
  onDismiss: () => void;
};

const TextModal = ({
  value,
  onValueChange,
  visible,
  onDismiss,
}: TextModalProps) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              autoFocus
              value={value}
              onChangeText={onValueChange}
              mode="outlined"
              label="Player's name"
            />
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button onPress={onDismiss}>Ok</Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
};

export default TextModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  card: {
    padding: 20,
  },
  actions: {
    paddingTop: 30,
  },
});
