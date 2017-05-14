import { createReducer } from '../../utils/reducers.utils';
import { ADD_ALBUMS, SET_ALBUMS, SET_LOADING } from './types';

const INIT_STATE = {
  byId: {},
  allIds: [],
  loading: false,
};

const albumHandler = {

  [ADD_ALBUMS](state, payload) {
    return {
      ...state,
      byId: {
        ...state.byId,
        ...payload,
      },
      allIds: [
        ...state.allIds,
        ...Object.keys(payload),
      ],
    };
  },

  [SET_ALBUMS](state, payload) {
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

export default createReducer(INIT_STATE, albumHandler);
