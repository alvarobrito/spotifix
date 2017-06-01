import { createSelector } from 'reselect';
import { getArtists, getAlbums, getTracks } from '@/modules/entities/selectors';

// selectors
const albumsSection = state =>
  state.sections.album.albums;

const selectedAlbum = state =>
  state.sections.album.selected;

// selector creators
// TODO Memoize selected element
const getSelectedAlbumSection = createSelector(
  [albumsSection, selectedAlbum],
  (albums, albumId) => albums[albumId],
);

const getSelectedAlbum = createSelector(
  [selectedAlbum, getAlbums],
  (albumId, albums) => albums[albumId],
);

const getAlbumTracks = createSelector(
  [getSelectedAlbum, getTracks, getArtists],
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
  getSelectedAlbumSection,
  getSelectedAlbum,
  getAlbumTracks,
};
