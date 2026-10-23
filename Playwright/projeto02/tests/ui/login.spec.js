const { test, expect } = require('@playwright/test');

// 1. Dados dos cenários
const cenariosLogin = [
    {
        descricao: '01 - login com credenciais válidas',
        usuario: 'standard_user',
        senha: 'secret_sauce',
        resultado: 'sucesso',
        mensagemEsperada: null,
    },
    {
        descricao: '02 - login com usuário inválido',
        usuario: 'usuario_invalido',
        senha: 'secret_sauce',
        resultado: 'erro',
        mensagemEsperada: 'Username and password do not match any user in this service'
    },
    {
        descricao: '03 - login com senha inválida',
        usuario: 'standard_user',
        senha: '123456',
        resultado: 'erro',
        mensagemEsperada: 'Username and password do not match any user in this service'
    }
];

test('01 - Acessando a pagina', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        console.log('Título encontrado:', await page.title());
        await page.screenshot({
            path: 'saucedemo-diagnostico.png',
            fullPage: true
        });
        await expect(page).toHaveTitle(/Swag Labs/);
});

for (const cenario of cenariosLogin) {
    test(cenario.descricao, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page.getByPlaceholder('Username')).toBeVisible();
        await expect(page.getByPlaceholder('Password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

        await page.locator('#user-name').fill(cenario.usuario);
        await page.locator('#password').fill(cenario.senha);
        await page.getByRole('button', { name: 'Login' }).click();

        if (cenario.resultado === 'sucesso') {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

            await expect(page.getByText('Products', { exact: true })).toBeVisible();

            } else {
                   // Valida a mensagem de erro
                   const mensagemErro = page.locator('[data-test="error"]');

                   await expect(mensagemErro).toBeVisible();

                   await expect(mensagemErro).toContainText(cenario.mensagemEsperada);

                   console.log(
                       'Mensagem de erro encontrada:',await mensagemErro.textContent()
                   );

                   // Confirma que o usuário permaneceu na página de login
                   await expect(page).toHaveURL('https://www.saucedemo.com/');
               }
           });
       }



