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
      nome_produto: 'Sauce Labs Bike Light',
      preco_produto: '$9.99',
   },
   {
      nome_produto: 'Sauce Labs Bolt T-Shirt',
      preco_produto: '$15.99'
   }
];


for (const cenario of cenariosLogin) {
    test.beforeEach(async ({ page }) => {
        await realizarLogin(page, cenario.usuario, cenario.senha);
    });

    test('02 - Adicionar Produtos ao carrinho', async ({ page }) => {
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
    }); // fecha o

    test('03 - Remover Produto do carrinho', async ({ page }) => {

            const nomeProduto = 'Sauce Labs Backpack';

            const produto = page.locator('.inventory_item')
             .filter({ hasText: nomeProduto });

    // Adiciona o produto
            await produto.getByRole('button', { name: 'Add to cart' }).click();

    // Abre o carrinho
            await page.locator('.shopping_cart_link').click();

    // Confirma que o produto está no carrinho
             const itemCarrinho = page.locator('.cart_item')
             .filter({ hasText: nomeProduto });

             await expect(itemCarrinho).toHaveCount(1);

    // Remove o produto
             await itemCarrinho.getByRole('button', { name: 'Remove' }).click();

    // Confirma que o produto foi removido
              await expect(itemCarrinho).toHaveCount(0);

});
}
