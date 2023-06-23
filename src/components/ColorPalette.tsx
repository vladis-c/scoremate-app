import React from 'react';
import {StyleSheet} from 'react-native';
import {Modal, Portal, Card} from 'react-native-paper';
import ColorPicker from 'react-native-wheel-color-picker';

type ColorPaletteProps = {
  color: string;
  onColorChangeComplete: (color: string) => void;
  visible: boolean;
  onDismiss: () => void;
};

const ColorPalette = ({
  color,
  onColorChangeComplete,
  visible,
  onDismiss,
}: ColorPaletteProps) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <ColorPicker
              color={color}
              onColorChangeComplete={onColorChangeComplete}
              thumbSize={40}
              sliderSize={40}
              noSnap={true}
              row={false}
            />
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

export default ColorPalette;

const styles = StyleSheet.create({
  container: {width: '100%', height: '70%', padding: 20},
  card: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
