import spotifyApi from '@/utils/spotify.api';
import { addArtists } from '@/modules/artists/actions';
import { ADD_ALBUMS, SET_ALBUMS, SET_LOADING } from './types';

function normalize(data) {
  return data.reduce((acc, { id, name, images, artists }) => ({
    ...acc,
    [id]: {
      id,
      name,
      images,
      artists: artists.map(artist => artist.id),
    },
  }), {});
}

function withAlbums(items) {
  return items.reduce((acc, { id: albumId, artists }) => {
    const artistWithAlbums = artists.map(artist => ({
      ...artist,
      albums: [albumId],
    }));
    return acc.concat(artistWithAlbums);
  }, []).reduce((acc, val) => {
    if (!acc.some(a => a.id === val.id)) {
      acc.push(val);
    } else {
      acc.map((artist) => {
        if (artist.id === val.id) {
          artist.albums = [...artist.albums, ...val.albums];
        }
        return artist;
      });
    }
    return acc;
  }, []);
}
// Creators
const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

const addAlbums = albums => ({
  type: ADD_ALBUMS,
  payload: normalize(albums),
});

const setAlbums = albums => ({
  type: SET_ALBUMS,
  payload: normalize(albums),
});


const fetchAlbum = albumId => (dispatch) => {
  dispatch(setLoading(true));
  spotifyApi.getAlbum(albumId, (error, album) => {
    dispatch(addAlbums([album]));
    dispatch(setLoading(false));
  });
};

const fetchAlbums = albumIds => (dispatch) => {
  dispatch(setLoading(true));
  spotifyApi.getAlbums(albumIds, (error, { albums }) => {
    dispatch(setAlbums(albums));
    dispatch(setLoading(false));
  });
};

const fetchArtistAlbums = artistId => (dispatch) => { // TODO move it to artists module
  dispatch(setLoading(true));
  spotifyApi.getArtistAlbums(artistId, (error, { items }) => {
    dispatch(setAlbums(items));
    dispatch(addArtists(withAlbums(items)));
    dispatch(setLoading(false));
  });
};

export { setLoading, addAlbums, setAlbums, fetchAlbum, fetchAlbums, fetchArtistAlbums };
