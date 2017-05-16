import { combineReducers } from 'redux';
import artist from './artist';
import album from './album';

export default combineReducers({ artist, album });
