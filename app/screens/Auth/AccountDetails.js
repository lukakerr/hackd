import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TableView from 'react-native-tableview';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import commonStyles from '../../styles/common';
import { ActionCreators } from '../../actions';
import { getUser } from '../../helpers/api';
import CustomText from '../../components/CustomText';

const { Section, Cell } = TableView;

TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

class AccountDetails extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string
    }).isRequired,
    logOut: PropTypes.func.isRequired,
    accounts: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
  };

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
    const { username } = this.props.user;

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
    const { accounts, user: { username } } = this.props;

    const saved = accounts[username] ? accounts[username].saved : [];

    this.props.navigator.push({
      screen: 'hackd.Saved',
      title: 'Saved',
      passProps: {
        saved,
      },
    });
  };

  render() {
    const { userExists, karma, created, username } = this.state;

    const createdDate = timeAgo.format(new Date(created * 1000), {
      flavour: 'tiny',
    });

    return (
      <View style={commonStyles.flex}>
        {userExists && (
          <View style={styles.gridContainer}>
            <View style={commonStyles.flex}>
              <CustomText style={[styles.gridContent, styles.gridContentHeader]}>{karma}</CustomText>
              <CustomText style={[styles.gridContent, styles.gridContentSubtitle]}>KARMA</CustomText>
            </View>
            <View style={commonStyles.flex}>
              <CustomText style={[styles.gridContent, styles.gridContentHeader]}>
                {createdDate}
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
                <CustomText style={commonStyles.cellValue}>{username}</CustomText>
              </Cell>
              <Cell
                style={commonStyles.cell}
                accessoryType={TableView.Consts.AccessoryType.DisclosureIndicator}
                onPress={this.navigateToSaved}
              >
                <CustomText style={commonStyles.cellText}>Saved</CustomText>
              </Cell>
            </Section>
            <Section>
              <Cell style={commonStyles.cell} onPress={this.props.logOut}>
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
