const { test, expect } = require('@playwright/test');

test('Consultar usuários via API', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  expect(response.status()).toBe(200);

  const users = await response.json();

  expect(Array.isArray(users)).toBe(true);

  expect(users.length).toBeGreaterThan(9);

  for (const user of users) {
   expect(user).toHaveProperty('id');
   expect(user).toHaveProperty('name');
   expect(user).toHaveProperty('username');
   expect(user).toHaveProperty('email');

   expect(
      typeof user.id,
      `ID inválido para o usuário: ${user.name}`
   ).toBe('number');
   expect(Number.isInteger(user.id)).toBe(true);
   expect(user.id).toBeGreaterThan(0);

   expect(typeof user.name).toBe('string');
   expect(user.name.trim().length).toBeGreaterThan(0);
   expect(typeof user.email).toBe('string');
   expect(user.email.trim().length).toBeGreaterThan(0);
   expect(user.email).toMatch(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    );
  }
});