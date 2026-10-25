const { test, expect } = require('@playwright/test');

async function adicionarProdutosAoCarrinho(page, produtos){
for (const [indice, item] of produtos.entries()) {
    const produto = page.locator('.inventory_item')
        .filter({ hasText: item.nome_produto });

    await expect(produto).toHaveCount(1);

    await expect(produto.locator('.inventory_item_name'))
        .toHaveText(item.nome_produto);

    const precoProduto = produto.locator('.inventory_item_price');

    await expect(precoProduto).toHaveText(item.preco_produto);

    await produto.getByRole('button', { name: 'Add to cart' }).click();

    await expect(page.locator('.shopping_cart_badge'))
        .toHaveText(String(indice + 1));
}
}

module.exports = { adicionarProdutosAoCarrinho};