import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';

import createBrowserHistory from 'history/createBrowserHistory';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

export const history = createBrowserHistory();

const middleware = () => {

  if (process.env.NODE_ENV === 'production') {

    return applyMiddleware(thunkMiddleware, routerMiddleware(history));

  }

  return applyMiddleware(thunkMiddleware, routerMiddleware(history), createLogger({}));

};

export const store = createStore(rootReducer, compose(
  middleware(),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
