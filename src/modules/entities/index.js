import { combineReducers } from 'redux';
import artists from './artists';
import albums from './albums';

export default combineReducers({ artists, albums });
