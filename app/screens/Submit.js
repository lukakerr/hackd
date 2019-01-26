import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, SegmentedControlIOS } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import commonStyles from '../styles/common';
import config from '../config/default.json';

import Login from './Auth/Login';
import Form from '../components/Form';

class Submit extends React.Component {
  static navigatorStyle = {
    navBarNoBorder: true,
  };

  static propTypes = {
    user: PropTypes.shape({
      loggedIn: PropTypes.bool
    }).isRequired,
    navigator: PropTypes.object.isRequired,
    settings: PropTypes.shape({
      appColor: PropTypes.string
    }).isRequired,
  };

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

  handleTitle = title => {
    this.setState({ title, error: null });
  };

  handleUrl = url => {
    this.setState({ url, error: null });
  };

  handleText = text => {
    this.setState({ text, error: null });
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
    const {
      user,
      navigator,
      settings,
    } = this.props;

    const { selectedIndex, loading, error } = this.state;

    if (!user.loggedIn) {
      return <Login navigator={navigator} />;
    }

    return (
      <View style={[commonStyles.flex, commonStyles.backgroundWhite]}>
        <View style={styles.segmentedControlContainer}>
          <SegmentedControlIOS
            style={styles.segmentedControl}
            tintColor={settings.appColor}
            values={['Link', 'Text']}
            selectedIndex={selectedIndex}
            onChange={event => {
              this.setState({
                selectedIndex: event.nativeEvent.selectedSegmentIndex,
              });
            }}
          />
        </View>

        {selectedIndex === 0 && (
          <Form
            inputs={[
              { placeholder: 'Title', action: this.handleTitle },
              { placeholder: 'URL', action: this.handleUrl },
            ]}
            submit={this.submitUrl}
            back={this.goToFeed}
            backText="feed"
            error={error}
            loading={loading}
            color={settings.appColor}
          />
        )}

        {selectedIndex === 1 && (
          <Form
            inputs={[{ placeholder: 'Text', action: this.handleText, multiline: true }]}
            submit={this.submitText}
            back={this.goToFeed}
            backText="feed"
            error={error}
            loading={loading}
            scroll
            color={settings.appColor}
          />
        )}
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

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  user: state.user,
  settings: state.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
