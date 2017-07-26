import { select, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { createReducer, union } from '@/utils/reducers.utils';
import Api from '@/services/api';

// Actions
const ADD_ARTISTS = 'artists/ADD_ARTISTS';
const ADD_OFFSET = 'artists/ADD_OFFSET';
const LOADING = 'artists/LOADING';

// @effect Actions
const FETCH_ARTISTS_REQUEST = '@effect/artists/FETCH_ARTISTS_REQUEST';
const FETCH_MORE_ARTIST = '@effect/artists/FETCH_MORE_ARTIST';
const FETCH_ARTISTS_FAILURE = '@effect/artists/FETCH_ARTISTS_FAILURE';

// Initial State
const INIT_STATE = {
  offset: 0,
  list: [],
  loading: false,
};

// Reducers
export default createReducer(INIT_STATE, {

  [ADD_ARTISTS](state, payload) {
    return {
      ...state,
      list: union(state.list, payload),
    };
  },

  [LOADING](state, payload) {
    return {
      ...state,
      loading: payload,
    };
  },

  [ADD_OFFSET](state) {
    return {
      ...state,
      offset: state.offset + 20,
    };
  },

});

// Action Creators
export const addArtists = ({ entities, result }) => ({
  type: ADD_ARTISTS,
  entities,
  payload: result,
});

export const addOffset = () => ({
  type: ADD_OFFSET,
});

export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

export const fetchAllArtists = () => ({
  type: FETCH_ARTISTS_REQUEST,
});

export const throwError = error => ({
  type: FETCH_ARTISTS_FAILURE,
  payload: error,
});

export const fetchMoreArtists = () => ({
  type: FETCH_MORE_ARTIST,
});

// Sagas
function* loadAllArtists() {
  const { sections: { artists: { offset } } } = yield select();
  yield put(setLoading(true));
  try {
    const artists = yield call(Api.getAllArtists, 'genre:pop', offset);
    yield put(addArtists(artists));
  } catch ({ status }) {
    yield put(throwError(status));
  }
  yield put(setLoading(false));
}

function* loadMoreArtists() {
  yield put(addOffset());
  yield call(loadAllArtists);
}

export function* watchLoadArtists() {
  yield takeLatest(FETCH_ARTISTS_REQUEST, loadAllArtists);
  yield takeEvery(FETCH_MORE_ARTIST, loadMoreArtists);
}
