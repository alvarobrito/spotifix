import { createReducer } from '../../utils/reducers.utils';
import { SET_ALBUMS } from './types';

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

  default(state) {
    return state;
  },

};

export default createReducer(INIT_STATE, artistHandler);
