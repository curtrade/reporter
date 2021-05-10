'use strict';

const ExtraError = require('./extra-error');

class ApiError extends ExtraError {
	constructor(...args) {
		super(...args);
		this._code = 500;
	}

	get statuscode() {
		return this._code;
	}
}

module.exports = ApiError;
