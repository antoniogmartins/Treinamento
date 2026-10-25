const { test, expect } = require('@playwright/test');
const { realizarLogin } = require('../../helpers/login');


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

const precototal = {
    item_total: '$45.98',
    tax: '$3.68',
    total: '$49.66'
};

const validacoesCheckout = [
    {
        seletor: '.summary_subtotal_label',
        textoEsperado: `Item total: ${precototal.item_total}`
    },
    {
        seletor: '.summary_tax_label',
        textoEsperado: `Tax: ${precototal.tax}`,
    },
    {
        seletor: '.summary_total_label',
        textoEsperado: `Total: ${precototal.total}`
    }
];

for (const cenario of cenariosLogin) {
    test.beforeEach(async ({ page }) => {
        await realizarLogin(page, cenario.usuario, cenario.senha);
    });

    test('Validar Resumo do Chekout com 02 Produtos no carrinho', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.getByText('Products', { exact: true })).toBeVisible();

        for (const [indice, item] of produtos.entries()) {
            const produto = page.locator('.inventory_item')
                .filter({ hasText: item.nome_produto });

            await expect(produto).toHaveCount(1);

            await expect(produto.locator('.inventory_item_name'))
                .toHaveText(item.nome_produto);

            const precoProduto = produto.locator('.inventory_item_price');

            await expect(precoProduto).toHaveText(item.preco_produto);

            const precoCapturado = await precoProduto.textContent();
            console.log('Preço capturado:', precoCapturado);

            await produto.getByRole('button', { name: 'Add to cart' }).click();

            await expect(page.locator('.shopping_cart_badge'))
                .toHaveText(String(indice + 1));
           } // fecha o for dos produtos

            await page.locator('.shopping_cart_link').click();
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

            const itemCarrinho1 = page.locator('.cart_item')
                .filter({ hasText: 'Sauce Labs Backpack' });

            await expect(itemCarrinho1)
                 .toContainText('Sauce Labs Backpack');

            const itemCarrinho2 = page.locator('.cart_item')
                .filter({ hasText: 'Sauce Labs Bolt T-Shirt' });

            await expect(itemCarrinho2)
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
            }

            await page.screenshot({
                    path: 'saucedemo-diagnostico.png',
                    fullPage: true
                    });
    });


}
