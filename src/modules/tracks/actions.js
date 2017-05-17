import { SET_TRACKS, ADD_TRACKS } from './types';

const setTracks = songs => dispatch =>
  dispatch({
    type: SET_TRACKS,
    payload: songs,
  });

const addTracks = songs => dispatch =>
  dispatch({
    type: ADD_TRACKS,
    payload: songs,
  });

export { addTracks, setTracks };
