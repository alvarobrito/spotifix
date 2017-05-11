import { SET_SONGS, ADD_SONGS, SET_LOADING } from './types';

const setSongs = songs => dispatch =>
  dispatch({
    type: SET_SONGS,
    payload: songs,
  });

const addSongs = songs => dispatch =>
  dispatch({
    type: ADD_SONGS,
    payload: songs,
  });

const setLoading = loading => dispatch =>
  dispatch({
    type: SET_LOADING,
    payload: loading,
  });
