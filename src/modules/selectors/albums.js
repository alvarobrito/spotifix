import { createSelector } from 'reselect';

// Selectors
const getArtistAlbums = state =>
  state.sections.artist.albums;

const getAlbums = state =>
  state.entities.albums.byId;

// TODO memoize combinedselector getAlbums new Selector => (selectAlbums(ids)
const selectArtistAlbums = createSelector(
  [getArtistAlbums, getAlbums],
  (albumIds, albums) => albumIds.map(a => albums[a]),
);

export { selectArtistAlbums };
