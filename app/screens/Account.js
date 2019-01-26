import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ActionCreators } from '../actions';

import AccountDetails from './Auth/AccountDetails';
import Login from './Auth/Login';

const Account = props => props.user.loggedIn
  ? <AccountDetails user={props.user} navigator={props.navigator} />
  : <Login navigator={props.navigator} />;

Account.propTypes = {
  user: PropTypes.shape({
    loggedIn: PropTypes.bool
  }).isRequired,
  navigator: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
