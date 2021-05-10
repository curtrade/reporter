const Report = require('../report');
const Publisher = require('./abstract/publisher');
const TransportFactory = require('./transport-factory');

class Delivery extends Publisher {
    constructor(config) {
        super(config);
    }

    getTransport(type) {
        if (this.transport[type]) {
            return this.transport[type];
        }

        const transportFactory = new TransportFactory(this.config);
        const currentTransport = transportFactory.create(type);

        this.transport[type] = currentTransport;
        return currentTransport;
    }

    async publish(recipients, report) {
        if (Array.isArray(recipients) === false) {
            throw new Error('Delivery: recipients should be an array');
        }
        if (recipients.length === 0) {
            throw new Error('Delivery: recipients is empty');
        }
        if (report instanceof Report === false) {
            throw new Error('Delivery: report should be instance of Report');
        }

        for (const recipient of recipients) {
            try {
                this.results = [];
                const transport = this.getTransport(recipient.transport);

                const result = await transport.send(
                    recipient.address,
                    report.fileName,
                    report.fileBuffer
                );

                this.results.push(result);
            } catch (e) {
                this.errors = this.errors ? [...this.errors, e] : [e];
            }

            return Promise.all(this.results);
        }
    }
}

module.exports = Delivery;
