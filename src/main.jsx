import React from 'react';
import { render } from 'react-dom';
import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '@/modules/reducers';
import sagas from '@/modules/sagas';
import Routes from '@/routes';

// styles
import '@/styles/index.css';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middlewareRouter = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeEnhancers(
    applyMiddleware(middlewareRouter, thunk, sagaMiddleware, logger),
  ),
);

// then run the saga
sagaMiddleware.run(sagas);

render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('app'),
);
