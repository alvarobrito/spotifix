import merge from 'lodash/fp/merge';

// Initial State
const INIT_STATE = {
  artists: {},
  albums: {},
  tracks: {},
};

// Reducer
export default function entities(state = INIT_STATE, action) {
  if (action.entities) {
    return merge(state, action.entities);
  }
  return state;
}
