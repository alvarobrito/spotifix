import { combineReducers } from 'redux';
import artist from './artist';
import album from './album';
import search from './search';

export default combineReducers({ artist, album, search });
