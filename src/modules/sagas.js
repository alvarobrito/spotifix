import { all, fork } from 'redux-saga/effects';
import { watchErrors } from './errors/sagas';
import { watchLoadAlbum } from './sections/album/sagas';
import { watchLoadArtist } from './sections/artist/sagas';

export default function* rootSaga() {
  yield all([
    fork(watchErrors),
    fork(watchLoadAlbum),
    fork(watchLoadArtist),
  ]);
}
