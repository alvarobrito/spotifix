import { normalize } from 'normalizr';
import spotifyApi from '@/utils/spotify.api';
import { createReducer } from '@/utils/reducers.utils';
import { mergeEntities } from '@/modules/entities';
import schema from '@/modules/schema';
import merge from 'lodash/fp/merge';

// Actions
const ADD = 'section/album/ADD';
const SET = 'section/album/SET';
const LOADING = 'section/album/LOADING';

// Initial State
const INIT_STATE = {
  selected: '',
  albums: {},
  loading: false,
};

// Reducer
export default createReducer(INIT_STATE, {

  [ADD](state, payload) {
    return {
      ...state,
      selected: payload.id,
      albums: merge(state.albums, { [payload.id]: payload }),
    };
  },

  [SET](state, payload) {
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
export const addAlbum = album => ({
  type: ADD,
  payload: album,
});

export const setAlbum = albumId => ({
  type: SET,
  payload: albumId,
});

export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

// side effects
export const fetchAlbum = albumId => (dispatch, getState) => {
  const album = getState().sections.album.albums[albumId];

  if (album) {
    dispatch(setAlbum(albumId));
  } else {
    dispatch(setLoading(true));
    spotifyApi.getAlbum(albumId, (error, { id, name, label, images, artists, tracks: { items: tracks } }) => {
      const normalized = normalize({ id: { id, name, label, images }, artists, tracks }, schema.section.album);
      dispatch(mergeEntities(normalized.entities));
      dispatch(addAlbum(normalized.result));
      dispatch(setLoading(false));
    });
  }
};
