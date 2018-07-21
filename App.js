import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

import { store } from './app/config/store';
import { registerScreens, hackd } from './app/config/router';

registerScreens(store, Provider);

persistStore(store, null, () => {
  registerScreens(store, Provider);
  const { settings } = store.getState();

  Navigation.startTabBasedApp({
    tabs: hackd,
    appStyle: {
      navBarButtonColor: settings.appColor,
      screenBackgroundColor: '#F2F3F6',
    },
    tabsStyle: {
      tabBarSelectedButtonColor: settings.appColor,
      tabBarSelectedLabelColor: settings.appColor,
    },
  });
});
