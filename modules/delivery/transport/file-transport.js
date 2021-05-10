const fs = require('fs').promises;

class FileTransport {
    constructor({ basePath, folder } = {}) {
        if (!basePath || !folder) {
            throw new Error(
                'FileTransport: basePath and folder should be set in config'
            );
        }
        this.path = basePath + '/' + folder;
    }

    async send(recipient, fileName, fileBuffer) {
        const pathToFile = this.path + '/' + fileName;
        await fs.writeFile(pathToFile, fileBuffer);
        return { pathToFile };
    }
}

module.exports = FileTransport;
