import { SET_SONGS, SELECT_SONG } from './types';

export const setSongs = songs => dispatch =>
  dispatch({
    type: SET_SONGS,
    payload: songs,
  });

export const selectSong = song => dispatch =>
  dispatch({
    type: SELECT_SONG,
    payload: song,
  });
