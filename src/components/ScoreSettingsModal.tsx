import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Modal, Portal, Card, Button, IconButton} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {
  setAddNewCustomScore,
  setCustomScore,
  setCustomScoreDropdownIsShown,
} from '../store/score';

type ScoreSettingsModalProps = {
  visible: boolean;
  onDismiss: () => void;
};

const ScoreSettingsModal = ({visible, onDismiss}: ScoreSettingsModalProps) => {
  const dispatch = useAppDispatch();

  const {availableScore, customScore} = useAppSelector(
    ({score: {scoreSettings}}) => scoreSettings,
  );

  const renderDropdown = (id: number) => {
    const objIndex = customScore.findIndex(s => s.id === id);
    if (objIndex === -1) {
      return null;
    }
    const found = customScore[objIndex];
    return (
      <DropDown
        label={'Score'}
        mode={'outlined'}
        visible={found.isShown !== undefined ? found.isShown : false}
        showDropDown={() => {
          dispatch(setCustomScoreDropdownIsShown({id, isShown: true}));
        }}
        onDismiss={() => {
          dispatch(setCustomScoreDropdownIsShown({id, isShown: false}));
        }}
        value={found.label}
        setValue={v =>
          dispatch(
            setCustomScore({
              label: v,
              value: v,
              isShown: false,
              id,
            }),
          )
        }
        list={availableScore}
        dropDownItemTextStyle={{fontSize: 18}}
        dropDownItemSelectedTextStyle={{fontSize: 18}}
        dropDownContainerMaxHeight={Dimensions.get('screen').height / 3}
      />
    );
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title={'Set custom settings'}
            titleVariant="headlineMedium"
          />
          <Card.Content style={styles.content}>
            {customScore.map(d => {
              return (
                <View style={styles.ddContainer} key={d.id}>
                  <IconButton
                    disabled={customScore.length === 1}
                    icon="minus"
                    onPress={() => {
                      dispatch(setAddNewCustomScore(d.id));
                    }}
                  />
                  {renderDropdown(d.id)}
                  <IconButton
                    icon="plus"
                    onPress={() => {
                      dispatch(
                        setAddNewCustomScore({
                          value: '0',
                          label: '',
                          isShown: false,
                          id: customScore.length + 1,
                        }),
                      );
                    }}
                  />
                </View>
              );
            })}
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button onPress={onDismiss}>Ok</Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
};

export default ScoreSettingsModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  card: {
    padding: 20,
  },
  content: {},
  ddContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    paddingTop: 30,
  },
});
