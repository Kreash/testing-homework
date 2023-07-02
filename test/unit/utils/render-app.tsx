
import React from 'react';

import { Application } from '../../../src/client/Application';
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initStore } from '../../../src/client/store';
import { CartApi } from '../../../src/client/api';
import { render } from '@testing-library/react';
import events from '@testing-library/user-event'
import { ExampleApiMock } from './example.api.mock';
import { createMemoryHistory } from 'history';

export function renderApp (route: string) {

  const basename = '/';
  const store = initStore(new ExampleApiMock(basename), new CartApi());
  const history = createMemoryHistory({initialEntries: [route]});

  const app = (
    <MemoryRouter initialEntries={[route]} initialIndex={0} >
      <Router history={history}>
      <Provider store={store}>
        <Application />
      </Provider>
      </Router>

    </MemoryRouter>
  );

  return {
    user: events.setup(),
    basename,
    history,
    ...render(app)
  };
};
