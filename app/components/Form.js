import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import commonStyles from '../styles/common';
import config from '../config/default';

import CustomText from './CustomText';

export default class Form extends React.PureComponent {
  constructor(props) {
    super(props);

    this.textChanged = this.textChanged.bind(this);
    this.submit = this.submit.bind(this);
    this.back = this.back.bind(this);
  }

  textChanged = (input, text) => {
    input.action(text);
  };

  submit = () => {
    this.props.submit();
  };

  back = () => {
    this.props.back();
  };

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        scrollEnabled={this.props.scroll ? this.props.scroll : false}
        style={commonStyles.backgroundWhite}
      >
        <View>
          <View style={styles.inputContainer}>
            {Object.keys(this.props.inputs).map(key => {
              const input = this.props.inputs[key];

              return (
                <TextInput
                  style={styles.input}
                  key={input.placeholder}
                  multiline={input.multiline ? input.multiline : false}
                  secureTextEntry={
                    input.secureTextEntry ? input.secureTextEntry : false
                  }
                  placeholder={input.placeholder}
                  autoCapitalize="none"
                  placeholderTextColor={config.colors.placeholder}
                  onChangeText={text => this.textChanged(input, text)}
                />
              );
            })}
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: this.props.color }]}
            activeOpacity={0.8}
            onPress={this.submit}
          >
            <CustomText style={styles.submitButtonText}>
              {this.props.submitText ? this.props.submitText : 'Submit'}
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={this.back}
          >
            <CustomText
              style={[styles.backButtonText, { color: this.props.color }]}
            >
              Back to {this.props.backText}
            </CustomText>
          </TouchableOpacity>
        </View>

        <View>
          <CustomText style={[styles.error, commonStyles.textCenter]}>
            {this.props.error}
          </CustomText>
        </View>

        <View>
          <ActivityIndicator animating={this.props.loading} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 20,
  },
  input: {
    fontSize: 16,
    margin: 15,
    marginLeft: 22,
    marginRight: 22,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: config.colors.underline,
    borderBottomWidth: 1,
  },
  submitButton: {
    padding: 12,
    margin: 20,
    marginTop: 50,
    marginBottom: 22,
    height: 44,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  backButton: {
    height: 40,
  },
  backButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    margin: 10,
  },
});
