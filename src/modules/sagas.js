import { all, fork } from 'redux-saga/effects';
import { watchLoadAlbum } from './sections/album/sagas';
import { watchLoadArtist } from './sections/artist/sagas';

export default function* rootSaga() {
  yield all([
    fork(watchLoadAlbum),
    fork(watchLoadArtist),
  ]);
}
