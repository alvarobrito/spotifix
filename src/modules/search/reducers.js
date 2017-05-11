import { createReducer } from '../../utils/reducers.utils';
import { ADD_TRACKS, RESET_TRACKS, SET_SEARCH_INPUT, SET_SONGS, ADD_SONGS, SELECT_SONG, ADD_OFFSET, SET_LOADING } from './types';

const INIT_STATE = {
  searchInput: '',
  loading: false,
  songs: [],
  tracksIds: [],
  offset: 0,
  selectedSongs: [],
};

const searchHandler = {

  [ADD_TRACKS](state, payload) {
    const newTracksIds = payload.reduce((prevIds, newId) => {
      if (prevIds.indexOf(newId) !== -1) {
        return prevIds;
      }

      return [...prevIds, newId];
    }, state.tracksIds);

    return Object.assign({}, state, {
      tracksIds: newTracksIds,
    });
  },

  [RESET_TRACKS](state, payload) {
    return Object.assign({}, state, {
      tracksIds: [],
      offset: 0,
      selectedSongs: [],
    });
  },

  [SET_SEARCH_INPUT](state, payload) {
    return Object.assign({}, state, {
      searchInput: payload,
    });
  },

  [SET_SONGS](state, payload) {
    return Object.assign({}, state, {
      songs: payload,
      offset: 0,
      selectedSongs: [],
    });
  },

  [ADD_SONGS](state, payload) {
    return Object.assign({}, state, {
      songs: [...state.songs, ...payload],
    });
  },

  [SELECT_SONG](state, payload) {
    if (state.selectedSongs.indexOf(payload)) return state;

    return Object.assign({}, state, {
      selectedSongs: [...state.selectedSongs].push(payload),
    });
  },

  [ADD_OFFSET](state) {
    return Object.assign({}, state, { offset: state.offset + 20 });
  },

  [SET_LOADING](state, payload) {
    return Object.assign({}, state, { loading: payload });
  },

};

export default createReducer(INIT_STATE, searchHandler);
