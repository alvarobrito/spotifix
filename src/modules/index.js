import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth';

export default createStore(combineReducers({
  auth,
}), applyMiddleware(thunk));
