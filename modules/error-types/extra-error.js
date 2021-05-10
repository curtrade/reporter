'use strict';

class ExtraError extends Error {
	constructor(message, params) {
		super(message);
		this._shortmessage = message; //todo: остановился
		if (params && typeof params === 'object') {
			this._params = params;
		} else {
			this._params = {};
		}
	}
	get params() {
		return this._params;
	}
	get shortmessage() {
		return this._shortmessage;
	}
}

module.exports = ExtraError;
