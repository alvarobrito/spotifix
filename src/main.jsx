import React from 'react';
import { render } from 'react-dom';
import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import authRedirectMiddleware from '@/middlewares/auth';
import reducers from '@/modules';
import sections from '@/modules/sections';
import entities from '@/modules/entities';
import Routes from './routes';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middlewareRouter = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    sections,
    entities,
    ...reducers,
    router: routerReducer,
  }),
  composeEnhancers(
    applyMiddleware(middlewareRouter, authRedirectMiddleware, thunk, logger),
  ),
);

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Routes history={history} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app'),
);
