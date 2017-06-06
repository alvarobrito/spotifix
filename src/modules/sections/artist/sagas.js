import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getArtist } from '@/services/api';
import { getSelectedArtistSection } from './selectors';
import { GET_ARTIST, addArtist, selectArtist, setLoading, throwError } from './';

// Workers
function* loadArtist({ payload: artistId }) {
  yield put(selectArtist(artistId));
  const artistSection = yield select(getSelectedArtistSection);

  if (!artistSection) {
    yield put(setLoading(true));
    try {
      const artist = yield call(getArtist, artistId);
      yield put(addArtist(artist, artistId));
      yield put(selectArtist(artistId));
    } catch ({ status }) {
      yield put(throwError(status));
    }
    yield put(setLoading(false));
  }
}

// Watchers
export function* watchLoadArtist() {
  yield takeLatest(GET_ARTIST, loadArtist);
}

export default {
  watchLoadArtist,
};
