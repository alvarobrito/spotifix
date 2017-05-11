import spotifyApi from '@/utils/spotify.api';
import {
  ADD_TRACKS as SEARCH_ADD_TRACKS,
  RESET_TRACKS,
  SET_SEARCH_INPUT,
  SET_SONGS,
  ADD_SONGS,
  SELECT_SONG,
  ADD_OFFSET,
  SET_LOADING,
} from './types';
import { ADD_TRACKS } from '../tracks/types';

const normalizeTracks = tracks =>
  (tracks
  .reduce((prev, { id, name: trackName, artists, album: { name: albumName } }) =>
    ({
      ...prev,
      [id]: {
        id,
        trackName,
        artists,
        albumName,
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

export const setSongs = songs => dispatch =>
  dispatch({
    type: SET_SONGS,
    payload: songs,
  });

export const addSongs = songs => dispatch =>
  dispatch({
    type: ADD_SONGS,
    payload: songs,
  });

export const selectSong = song => dispatch =>
  dispatch({
    type: SELECT_SONG,
    payload: song,
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

const getSongs = (dispatch, getState) => {
  const { search: { searchInput, offset } } = getState();
  dispatch(setLoading(true));

  spotifyApi.searchTracks(searchInput, { offset })
  .then(({ tracks: { items } }) => {
    dispatch(addTracks(items));

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
  getSongs(dispatch, getState);
};

export const fetchMoreSongs = () => (dispatch, getState) => {
  dispatch(addOffset());
  getSongs(dispatch, getState);
};
