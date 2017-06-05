import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getAlbum } from '@/services/api';
import { getSelectedAlbumSection } from './selectors';
import { GET, addAlbum, selectAlbum, setLoading, throwError } from './';

// Workers
function* loadAlbum({ payload: albumId }) {
  yield put(selectAlbum(albumId));
  const albumSection = yield select(getSelectedAlbumSection);

  if (albumSection) {
    yield put(selectAlbum(albumId));
  } else {
    yield put(setLoading(true));
    try {
      const album = yield call(getAlbum, albumId);
      yield put(addAlbum(album, albumId));
      yield put(selectAlbum(albumId));
    } catch ({ status, statusText }) {
      yield put(throwError({ status, statusText }));
    }
    yield put(setLoading(false));
  }
}

// Watchers
export function* watchLoadAlbum() {
  yield takeLatest(GET, loadAlbum);
}

export default {
  watchLoadAlbum,
};
