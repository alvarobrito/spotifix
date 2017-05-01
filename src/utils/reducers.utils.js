export function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return (handlers[action.type] || handlers.default)(state, action.payload);
    }

    return state;
  };
}
