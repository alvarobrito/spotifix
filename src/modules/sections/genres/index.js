import { call, put, select, takeLatest } from 'redux-saga/effects';
import { createReducer } from '@/utils/reducers.utils';
import Api from '@/services/api';

// Actions
const SET_GENRES = 'genres/SET_GENRES';
const SELECT_GENRES = 'genres/SELECT_GENRES';
const LOADING = 'genres/LOADING';

// @effect Actions
const FETCH_GENRES_REQUEST = '@effect/genres/FETCH_GENRES_REQUEST';
const FETCH_GENRES_FAILURE = '@effect/genres/FETCH_GENRES_FAILURE';

// Initial State
const INIT_STATE = {
  selected: '',
  list: [],
  loading: false,
};

// Reducers
export default createReducer(INIT_STATE, {

  [SET_GENRES](state, payload) {
    return {
      ...state,
      list: payload,
    };
  },

  [SELECT_GENRES](state, payload) {
    return {
      ...state,
      selected: payload,
    };
  },

  [LOADING](state, payload) {
    return {
      ...state,
      loading: payload,
    };
  },

});

// Action Creators
export const setGenres = payload => ({
  type: SET_GENRES,
  payload,
});

export const selectGenres = genreId => ({
  type: SELECT_GENRES,
  payload: genreId,
});

export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

export const fetchGenres = () => ({
  type: FETCH_GENRES_REQUEST,
});

export const throwError = error => ({
  type: FETCH_GENRES_FAILURE,
  payload: error,
});

// Sagas
function* loadGenres() {
  const { sections: { genres: { list: hasGenres } } } = yield select();
  if (hasGenres.length < 1) {
    yield put(setLoading(true));
    try {
      const genres = yield call(Api.getGenres);
      yield put(setGenres(genres));
    } catch ({ status }) {
      yield put(throwError(status));
    }
    yield put(setLoading(false));
  }
}

export function* watchLoadGenres() {
  yield takeLatest(FETCH_GENRES_REQUEST, loadGenres);
}
