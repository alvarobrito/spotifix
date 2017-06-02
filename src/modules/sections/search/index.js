import { normalize } from 'normalizr';
import spotifyApi from '@/utils/spotify.api';
import { createReducer } from '@/utils/reducers.utils';
import { trackSchema } from '@/modules/entities';

// Actions
const ADD_TRACKS = 'search/ADD_TRACKS';
const RESET_TRACKS = 'search/RESET_TRACKS';
const SET_SEARCH_INPUT = 'search/SET_SEARCH_INPUT';
const SELECT_SONG = 'search/SELECT_SONG';
const ADD_OFFSET = 'search/ADD_OFFSET';
const SET_LOADING = 'search/SET_LOADING';

// Initial State
const INIT_STATE = {
  searchInput: '',
  loading: false,
  tracks: [],
  offset: 0,
  selectedTracks: [],
};

// Schema
export const sectionSchema = {
  tracks: [trackSchema],
  // searchInput: '',
  // offset: 0,
  // selectedTracks: [trackSchema],
};

// Reducers
export default createReducer(INIT_STATE, {

  [ADD_TRACKS](state, payload) {
    const newTracksIds = payload.reduce((prevIds, newId) => {
      if (prevIds.indexOf(newId) !== -1) {
        return prevIds;
      }

      return [...prevIds, newId];
    }, state.tracks);

    return {
      ...state,
      tracks: newTracksIds,
    };
  },

  [RESET_TRACKS](state) {
    return {
      ...state,
      tracks: [],
      offset: 0,
      selectedTracks: [],
    };
  },

  [SET_SEARCH_INPUT](state, payload) {
    return {
      ...state,
      searchInput: payload,
    };
  },

  [SELECT_SONG](state, payload) {
    if (state.selectedTracks.indexOf(payload)) return state;

    return {
      ...state,
      selectedTracks: [...state.selectedTracks].push(payload),
    };
  },

  [ADD_OFFSET](state) {
    return {
      ...state,
      offset: state.offset + 20,
    };
  },

  [SET_LOADING](state, payload) {
    return {
      ...state,
      loading: payload,
    };
  },

});

// Action Creators
export const addSearchTracks = ({ entities, result }) => (dispatch) => {
  dispatch({
    type: ADD_TRACKS,
    entities,
    payload: result.tracks,
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

const setFetchedData = dispatch => (items) => {
  const normalized = normalize({ tracks: items }, sectionSchema);
  dispatch(addSearchTracks(normalized));
};

// side effects
const getTracks = (dispatch, getState) => {
  const { sections: { search: { searchInput, offset } } } = getState();
  dispatch(setLoading(true));

  spotifyApi.searchTracks(searchInput, { offset })
  .then(({ tracks: { items } }) => {
    setFetchedData(dispatch)(items);

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

  const { sections: { search: { searchInput: currentSearchInput } } } = getState();

  if (currentSearchInput === searchInput) return;

  dispatch(setSearchInput(searchInput));
  dispatch(resetTracks());
  getTracks(dispatch, getState);
};

export const fetchMoreSongs = () => (dispatch, getState) => {
  dispatch(addOffset());
  getTracks(dispatch, getState);
};
