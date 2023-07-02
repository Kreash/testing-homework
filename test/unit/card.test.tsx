import { findByText, fireEvent, getAllByRole, screen, waitFor } from '@testing-library/react';
import { renderApp } from './utils/render-app';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

describe('Корзина', () => {
  let container: HTMLElement;
  let history: any;
  let events: UserEvent;
  beforeEach(() => {
    const rendered = renderApp("/catalog/4");
    container = rendered.container;
    history = rendered.history;
    events = rendered.user;
  });

    it('Проверка отправки заказа', async () => {
      const addToCartButton = await screen.findByRole('button', { name: /add to cart/i })
      addToCartButton?.click()
      history.push("/cart")

      const submitButton = await screen.findByRole('button', { name: /Checkout/i })

      const nameInput = container.querySelector<HTMLInputElement>('#f-name');
      if (nameInput) {
        fireEvent.change(nameInput, { target: { value: 'example' } })
      }

      const phoneInput = container.querySelector<HTMLInputElement>('#f-phone');
      if (phoneInput) {
        fireEvent.change(phoneInput, { target: { value: '+333333333333' } })
      }

      const  addressInput = container.querySelector<HTMLInputElement>('#f-address');
      if (addressInput) {
        fireEvent.change(addressInput, { target: { value: 'example' } })
      }
      submitButton.click()

      const wellDone = await screen.findByText('Well done!')
      expect(wellDone !== null).toBe(true)
    });
});
