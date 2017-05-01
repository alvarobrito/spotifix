import { createReducer } from '../../utils/reducers.utils';
import { SET_SONGS, SELECT_SONG } from './types';

const INIT_STATE = {
  songs: [],
  selectedSongs: [],
};

const searchHandler = {

  [SET_SONGS](state, payload) {
    const newState = Object.assign({}, state, {
      songs: payload.songs,
      selectedSongs: [],
    });

    return newState;
  },

  [SELECT_SONG](state, payload) {
    if (state.selectedSongs.indexOf(payload)) return state;

    const newState = Object.assign({}, state, {
      selectedSongs: [...state.selectedSongs].push(payload),
    });

    return newState;
  },

};

export default createReducer(INIT_STATE, searchHandler);
