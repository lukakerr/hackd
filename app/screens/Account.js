import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import AccountDetails from './Auth/AccountDetails';
import Login from './Auth/Login';

class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user.loggedIn) {
      return (
        <AccountDetails
          user={this.props.user}
          navigation={this.props.navigation}
        />
      );
    }
    return (
      <Login />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
