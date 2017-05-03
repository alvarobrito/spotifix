import spotifyApi from '@/utils/spotify.api';
import { SET_SONGS, SELECT_SONG, SET_LOADING } from './types';

export const setSongs = songs => dispatch =>
  dispatch({
    type: SET_SONGS,
    payload: songs,
  });

export const selectSong = song => dispatch =>
  dispatch({
    type: SELECT_SONG,
    payload: song,
  });

const setLoading = loading => dispatch =>
  dispatch({
    type: SET_LOADING,
    payload: loading,
  });

export const fetchSongs = searchInput => (dispatch) => {
  dispatch(setLoading(true));

  spotifyApi.searchTracks(searchInput)
  .then(({ tracks: { items } }) => {
    const tracks = items.map(({ id, name: trackName, artists, album: { name: albumName } }) => ({
      id,
      trackName,
      artists,
      albumName,
    }));

    dispatch(setLoading(false));

    dispatch(setSongs(tracks));
  });
};
