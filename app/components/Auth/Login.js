import React from 'react';
import commonStyles from '../../styles/common';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../actions";

import CustomText from "../CustomText";
import config from "../../config/default";
import { login } from "../../helpers/api";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      error: null,
    };
  }

  handleUsername = (text) => {
    this.setState({ username: text, error: null, });
  };

  handlePassword = (text) => {
    this.setState({ password: text, error: null, });
  };

  logIn = () => {
    this.setState({ loading: true, error: null, });
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
          error: 'Invalid username or password. Please try again.' 
        });
        this.props.login(user);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomText style={[styles.header, commonStyles.textCenter]}>Login to Hacker News</CustomText>
        <TextInput style={styles.input}
           underlineColorAndroid="transparent"
           placeholder="Username"
           autoCapitalize="none"
           placeholderTextColor="#000"
           onChangeText={this.handleUsername}/>
        
        <TextInput style={styles.input}
           underlineColorAndroid="transparent"
           placeholder="Password"
           autoCapitalize="none"
           placeholderTextColor="#000"
           secureTextEntry={true}
           onChangeText={this.handlePassword}/>
           
        <TouchableOpacity
           style={styles.submitButton}
           onPress={() => this.logIn()}>
           <CustomText style={styles.submitButtonText}>Login</CustomText>
        </TouchableOpacity>

        <View>
          <CustomText style={[styles.error, commonStyles.textCenter]}>{this.state.error}</CustomText>
        </View>

        <View>
          <ActivityIndicator animating={this.state.loading} />
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  header: {
    fontSize: 20,
    margin: 20,
  },
  input: {
    fontSize: 16,
    margin: 15,
    height: 40,
    padding: 10,
    borderColor: config.colors.orange,
    borderWidth: 1,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: config.colors.orange,
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  error: {
    color: 'red',
  },
});

mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect((state) => { 
  return {
    user: state.user,
  }
}, mapDispatchToProps)(Login);
