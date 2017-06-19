import { createSelector } from 'reselect';
import { getArtists, getAlbums, getTracks } from '@/modules/entities/selectors';

// selectors
const artistsSection = state =>
  state.sections.artist.artists;

const selectedArtist = state =>
  state.sections.artist.selected;

// selector creators
// TODO Memoize selected element
export const getSelectedArtistSection = createSelector(
  [artistsSection, selectedArtist],
  (artists, artistId) => artists[artistId],
);

export const getSelectedArtist = createSelector(
  [selectedArtist, getArtists],
  (artistId, artists) => artists[artistId],
);

export const getRelatedArtists = createSelector(
  [getSelectedArtistSection, getArtists],
  (artist, artists) => artist && artist.relatedArtists && artist.relatedArtists.map(a => artists[a]),
);

export const getArtistTopTracks = createSelector(
  [getSelectedArtistSection, getTracks, getAlbums],
  (artist, tracks, albums) => artist && artist.topTracks && artist.topTracks.map(a => ({ ...tracks[a], album: albums[tracks[a].album] })),
);

export const getArtistAlbums = createSelector(
  [getSelectedArtistSection, getAlbums],
  (artist, albums) => artist && artist.albums && artist.albums.map(a => albums[a]),
);
