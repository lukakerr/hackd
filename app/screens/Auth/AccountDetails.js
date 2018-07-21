import React from 'react';
import commonStyles from '../../styles/common';
import { Text, View, StyleSheet } from 'react-native';
import TableView from 'react-native-tableview';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { getUser } from '../../helpers/api';
import CustomText from '../../components/CustomText';

const { Section, Cell } = TableView;

TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

class AccountDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      created: null,
      karma: null,
      about: null,
      submitted: null,
      userExists: false,
    };
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = () => {
    const username = this.props.user.username;
    getUser(username).then(userDetails => {
      if (userDetails === null) {
        return;
      }

      const { created, karma, about, submitted } = userDetails;

      this.setState({
        created,
        karma,
        about,
        submitted,
        userExists: true,
      });
    });
  };

  navigateToSaved = () => {
    const saved = this.props.accounts[this.props.user.username]
      ? this.props.accounts[this.props.user.username].saved
      : [];

    this.props.navigator.push({
      screen: 'hackd.Saved',
      title: 'Saved',
      passProps: {
        saved,
      },
    });
  };

  render() {
    return (
      <View style={commonStyles.flex}>
        {this.state.userExists && (
          <View style={styles.gridContainer}>
            <View style={commonStyles.flex}>
              <CustomText style={[styles.gridContent, styles.gridContentHeader]}>{this.state.karma}</CustomText>
              <CustomText style={[styles.gridContent, styles.gridContentSubtitle]}>KARMA</CustomText>
            </View>
            <View style={commonStyles.flex}>
              <CustomText style={[styles.gridContent, styles.gridContentHeader]}>
                {timeAgo.format(new Date(this.state.created * 1000), {
                  flavour: 'tiny',
                })}
              </CustomText>
              <CustomText style={[styles.gridContent, styles.gridContentSubtitle]}>AGE</CustomText>
            </View>
          </View>
        )}

        <View style={commonStyles.flex}>
          <TableView
            style={commonStyles.flex}
            tableViewStyle={TableView.Consts.Style.Grouped}
            tableViewCellStyle={TableView.Consts.CellStyle.Value1}
          >
            <Section label="Account Details">
              <Cell style={commonStyles.cell}>
                <CustomText style={commonStyles.cellText}>Username</CustomText>
                <CustomText style={commonStyles.cellValue}>{this.state.username}</CustomText>
              </Cell>
              <Cell
                style={commonStyles.cell}
                accessoryType={TableView.Consts.AccessoryType.DisclosureIndicator}
                onPress={() => this.navigateToSaved()}
              >
                <CustomText style={commonStyles.cellText}>Saved</CustomText>
              </Cell>
            </Section>
            <Section>
              <Cell style={commonStyles.cell} onPress={() => this.props.logOut()}>
                <CustomText style={[commonStyles.cellText, styles.logout]}>Logout</CustomText>
              </Cell>
            </Section>
          </TableView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 5,
  },
  gridContent: {
    textAlign: 'center',
    margin: 2,
  },
  gridContentHeader: {
    fontSize: 16,
    fontWeight: '500',
  },
  gridContentSubtitle: {
    opacity: 0.8,
    fontSize: 12,
  },
  tableFlex: {
    flex: 0,
  },
  logout: {
    color: 'red',
  },
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  user: state.user,
  accounts: state.accounts,
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
