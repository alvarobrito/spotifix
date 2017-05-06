import spotifyApi from '@/utils/spotify.api';
import { SET_SEARCH_INPUT, SET_SONGS, ADD_SONGS, SELECT_SONG, ADD_OFFSET, SET_LOADING } from './types';

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

const getSongs = dispatch => getState => addSongsAction => () => {
  const { search: { searchInput, offset } } = getState();
  dispatch(setLoading(true));

  spotifyApi.searchTracks(searchInput, { offset })
  .then(({ tracks: { items } }) => {
    const tracks = items.map(({ id, name: trackName, artists, album: { name: albumName } }) => ({
      id,
      trackName,
      artists,
      albumName,
    }));

    dispatch(setLoading(false));

    dispatch(addSongsAction(tracks));
  })
  .catch((e) => {
    dispatch(setLoading(false));
    throw e;
  });
};

export const fetchSongs = searchInput => (dispatch, getState) => {
  if (searchInput.length === 0) {
    setSearchInput(searchInput);
    dispatch(setSongs([]));
    return;
  }

  const { search: { searchInput: currentSearchInput } } = getState();

  if (currentSearchInput === searchInput) return;

  const firstFetch = getSongs(dispatch)(getState)(setSongs);
  dispatch(setSearchInput(searchInput));
  firstFetch(searchInput);
};

export const fetchMoreSongs = searchInput => (dispatch, getState) => {
  const addNewSongs = getSongs(dispatch)(getState)(addSongs);
  dispatch(addOffset());
  addNewSongs(searchInput);
};
