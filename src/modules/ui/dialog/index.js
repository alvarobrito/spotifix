import { createReducer } from '@/utils/reducers.utils';

export const SHOW = 'ui/dialog/SHOW';
export const HIDE = 'ui/dialog/HIDE';

const INIT_STATE = {
  show: false,
  message: 'Default',
};

export default createReducer(INIT_STATE, {
  [SHOW](state, payload) {
    return {
      ...state,
      ...payload,
    };
  },
  [HIDE]() {
    return INIT_STATE;
  },
});

export const showDialog = message => ({
  type: SHOW,
  payload: {
    show: true,
    message,
  },
});

export const hideDialog = () => ({
  type: HIDE,
});
