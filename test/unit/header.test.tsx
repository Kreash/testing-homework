

import React from 'react';

import { render } from '@testing-library/react';

import { Application } from '../../src/client/Application';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CartApi, ExampleApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';

describe('Тест хедера', () => {
  let container: HTMLElement;
  const basename = '/';
  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);
  const app = (
    <BrowserRouter basename={basename}>
      <Provider store={store}>
        <Application />
      </Provider>
    </BrowserRouter>
  );

  beforeEach(() => {
    container = render(app).container;
  });

  test('в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', () => {
    const links = container.querySelectorAll<HTMLLinkElement>('.nav-link');
    const result = Array.from(links).map((link) => link.href)

    expect(result).toEqual([
      `http://localhost/catalog`,
      `http://localhost/delivery`,
      `http://localhost/contacts`,
      `http://localhost/cart`
    ]);
  });

  test('название магазина в шапке должно быть ссылкой на главную страницу', () => {
    const link = container.querySelector<HTMLLinkElement>('.Application-Brand ');

    const result = link?.href ?? ''

    expect(result).toBe('http://localhost/');
  });

  test('при выборе элемента из меню "гамбургера", меню должно закрываться', () => {
    const burger = container.querySelector<HTMLLinkElement>('.Application-Toggler');
    const menu = container.querySelector<HTMLLinkElement>('.Application-Menu');
    const link = container.querySelector<HTMLLinkElement>('.nav-link');

    burger?.click();
    const collapseIsNone = menu?.classList.contains('collapse')
    link?.click();
    const collapseIsExist = menu?.classList.contains('collapse')

    expect(collapseIsNone === false && collapseIsExist === true).toEqual(true);
  });

});
