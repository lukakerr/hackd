import { 
  createStore, 
  applyMiddleware, 
  compose,
} from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import reducer from "../reducers";

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: [
    'user',
    'accounts',
  ],
}

const persistedReducer = persistReducer(persistConfig, reducer);

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
  return createStore(persistedReducer, initialState, enhancer);
};

const store = configureStore({});
const persistor = persistStore(store);

export {
  store,
  persistor,
};
