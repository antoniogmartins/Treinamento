const { test, expect } = require('@playwright/test');
const { realizarLogin } = require('../../helpers/login');
const { adicionarProdutosAoCarrinho } = require('../../helpers/produtos');

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

const nomeProdutoParaRemover = 'Sauce Labs Bike Light';

for (const cenario of cenariosLogin) {
    test.beforeEach(async ({ page }) => {
        await realizarLogin(page, cenario.usuario, cenario.senha);
    });

    test('Adicionar Produto ao carrinho', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
        await adicionarProdutosAoCarrinho(page, produtos);

    });

    test('Remover Produto do carrinho', async ({ page }) => {

            const produtoRemover = produtos.find(
                item => item.nome_produto === nomeProdutoParaRemover
            );

            expect(
                produtoRemover,
                `Produto "${nomeProdutoParaRemover}" não encontrado nos dados de teste.`
            ).toBeDefined();

            const nomeProduto = produtoRemover.nome_produto;

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
             // Confirma que no carrinho não existe mais nenhum produto
             await expect(page.locator('.cart_item')).toHaveCount(0);
             // Confirma que o contador não está visível
             await expect(page.locator('.shopping_cart_badge')).toBeHidden();

});
}
