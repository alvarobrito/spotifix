import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getAlbum } from '@/services/api';
import { getSelectedAlbumSection } from './selectors';
import { GET_ALBUM, addAlbum, selectAlbum, setLoading, throwError } from './';

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
    } catch ({ status }) {
      yield put(throwError(status));
    }
    yield put(setLoading(false));
  }
}

// Watchers
export function* watchLoadAlbum() {
  yield takeLatest(GET_ALBUM, loadAlbum);
}

export default {
  watchLoadAlbum,
};
