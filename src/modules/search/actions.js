import { normalize } from 'normalizr';
import spotifyApi from '@/utils/spotify.api';
import schema from '@/modules/entities/schema';
import {
  ADD_TRACKS as SEARCH_ADD_TRACKS,
  RESET_TRACKS,
  SET_SEARCH_INPUT,
  ADD_OFFSET,
  SET_LOADING,
} from './types';
import { ADD_TRACKS } from '../tracks/types';
import { addArtists } from '../entities/artists';
import { addAlbums } from '../entities/albums';



const normalizeTracks = tracks =>
  (tracks
  .reduce((prev, { id, name, artists, album }) =>
    ({
      ...prev,
      [id]: {
        id,
        name,
        artists: artists.map(artist => artist.id),
        album: album.id,
      },
    }),
    {})
  );

export const addTracks = tracks => (dispatch) => {
  const tracksById = normalizeTracks(tracks);

  dispatch({
    type: SEARCH_ADD_TRACKS,
    payload: Object.keys(tracksById),
  });
  dispatch({
    type: ADD_TRACKS,
    payload: tracksById,
  });
};

export const resetTracks = () => dispatch =>
  dispatch({
    type: RESET_TRACKS,
  });

export const setSearchInput = searchInput => dispatch =>
  dispatch({
    type: SET_SEARCH_INPUT,
    payload: searchInput,
  });

const addOffset = () => dispatch =>
  dispatch({
    type: ADD_OFFSET,
  });

const setLoading = loading => dispatch =>
  dispatch({
    type: SET_LOADING,
    payload: loading,
  });

const setFetchedData = dispatch => items => {
  dispatch(addTracks(items));

  const albums = items.map(track => track.album)

  const artists = items
  .reduce((prev, next) => {
    return [...prev, ...next.artists];
  }, [])
  dispatch(addArtists(normalize(artists, [schema.artists])));

  dispatch(addAlbums(normalize(albums, [schema.albums])));
};

const getTracks = (dispatch, getState) => {
  const { search: { searchInput, offset } } = getState();
  dispatch(setLoading(true));

  spotifyApi.searchTracks(searchInput, { offset })
  .then(({ tracks: { items } }) => {
    setFetchedData(dispatch)(items)

    dispatch(setLoading(false));
  })
  .catch((e) => {
    dispatch(setLoading(false));
    throw e;
  });
};

export const fetchSongs = searchInput => (dispatch, getState) => {
  if (searchInput.length === 0) {
    dispatch(setSearchInput(searchInput));
    dispatch(resetTracks());
    return;
  }

  const { search: { searchInput: currentSearchInput } } = getState();

  if (currentSearchInput === searchInput) return;

  dispatch(setSearchInput(searchInput));
  dispatch(resetTracks());
  getTracks(dispatch, getState);
};

export const fetchMoreSongs = () => (dispatch, getState) => {
  dispatch(addOffset());
  getTracks(dispatch, getState);
};
