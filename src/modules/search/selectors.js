import { createSelector } from 'reselect';

const getTracks = state => state.tracks.byId;
const getArtists = state => state.old.artists.byId;
const getAlbums = state => state.old.albums.byId;

const getSearchTracksIds = state => state.search.tracksIds;

export const getSearchTracks = createSelector(
  [getArtists, getAlbums, getTracks, getSearchTracksIds],
  (artists, albums, tracks, searchTracksIds) => searchTracksIds
  .filter(trackId => tracks[trackId]
    && albums[tracks[trackId].album])
  .map(trackId => {
    return {
      ...tracks[trackId],
      album: albums[tracks[trackId].album],
      artists: tracks[trackId].artists
        .filter(artistId => artists[artistId])
        .map(artistId => artists[artistId]),
    };
  }),
);
