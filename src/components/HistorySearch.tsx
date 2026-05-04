import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Card, IconButton, TextInput} from 'react-native-paper';
import {useScore} from '../context/ScoreContext';
import {colors} from '../theme';
import HistoryFilters from './HistoryFilters';

const HistorySearch = ({page}: {page: number}) => {
  const scoreContext = useScore();
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <TextInput
          style={styles.input}
          mode="outlined"
          onChangeText={e =>
            scoreContext.fetchGamesHistory({filters: {searchParam: e}, page})
          }
          outlineStyle={{borderColor: 'transparent'}}
          textColor={colors.Black}
          contentStyle={styles.inputContent}
          placeholder="Search..."
          placeholderTextColor={colors.MidGrey}
        />
        <IconButton
          icon="filter-variant"
          size={12}
          onPress={() => setFilterModalVisible(true)}
          iconColor={colors.White}
          containerColor={colors.Blue}
        />
        <HistoryFilters
          filterModalVisible={filterModalVisible}
          setFilterModalVisible={setFilterModalVisible}
        />
      </Card.Content>
    </Card>
  );
};

export default HistorySearch;

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  content: {
    paddingHorizontal: 16,
    gap: 4,
    flexDirection: 'row',
  },
  input: {
    height: 32,
    flex: 1,
    backgroundColor: 'transparent',
  },
  inputContent: {
    textAlign: 'left',
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 18,
    top: -2,
  },
});
