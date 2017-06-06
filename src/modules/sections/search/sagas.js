import { put, call, takeEvery, select, throttle } from 'redux-saga/effects';
import { searchTracks } from '@/services/api';
import { GET, GET_MORE, setLoading, addSearchTracks, resetTracks, setSearchInput, addOffset, throwError } from './';

// Workers
function* getTracks() {
  const { sections: { search: { searchInput, offset } } } = yield select();

  yield put(setLoading(true));

  try {
    const tracks = yield call(searchTracks, [searchInput, offset]);

    yield put(addSearchTracks(tracks));
  } catch ({ status, statusText }) {
    yield put(throwError({ status, statusText }));
  }

  yield put(setLoading(false));
}

function* fetchSongs({ payload: searchInput }) {
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

function* fetchMoreSongs() {
  yield put(addOffset());
  yield call(getTracks);
}

// Watchers
export function* watchFetchSongs() {
  yield throttle(300, GET, fetchSongs);
}

export function* watchFetchMoreSongs() {
  yield takeEvery(GET_MORE, fetchMoreSongs);
}

export default {
  watchFetchSongs,
  watchFetchMoreSongs,
};
