function getBaseUrl({ port, host, protocol }) {
    if (port === 80) {
        return protocol + '://' + host;
    }
    return protocol + '://' + host + ':' + port;
}
module.exports = getBaseUrl;
