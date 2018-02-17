import React from 'react';
import {
  View,
  StyleSheet,
  SegmentedControlIOS,
} from 'react-native';

import commonStyles from '../styles/common';
import config from '../config/default';

import CustomText from '../components/CustomText';
import Form from '../components/Form';

export default class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      title: '',
      url: '',
      text: '',
      error: null,
      loading: false,
    };
  }

  static navigatorStyle = {
    navBarNoBorder: true,
  };

  handleTitle = (title) => {
    this.setState({ title, error: null, });
  };

  handleUrl = (url) => {
    this.setState({ url, error: null, });
  };

  handleText = (text) => {
    this.setState({ text, error: null, });
  };

  submitUrl = () => {
    const { title, url } = this.state;
    // TODO: finish this function
  };

  submitText = () => {
    const { text } = this.state;
    // TODO: finish this function
  };

  goToFeed = () => {
    this.props.navigator.switchToTab({
      tabIndex: 0,
    });
  };

  render() {
    return (
      <View style={[commonStyles.flex, commonStyles.backgroundWhite]}>

        <View style={styles.segmentedControlContainer}>
          <SegmentedControlIOS
            style={styles.segmentedControl}
            values={['Link', 'Text']}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
            }}
          />
        </View>

        {this.state.selectedIndex === 0 && 
          <Form
            inputs={[
              { placeholder: 'Title', action: this.handleTitle },
              { placeholder: 'URL', action: this.handleUrl },
            ]}
            submit={this.submitUrl}
            back={this.goToFeed}
            backText='posts'
            error={this.state.error}
            loading={this.state.loading}
          />
        }

        {this.state.selectedIndex === 1 && 
          <Form
            inputs={[
              { placeholder: 'Text', action: this.handleText, multiline: true },
            ]}
            submit={this.submitText}
            back={this.goToFeed}
            backText='posts'
            error={this.state.error}
            loading={this.state.loading}
            scroll={true}
          />
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  segmentedControlContainer: {
    width: '100%',
    paddingTop: 6,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: config.colors.underline,
  },
  segmentedControl: {
    width: '80%',
    alignSelf: 'center',
  },
});
