const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
     this.page = page;
  }

  async preencherNome(nome){
     await this.page.getByRole('textbox', { name: 'First Name' })
           .fill(nome);
  }

  async preencherSobrenome(sobreNome){
     await this.page.getByRole('textbox', { name: 'Last Name' })
           .fill(sobreNome);
  }

  async preencherCodigoPostal(codigoPostal){
     await this.page.getByRole('textbox', { name: 'Zip/Postal Code' })
           .fill(codigoPostal);
  }

  async clicarContinuar(){
      await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async validarMensagemErro(mensagemEsperada){
      await expect(this.page.locator('[data-test="error"]'))
         .toHaveText(mensagemEsperada);
  }
}

module.exports = { CheckoutPage };






