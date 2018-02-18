import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';
import {
  Text,
  View,
  StyleSheet,
  Switch,
  ActionSheetIOS,
} from 'react-native';
import TableView from 'react-native-tableview';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import CustomText from '../components/CustomText';

import { getUser } from '../helpers/api';
import { capitalize } from '../helpers/utils';

const { Section, Cell } = TableView;

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

  multiChange = (key, options, title) => {
    ActionSheetIOS.showActionSheetWithOptions({
      title,
      options,
      tintColor: this.props.settings.appColor,
      cancelButtonIndex: 0,
    }, (buttonIndex) => {
      const selectedAction = options[buttonIndex].toLowerCase();

      if (buttonIndex !== 0) {
        this.props.changeSetting(
          key,
          selectedAction,
        );
      }
    });
  };

  render() {
    return (
      <View style={commonStyles.flex}>
        <TableView 
          style={commonStyles.flex}
          tableViewStyle={TableView.Consts.Style.Grouped} 
          tableViewCellStyle={TableView.Consts.CellStyle.Value1}>
          <Section label='Comments'>
            <Cell style={commonStyles.cell}>
              <CustomText style={commonStyles.cellText}>Tap to collapse</CustomText>
              <Switch
                style={commonStyles.cellSwitch}
                value={this.props.settings.tapToCollapse}
                onValueChange={() => this.booleanChanged('tapToCollapse', this.props.settings.tapToCollapse)} />
            </Cell>
            <Cell 
              style={commonStyles.cell} 
              accessoryType={TableView.Consts.AccessoryType.DisclosureIndicator}
              onPress={() => this.navigateToCommentThemes()}>
              <CustomText style={commonStyles.cellText}>Comment themes</CustomText>
            </Cell>
          </Section>
          <Section label='Posts'>
            <Cell style={commonStyles.cell}>
              <CustomText style={commonStyles.cellText}>Use Safari Reader Mode</CustomText>
              <Switch
                style={commonStyles.cellSwitch}
                value={this.props.settings.useSafariReaderMode}
                onValueChange={() => this.booleanChanged('useSafariReaderMode', this.props.settings.useSafariReaderMode)} />
            </Cell>
          </Section>
          <Section label='Navigator (requires relaunch)'>
            <Cell 
              style={commonStyles.cell} 
              accessoryType={TableView.Consts.AccessoryType.DisclosureIndicator}
              onPress={() => this.navigateToAppColors()}>
              <CustomText style={commonStyles.cellText}>Navigator themes</CustomText>
            </Cell>
          </Section>
        </TableView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
