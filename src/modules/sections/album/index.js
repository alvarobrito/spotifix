import { normalize } from 'normalizr';
import spotifyApi from '@/utils/spotify.api';
import { createReducer } from '@/utils/reducers.utils';
import merge from 'lodash/fp/merge';
import { albumSchema } from '@/modules/entities';

// Actions
const ADD = 'section/album/ADD';
const SELECT = 'section/album/SELECT';
const LOADING = 'section/album/LOADING';

// Initial State
const INIT_STATE = {
  selected: '',
  albums: {},
  loading: false,
};

// Schema
export const sectionSchema = {
  id: albumSchema,
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

// side effects
export const fetchAlbum = albumId => (dispatch, getState) => {
  const albumSection = getState().sections.album.albums[albumId];

  if (albumSection) {
    dispatch(selectAlbum(albumId));
  } else {
    dispatch(setLoading(true));
    spotifyApi.getAlbum(albumId, (error, album) => {
      const normalized = normalize({ id: album }, sectionSchema);
      dispatch(addAlbum(normalized, albumId));
      dispatch(selectAlbum(albumId));
      dispatch(setLoading(false));
    });
  }
};
