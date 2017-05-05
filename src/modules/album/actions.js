import spotifyApi from '@/utils/spotify.api';
import { SET_ALBUM, SET_LOADING } from './types';

function composeAlbum(data) {
  const { tracks: { items }, name: albumName } = data;
  const tracks = items.map(({ id, name: trackName, artists }) => ({
    id,
    trackName,
    artists,
    albumName,
  }));

  return {
    ...data,
    tracks,
  };
}

// Creators
const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

const getAlbum = albumId => dispatch => (
  spotifyApi.getAlbum(albumId, (error, data) =>
    dispatch({
      type: SET_ALBUM,
      payload: composeAlbum(data),
    }),
  ));

export { setLoading, getAlbum };
