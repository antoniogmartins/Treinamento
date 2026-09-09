const environment = require('../environment/environment');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.getByLabel('Username');
        this.password = page.getByLabel('Password');
        this.submitButton = this.page.getByRole('button', {
             name: 'Submit'
        });
    }

    async goto() {
        await this.page.goto(environment.getEnvironment()+ '/practice-test-login/');
    }

    async fillCredentials(username, password) {
            await this.username.fill(username);
            await this.password.fill(password);
        }
    async submit() {
        await this.submitButton.click();
    }
};
module.exports = LoginPage;