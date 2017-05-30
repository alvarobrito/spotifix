import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();
const searchParams = new URLSearchParams(document.location.search);

if (searchParams.has('token')) {
  localStorage.setItem('token', searchParams.get('token'));
} else if (!localStorage.getItem('token')) {
  document.location = '/login';
}

spotifyApi.setAccessToken(localStorage.getItem('token'));

export default spotifyApi;
