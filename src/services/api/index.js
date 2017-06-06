import SpotifyWebApi from 'spotify-web-api-js';
import { normalize } from 'normalizr';
import schema from './schema';

const spotifyApi = new SpotifyWebApi();

const getAlbum = albumId =>
  spotifyApi.getAlbum(albumId)
  .then(data => normalize({ id: data }, schema.ALBUM_SECTION));

async function getArtist(artistId) {
  const [id, { items: albums }, { tracks: topTracks }, { artists: relatedArtists }]
  = await Promise.all([
    spotifyApi.getArtist(artistId),
    spotifyApi.getArtistAlbums(artistId),
    spotifyApi.getArtistTopTracks(artistId, 'ES'),
    spotifyApi.getArtistRelatedArtists(artistId),
  ]);
  return normalize({ id, albums, topTracks, relatedArtists }, schema.ARTIST_SECTION);
}

const searchTracks = (value, offset) =>
  spotifyApi.searchTracks(value, offset)
  .then(({ tracks: { items: tracks } }) => normalize({ tracks }, schema.SEARCH_SECTION));

// TODO it will be removed until to have a new authorize service
(function auth() {
  const searchParams = new URLSearchParams(document.location.search);

  if (searchParams.has('token')) {
    localStorage.setItem('token', searchParams.get('token'));
  } else if (!localStorage.getItem('token')) {
    document.location = '/login';
  }

  spotifyApi.setAccessToken(localStorage.getItem('token'));
}());

export default {
  getAlbum,
  getArtist,
  searchTracks,
};
