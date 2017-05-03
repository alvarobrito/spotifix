import spotifyApi from '@/utils/spotify.api';
import { SET_LOADING, SET_ALBUMS, SET_ARTIST } from './types';

// TODO Normalize data

const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

const getAlbums = artistId => (dispatch) => {
  spotifyApi.getArtistAlbums(artistId)
  .then(({ items }) => {
    dispatch({
      type: SET_ALBUMS,
      payload: items,
    });
  }, (err) => {
    console.error(err);
  });
};

const getArtist = artistId => (dispatch) => {
  dispatch(setLoading(true));
  spotifyApi.getArtist(artistId)
  .then((data) => {
    dispatch({
      type: SET_ARTIST,
      payload: data,
    });
    dispatch(setLoading(false));
    dispatch(getAlbums(artistId));
  }, (err) => {
    console.error(err);
  });
};

export { setLoading, getAlbums, getArtist };
