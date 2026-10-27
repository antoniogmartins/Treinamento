const { expect } = require('@playwright/test');

async function iniciarCheckout(page, quantidadeEsperada) {
   await page.locator('.shopping_cart_link').click();
   await expect(page.locator('.cart_item')).toHaveCount(quantidadeEsperada);
   await page.getByRole('button', { name: 'Checkout' }).click();
}

module.exports = { iniciarCheckout };