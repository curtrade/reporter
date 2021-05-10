class Report {
    constructor(title, format, content, encoding = 'utf-8') {
        this._title = title;
        this._format = format;
        this._buffer = Buffer.from(content, encoding);
        this._encoding = encoding;
    }

    get title() {
        return this._title;
    }

    get fileName() {
        return `${this._title}.${this._format}`;
    }

    get fileBuffer() {
        return this._buffer;
    }

    get encoding() {
        return this._encoding;
    }

    toString() {
        return {
            title: this.title,
            fileName: this.fileName,
            fileBuffer: this.fileBuffer.toString(),
            encoding: this.encoding
        };
    }
}

module.exports = Report;
