import { createSelector } from 'reselect';

const getTracks = state => state.tracks.byId;

const getSearchTracksIds = state => state.search.tracksIds;

export const getSearchTracks = createSelector(
  [getTracks, getSearchTracksIds],
  (tracks, searchTracksIds) => searchTracksIds
  .filter(trackId => tracks[trackId])
  .map(trackId => tracks[trackId]),
);
