import { createReducer } from '@/utils/reducers.utils';
import merge from 'lodash/fp/merge';

// Actions
export const GET = 'section/album/GET';
export const ERROR = 'section/album/ERROR';
export const ADD = 'section/album/ADD';
export const SELECT = 'section/album/SELECT';
export const LOADING = 'section/album/LOADING';

// Initial State
const INIT_STATE = {
  selected: '',
  albums: {},
  loading: false,
  error: {},
};

// Reducer
export default createReducer(INIT_STATE, {

  [ADD](state, payload) {
    return {
      ...state,
      albums: merge(state.albums, payload),
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
export const addAlbum = ({ entities, result }, albumId) => ({
  type: ADD,
  entities,
  payload: {
    [albumId]: result,
  },
});

export const selectAlbum = albumId => ({
  type: SELECT,
  payload: albumId,
});

export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

export const getAlbum = albumId => ({
  type: GET,
  payload: albumId,
});

export const throwError = error => ({
  type: ERROR,
  payload: error,
});
