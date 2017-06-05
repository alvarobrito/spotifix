import { createSelector } from 'reselect';
import { getArtists, getAlbums, getTracks } from '@/modules/entities/selectors';

// selectors
const albumsSection = state =>
  state.sections.album.albums;

const selectedAlbum = state =>
  state.sections.album.selected;

// selector creators
// TODO Memoize selected element
export const getSelectedAlbumSection = createSelector(
  [albumsSection, selectedAlbum],
  (albums, albumId) => albums[albumId],
);

export const getSelectedAlbum = createSelector(
  [selectedAlbum, getAlbums],
  (albumId, albums) => albums[albumId],
);

export const getAlbumTracks = createSelector(
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
