import { createSelector } from 'reselect';
import { hasOwnProperty } from '@/utils/reducers.utils';
import { artistsEntity, albumsEntity, tracksEntity } from './entities';

// selectors
const artistsSection = state =>
  state.sections.artist.artists;

const albumsSection = state =>
  state.sections.album.albums;

const selectedArtist = state =>
  state.sections.artist.selected;

const selectedAlbum = state =>
  state.sections.album.selected;

// selector creators
const getSelectedAlbumSection = createSelector(
  [albumsSection, selectedAlbum],
  (albums, albumId) => albums[albumId] || {},
);

const getSelectedArtistSection = createSelector(
  [artistsSection, selectedArtist],
  (artists, artistId) => artists[artistId] || {},
);

const getRelatedArtists = createSelector(
  [getSelectedArtistSection, artistsEntity],
  (artist, relatedArtists) => hasOwnProperty(artist, 'relatedArtists') ? artist.relatedArtists.map(a => relatedArtists[a]) : [],
);

const getArtistAlbums = createSelector(
  [getSelectedArtistSection, albumsEntity],
  (artist, albums) => hasOwnProperty(artist, 'albums') ? artist.albums.map(a => albums[a]) : [],
);

const getArtistTopTracks = createSelector(
  [getSelectedArtistSection, tracksEntity],
  (artist, topTracks) => hasOwnProperty(artist, 'albums') ? artist.topTracks.map(a => topTracks[a]) : [],
);

const getSelectedArtist = createSelector(
  [selectedArtist, artistsEntity],
  (artistId, artists) => artists[artistId],
);

const getSelectedAlbum = createSelector(
  [selectedAlbum, albumsEntity],
  (albumId, albums) => albums[albumId],
);

export {
  getSelectedAlbum,
  getSelectedArtist,
  getRelatedArtists,
  getArtistAlbums,
  getArtistTopTracks,
};
