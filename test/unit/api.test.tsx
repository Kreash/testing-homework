/** @jest-environment node */
import dotenv from 'dotenv'
import axios from 'axios';
import { CartState, CheckoutFormData, CheckoutResponse, Order, Product, ProductShortInfo } from '../../src/common/types';

dotenv.config()
const { URL, BUG_ID = '0'} = process.env

function productShortInfoiSFilled(product: ProductShortInfo) {
  return (product.id || product.id === 0) && product.name && product.price
}

describe('Проверка API', () => {

    it('У полученных продуктов корректно заполнены поля', async () => {
      const { data } = await axios.get<ProductShortInfo[]>(`${URL}/api/products?bug_id=${BUG_ID}`);
      const result = data.every(productShortInfoiSFilled)
      expect(result).toBe(true);
    });

    it('Получен запрашиваемый продукт', async () => {
      const { data } = await axios.get<Product>(`${URL}/api/products/5?bug_id=${BUG_ID}`);
      expect(data.id).toBe(5);
    });

    it('Заказ успешно оформлен', async () => {
      const form: CheckoutFormData = {
        name: '33/33',
        phone: "+333333333333",
        address: '33/33',
      }
      const cart: CartState = {
        5: {
          name: "Handmade Computer",
          price: 377,
          count: 33
      },
      }
        const { data } = await axios.post<CheckoutResponse>(`${URL}/api/checkout?bug_id=${BUG_ID}`, { form, cart });


        const orders = await axios.get<(Order & { id: number })[]>(`${URL}/api/orders`)
        const orderIsAdded = orders.data?.find((item) => item.id === data.id);

        expect(orderIsAdded !== undefined).toBe(true);
    });
});
