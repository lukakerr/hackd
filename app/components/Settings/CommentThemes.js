import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import TableView from 'react-native-tableview';

import config from '../../config/default';
import commonStyles from '../../styles/common';
import CustomText from '../CustomText';
import Circles from './Circles';

const { Section, Item, Cell } = TableView;

export default class CommentThemes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={commonStyles.flex}>
        <TableView 
          style={commonStyles.flex}
          textColor='black'
          tableViewStyle={TableView.Consts.Style.Grouped} 
          tableViewCellStyle={TableView.Consts.CellStyle.Value1}>
          <Section label='Themes'>
            <Cell 
              style={styles.cell} 
              accessoryType={TableView.Consts.AccessoryType.Checkmark}
              onPress={() => navigate('sections')}>
              <CustomText style={{fontSize: 17}}>Raw</CustomText>
              <Circles 
                data={config.commentThemes.raw} />
            </Cell>
            <Cell style={styles.cell}>
              <CustomText style={{fontSize: 17}}>Ocean</CustomText>
              <Circles 
                data={config.commentThemes.ocean} />
            </Cell>
            <Cell style={styles.cell}>
              <CustomText style={{fontSize: 17}}>Trees</CustomText>
              <Circles 
                data={config.commentThemes.trees} />
            </Cell>
            <Cell style={styles.cell}>
              <CustomText style={{fontSize: 17}}>Mono</CustomText>
              <Circles 
                data={config.commentThemes.mono} />
            </Cell>
          </Section>
        </TableView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    flexDirection: 'row',
    height: 44,
    paddingLeft: 15,
    marginRight: 28,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
