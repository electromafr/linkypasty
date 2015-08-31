'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	linkies = require('../../app/controllers/linkies.server.controller');

module.exports = function(app) {
	// Linky Routes
	app.route('/linkies')
		.get(linkies.list)
		.post(users.requiresLogin, linkies.create);

	app.route('/linkies/:linkyId')
		.get(linkies.read)
		.put(users.requiresLogin, linkies.hasAuthorization, linkies.update)
		.delete(users.requiresLogin, linkies.hasAuthorization, linkies.delete);

	// Finish by binding the linky middleware
	app.param('linkyId', linkies.linkyByID);
};
