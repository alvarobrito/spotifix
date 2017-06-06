import { put, fork, take } from 'redux-saga/effects';
import { FETCH_ALBUM_FAILURE } from '@/modules/sections/album';
import { FETCH_ARTIST_FAILURE } from '@/modules/sections/artist';
import { showDialog, hideDialog } from '@/modules/ui/dialog';

// Workers
function* errorsHandler(code) {
  yield put(hideDialog());
  yield put(showDialog(`ERROR ${code}`));
}

// Watchers
export function* watchErrors() {
  const action = yield take([
    FETCH_ALBUM_FAILURE,
    FETCH_ARTIST_FAILURE,
  ]);
  yield fork(errorsHandler, action.payload);
}

export default {
  watchErrors,
};
