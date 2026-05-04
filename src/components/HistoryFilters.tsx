import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, TextInput} from 'react-native-paper';
import {useScore} from '../context/ScoreContext';
import {colors} from '../theme';

const HistoryFilters = ({page}: {page: number}) => {
  const scoreContext = useScore();

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <TextInput
          style={styles.input}
          mode="outlined"
          onChangeText={e =>
            scoreContext.fetchGamesHistory({searchParam: e, page})
          }
          outlineStyle={{borderColor: 'transparent'}}
          textColor={colors.Black}
          contentStyle={styles.inputContent}
          placeholder="Search..."
          placeholderTextColor={colors.MidGrey}
        />
      </Card.Content>
    </Card>
  );
};

export default HistoryFilters;

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
