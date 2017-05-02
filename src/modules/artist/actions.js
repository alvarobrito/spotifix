import spotifyApi from '@/utils/spotify.api';
import { SET_ALBUMS, SET_ARTIST } from './types';

// TODO Normalize data

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
  spotifyApi.getArtist(artistId)
  .then((data) => {
    dispatch({
      type: SET_ARTIST,
      payload: data,
    });
    dispatch(getAlbums(artistId));
  }, (err) => {
    console.error(err);
  });
};

export { getAlbums, getArtist };
