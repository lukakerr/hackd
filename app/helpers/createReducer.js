// https://github.com/reactjs/redux/blob/master/docs/recipes/ReducingBoilerplate.md
export default createReducer = (initialState, handlers) => {
  return reducer = (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};