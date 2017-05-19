import { createSelector } from 'reselect';

// mini-selectors
const getTracks = state =>
  state.entities.tracks;

const getTopTracks = state =>
  state.sections.artist.topTracks;

// selector creators
const selectToptracks = createSelector(
  [getTopTracks, getTracks],
  (trackIds, tracks) => trackIds.map(t => tracks[t]),
);

export { selectToptracks };
