const FileTransport = require('./transport/file-transport');
const EmailTransport = require('./transport/email-transport');

class TransportFactory {
    constructor(config) {
        this.config = config;
    }
    create(type) {
        switch (type) {
            case 'file':
                return new FileTransport(this.config.file);
            case 'email':
                return new EmailTransport(this.config.email);
            default:
                throw new Error('TransportFactory: Unknown transport: ' + type);
        }
    }
}

module.exports = TransportFactory;
