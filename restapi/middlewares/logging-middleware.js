'use strict';

const Logger = require('../../modules/logger');
const logger = new Logger('REST API request');

module.exports = (req, res, next) => {
	res.on('finish', () => {
		let params = {
			request_ip: req.socket.remoteAddress,
			request_body: req.body,
			request_params: req.params,
			request_query: req.query,
			request_headers: req.headers,
			response_body: res.body,
			response_headers: res.getHeaders(),
		};

		// authentificated user info
		if (req.project_auth) {
			params.user = {
				id: req.project_auth.id,
				username: req.project_auth.title,
			};
		}

		logger.info(`${req.method} ${req.url} = ${res.statusCode}`, params);
	});

	next();
};
