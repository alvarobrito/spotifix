import { createSelector } from 'reselect';

// Selectors
const getRelatedArtists = state =>
  state.sections.artist.related;

const getArtists = state =>
  state.artists.byId;

// TODO memoize combinedselector getAlbums new Selector => (selectAlbums(ids)
const selectRelatedArtists = createSelector(
  [getRelatedArtists, getArtists],
  (artistIds, artists) => artistIds.map(a => artists[a]),
);

export { selectRelatedArtists };
