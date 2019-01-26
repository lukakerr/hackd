import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import commonStyles from '../../styles/common';
import { ActionCreators } from '../../actions';
import Form from '../../components/Form';
import { login } from '../../helpers/api';
import CustomText from '../../components/CustomText';

class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    settings: PropTypes.shape({
      appColor: PropTypes.string
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      error: null,
    };
  }

  handleUsername = text => {
    this.setState({ username: text, error: null });
  };

  handlePassword = text => {
    this.setState({ password: text, error: null });
  };

  logIn = () => {
    this.setState({ loading: true, error: null });
    const { username, password } = this.state;

    login(username, password).then(loggedIn => {
      if (loggedIn) {
        const user = {
          username,
          password,
          loggedIn: true,
        };
        this.setState({ loading: false });
        this.props.login(user);
      } else {
        const user = {
          loggedIn: false,
        };
        this.setState({
          loading: false,
          error: 'Invalid username or password. Please try again.',
        });
        this.props.login(user);
      }
    });
  };

  goToFeed = () => {
    this.props.navigator.switchToTab({
      tabIndex: 0,
    });
  };

  render() {
    const loginInputs = [
      {
        placeholder: 'Username',
        action: this.handleUsername
      },
      {
        placeholder: 'Password',
        action: this.handlePassword,
        secureTextEntry: true,
      },
    ];

    const { settings } = this.props;
    const { error, loading } = this.state;

    return (
      <View style={styles.container}>
        <CustomText style={[styles.header, commonStyles.textCenter]}>Login to Hacker News</CustomText>

        <Form
          inputs={loginInputs}
          submit={this.logIn}
          submitText="Login"
          back={this.goToFeed}
          backText="feed"
          error={error}
          loading={loading}
          color={settings.appColor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#FFF',
    flex: 1,
  },
  header: {
    fontSize: 28,
    margin: 30,
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  user: state.user,
  settings: state.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
