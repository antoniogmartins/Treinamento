const { test, expect } = require('@playwright/test');
const { realizarLogin } = require('../../helpers/login');
const { adicionarProdutosAoCarrinho } = require('../../helpers/produtos');
const { iniciarCheckout } = require('../../helpers/iniciarCheckout');
const { CheckoutPage } = require('../../pages/CheckoutPage');

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

const dadosCheckout =
   {
     nome: 'Antonio',
     sobreNome: 'Martins',
     codigoPostal: '20010000'
   };

const subtotalEsperado = produtos.reduce((acumulador, item) => {
    const preco = item.preco_produto.replace('$', '');
    const precoNumerico = Number(preco);
    const total = acumulador + precoNumerico;
    return total;
    }, 0);

const TAXA_IMPOSTO = 0.08;
const impostoEsperado = subtotalEsperado * TAXA_IMPOSTO;
const totalEsperado = subtotalEsperado + impostoEsperado;

const precoTotal =
    {
       tax: impostoEsperado.toFixed(2),
       total: totalEsperado.toFixed(2)
    };

const validacoesCheckout = [
    {
       seletor: '.summary_subtotal_label',
       textoEsperado: `Item total: $${subtotalEsperado.toFixed(2)}`
    },
    {
        seletor: '.summary_tax_label',
        textoEsperado: `Tax: $${precoTotal.tax}`,
    },
    {
        seletor: '.summary_total_label',
        textoEsperado: `Total: $${precoTotal.total}`
    }
];

const cenariosCheckoutNegativo = [
    {
        campo: 'First Name',
        mensagemEsperada: 'Error: First Name is required'
    },
    {
        campo: 'Last Name',
        mensagemEsperada: 'Error: Last Name is required'
    },
    {
        campo: 'Zip/Postal Code',
        mensagemEsperada: 'Error: Postal Code is required'
    }
];

const usuarioTeste = {
    usuario: 'standard_user',
    senha: 'secret_sauce'
};


const quantidadeEsperada = produtos.length;

    test.beforeEach(async ({ page }) => {
        await realizarLogin(page,usuarioTeste.usuario,usuarioTeste.senha);
    });

    test('CT-POS-01 - Validar Resumo do Chekout com 02 Produtos no carrinho', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
        await adicionarProdutosAoCarrinho(page, produtos);

        await iniciarCheckout(page, quantidadeEsperada);

        console.log('Subtotal esperado:', subtotalEsperado);

        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.preencherNome(dadosCheckout.nome);
        await checkoutPage.preencherSobrenome(dadosCheckout.sobreNome);
        await checkoutPage.preencherCodigoPostal(dadosCheckout.codigoPostal);

        await checkoutPage.clicarContinuar();

        await expect(page).toHaveURL(
            'https://www.saucedemo.com/checkout-step-two.html'
            );

        await expect(
            page.getByText('Checkout: Overview', { exact: true })
            ).toBeVisible();

        await expect(page.locator('.cart_item')).toHaveCount(quantidadeEsperada);

        for (const itemproduto of produtos){
        const itemCarrinho = page.locator('.cart_item')
                .filter({ hasText: itemproduto.nome_produto });

        await expect(itemCarrinho)
                 .toContainText(itemproduto.nome_produto);

        }
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
                    path: 'ct-pos-001-validar_resumo_chekout_02_produtos_carrinho.png',
                    fullPage: true
                    });
    });

        test('CT-NEG-01 - Verificar a validação inicial com todos os campos vazios', async ({ page }) => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            await expect(page.getByText('Products', { exact: true })).toBeVisible();

            await adicionarProdutosAoCarrinho(page, produtos);

            await iniciarCheckout(page, quantidadeEsperada);

            const checkoutPage = new CheckoutPage(page);
            await checkoutPage.clicarContinuar();

            await checkoutPage.validarMensagemErro(cenariosCheckoutNegativo[0].mensagemEsperada);

             await expect(page).toHaveURL(
                'https://www.saucedemo.com/checkout-step-one.html'
             );

             await page.screenshot({
                 path: 'ct-neg-001-validar_checkout_para_campo_first_name.png',
                   fullPage: true
                 });

             });

        test('CT-NEG-02 - Verificar a progressão até a validação de Last Name', async ({ page }) => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            await expect(page.getByText('Products', { exact: true })).toBeVisible();

            await adicionarProdutosAoCarrinho(page, produtos);

            await iniciarCheckout(page, quantidadeEsperada);

            const checkoutPage = new CheckoutPage(page);
            await checkoutPage.clicarContinuar();

            await checkoutPage.validarMensagemErro(cenariosCheckoutNegativo[0].mensagemEsperada);

            await expect(page).toHaveURL(
                'https://www.saucedemo.com/checkout-step-one.html'
            );

            await checkoutPage.preencherNome(dadosCheckout.nome);
            await checkoutPage.preencherCodigoPostal(dadosCheckout.codigoPostal);

            await checkoutPage.clicarContinuar();

            await checkoutPage.validarMensagemErro(cenariosCheckoutNegativo[1].mensagemEsperada);

            await expect(page).toHaveURL(
                 'https://www.saucedemo.com/checkout-step-one.html'
            );

            await page.screenshot({
                  path: 'ct-neg-002-validar_checkout_para_campo_last_name.png',
                        fullPage: true
            });
        });

        test('CT-NEG-03 - Verificar a progressão até a validação de Postal Code', async ({ page }) => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            await expect(page.getByText('Products', { exact: true })).toBeVisible();

            await adicionarProdutosAoCarrinho(page, produtos);

            await iniciarCheckout(page, quantidadeEsperada);

            const checkoutPage = new CheckoutPage(page);
            await checkoutPage.clicarContinuar();

          await checkoutPage.validarMensagemErro(cenariosCheckoutNegativo[0].mensagemEsperada);

            await expect(page).toHaveURL(
                    'https://www.saucedemo.com/checkout-step-one.html'
                );

            await checkoutPage.preencherNome(dadosCheckout.nome);
            await checkoutPage.preencherSobrenome(dadosCheckout.sobreNome);

            await checkoutPage.clicarContinuar();

            await checkoutPage.validarMensagemErro(cenariosCheckoutNegativo[2].mensagemEsperada);

            await expect(page).toHaveURL(
                    'https://www.saucedemo.com/checkout-step-one.html'
                );

            await page.screenshot({
                     path: 'ct-neg-003-validar_checkout_para_campo_zip_code.png',
                           fullPage: true
                     });

            });

