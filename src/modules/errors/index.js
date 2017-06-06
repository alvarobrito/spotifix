import { put, fork, take } from 'redux-saga/effects';
import { FETCH_ALBUM_FAILURE } from '@/modules/sections/album';
import { FETCH_ARTIST_FAILURE } from '@/modules/sections/artist';
import { showDialog } from '@/modules/ui/dialog';

// Sagas
function* errorsHandler(code) {
  yield put(showDialog(`ERROR ${code}`));
}

export function* watchErrors() {
  const action = yield take([
    FETCH_ALBUM_FAILURE,
    FETCH_ARTIST_FAILURE,
  ]);
  yield fork(errorsHandler, action.payload);
}
