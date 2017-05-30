import { normalize } from 'normalizr';
import spotifyApi from '@/utils/spotify.api';
import { createReducer } from '@/utils/reducers.utils';
import schema from '@/modules/schema';
import merge from 'lodash/fp/merge';

// Actions
const ADD = 'section/artist/ADD';
const SELECT = 'section/artist/SELECT';
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
      artists: merge(state.artists, payload),
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
export const addArtist = ({ entities, result }, artistId) => ({
  type: ADD,
  entities,
  payload: {
    [artistId]: result,
  },
});

export const selectArtist = artistId => ({
  type: SELECT,
  payload: artistId,
});

export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

// side effects
async function fetchArtist(artistId) {
  const [id, { items: albums }, { tracks: topTracks }, { artists: relatedArtists }]
  = await Promise.all([
    spotifyApi.getArtist(artistId),
    spotifyApi.getArtistAlbums(artistId),
    spotifyApi.getArtistTopTracks(artistId, 'ES'),
    spotifyApi.getArtistRelatedArtists(artistId),
  ]);

  return {
    id,
    albums,
    topTracks,
    relatedArtists,
  };
}

// TODO https://github.com/rwieruch/favesound-redux/blob/e7077a66dc3b7b8ada7bced560c2ae64535759c0/src/actions/comments/index.js#L46
export const getArtist = artistId => async (dispatch, getState) => {
  const artistSection = getState().sections.artist.artists[artistId];

  if (artistSection) {
    dispatch(selectArtist(artistId));
  } else {
    dispatch(setLoading(true));
    const normalized = normalize(await fetchArtist(artistId), schema.section.artist);
    dispatch(addArtist(normalized, artistId));
    dispatch(selectArtist(artistId));
    dispatch(setLoading(false));
  }
};
