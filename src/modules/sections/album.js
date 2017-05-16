import spotifyApi from '@/utils/spotify.api';
import { createReducer } from '@/utils/reducers.utils';

// Actions
const LOADING = 'section/album/LOADING';
const SET = 'section/album/SET';

// Initial State
const INIT_STATE = {
  id: '',
  name: '',
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
      id,
      name,
      label,
      images,
      tracks: tracks.map(t => t.id),
    }));
    dispatch(setLoading(false));
  });
};
