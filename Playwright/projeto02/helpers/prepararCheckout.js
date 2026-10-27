const { expect } = require('@playwright/test');
const { adicionarProdutosAoCarrinho } = require('../helpers/produtos');
const { iniciarCheckout } = require('../helpers/iniciarCheckout');

async function prepararCheckoutPage(page, produtos, quantidadeEsperada) {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
        await adicionarProdutosAoCarrinho(page, produtos);
        await iniciarCheckout(page, quantidadeEsperada);
}
module.exports = { prepararCheckoutPage };