import { select, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { createReducer, union } from '@/utils/reducers.utils';
import Api from '@/services/api';
import { getArtistsSection } from './selectors';

// Actions
const RESET_STATE = 'artists/RESET_STATE';
const SELECT_GENRE = 'artists/SELECT_GENRE';
const SET_ARTISTS = 'artists/SET_ARTISTS';
const ADD_ARTISTS = 'artists/ADD_ARTISTS';
const INCREMENT_OFFSET = 'artists/INCREMENT_OFFSET';
const LOADING = 'artists/LOADING';

// @effect Actions
const FETCH_ARTISTS_REQUEST = '@effect/artists/FETCH_ARTISTS_REQUEST';
const FETCH_MORE_ARTIST = '@effect/artists/FETCH_MORE_ARTIST';
const FETCH_ARTISTS_FAILURE = '@effect/artists/FETCH_ARTISTS_FAILURE';

// Initial State
const INIT_STATE = {
  offset: 0,
  count: 0,
  genre: '',
  limit: 20,
  list: [],
  loading: false,
};

// Reducers
export default createReducer(INIT_STATE, {

  [RESET_STATE](state) {
    return {
      ...state,
      ...INIT_STATE,
    };
  },

  [SET_ARTISTS](state, payload) {
    return {
      ...state,
      list: payload,
      count: payload.length,
    };
  },

  [ADD_ARTISTS](state, payload) {
    const list = union(state.list, payload);
    return {
      ...state,
      list,
      count: list.length,
    };
  },

  [LOADING](state, payload) {
    return {
      ...state,
      loading: payload,
    };
  },

  [INCREMENT_OFFSET](state) {
    return {
      ...state,
      offset: state.offset + state.limit,
    };
  },

  [SELECT_GENRE](state, payload) {
    return {
      ...state,
      genre: payload,
    };
  },

});

// Action Creators
export const resetState = () => ({
  type: RESET_STATE,
});

export const addArtists = ({ entities, result }) => ({
  type: ADD_ARTISTS,
  entities,
  payload: result,
});

// TODO: reuse action creators
export const setArtists = ({ entities, result }) => ({
  type: SET_ARTISTS,
  entities,
  payload: result,
});

export const incrementOffset = () => ({
  type: INCREMENT_OFFSET,
});

export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

export const selectGenre = genre => ({
  type: SELECT_GENRE,
  payload: genre,
});

export const fetchAllArtists = genre => ({
  type: FETCH_ARTISTS_REQUEST,
  payload: genre,
});

export const fetchMoreArtists = () => ({
  type: FETCH_MORE_ARTIST,
});

export const throwError = error => ({
  type: FETCH_ARTISTS_FAILURE,
  payload: error,
});

// Sagas
function* fetchArtists({ genre, offset }, artistAction) {
  const artists = yield call(Api.getAllArtists, genre, offset);
  yield put(selectGenre(genre));
  yield put(artistAction(artists));
  yield put(incrementOffset());
}

function* loadAllArtists({ payload: genre }) {
  const { count } = yield select(getArtistsSection);
  if (!count) {
    yield put(resetState());
    yield put(setLoading(true));
    try {
      const { offset } = yield select(getArtistsSection);
      yield call(fetchArtists, { genre, offset }, addArtists);
    } catch ({ status }) {
      yield put(throwError(status));
    }
    yield put(setLoading(false));
  }
}

function* loadMoreArtists() {
  yield put(setLoading(true));
  try {
    const { genre, offset } = yield select(getArtistsSection);
    yield call(fetchArtists, { genre, offset }, addArtists);
  } catch ({ status }) {
    yield put(throwError(status));
  }
  yield put(setLoading(false));
}

export function* watchLoadArtists() {
  yield takeLatest(FETCH_ARTISTS_REQUEST, loadAllArtists);
  yield takeEvery(FETCH_MORE_ARTIST, loadMoreArtists);
}
