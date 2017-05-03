import spotifyApi from '@/utils/spotify.api';
import { SET_LOADING, SET_ARTIST } from './types';

// TODO Normalize data

const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

const getArtist = artistId => (dispatch) => {
  dispatch(setLoading(true));

  spotifyApi.getArtist(artistId)
  .then(artist =>
    spotifyApi.getArtistAlbums(artistId)
    .then(({ items }) =>
      dispatch({
        type: SET_ARTIST,
        payload: {
          ...artist,
          albums: items,
        },
      }),
      dispatch(setLoading(false)),
    )).catch(error => console.error(error));
};

export { setLoading, getArtist };
