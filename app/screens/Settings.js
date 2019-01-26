import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TableView from 'react-native-tableview';
import { View, Switch, ActionSheetIOS } from 'react-native';

import commonStyles from '../styles/common';
import { ActionCreators } from '../actions';

import CustomText from '../components/CustomText';

const { Section, Cell, Consts } = TableView;

const {
  AccessoryType: { DisclosureIndicator },
  Style: { Grouped },
  CellStyle: { Value1 }
} = Consts;

class Settings extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    settings: PropTypes.shape({
      appColor: PropTypes.string,
      tapToCollapse: PropTypes.bool,
      useSafariReaderMode: PropTypes.bool,
    }).isRequired,
    changeSetting: PropTypes.func.isRequired,
  };

  navigateTo = (screen, title) => {
    this.props.navigator.push({
      screen,
      title,
    });
  };

  keyValueChanged = (key, value) => {
    this.props.changeSetting(key, value);
  };

  booleanChanged = (key, boolean) => {
    this.props.changeSetting(key, !boolean);
  };

  multiChange = (key, options, title) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title,
        options,
        tintColor: this.props.settings.appColor,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        const selectedAction = options[buttonIndex].toLowerCase();

        if (buttonIndex !== 0) {
          this.props.changeSetting(key, selectedAction);
        }
      },
    );
  };

  render() {
    const { settings } = this.props;

    return (
      <View style={commonStyles.flex}>
        <TableView
          style={commonStyles.flex}
          tableViewStyle={Grouped}
          tableViewCellStyle={Value1}
        >
          <Section label="Comments">
            <Cell style={commonStyles.cell}>
              <CustomText style={commonStyles.cellText}>Tap to collapse</CustomText>
              <Switch
                style={commonStyles.cellSwitch}
                value={settings.tapToCollapse}
                onValueChange={() => this.booleanChanged('tapToCollapse', settings.tapToCollapse)}
              />
            </Cell>
            <Cell
              style={commonStyles.cell}
              accessoryType={DisclosureIndicator}
              onPress={() => this.navigateTo('hackd.CommentThemes', 'Comment Themes')}
            >
              <CustomText style={commonStyles.cellText}>Comment themes</CustomText>
            </Cell>
          </Section>
          <Section label="Posts">
            <Cell style={commonStyles.cell}>
              <CustomText style={commonStyles.cellText}>Use Safari Reader Mode</CustomText>
              <Switch
                style={commonStyles.cellSwitch}
                value={settings.useSafariReaderMode}
                onValueChange={() =>
                  this.booleanChanged('useSafariReaderMode', settings.useSafariReaderMode)
                }
              />
            </Cell>
          </Section>
          <Section label="Navigator (requires relaunch)">
            <Cell
              style={commonStyles.cell}
              accessoryType={DisclosureIndicator}
              onPress={() => this.navigateTo('hackd.AppColors', 'Navigator Themes')}
            >
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
