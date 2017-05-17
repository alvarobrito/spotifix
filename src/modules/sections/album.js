import { normalize } from 'normalizr';
import schema from '@/modules/entities/schema';
import spotifyApi from '@/utils/spotify.api';
import { createReducer } from '@/utils/reducers.utils';
import { addAlbums } from '@/modules/entities/albums';

// Actions
const LOADING = 'section/album/LOADING';
const SET = 'section/album/SET';

// Initial State
const INIT_STATE = {
  selectedAlbum: '',
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

export const setAlbum = artist => ({
  type: SET,
  payload: artist,
});

// side effects
export const fetchAlbum = albumId => (dispatch) => {
  dispatch(setLoading(true));
  spotifyApi.getAlbum(albumId, (error, { id, name, label, images, tracks: { items: tracks } }) => {
    dispatch(setAlbum({
      selectedAlbum: albumId,
      tracks: tracks.map(t => t.id),
    }));
    dispatch(addAlbums(normalize([{ id, name, label, images }], [schema.albums])));
    dispatch(setLoading(false));
  });
};
