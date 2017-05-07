import spotifyApi from '@/utils/spotify.api';
import { SET_LOADING, SET_ARTIST } from './types';

// TODO Normalize data

async function composeArtist(artistId) {
  return Promise.all([
    spotifyApi.getArtist(artistId),
    spotifyApi.getArtistAlbums(artistId),
    spotifyApi.getArtistTopTracks(artistId, 'ES'),
    spotifyApi.getArtistRelatedArtists(artistId),
  ]);
}

// Creators
const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

const getArtist = artistId => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const [data, albums, popular, related] = await composeArtist(artistId);
    dispatch({
      type: SET_ARTIST,
      payload: {
        ...data,
        albums: albums.items,
        topTracks: popular.tracks,
        related: related.artists,
      },
    });
    dispatch(setLoading(false));
  } catch (error) {
    console.error(error);
  }
};

export { setLoading, getArtist };
