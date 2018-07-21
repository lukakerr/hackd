// https://github.com/reactjs/redux/blob/master/docs/recipes/ReducingBoilerplate.md
export default (createReducer = (initialState, handlers) =>
  (reducer = (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  }));
