import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppContainer } from 'react-hot-loader';
import { I18n } from 'react-i18next';

import 'src/styles/semantic-ui/semantic.less';
import 'src/styles/custom/main.less';

import { store, persistor, history } from 'src/store';
import AppRoutes from 'src/routes/app';

import 'src/i18n';
import { Dimmer, Loader } from 'semantic-ui-react';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Dimmer inverted active><Loader /></Dimmer>}>
          <ConnectedRouter history={history}>
            <I18n ns="translations">
              {
                (t, { i18n }) => <Component translate={t} t={t} i18n={i18n} />
              }
            </I18n>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

document.addEventListener('DOMContentLoaded', () => {
  render(AppRoutes);
});

if (module.hot) {
  module.hot.accept('./routes/app', () => {
    render(AppRoutes).catch((e) => console.error(e));

    render(require('src/routes/app')).catch((e) => console.error(e));
  });
}
