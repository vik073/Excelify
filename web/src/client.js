// Imports
import axios from 'axios';
import React from 'react';
import { hydrate } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { ensureReady, After } from '@jaredpalmer/after';
import { StoreProvider } from 'easy-peasy';

// UI imports
import 'ui/common/utility.css';
import 'ui/common/animation.css';
import 'ui/common/layout.css';

// App imports
import params from 'setup/config/params';
import routes from 'setup/routes';
import store from 'setup/store';
import {
  loginSetUserLocalStorage,
  logout
} from 'modules/user/api/actions/query';

// User Authentication
const token = window.localStorage.getItem('token');
if (token && token !== 'undefined' && token !== '') {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (user) {
    loginSetUserLocalStorage(token, user);
    store.getActions().user.authSet(user);
  }
}

// Logout if account disabled/deleted
axios.interceptors.response.use(function(response) {
  if (response.data.code === params.common.errors.auth) {
    logout();
    store.getActions().user.authReset();
  }
  return response;
});

// Client
ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <StoreProvider store={store}>
        <After data={data} routes={routes} />
      </StoreProvider>
    </BrowserRouter>,

    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
