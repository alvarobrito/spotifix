import { normalize } from 'normalizr';
import spotifyApi from '@/utils/spotify.api';
import { createReducer } from '@/utils/reducers.utils';
import { mergeEntities } from '@/modules/entities';
import schema from '@/modules/schema';

// Actions
const LOADING = 'section/artist/LOADING';
const SET = 'section/artist/SET';

// Initial State
const INIT_STATE = {
  selected: '',
  albums: [],
  topTracks: [],
  relatedArtists: [],
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

export const setArtist = artist => ({
  type: SET,
  payload: artist,
});

// side effects
async function fetchArtist(artistId) {
  const [selected, { items: albums }, { tracks: topTracks }, { artists: relatedArtists }]
  = await Promise.all([
    spotifyApi.getArtist(artistId),
    spotifyApi.getArtistAlbums(artistId),
    spotifyApi.getArtistTopTracks(artistId, 'ES'),
    spotifyApi.getArtistRelatedArtists(artistId),
  ]);

  return {
    selected,
    albums,
    topTracks,
    relatedArtists,
  };
}

export const getArtist = artistId => async (dispatch) => {
  dispatch(setLoading(true));
  const data = await fetchArtist(artistId);
  const normalized = normalize({ ...data }, schema.section.artist);
  dispatch(mergeEntities(normalized.entities));
  dispatch(setArtist(normalized.result));
  dispatch(setLoading(false));
};
