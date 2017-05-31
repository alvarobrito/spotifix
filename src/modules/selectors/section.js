import { createSelector } from 'reselect';
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

// TODO Memoize selected element
const getSelectedAlbumSection = createSelector(
  [albumsSection, selectedAlbum],
  (albums, albumId) => albums[albumId],
);

const getSelectedArtistSection = createSelector(
  [artistsSection, selectedArtist],
  (artists, artistId) => artists[artistId],
);

const getSelectedArtist = createSelector(
  [selectedArtist, artistsEntity],
  (artistId, artists) => artists[artistId],
);

const getSelectedAlbum = createSelector(
  [selectedAlbum, albumsEntity],
  (albumId, albums) => albums[albumId],
);

const getRelatedArtists = createSelector(
  [getSelectedArtistSection, artistsEntity],
  (artist, artists) => artist && artist.relatedArtists && artist.relatedArtists.map(a => artists[a]),
);

const getArtistTopTracks = createSelector(
  [getSelectedArtistSection, tracksEntity],
  (artist, tracks) => artist && artist.topTracks && artist.topTracks.map(a => tracks[a]),
);

const getArtistAlbums = createSelector(
  [getSelectedArtistSection, albumsEntity],
  (artist, albums) => artist && artist.albums && artist.albums.map(a => albums[a]),
);

const getAlbumTracks = createSelector(
  [getSelectedAlbum, tracksEntity, artistsEntity],
  (album, tracks, artists) =>
    album && album.tracks && album.tracks.reduce((acc, val) =>
      acc.concat({
        ...tracks[val],
        album: {
          name: album.name,
        },
        artists: album.artists.map(a => artists[a]),
      }), []),
);

export {
  getSelectedAlbum,
  getSelectedArtist,
  getRelatedArtists,
  getArtistAlbums,
  getArtistTopTracks,
  getAlbumTracks,
};
