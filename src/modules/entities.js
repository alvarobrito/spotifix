import merge from 'lodash/fp/merge';
import { createReducer } from '@/utils/reducers.utils';

// Actions
const MERGE = '@entities/MERGE';
const SYNC = '@entities/SYNC';

// Initial State
const INIT_STATE = {
  artists: {},
  albums: {},
  tracks: {},
};

// Reducer
export default createReducer(INIT_STATE, {

  [MERGE](state, payload) {
    return merge(state, payload);
  },

  [SYNC](state, payload) {
    return {
      // TODO
    };
  },

});

// TODO Magic solution
/*
export default function entities(state = INIT_STATE, action) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }
  return state;
}
*/

// Action Creators
export const mergeEntities = entities => ({
  type: MERGE,
  payload: entities,
});

export const syncEntities = (entity, key) => ({
  type: SYNC,
  payload: { entity, key },
});
