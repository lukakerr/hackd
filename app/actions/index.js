import * as ItemActions from './items';
import * as AuthActions from './auth';
import * as SettingActions from './settings';

export const ActionCreators = Object.assign(
  {},
  ItemActions,
  AuthActions,
  SettingActions,
);
