import { createSelector } from 'reselect';
import spotifyApi from '@/utils/spotify.api';
import { createReducer } from '@/utils/reducers.utils';
import { setAlbums } from '@/modules/albums/actions';

// Actions
const SET_LOADING = 'ui/artist/SET_LOADING';
const SET_ARTIST = 'ui/artist/SET_ARTIST';

// Initial State
const INIT_STATE = {
  images: [{
    width: 'auto',
    height: 'auto',
    url: '',
  }],
  albums: [],
  topTracks: [],
  related: [],
  loading: false,
};

// Reducer
export default createReducer(INIT_STATE, {
  [SET_ARTIST](state, payload) {
    return {
      ...state,
      ...payload,
    };
  },
  [SET_LOADING](state, payload) {
    return {
      ...state,
      loading: payload,
    };
  },
  default(state) {
    return state;
  },
});

// Action Creators
export const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

export const setArtist = artist => ({
  type: SET_ARTIST,
  payload: artist,
});

// side effects
async function fetchArtist(artistId) {
  return Promise.all([
    spotifyApi.getArtist(artistId),
    spotifyApi.getArtistAlbums(artistId),
    spotifyApi.getArtistTopTracks(artistId, 'ES'),
    spotifyApi.getArtistRelatedArtists(artistId),
  ]);
}

export const getArtist = artistId => async (dispatch) => {
  dispatch(setLoading(true));
  const [artist, albums, popular, related] = await fetchArtist(artistId);
  dispatch(setArtist({
    ...artist,
    albums: albums.items.map(a => a.id),
    topTracks: popular.tracks.map(t => t.id),
    related: related.artists.map(r => r.id),
  }));
  dispatch(setAlbums(albums.items));
  // dispatch(setTracks(popular.tracks));
  // dispatch(setArtists(related.artists));
  dispatch(setLoading(false));
};

// Selectors
const getArtistAlbums = state =>
  state.artist.albums;

const getAlbums = state =>
  state.albums.byId;

export const selectArtistAlbums = createSelector(
  [getArtistAlbums, getAlbums],
  (albumIds, albums) => albumIds.map(a => albums[a]),
);
