            const { test, expect  } = require('@playwright/test');
            const  ApiClient  = require('../../clients/ApiClient');

            const baseURL =  'https://jsonplaceholder.typicode.com'
            let apiClient;

            test.beforeEach(async () => {
                   apiClient = new ApiClient(baseURL);
                   await apiClient.init();
            });


            test.afterEach(async () => {
              if (apiClient) {
                  await apiClient.dispose();
                  apiClient = undefined;
              }
            });

            test('API-001 - Consultar usuários via API (GET)', async () => {
                  const response = await apiClient.get('/users');
                  const headers = response.headers();
                  const users = await response.json();
                  expect(response.status()).toBe(200);

                  expect(Array.isArray(users)).toBe(true);
                  expect(users).toHaveLength(10);
                  expect(headers['content-type']).toContain('application/json');

                  expect(users[0].id).toBe(1);
                  expect(users[0].name.trim().length).toBeGreaterThan(0);

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
            test('API-001 - Consultar usuário eem especifico (GET)', async () => {
                  const response = await apiClient.get('/users/1');
                  const headers = response.headers();
                  const user = await response.json();
                  expect(response.status()).toBe(200);

                  expect(headers['content-type']).toContain('application/json');

                  expect(user.id).toBe(1);
                  expect(user.name.trim().length).toBeGreaterThan(0);

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
            });
            test('API-003 - Consultar um usuario inexistente (GET)', async () => {
                  const response = await apiClient.get('/users/9999');
                  const body = await response.json();
                  const headers = response.headers();

                  expect(headers['content-type']).toContain('application/json');
                  expect(response.status(),
                             'Esperava HTTP 404 ao consultar um usuário inexistente').toBe(404);
                  expect(body).toEqual({})
            });

            test('API-004 - Consultar um ID inválido representado por texto (GET)', async () => {
                  const response = await apiClient.get('/users/abc');
                  const body = await response.json();

                  const headers = response.headers();

                  expect(headers['content-type']).toContain('application/json');
                  expect(response.status(),
                             'Esperava HTTP 404 ao consultar um id alfanumerico').toBe(404);
                  expect(body).toEqual({})

            });

            test('API-005 - Consultar um ID igual a zero (GET)', async () => {
                  const response = await apiClient.get('/users/0');
                  const body = await response.json();
                  const headers = response.headers();

                  expect(headers['content-type']).toContain('application/json');
                  expect(response.status(),
                             'Esperava HTTP 404 ao consultar um id igual a zero').toBe(404);
                  expect(body).toEqual({})
            });
