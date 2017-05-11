import { createReducer } from '../../utils/reducers.utils';
import { ADD_TRACKS, SET_LOADING } from './types';

const INIT_STATE = {
  loading: false,
  byId: {},
  tracksIds: [],
};

const searchHandler = {

  [ADD_TRACKS](state, payload) {
    const newById = {
      ...state.byId,
      ...payload,
    };

    const newTracksIds = Object.keys(payload).reduce((prevIds, newId) => {
      if (prevIds.indexOf(newId) !== -1) {
        return prevIds;
      }

      return [...prevIds, newId];
    }, state.tracksIds);

    return Object.assign({}, state, {
      byId: newById,
      tracksIds: newTracksIds,
    });
  },

  [SET_LOADING](state, payload) {
    return Object.assign({}, state, { loading: payload });
  },

};

export default createReducer(INIT_STATE, searchHandler);
