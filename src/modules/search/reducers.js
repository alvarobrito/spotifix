import { createReducer } from '../../utils/reducers.utils';
import { SET_SONGS, SELECT_SONG, SET_LOADING } from './types';

const INIT_STATE = {
  loading: false,
  songs: [],
  selectedSongs: [],
};

const searchHandler = {

  [SET_SONGS](state, payload) {
    const newState = Object.assign({}, state, {
      songs: payload.songs,
      loading: false,
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

  [SET_LOADING](state, payload) {
    if (state.loading) return state;

    return Object.assign({}, state, { loading: payload });
  },

};

export default createReducer(INIT_STATE, searchHandler);
