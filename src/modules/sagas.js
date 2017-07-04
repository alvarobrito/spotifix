import { all, fork } from 'redux-saga/effects';
import { watchErrors } from './errors';
import { watchLaunchModal } from './ui/modal';
import { watchLoadAlbum } from './sections/album';
import { watchLoadArtist } from './sections/artist';
import { watchLoadGenres } from './sections/genres';
import { watchFetchSongs } from './sections/search';

export default function* rootSaga() {
  yield all([
    fork(watchErrors),
    fork(watchLaunchModal),
    fork(watchLoadGenres),
    fork(watchLoadAlbum),
    fork(watchLoadArtist),
    fork(watchFetchSongs),
  ]);
}
