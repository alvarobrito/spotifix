import { createReducer } from '../../utils/reducers.utils';
import { SET_LOADING, SET_ARTIST } from './types';

const INIT_STATE = {
  data: {
    images: [
      {
        width: 'auto',
        height: 'auto',
        url: '',
      },
    ],
  },
  loading: false,
};

const artistHandler = {

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
