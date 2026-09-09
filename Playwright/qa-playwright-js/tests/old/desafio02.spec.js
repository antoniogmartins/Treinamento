const { test, expect } = require('@playwright/test');

test('deve validar a página inicial do Playwright', async ({ page }) => {

    await page.goto('https://playwright.dev/');

    // TODO 1: validar a URL
    await expect(page).toHaveURL('https://playwright.dev/');

    // TODO 2: validar o título
    await expect(page).toHaveTitle(/Playwright/);

    // TODO 3: validar algum elemento da página
    const nome = 'Get started';
    const link = page.getByRole('link', { name: nome });
    await expect(link).toBeVisible();

});