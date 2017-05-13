import { createSelector } from 'reselect';
import { hasOwnProperty } from '../../utils/reducers.utils';

const getArtists = state =>
  state.artists.byId;

const getAlbums = state =>
  state.albums.byId;

const selectArtist = artistId =>
  createSelector(
    [getArtists],
    artists => artists[artistId],
  );

const selectArtistAlbums = artistId =>
  createSelector(
    [getAlbums, getArtists],
    (albums, artists) => {
      if (hasOwnProperty(artists, artistId)) {
        if (hasOwnProperty(artists[artistId], 'albums')) {
          return artists[artistId].albums.map(albumId => albums[albumId]);
        }
      }
      return [];
    },
  );

export { selectArtist, selectArtistAlbums };
