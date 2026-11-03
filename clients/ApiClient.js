const { request } = require('@playwright/test');

class ApiClient {
constructor(baseURL) {
    this.baseURL = baseURL;
}

    async init() {
        this.apiContext = await request.newContext({
        baseURL: this.baseURL
      });
    }

    async get(path) {
        const response = await this.apiContext.get(path);
        return response;
    }

    async dispose() {
        await this.apiContext.dispose();
    }
}

module.exports = ApiClient;