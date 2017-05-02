import { createReducer } from '../../utils/reducers.utils';
import { SET_ALBUMS, SET_ARTIST } from './types';

const INIT_STATE = {
  albums: [],
  loading: false,
};

const artistHandler = {

  [SET_ALBUMS](state, payload) {
    return {
      ...state,
      albums: payload,
    };
  },

  [SET_ARTIST](state, payload) {
    return {
      ...state,
      data: payload,
    };
  },

  default(state) {
    return state;
  },

};

export default createReducer(INIT_STATE, artistHandler);
