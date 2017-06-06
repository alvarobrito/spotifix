import merge from 'lodash/fp/merge';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { createReducer } from '@/utils/reducers.utils';
import Api from '@/services/api';
import { getSelectedAlbumSection } from './selectors';

// Actions
export const FETCH_ALBUM_REQUEST = '@effect/album/FETCH_ALBUM_REQUEST';
export const FETCH_ALBUM_FAILURE = '@effect/album/FETCH_ALBUM_FAILURE';
export const ADD_ALBUM = 'album/ADD_ALBUM';
export const SELECT_ALBUM = 'album/SELECT_ALBUM';
export const LOADING = 'album/LOADING';

// Initial State
const INIT_STATE = {
  selected: '',
  albums: {},
  loading: false,
};

// Reducers
export default createReducer(INIT_STATE, {

  [ADD_ALBUM](state, payload) {
    return {
      ...state,
      albums: merge(state.albums, payload),
    };
  },

  [SELECT_ALBUM](state, payload) {
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
export const addAlbum = ({ entities, result }, albumId) => ({
  type: ADD_ALBUM,
  entities,
  payload: {
    [albumId]: result,
  },
});

export const selectAlbum = albumId => ({
  type: SELECT_ALBUM,
  payload: albumId,
});

export const setLoading = loading => ({
  type: LOADING,
  payload: loading,
});

export const fetchAlbum = albumId => ({
  type: FETCH_ALBUM_REQUEST,
  payload: albumId,
});

export const throwError = error => ({
  type: FETCH_ALBUM_FAILURE,
  payload: error,
});

// Sagas
function* loadAlbum({ payload: albumId }) {
  yield put(selectAlbum(albumId));
  const albumSection = yield select(getSelectedAlbumSection);

  if (albumSection) {
    yield put(selectAlbum(albumId));
  } else {
    yield put(setLoading(true));
    try {
      const album = yield call(Api.getAlbum, albumId);
      yield put(addAlbum(album, albumId));
      yield put(selectAlbum(albumId));
    } catch ({ status }) {
      yield put(throwError(status));
    }
    yield put(setLoading(false));
  }
}

export function* watchLoadAlbum() {
  yield takeLatest(FETCH_ALBUM_REQUEST, loadAlbum);
}
