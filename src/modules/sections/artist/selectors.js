import { createSelector } from 'reselect';
import { getArtists, getAlbums, getTracks } from '@/modules/entities/selectors';

// selectors
const artistsSection = state =>
  state.sections.artist.artists;

const selectedArtist = state =>
  state.sections.artist.selected;

// selector creators
// TODO Memoize selected element
const getSelectedArtistSection = createSelector(
  [artistsSection, selectedArtist],
  (artists, artistId) => artists[artistId],
);

const getSelectedArtist = createSelector(
  [selectedArtist, getArtists],
  (artistId, artists) => artists[artistId],
);

const getRelatedArtists = createSelector(
  [getSelectedArtistSection, getArtists],
  (artist, artists) => artist && artist.relatedArtists && artist.relatedArtists.map(a => artists[a]),
);

const getArtistTopTracks = createSelector(
  [getSelectedArtistSection, getTracks],
  (artist, tracks) => artist && artist.topTracks && artist.topTracks.map(a => tracks[a]),
);

const getArtistAlbums = createSelector(
  [getSelectedArtistSection, getAlbums],
  (artist, albums) => artist && artist.albums && artist.albums.map(a => albums[a]),
);

export {
  getSelectedArtistSection,
  getSelectedArtist,
  getRelatedArtists,
  getArtistAlbums,
  getArtistTopTracks,
};
