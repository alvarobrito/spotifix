import { createSelector } from 'reselect';
import spotifyApi from '@/utils/spotify.api';
import { createReducer } from '@/utils/reducers.utils';
import { setAlbums } from '@/modules/albums/actions';
import { setArtists } from '@/modules/artists/actions';

// Actions
const LOADING = 'section/artist/LOADING';
const SET = 'section/artist/SET';

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
  const [artist, albums, popular, related] = await Promise.all([
    spotifyApi.getArtist(artistId),
    spotifyApi.getArtistAlbums(artistId),
    spotifyApi.getArtistTopTracks(artistId, 'ES'),
    spotifyApi.getArtistRelatedArtists(artistId),
  ]);

  return {
    artist,
    albums: albums.items,
    topTracks: popular.tracks,
    related: related.artists,
  };
}

export const getArtist = artistId => async (dispatch) => {
  dispatch(setLoading(true));
  const { artist, albums, topTracks, related } = await fetchArtist(artistId);
  dispatch(setArtist({
    ...artist,
    albums: albums.map(a => a.id),
    topTracks: topTracks.map(t => t.id),
    related: related.map(r => r.id),
  }));
  dispatch(setAlbums(albums));
  dispatch(setArtists(related));
  // dispatch(setTracks(topTracks));
  dispatch(setLoading(false));
};
