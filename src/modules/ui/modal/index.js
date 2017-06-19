import { put, takeEvery } from 'redux-saga/effects';
import { createReducer } from '@/utils/reducers.utils';

// Actions
const SET_MODAL = 'ui/modal/SET_MODAL';
const RESET_MODAL = 'ui/modal/RESET_MODAL';

// @effect Actions
const OPEN_MODAL = '@effect/ui/modal/OPEN_MODAL';

// Initial State
const INIT_STATE = {
  active: null,
  props: {},
};

// Reducers
export default createReducer(INIT_STATE, {
  [SET_MODAL](state, payload) {
    return {
      ...state,
      ...payload,
    };
  },
  [RESET_MODAL]() {
    return INIT_STATE;
  },
});

// Action Creators
export const setModal = modal => ({
  type: SET_MODAL,
  payload: modal,
});

export const resetModal = () => ({
  type: RESET_MODAL,
});

export const openModal = (type, props) => ({
  type: OPEN_MODAL,
  payload: {
    active: type,
    props,
  },
});

// Sagas
function* launchModal({ payload }) {
  yield put(setModal(payload));
}

export function* watchLaunchModal() {
  yield takeEvery(OPEN_MODAL, launchModal);
}
