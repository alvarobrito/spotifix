import { get } from '@/utils/request';
import config from '@/config';
import { AUTH_LOGIN } from './types';

function login() {
  return (dispatch) => {
    const url = new URL(config.spotify.accounts.auth);
    const params = {
      client_id: config.spotify.clientId,
      client_secret: config.spotify.clientSecret,
      response_type: 'code',
      redirect_uri: config.spotify.accounts.redirectURI,
      scope: config.spotify.scopes.user,
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    get({ url }).then((userData) => {
      dispatch({
        type: AUTH_LOGIN,
        payload: userData,
      });
    });
  };
}

export { login };
