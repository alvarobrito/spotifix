import { createSelector } from 'reselect';

// mini-selectors
const getAlbums = state =>
  state.entities.albums;

const getArtistAlbums = state =>
  state.sections.artist.albums;

const selectedAlbum = state =>
  state.sections.album.selected;

// selector creators
const selectArtistAlbums = createSelector(
  [getArtistAlbums, getAlbums],
  (albumIds, albums) => albumIds.map(a => albums[a]),
);

const selectAlbum = createSelector(
  [selectedAlbum, getAlbums],
  (albumId, albums) => albums[albumId],
);

export { selectAlbum, selectArtistAlbums };
