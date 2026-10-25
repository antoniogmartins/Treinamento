const { expect } = require('@playwright/test');

async function realizarLogin(page, usuario, senha) {
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByPlaceholder('Username')).toBeVisible()
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await page.locator('#user-name').fill(usuario);
    await page.locator('#password').fill(senha);
    await page.getByRole('button', { name: 'Login' }).click();
}

module.exports = { realizarLogin };