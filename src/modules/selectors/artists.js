import { createSelector } from 'reselect';

// Selectors
const getRelatedArtists = state =>
  state.sections.artist.relatedArtists;

const getArtists = state =>
  state.entities.artists.byId;

const selectedArtist = state =>
  state.sections.artist.selectedArtist;

// TODO memoize combinedselector getAlbums new Selector => (selectAlbums(ids)
const selectRelatedArtists = createSelector(
  [getRelatedArtists, getArtists],
  (artistIds, artists) => artistIds.map(a => artists[a]),
);

const selectArtist = createSelector(
  [selectedArtist, getArtists],
  (artistId, artists) => artists[artistId],
);

export { selectArtist, selectRelatedArtists };
