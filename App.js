import React from 'react';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './app/config/store';
import { Hackd } from './app/config/router';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Hackd />
        </PersistGate>
      </Provider>
    );
  }
}
