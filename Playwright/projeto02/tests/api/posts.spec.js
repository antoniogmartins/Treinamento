const { test, expect } = require('@playwright/test');

test('Consultar usuários via API', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  expect(response.status()).toBe(200);

  const users = await response.json();

  console.log('Tipo:', typeof users);
  console.log('É array?', Array.isArray(users));
  console.log('Conteúdo:', users);

  expect(Array.isArray(users)).toBe(true);
  expect(users.length).toBeGreaterThan(9);

  for (const user of users) {
       expect(user.id).toBeGreaterThan(0);
       expect(typeof user.id).toBe('number');

       expect(typeof user.name).toBe('string');
       expect(user.name.trim().length).toBeGreaterThan(0);

       expect(typeof user.email).toBe('string');
       expect(user.email.trim().length).toBeGreaterThan(0);
       expect(user.email).toContain('@');
  }
});