import { createSelector } from 'reselect';
import { getArtists } from '@/modules/entities/selectors';

// selectors
export const getArtistsSection = state =>
  state.sections.artists;

export const getArtistsListId = state =>
  state.sections.artists.list;

// selector creators
export const getArtistsList = createSelector(
  [getArtistsListId, getArtists],
  (artistsList, artists) => artistsList && artistsList.map(a => artists[a]),
);
