import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux';
import { appStore } from './redux';
import Routes from './routes'

ReactDOM.render(
  <AppContainer>
    <Provider store={appStore}>
      <Routes />
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);

// Hot Module Replacement API
if (module.hot) {

  module.hot.accept('./app', () => {

    const NextApp = require('./app').default;
    ReactDOM.render(
      <AppContainer>
        <Provider appStore={appStore}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('app')
    );

  });

}
