import { createReducer } from '../../utils/reducers.utils';
import { SET_LOADING, SET_ALBUMS, SET_ARTIST } from './types';

const INIT_STATE = {
  albums: [],
  data: {
    images: [
      {
        url: '',
        width: 'auto',
        height: 'auto',
      },
    ],
  },
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

  [SET_LOADING](state, payload) {
    return {
      ...state,
      loading: payload,
    };
  },

  default(state) {
    return state;
  },

};

export default createReducer(INIT_STATE, artistHandler);
