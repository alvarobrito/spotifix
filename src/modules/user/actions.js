import { get } from '@/utils/request';
import { AUTH_LOGIN } from './types';

function login() {
  return (dispatch) => {
    get({ url }).then((userData) => {
      dispatch({
        type: AUTH_LOGIN,
        payload: userData,
      });
    });
  };
}

export { login };
