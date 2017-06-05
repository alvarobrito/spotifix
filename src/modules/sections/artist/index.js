import { createReducer } from '@/utils/reducers.utils';
import merge from 'lodash/fp/merge';

// Actions
export const ADD = 'section/artist/ADD';
export const GET = 'section/artist/GET';
export const ERROR = 'section/artist/ERROR';
export const SELECT = 'section/artist/SELECT';
export const LOADING = 'section/artist/LOADING';

// Initial State
const INIT_STATE = {
  selected: '',
  artists: {},
  loading: false,
  error: {},
};

// Reducer
export default createReducer(INIT_STATE, {

  [ADD](state, payload) {
    return {
      ...state,
      artists: merge(state.artists, payload),
    };
  },

  [SELECT](state, payload) {
    return {
      ...state,
      selected: payload,
    };
  },

  [LOADING](state, payload) {
    return {
      ...state,
      loading: payload,
    };
  },

  [ERROR](state, payload) {
    return {
      ...state,
      error: payload,
    };
  },

});

// Action Creators
export const addArtist = ({ entities, result }, artistId) => ({
  type: ADD,
  entities,
  payload: {
    [artistId]: result,
  },
});

export const selectArtist = artistId => ({
  type: SELECT,
  payload: artistId,
});

export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

export const getArtist = artistId => ({
  type: GET,
  payload: artistId,
});

export const throwError = error => ({
  type: ERROR,
  payload: error,
});
