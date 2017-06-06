import { createReducer } from '@/utils/reducers.utils';
import merge from 'lodash/fp/merge';

// Actions
export const FETCH_ALBUM_FAILURE = '@effect/album/FETCH_ALBUM_FAILURE';
export const GET_ALBUM = '@effect/album/GET_ALBUM';
export const ADD_ALBUM = 'album/ADD_ALBUM';
export const SELECT_ALBUM = 'album/SELECT_ALBUM';
export const LOADING = 'album/LOADING';

// Initial State
const INIT_STATE = {
  selected: '',
  albums: {},
  loading: false,
};

// Reducer
export default createReducer(INIT_STATE, {

  [ADD_ALBUM](state, payload) {
    return {
      ...state,
      albums: merge(state.albums, payload),
    };
  },

  [SELECT_ALBUM](state, payload) {
    return {
      ...state,
      select_ALBUMed: payload,
    };
  },

  [LOADING](state, payload) {
    return {
      ...state,
      loading: payload,
    };
  },

});

// Action Creators
export const addAlbum = ({ entities, result }, albumId) => ({
  type: ADD_ALBUM,
  entities,
  payload: {
    [albumId]: result,
  },
});

export const selectAlbum = albumId => ({
  type: SELECT_ALBUM,
  payload: albumId,
});

export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

export const getAlbum = albumId => ({
  type: GET_ALBUM,
  payload: albumId,
});

export const throwError = error => ({
  type: FETCH_ALBUM_FAILURE,
  payload: error,
});
