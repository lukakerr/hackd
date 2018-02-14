import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';
import {
  Text,
  View,
  StyleSheet,
  Switch,
} from 'react-native';
import TableView from 'react-native-tableview';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import { getUser } from '../helpers/api';
import CustomText from '../components/CustomText';

const { Section, Item, Cell } = TableView;

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  tapToCollapseChanged = () => {
    this.props.changeSetting(
      'tapToCollapse',
      !this.props.settings.tapToCollapse
    )
  };

  commentThemeChanged = (theme) => {
    
  };

  render() {
    return (
      <View style={commonStyles.flex}>
        <TableView 
          style={commonStyles.flex}
          textColor='black'
          tableViewStyle={TableView.Consts.Style.Grouped} 
          tableViewCellStyle={TableView.Consts.CellStyle.Value1}>
          <Section label='Comments'>
            <Cell style={styles.cell}>
              <CustomText style={{fontSize: 17}}>Tap to collapse</CustomText>
              <Switch
                style={{marginRight: 16}}
                value={this.props.settings.tapToCollapse}
                onValueChange={this.tapToCollapseChanged} />
            </Cell>
            <Cell 
              style={styles.cell} 
              accessoryType={TableView.Consts.AccessoryType.DisclosureIndicator}
              onPress={() => this.props.navigation.navigate('CommentThemes')}>
              <CustomText style={{fontSize: 17}}>Comment themes</CustomText>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
