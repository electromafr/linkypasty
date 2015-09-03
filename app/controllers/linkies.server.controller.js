'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Linky = mongoose.model('Linky'),
	_ = require('lodash');

/**
 * Create a linky
 */
exports.create = function(req, res) {
	var linky = new Linky(req.body);
	linky.user = req.user;

	linky.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			linky.user = req.user;
			res.json({created : linky});
		}
	});
};

/**
 * Show the current linky
 */
exports.read = function(req, res) {
	res.json(req.linky);
};

/**
 * Update a linky
 */
exports.update = function(req, res) {
	var linky = req.linky;

	linky = _.extend(linky, req.body);

	linky.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(linky);
		}
	});
};

/**
 * Delete an linky
 */
exports.delete = function(req, res) {
	var linky = req.linky;

	linky.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(linky);
		}
	});
};

/**
 * List of Linkies
 */
exports.list = function(req, res) {
	Linky.find({'user': req.user.id }).sort('-created').populate('user', 'username').exec(function(err, linkies) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(linkies);
		}
	});
};

/**
 * Linky middleware
 */
exports.linkyByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Linky is invalid'
		});
	}

	Linky.findById(id).populate('user', 'username').exec(function(err, linky) {
		if (err) return next(err);
		if (!linky) {
			return res.status(404).send({
				message: 'Linky not found'
			});
		}
		req.linky = linky;
		next();
	});
};

/**
 * Linky authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.linky.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
