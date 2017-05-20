import { createSelector } from 'reselect';

// mini-selectors
const getArtists = state =>
  state.entities.artists;

const getRelatedArtists = state =>
  state.sections.artist.relatedArtists;

const selectedArtist = state =>
  state.sections.artist.selected;

// selector creators
const selectRelatedArtists = createSelector(
  [getRelatedArtists, getArtists],
  (artistIds, artists) => artistIds.map(a => artists[a]),
);

const selectArtist = createSelector(
  [selectedArtist, getArtists],
  (artistId, artists) => artists[artistId],
);

export { selectArtist, selectRelatedArtists };
