        const { test, expect  } = require('@playwright/test');
        const  ApiClient  = require('../../clients/ApiClient');

        const baseURL =  'https://jsonplaceholder.typicode.com'
        let apiClient;

        test.beforeEach(async ({ page }) => {
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
           try{
              const response = await apiClient.get('/users');
              const headers = await response.headers();
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

           } finally{
                 await apiClient.dispose();
           }


        });
