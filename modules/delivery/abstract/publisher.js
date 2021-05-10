class Publisher {
    constructor(config) {
        this.config = config;
        this.transport = {};
    }
    publish(/*recipients, report*/) {
        throw new Error(
            'Publisher: method should be realized in the child class'
        );
    }
}

module.exports = Publisher;
