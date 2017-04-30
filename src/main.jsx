import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { render } from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import thunk from 'redux-thunk';
import reducers from '@/modules';
import SearchContainer from '@/containers/SearchContainer';
import authRedirectMiddleware from '@/middlewares/auth';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middlewareRouter = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(middlewareRouter, authRedirectMiddleware, thunk),
);

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <Provider store={store}>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
        <Route exact path="/" component={SearchContainer} />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app'),
);
