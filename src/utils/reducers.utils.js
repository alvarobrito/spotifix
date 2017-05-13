export function createReducer(initialState, handlers) {
  const defaultHandler = state => state;

  return (state = initialState, action) => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return (handlers[action.type] || handlers.default || defaultHandler)(state, action.payload);
    }

    return state;
  };
}

export function inmutableMerge(oldObject, newObject) {
  const merged = Object.keys(newObject).reduce((prev, id) => {
    const item = {};
    item[id] = oldObject[id] ? { ...oldObject[id], ...newObject[id] } : newObject[id];

    return { ...prev,
      [id]: {
        ...item[id],
      },
    };
  }, {});

  return { ...oldObject, ...merged };
}

export function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
