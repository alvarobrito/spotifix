import spotifyApi from '@/utils/spotify.api';
import { createReducer, union, inmutableMerge } from '@/utils/reducers.utils';

// Actions
const ADD = 'entities/artists/ADD';
const SET = 'entities/artists/SET';
const LOADING = 'entities/artists/LOADING';

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
      byId: inmutableMerge(state.byId, payload.entities.artists),
      allIds: union(state.allIds, payload.result),
    };
  },

  [SET](state, payload) {
    return {
      ...state,
      byId: payload.entities.artists,
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

export const addArtists = artists => ({
  type: ADD,
  payload: artists,
});

export const setArtists = artists => ({
  type: SET,
  payload: artists,
});

// side effects
export const fetchArtists = artistIds => (dispatch) => {
  dispatch(setLoading(true));
  spotifyApi.getArtists(artistIds).then(data =>
    dispatch(setArtists(data)),
    dispatch(setLoading(false)),
  );
};
