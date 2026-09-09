const { test, expect } = require('@playwright/test');
const name = {
     name: 'Antonio',
     email: 'agmartins2018@gmail.com',
     password: 123456
};

test('deve validar a página inicial do Playwright', async ({  }) => {
    console.log(name);
    console.log(name.name);
    console.log(name.email);
    console.log(name.password);

});
7byScmG8L@mbQHq