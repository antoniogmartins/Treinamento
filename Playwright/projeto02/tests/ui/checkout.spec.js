const { test, expect } = require('@playwright/test');
const { realizarLogin } = require('../../helpers/login');
const { adicionarProdutosAoCarrinho } = require('../../helpers/produtos');

// 1. Dados dos cenários
const cenariosLogin = [
    {
        descricao: '01 - Realizar Login com credenciais válidas',
        usuario: 'standard_user',
        senha: 'secret_sauce',
        resultado: 'sucesso',
        mensagemEsperada: null
    }
];

const produtos = [
   {
      nome_produto: 'Sauce Labs Backpack',
      preco_produto: '$29.99',
   },
   {
      nome_produto: 'Sauce Labs Bolt T-Shirt',
      preco_produto: '$15.99'
   }
];

const dadosCheckout = {
    nome: 'Antonio',
    sobrenome: 'Martins',
    codigoPostal: '20010000'
};

const precoTotal = {
    item_total: '$45.98',
    tax: '$3.68',
    total: '$49.66'
};

const subtotalEsperado = produtos.reduce((acumulador, item) => {
    const preco = item.preco_produto.replace('$', '');
    const precoNumerico = Number(preco);
    const total = acumulador + precoNumerico;
    return total;
}, 0);

const validacoesCheckout = [
    {
        seletor: '.summary_subtotal_label',
       // textoEsperado: `Item total: ${precoTotal.item_total}`
       textoEsperado: `Item total: $${subtotalEsperado.toFixed(2)}`
       },
    {
        seletor: '.summary_tax_label',
        textoEsperado: `Tax: ${precoTotal.tax}`,
    },
    {
        seletor: '.summary_total_label',
        textoEsperado: `Total: ${precoTotal.total}`
    }
];

for (const cenario of cenariosLogin) {
    test.beforeEach(async ({ page }) => {
        await realizarLogin(page, cenario.usuario, cenario.senha);
    });

    test('Validar Resumo do Chekout com 02 Produtos no carrinho', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
        await adicionarProdutosAoCarrinho(page, produtos);


        console.log('Subtotal esperado:', subtotalEsperado);

        await page.locator('.shopping_cart_link').click();
        await expect(page.locator('.cart_item')).toHaveCount(2);
        await page.getByRole('button', { name: 'Checkout' }).click();

        await page.getByRole('textbox', { name: 'First Name' })
             .fill(dadosCheckout.nome);

            await page.getByRole('textbox', { name: 'Last Name' })
                .fill(dadosCheckout.sobrenome);

            await page.getByRole('textbox', { name: 'Zip/Postal Code' })
                .fill(dadosCheckout.codigoPostal);

            await page.getByRole('button', { name: 'Continue' }).click();

            await expect(page).toHaveURL(
                'https://www.saucedemo.com/checkout-step-two.html'
            );

            const itemCarrinho = page.locator('.cart_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            await expect(itemCarrinho)
                 .toContainText('Sauce Labs Backpack');

            const itemoutroCarrinho = page.locator('.cart_item')
                .filter({ hasText: 'Sauce Labs Bolt T-Shirt' });

            await expect(itemoutroCarrinho)
                 .toContainText('Sauce Labs Bolt T-Shirt');

            await expect(
                page.getByText('Checkout: Overview', { exact: true })
            ).toBeVisible();

            await expect(page.locator('.cart_item')).toHaveCount(2);

            /*
            // Capturar e comparar o subtotal
            await expect(page.locator('.summary_subtotal_label'))
            .toHaveText(`Item total: ${precototal.item_total}`);

            // Capturar e comparar a taxa
            await expect(page.locator('.summary_tax_label'))
            .toHaveText(`Tax: ${precototal.tax}`);

            // Capturar e comparar o total
            await expect(page.locator('.summary_total_label'))
            .toHaveText(`Total: ${precototal.total}`);

            ou
            */
            for(const validacao of validacoesCheckout){
                  await expect(page.locator(validacao.seletor))
                       .toHaveText(validacao.textoEsperado);
                       console.log(`Validação aprovada: ${validacao.textoEsperado}`);
            }

             await page.getByRole('button', { name: 'Finish' }).click();

             await expect(page).toHaveURL(/checkout-complete\.html/);


             await expect(
               page.getByText('Thank you for your order!', { exact: true })
             ).toBeVisible();

            await page.screenshot({
                    path: 'saucedemo-diagnostico.png',
                    fullPage: true
                    });
    });

    test('Validar Chekout com dados invalidos', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.getByText('Products', { exact: true })).toBeVisible();

        await adicionarProdutosAoCarrinho(page, produtos);

        await page.locator('.shopping_cart_link').click();
        await expect(page.locator('.cart_item')).toHaveCount(2);
        await page.getByRole('button', { name: 'Checkout' }).click();

        await page.getByRole('button', { name: 'Continue' }).click();

        await expect(page.locator('[data-test="error"]'))
             .toHaveText('Error: First Name is required');

        await page.screenshot({
              path: 'saucedemo-diagnostico0.png',
                   fullPage: true
              });

        await page.getByRole('textbox', { name: 'First Name' })
              .fill('Antonio');

        await page.getByRole('button', { name: 'Continue' }).click();

        await expect(page.locator('[data-test="error"]'))
             .toHaveText('Error: Last Name is required');

        await page.screenshot({
              path: 'saucedemo-diagnostico1.png',
                    fullPage: true
             });

        await page.getByRole('textbox', { name: 'Last Name' })
             .fill('Martins');

        await page.getByRole('button', { name: 'Continue' }).click();

        await expect(page.locator('[data-test="error"]'))
                    .toHaveText('Error: Postal Code is required');

        await page.screenshot({
             path: 'saucedemo-diagnostico2.png',
                   fullPage: true
             });

        await page.getByRole('textbox', { name: 'Zip/Postal Code' })
             .fill('20010000');

        await page.getByRole('button', { name: 'Continue' }).click();

        await page.screenshot({
              path: 'saucedemo-diagnostico3.png',
                          fullPage: true
                    });

        await expect(page).toHaveURL(
             'https://www.saucedemo.com/checkout-step-two.html'
                );

        await page.screenshot({
             path: 'saucedemo-diagnostico4.png',
                   fullPage: true
             });
    });
}
