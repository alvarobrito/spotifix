import { AUTH_LOGIN } from './types';

function userData(state = {}, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return action.payload;
    default:
      return state;
  }
}

export { userData };
