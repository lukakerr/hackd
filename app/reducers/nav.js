import { NavigationActions } from "react-navigation";
import { Tabs } from "../config/router";

const initialState = Tabs.router.getStateForAction(NavigationActions.init());

export const nav = (state = initialState, action) => {
  const nextState = Tabs.router.getStateForAction(action, state);
  return nextState || state;
};