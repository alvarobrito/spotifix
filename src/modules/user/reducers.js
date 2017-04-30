import { USER_LOGIN } from './types';

function userData(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
    default:
      return state;
  }
}

export default { userData };
