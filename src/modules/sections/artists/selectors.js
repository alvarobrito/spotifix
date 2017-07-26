import { createSelector } from 'reselect';
import { getArtists } from '@/modules/entities/selectors';

// selectors
const artistsSection = state =>
  state.sections.artists.list;

// selector creators
export const getArtistsList = createSelector(
  [artistsSection, getArtists],
  (artistsList, artists) => artistsList && artistsList.map(a => artists[a]),
);
