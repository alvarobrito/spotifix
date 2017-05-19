import spotifyApi from '@/utils/spotify.api';
import { createReducer, union, inmutableMerge } from '@/utils/reducers.utils';

// Actions
const ADD = 'entities/albums/ADD';
const SET = 'entities/albums/SET';
const LOADING = 'entities/albums/LOADING';

// Initial State
const INIT_STATE = {
  byId: {},
  allIds: [],
  loading: false,
};

// Reducer
export default createReducer(INIT_STATE, {

  [ADD](state, payload) {
    return {
      ...state,
      byId: inmutableMerge(state.byId, payload.entities.albums),
      allIds: union(state.allIds, payload.result),
    };
  },

  [SET](state, payload) {
    return {
      ...state,
      byId: payload.entities.albums,
      allIds: payload.result,
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
export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

export const addAlbums = albums => ({
  type: ADD,
  payload: albums,
});

export const setAlbums = albums => ({
  type: SET,
  payload: albums,
});

// side effects
export const fetchAlbums = albumIds => (dispatch) => {
  dispatch(setLoading(true));
  spotifyApi.getAlbums(albumIds, (error, { albums }) => {
    dispatch(setAlbums(albums));
    dispatch(setLoading(false));
  });
};
