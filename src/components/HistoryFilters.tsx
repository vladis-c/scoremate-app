import {format} from 'date-fns';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Card, Divider, Modal, Portal, Text} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {useScore} from '../context/ScoreContext';
import {colors, fonts} from '../theme';

type HistoryFiltersProps = {
  filterModalVisible: boolean;
  setFilterModalVisible: (v: boolean) => void;
};

const HistoryFilters = ({
  filterModalVisible,
  setFilterModalVisible,
}: HistoryFiltersProps) => {
  const scoreContext = useScore();
  const {historyFilters} = scoreContext;
  const {dateRange} = historyFilters;
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  return (
    <Portal>
      <Modal visible={filterModalVisible} style={styles.modal}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <Text style={styles.title}>Set filters to find games</Text>
            <Divider style={{backgroundColor: colors.Black}} />
            <View>
              <View>
                <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                  <View style={styles.filterLine}>
                    <Text style={styles.filterLineLeft}>Date range</Text>
                    <Text style={styles.filterLineRight}>
                      {dateRange?.start && dateRange?.end
                        ? `${format(new Date(dateRange.start), 'd.M.yyyy')} - ${format(new Date(dateRange.end), 'd.M.yyyy')}`
                        : ''}
                    </Text>
                  </View>
                </TouchableOpacity>
                <DatePickerModal
                  locale="en"
                  mode="range"
                  visible={datePickerVisible}
                  onDismiss={() => setDatePickerVisible(false)}
                  startDate={dateRange?.start}
                  endDate={dateRange?.end}
                  onConfirm={({startDate, endDate}) => {
                    setDatePickerVisible(false);
                    scoreContext.setDateRangeFilter({
                      start: startDate,
                      end: endDate,
                    });
                  }}
                />
              </View>
            </View>
            <Button
              onPress={() => {
                setFilterModalVisible(false);
                scoreContext.fetchGamesHistory({filters: {dateRange}});
              }}>
              Confirm
            </Button>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

export default HistoryFilters;

const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: 16,
  },
  card: {justifyContent: 'center', alignItems: 'center'},
  content: {
    gap: 8,
  },
  title: {...fonts.SmallHeading, textAlign: 'center'},
  filterLineLeft: {
    borderBottomWidth: 1,
    borderBottomColor: colors.DarkGrey,
    paddingBottom: 2,
  },
  filterLineRight: {
    borderWidth: 1,
    borderColor: colors.DarkGrey,
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 6,
    borderRadius: 4,
  },
  filterLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
});
