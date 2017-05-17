import { createSelector } from 'reselect';

// Selectors
const getArtistAlbums = state =>
  state.sections.artist.albums;

const getAlbums = state =>
  state.entities.albums.byId;

const selectedAlbum = state =>
  state.sections.album.selectedAlbum;

// TODO memoize combinedselector getAlbums new Selector => (selectAlbums(ids)
const selectArtistAlbums = createSelector(
  [getArtistAlbums, getAlbums],
  (albumIds, albums) => albumIds.map(a => albums[a]),
);

const selectAlbum = createSelector(
  [selectedAlbum, getAlbums],
  (albumId, albums) => albums[albumId],
);

export { selectAlbum, selectArtistAlbums };
