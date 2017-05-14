import { createReducer, inmutableMerge } from '../../utils/reducers.utils';
import { ADD_ARTISTS, ADD_ALBUMS, SET_ARTISTS, SET_LOADING } from './types';

const INIT_STATE = {
  byId: {},
  allIds: [],
  loading: false,
};

const artistHandler = {

  [ADD_ARTISTS](state, payload) {
    return {
      ...state,
      byId: inmutableMerge(state.byId, payload),
      allIds: [
        ...state.allIds,
        ...Object.keys(payload),
      ],
    };
  },

  [ADD_ALBUMS](state, payload) {
    return {
      ...state,
      byId: {
        ...state.byId,
        ...payload,
      },
    };
  },

  [SET_ARTISTS](state, payload) {
    return {
      ...state,
      byId: payload,
      allIds: Object.keys(payload),
    };
  },

  [SET_LOADING](state, payload) {
    return {
      ...state,
      loading: payload,
    };
  },

};

export default createReducer(INIT_STATE, artistHandler);
