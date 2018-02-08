import React from 'react';
import commonStyles from '../../styles/common';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import TableView from 'react-native-tableview';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../actions";

import { getUser } from "../../helpers/api";
import CustomText from "../CustomText";

const { Section, Item } = TableView;

TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      created: null,
      karma: null,
      about: null,
      submitted: null,
      userExists: false
    };
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = () => {
    const username = this.state.username;
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
  }

  render() {
    if (this.state.userExists) {
      return (
        <View style={commonStyles.flex}>

          <View style={styles.gridContainer}>
            <View style={commonStyles.flex}>
              <CustomText style={[styles.gridContent, styles.gridContentHeader]}>
                {this.state.karma}
              </CustomText>
              <CustomText style={[styles.gridContent, styles.gridContentSubtitle]}>
                KARMA
              </CustomText>
            </View>
            <View style={commonStyles.flex}>
              <CustomText style={[styles.gridContent, styles.gridContentHeader]}>
                {timeAgo.format(new Date(this.state.created * 1000), { flavour: 'tiny' })}
              </CustomText>
              <CustomText style={[styles.gridContent, styles.gridContentSubtitle]}>
                AGE
              </CustomText>
            </View>
          </View>

          <TableView 
            textColor="black"
            style={[styles.tableFlex, { height: 215 }]}
            tableViewStyle={TableView.Consts.Style.Grouped} 
            tableViewCellStyle={TableView.Consts.CellStyle.Value1}>
            <Section label="Account Details">
              <Item detail={this.state.username}>
                Username
              </Item>
              <Item accessoryType={TableView.Consts.AccessoryType.DisclosureIndicator}>
                Submitted
              </Item>
              <Item 
                accessoryType={TableView.Consts.AccessoryType.DisclosureIndicator} 
                onPress={() => this.props.navigation.navigate('Saved',
                  this.props.accounts[this.props.user.username] 
                  ? this.props.accounts[this.props.user.username].saved
                  : []
                )}>
                Saved
              </Item>
            </Section>
          </TableView>
          <TableView 
            textColor="red"
            style={[styles.tableFlex, { height: 215 }]}
            tableViewStyle={TableView.Consts.Style.Grouped}>
            <Section>
              <Item onPress={() => this.props.logOut()}>Logout</Item>
            </Section>
          </TableView>
        </View>
      );
    }

    return (
      <View style={commonStyles.flex}>
        <TableView 
          style={[styles.tableFlex, { height: 175 }]}
          tableViewStyle={TableView.Consts.Style.Grouped} 
          tableViewCellStyle={TableView.Consts.CellStyle.Value1}>
          <Section label="Account Details">
            <Item detail={this.state.username}>
              Username
            </Item>
            <Item 
              accessoryType={TableView.Consts.AccessoryType.DisclosureIndicator}
              onPress={() => this.props.navigation.navigate('Saved',
                this.props.accounts[this.props.user.username] 
                ? this.props.accounts[this.props.user.username].saved
                : []
              )}>
              Saved
            </Item>
          </Section>
        </TableView>

        <TableView 
          textColor="red"
          style={[styles.tableFlex, { height: 175 }]}
          tableViewStyle={TableView.Consts.Style.Grouped}
          tableViewCellStyle={TableView.Consts.CellStyle.Value1}>
          <Section>
            <Item onPress={() => this.props.logOut()}>Logout</Item>
          </Section>
        </TableView>
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
  }
});

mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect((state) => { 
  return {
    user: state.user,
    accounts: state.accounts,
  }
}, mapDispatchToProps)(UserDetails);
