const { test, expect } = require('@playwright/test');

test('deve acessar o Playwright', async ({ page }) => {

    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright1/);

});