import { createSelector } from 'reselect';

const getTracks = state => state.entities.tracks;
const getArtists = state => state.entities.artists;
const getAlbums = state => state.entities.albums;

const getSearchTracksIds = state => state.sections.search.tracks;

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
