export default {
  spotify: {
    clientId: '7afafb6c27a84b27a229e2ba0b8432dd',
    clientSecret: '461ca36860be4b1fb7907ad06ec262ff',
    scopes: {
      user: 'playlist-read-private playlist-modify-private',
      client: '',
    },
    api: 'https://api.spotify.com/v1/',
    accounts: {
      auth: 'https://accounts.spotify.com/authorize',
      token: 'https://accounts.spotify.com/api/token',
      redirectURI: 'http://localhost:8080/callback',
    },
    endpoints: {
      user: 'me',
    },
  },
  routes: {},
};
