import { normalize } from 'normalizr';
import spotifyApi from '@/utils/spotify.api';
import { createReducer } from '@/utils/reducers.utils';
import { mergeEntities } from '@/modules/entities';
import schema from '@/modules/schema';

// Actions
const LOADING = 'section/album/LOADING';
const SET = 'section/album/SET';

// Initial State
const INIT_STATE = {
  selected: '',
  images: [{
    width: 'auto',
    height: 'auto',
    url: '',
  }],
  tracks: [],
  loading: false,
};

// Reducer
export default createReducer(INIT_STATE, {

  [SET](state, payload) {
    return {
      ...state,
      ...payload,
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

export const setAlbum = album => ({
  type: SET,
  payload: album,
});

// side effects
export const fetchAlbum = albumId => (dispatch) => {
  dispatch(setLoading(true));
  spotifyApi.getAlbum(albumId, (error, { id, tracks: { items: tracks } }) => {
    const normalized = normalize({ selected: id, tracks }, schema.section.artist);
    dispatch(mergeEntities(normalized.entities));
    dispatch(setAlbum(normalized.result));
    dispatch(setLoading(false));
  });
};
