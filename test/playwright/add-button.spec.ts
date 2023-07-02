import { test, expect } from '@playwright/test';

test('Кнопка добавления продукта имеет верные стили', async ({ page }) => {
  await page.goto('http://localhost:3000/hw/store/catalog/0');
  const addButton = page.getByRole('button', { name: 'Add to Cart' });
  await expect(addButton).toHaveClass(/btn-lg/);
});
