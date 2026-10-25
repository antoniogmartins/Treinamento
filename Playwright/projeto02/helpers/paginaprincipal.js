const { test, expect } = require('@playwright/test');

async function acessarpaginaPrincipal(page) {
     await page.goto('https://www.saucedemo.com/');
     console.log('Título encontrado:', await page.title());
     await page.screenshot({
            path: 'saucedemo-diagnostico.png',
            fullPage: true
     });
     await expect(page).toHaveTitle(/Swag Labs/);
}

module.exports = { acessarpaginaPrincipal };