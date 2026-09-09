const environment = "https://practicetestautomation.com";

class Environment {
    constructor() {
        this.environment = environment;
    }

    getEnvironment() {
        return this.environment;
    }
}

module.exports = new Environment();