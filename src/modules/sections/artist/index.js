import merge from 'lodash/fp/merge';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { createReducer } from '@/utils/reducers.utils';
import Api from '@/services/api';
import { getSelectedArtistSection } from './selectors';

// Actions
export const FETCH_ARTIST_REQUEST = '@effect/artist/FETCH_ARTIST_REQUEST';
export const FETCH_ARTIST_FAILURE = '@effect/artist/FETCH_ARTIST_FAILURE';
export const ADD_ARTIST = 'artist/ADD_ARTIST';
export const SELECT_ARTIST = 'artist/SELECT_ARTIST';
export const LOADING = 'artist/LOADING';

// Initial State
const INIT_STATE = {
  selected: '',
  artists: {},
  loading: false,
};

// Reducers
export default createReducer(INIT_STATE, {

  [ADD_ARTIST](state, payload) {
    return {
      ...state,
      artists: merge(state.artists, payload),
    };
  },

  [SELECT_ARTIST](state, payload) {
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
export const addArtist = ({ entities, result }, artistId) => ({
  type: ADD_ARTIST,
  entities,
  payload: {
    [artistId]: result,
  },
});

export const selectArtist = artistId => ({
  type: SELECT_ARTIST,
  payload: artistId,
});

export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

export const fetchArtist = artistId => ({
  type: FETCH_ARTIST_REQUEST,
  payload: artistId,
});

export const throwError = error => ({
  type: FETCH_ARTIST_FAILURE,
  payload: error,
});

// Sagas
function* loadArtist({ payload: artistId }) {
  yield put(selectArtist(artistId));
  const artistSection = yield select(getSelectedArtistSection);

  if (artistSection) {
    yield put(setLoading(true));
    try {
      const artist = yield call(Api.getArtist, artistId);
      yield put(addArtist(artist, artistId));
      yield put(selectArtist(artistId));
    } catch ({ status }) {
      yield put(throwError(status));
    }
    yield put(setLoading(false));
  }
}

export function* watchLoadArtist() {
  yield takeLatest(FETCH_ARTIST_REQUEST, loadArtist);
}
