import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";

import UserDetails from "../components/Auth/UserDetails";
import Login from "../components/Auth/Login";

class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user.loggedIn) {
      return (
        <UserDetails
          user={this.props.user}
          navigation={this.props.navigation}
        />
      );
    }
    return (
      <Login

      />
    );
  }
}

mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect((state) => { 
  return {
    user: state.user,
  }
}, mapDispatchToProps)(Account);
