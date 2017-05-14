import spotifyApi from '@/utils/spotify.api';
import { createReducer, inmutableMerge } from '@/utils/reducers.utils';

// Actions
const ADD = 'entities/artists/ADD';
const SET = 'entities/artists/SET';
const LOADING = 'entities/artists/LOADING';

// Normalizer
function normalize(data) {
  const items = Array.isArray(data) ? data : [].concat(data);
  return items.reduce((acc, val) => ({
    ...acc,
    [val.id]: {
      ...val,
    },
  }), {});
}

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
      byId: inmutableMerge(state.byId, payload),
      allIds: [
        ...state.allIds,
        ...Object.keys(payload),
      ],
    };
  },

  [SET](state, payload) {
    return {
      ...state,
      byId: payload,
      allIds: Object.keys(payload),
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
  payload: normalize(artists),
});

export const setArtists = artists => ({
  type: SET,
  payload: normalize(artists),
});

// side effects
export const fetchArtists = artistIds => (dispatch) => {
  dispatch(setLoading(true));
  spotifyApi.getArtists(artistIds).then(data =>
    dispatch(setArtists(data)),
    dispatch(setLoading(false)),
  );
};
