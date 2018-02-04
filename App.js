import React from 'react';
import { Provider, connect } from "react-redux";
import { 
  createStore, 
  applyMiddleware, 
  compose,
} from "redux";
import { addNavigationHelpers } from "react-navigation";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

import { Tabs } from './app/config/router';
import reducer from "./app/reducers";

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__
});

const configureStore = (initialState) => {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
};

const store = configureStore({});

const Hackd = ({ dispatch, nav }) => {
  return (
    <Tabs
      navigation={addNavigationHelpers({
        dispatch,
        state: nav
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
        <HackdWithNavigation />
      </Provider>
    );
  }
}
