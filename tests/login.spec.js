const { test, expect } = require('@playwright/test');
const { realizarLogin } = require('../../helpers/login');
const { acessarpaginaPrincipal } = require('../../helpers/paginaprincipal');

// 1. Dados dos cenários
const cenariosLogin = [
    {
        descricao: '02 - login com credenciais válidas',
        usuario: 'standard_user',
        senha: 'secret_sauce',
        resultado: 'sucesso',
        mensagemEsperada: null,
    },
    {
        descricao: '03 - login com usuário inválido',
        usuario: 'usuario_invalido',
        senha: 'secret_sauce',
        resultado: 'erro',
        mensagemEsperada: 'Username and password do not match any user in this service'
    },
    {
        descricao: '04 - login com senha inválida',
        usuario: 'standard_user',
        senha: '123456',
        resultado: 'erro',
        mensagemEsperada: 'Username and password do not match any user in this service'
    }
];

test.beforeEach(async ({ page }) => {
       await acessarpaginaPrincipal(page);
});

for (const login of cenariosLogin) {
    test(login.descricao, async ({ page }) => {
        await realizarLogin(page, login.usuario, login.senha);

        if (login.resultado === 'sucesso') {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

            await expect(page.getByText('Products', { exact: true })).toBeVisible();

            } else {
                   // Valida a mensagem de erro
                   const mensagemErro = page.locator('[data-test="error"]');

                   await expect(mensagemErro).toBeVisible();

                   await expect(mensagemErro).toContainText(login.mensagemEsperada);

                   console.log(
                       'Mensagem de erro encontrada:',await mensagemErro.textContent()
                   );

                   // Confirma que o usuário permaneceu na página de login
                   await expect(page).toHaveURL('https://www.saucedemo.com/');
               }
           });
       }




