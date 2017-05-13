import spotifyApi from '@/utils/spotify.api';
import { ADD_ARTISTS, SET_ARTISTS, SET_LOADING } from './types';

// async function composeArtist(artistId) {
//   return Promise.all([
//     spotifyApi.getArtist(artistId),
//     spotifyApi.getArtistAlbums(artistId),
//     spotifyApi.getArtistTopTracks(artistId, 'ES'),
//     spotifyApi.getArtistRelatedArtists(artistId),
//   ]);
// }S

function normalize(data) {
  const items = Array.isArray(data) ? data : [].concat(data);
  return items.reduce((acc, val) => ({
    ...acc,
    [val.id]: {
      ...val,
    },
  }), {});
}

// Creators
const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

const addArtists = artists => ({
  type: ADD_ARTISTS,
  payload: normalize(artists),
});

const setArtists = artists => ({
  type: SET_ARTISTS,
  payload: normalize(artists),
});

const fetchArtist = artistId => (dispatch) => {
  dispatch(setLoading(true));
  spotifyApi.getArtist(artistId).then(data =>
    dispatch(setArtists(data)),
    dispatch(setLoading(false)),
  );
};

const fetchArtistRelatedArtists = artistId => (dispatch) => {
  dispatch(setLoading(true));
  spotifyApi.getArtistRelatedArtists(artistId).then(data =>
    dispatch(setArtists(data.artists)),
    dispatch(setLoading(false)),
  );
};

export { setLoading, addArtists, setArtists, fetchArtist, fetchArtistRelatedArtists };
