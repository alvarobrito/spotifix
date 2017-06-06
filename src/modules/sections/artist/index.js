import { createReducer } from '@/utils/reducers.utils';
import merge from 'lodash/fp/merge';

// Actions
export const FETCH_ARTIST_FAILURE = '@effect/artist/FETCH_ARTIST_FAILURE';
export const GET_ARTIST = '@effect/artist/GET_ARTIST';
export const ADD_ARTIST = 'artist/ADD_ARTIST';
export const SELECT_ARTIST = 'artist/SELECT_ARTIST';
export const LOADING = 'artist/LOADING';

// Initial State
const INIT_STATE = {
  selected: '',
  artists: {},
  loading: false,
};

// Reducer
export default createReducer(INIT_STATE, {

  [ADD_ARTIST](state, payload) {
    return {
      ...state,
      artists: merge(state.artists, payload),
    };
  },

  [SELECT_ARTIST](state, payload) {
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

});

// Action Creators
export const addArtist = ({ entities, result }, artistId) => ({
  type: ADD_ARTIST,
  entities,
  payload: {
    [artistId]: result,
  },
});

export const selectArtist = artistId => ({
  type: SELECT_ARTIST,
  payload: artistId,
});

export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

export const getArtist = artistId => ({
  type: GET_ARTIST,
  payload: artistId,
});

export const throwError = error => ({
  type: FETCH_ARTIST_FAILURE,
  payload: error,
});
