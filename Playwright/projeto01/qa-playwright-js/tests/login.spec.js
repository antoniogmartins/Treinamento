const { test, expect } = require('@playwright/test');
//const users = require('./data/users');
const users = require('../data/users');
const LoginPage = require('../pages/loginpage');

test('Deve validar usuario ao tentar acessar a aplicaçao', async ({ page }) => {

    for  (const {username, password} of users) {
        const login = new LoginPage(page);
        await login.goto();
        await login.fillCredentials(username, password);

        await expect(page).toHaveTitle('Test Login | Practice Test Automation1');

     //   const submitButton = login.getByRole('button', { name: 'Submit' });
        await expect(login.submitButton).toBeVisible();
        await login.submit();
        await expect(page).toHaveURL(/practice-test-login/);

}});