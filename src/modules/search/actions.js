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

const setLoading = () => dispatch =>
  dispatch({
    type: SET_LOADING,
  });

export const fetchSongs = searchInput => (dispatch) => {
  dispatch(setLoading(true));

  spotifyApi.searchTracks(searchInput)
  .then(({ tracks }) => {
    console.log('Search by ', searchInput, tracks);
  });
};
