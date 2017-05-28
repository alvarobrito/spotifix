import { createSelectorCreator, defaultMemoize } from 'reselect';
import { isEqual } from 'lodash';

// Create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual,
);

// Reducer to obtain an array with the results filtered and mapped
const mapFiltered = (filterCondition, mapHandler) => (prev, next) => {
  if (!filterCondition(next)) return prev;

  return [...prev, mapHandler(next)];
};

// Entities
const getTracks = state => state.entities.tracks;
const getArtists = state => state.entities.artists;
const getAlbums = state => state.entities.albums;

// Sections
const getSearchTracksIds = state => state.sections.search.tracks;

// Selectors
export const getSearchTracks = createDeepEqualSelector(
  [getArtists, getAlbums, getTracks, getSearchTracksIds],
  (artists, albums, tracks, searchTracksIds) => searchTracksIds
  .reduce(mapFiltered(
    trackId => tracks[trackId] && albums[tracks[trackId].album],
    trackId => {
      return {
        ...tracks[trackId],
        album: albums[tracks[trackId].album],
        artists: tracks[trackId].artists
          .reduce(mapFiltered(
            artistId => artists[artistId],
            artistId => artists[artistId]), [],
          ),
      };
    }), []),
);
