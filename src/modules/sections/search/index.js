import { createReducer } from '@/utils/reducers.utils';
import { put, call, takeEvery, select, throttle } from 'redux-saga/effects';
import Api from '@/services/api';

// Actions
const ADD_TRACKS = 'search/ADD_TRACKS';
const RESET_TRACKS = 'search/RESET_TRACKS';
const SET_SEARCH_INPUT = 'search/SET_SEARCH_INPUT';
const SELECT_SONG = 'search/SELECT_SONG';
const ADD_OFFSET = 'search/ADD_OFFSET';
const SET_LOADING = 'search/SET_LOADING';
const FETCH_SEARCH_FAILURE = 'search/FETCH_SEARCH_FAILURE';
export const GET = '@effect/search/GET_TRACKS';
export const GET_MORE = '@effect/search/GET_MORE_TRACKS';

// Initial State
const INIT_STATE = {
  searchInput: '',
  loading: false,
  tracks: [],
  offset: 0,
  selectedTracks: [],
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
export const addSearchTracks = ({ entities, result }) => (
  {
    type: ADD_TRACKS,
    entities,
    payload: result.tracks,
  }
);

export const resetTracks = () =>
  ({
    type: RESET_TRACKS,
  });

export const setSearchInput = searchInput =>
  ({
    type: SET_SEARCH_INPUT,
    payload: searchInput,
  });

export const addOffset = () =>
  ({
    type: ADD_OFFSET,
  });

export const setLoading = loading =>
  ({
    type: SET_LOADING,
    payload: loading,
  });

export const fetchSongs = searchInput => ({
  type: GET,
  payload: searchInput,
});

export const fetchMoreSongs = () => ({
  type: GET_MORE,
});

export const throwError = error => ({
  type: FETCH_SEARCH_FAILURE,
  payload: error,
});

// Workers
function* getTracks() {
  const { sections: { search: { searchInput, offset } } } = yield select();

  yield put(setLoading(true));

  try {
    const tracks = yield call(Api.searchTracks, [searchInput, offset]);

    yield put(addSearchTracks(tracks));
  } catch ({ status, statusText }) {
    yield put(throwError({ status, statusText }));
  }

  yield put(setLoading(false));
}

function* fetchSongsWorker({ payload: searchInput }) {
  const { sections: { search: { searchInput: currentSearchInput } } } = yield select();

  if (searchInput.length === 0) {
    yield put(setSearchInput(searchInput));
    yield put(resetTracks());
    return;
  }

  if (currentSearchInput === searchInput) return;

  yield put(setSearchInput(searchInput));
  yield put(resetTracks());
  yield call(getTracks);
}

function* fetchMoreSongsWorker() {
  yield put(addOffset());
  yield call(getTracks);
}

// Watchers
export function* watchFetchSongs() {
  yield throttle(300, GET, fetchSongsWorker);
  yield takeEvery(GET_MORE, fetchMoreSongsWorker);
}
