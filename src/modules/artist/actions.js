import spotifyApi from '@/utils/spotify.api';
import { SET_ALBUMS } from './types';

// TODO Normalize data
function getIdFromQueryParams(queryParam) {
  return queryParam.slice(queryParam.indexOf('=') + 1, queryParam.length);
}

const getAlbums = artistId => (dispatch, getState) => {
  // get albums by a certain artist
  const id = artistId || getIdFromQueryParams(getState().router.location.search);

  spotifyApi.getArtistAlbums(id)
  .then(({ items }) => {
    dispatch({
      type: SET_ALBUMS,
      payload: items,
    });
  }, (err) => {
    console.error(err);
  });
};

export { getAlbums };
