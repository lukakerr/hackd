import React from 'react';
import { Provider, connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from "./app/config/store";
import { Tabs } from './app/config/router';

const Hackd = ({ dispatch, nav }) => {
  return (
    <Tabs
      navigation={addNavigationHelpers({
        dispatch,
        state: nav,
      })}
    />
  );
};

const mapStateToProps = state => ({
  nav: state.nav,
});

const HackdWithNavigation = connect(mapStateToProps)(Hackd);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HackdWithNavigation />
        </PersistGate>
      </Provider>
    );
  }
}
