import spotifyApi from '@/utils/spotify.api';
import { SET_LOADING, SET_ARTIST } from './types';

// TODO Normalize data

async function composeArtist(artistId) {
  return Promise.all([
    spotifyApi.getArtist(artistId),
    spotifyApi.getArtistAlbums(artistId),
    spotifyApi.getArtistTopTracks(artistId, 'ES'),
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
    const [data, albums, popular] = await composeArtist(artistId);
    dispatch({
      type: SET_ARTIST,
      payload: {
        ...data,
        albums: albums.items,
        topTracks: popular.tracks,
      },
    });
    dispatch(setLoading(false));
  } catch (error) {
    console.error(error);
  }
};

export { setLoading, getArtist };
