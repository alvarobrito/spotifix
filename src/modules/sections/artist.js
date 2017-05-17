import { normalize } from 'normalizr';
import schema from '@/modules/entities/schema';
import spotifyApi from '@/utils/spotify.api';
import { createReducer } from '@/utils/reducers.utils';
import { addAlbums } from '@/modules/entities/albums';
import { addArtists } from '@/modules/entities/artists';

// Actions
const LOADING = 'section/artist/LOADING';
const SET = 'section/artist/SET';

// Initial State
const INIT_STATE = {
  selectedArtist: '',
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
  const [{ id, name, images }, { items: albums }, { tracks: topTracks }, { artists: relatedArtists }]
  = await Promise.all([
    spotifyApi.getArtist(artistId),
    spotifyApi.getArtistAlbums(artistId),
    spotifyApi.getArtistTopTracks(artistId, 'ES'),
    spotifyApi.getArtistRelatedArtists(artistId),
  ]);

  return {
    artist: { id, name, images },
    albums,
    topTracks,
    relatedArtists,
  };
}

export const getArtist = artistId => async (dispatch) => {
  dispatch(setLoading(true));
  const { artist, albums, topTracks, relatedArtists } = await fetchArtist(artistId);
  dispatch(addArtists(normalize([...relatedArtists, ...[artist]], [schema.artists])));
  dispatch(setArtist({
    selectedArtist: artistId,
    albums: albums.map(a => a.id),
    topTracks: topTracks.map(t => t.id),
    relatedArtists: relatedArtists.map(r => r.id),
  }));
  dispatch(addAlbums(normalize(albums, [schema.albums])));
  // dispatch(setTracks(topTracks));
  dispatch(setLoading(false));
};
