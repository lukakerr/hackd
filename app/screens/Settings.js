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

import CustomText from '../components/CustomText';

import { getUser } from '../helpers/api';

const { Section, Item, Cell } = TableView;

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  navigateToCommentThemes = () => {
    this.props.navigator.push({
      screen: 'hackd.CommentThemes',
      title: 'Comment Themes',
    });
  };

  navigateToAppColors = () => {
    this.props.navigator.push({
      screen: 'hackd.AppColors',
      title: 'Navigator Themes',
    });
  };

  keyValueChanged = (key, value) => {
    this.props.changeSetting(
      key,
      value
    );
  };

  booleanChanged = (key, boolean) => {
    this.props.changeSetting(
      key,
      !boolean
    );
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
                onValueChange={() => this.booleanChanged('tapToCollapse', this.props.settings.tapToCollapse)} />
            </Cell>
            <Cell 
              style={styles.cell} 
              accessoryType={TableView.Consts.AccessoryType.DisclosureIndicator}
              onPress={() => this.navigateToCommentThemes()}>
              <CustomText style={{fontSize: 17}}>Comment themes</CustomText>
            </Cell>
          </Section>
          <Section label='Posts'>
            <Cell style={styles.cell}>
              <CustomText style={{fontSize: 17}}>Use Safari Reader Mode</CustomText>
              <Switch
                style={{marginRight: 16}}
                value={this.props.settings.useSafariReaderMode}
                onValueChange={() => this.booleanChanged('useSafariReaderMode', this.props.settings.useSafariReaderMode)} />
            </Cell>
          </Section>
          <Section label='Navigator (requires relaunch)'>
            <Cell 
              style={styles.cell} 
              accessoryType={TableView.Consts.AccessoryType.DisclosureIndicator}
              onPress={() => this.navigateToAppColors()}>
              <CustomText style={{fontSize: 17}}>Navigator themes</CustomText>
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
