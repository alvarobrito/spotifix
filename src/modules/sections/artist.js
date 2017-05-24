import { normalize } from 'normalizr';
import spotifyApi from '@/utils/spotify.api';
import { createReducer } from '@/utils/reducers.utils';
import { mergeEntities } from '@/modules/entities';
import schema from '@/modules/schema';
import merge from 'lodash/fp/merge';

// Actions
const ADD = 'section/artist/ADD';
const SET = 'section/artist/SET';
const LOADING = 'section/artist/LOADING';

// Initial State
const INIT_STATE = {
  selected: '',
  artists: {},
  loading: false,
};

// Reducer
export default createReducer(INIT_STATE, {

  [ADD](state, payload) {
    return {
      ...state,
      selected: payload.id,
      artists: merge(state.artists, { [payload.id]: payload }),
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
export const addArtist = artist => ({
  type: ADD,
  payload: artist,
});

export const setArtist = artistId => ({
  type: SET,
  payload: artistId,
});

export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

// side effects
async function fetchArtist(artistId) {
  const [{ id, name, images }, { items: albums }, { tracks: topTracks }, { artists: relatedArtists }]
  = await Promise.all([
    spotifyApi.getArtist(artistId),
    spotifyApi.getArtistAlbums(artistId),
    spotifyApi.getArtistTopTracks(artistId, 'ES'),
    spotifyApi.getArtistRelatedArtists(artistId),
  ]);

  return {
    id: { id, name, images },
    albums,
    topTracks,
    relatedArtists,
  };
}

// TODO https://github.com/rwieruch/favesound-redux/blob/e7077a66dc3b7b8ada7bced560c2ae64535759c0/src/actions/comments/index.js#L46
export const getArtist = artistId => async (dispatch, getState) => {
  const artist = getState().sections.artist.artists[artistId];

  if (artist) {
    dispatch(setArtist(artistId));
  } else {
    dispatch(setLoading(true));
    const normalized = normalize({ ...await fetchArtist(artistId) }, schema.section.artist);
    dispatch(mergeEntities(normalized.entities));
    dispatch(addArtist(normalized.result));
    dispatch(setLoading(false));
  }
};
