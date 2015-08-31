'use strict';

// Setting up route
angular.module('linkies').config(['$stateProvider',
	function($stateProvider) {
		// Linkies state routing
		$stateProvider.
		state('listLinkies', {
			url: '/linkies',
			templateUrl: 'modules/linkies/views/list-linkies.client.view.html'
		}).
		state('createLinky', {
			url: '/linkies/create',
			templateUrl: 'modules/linkies/views/create-linky.client.view.html'
		}).
		state('viewLinky', {
			url: '/linkies/:linkyId',
			templateUrl: 'modules/linkies/views/view-linky.client.view.html'
		}).
		state('editLinky', {
			url: '/linkies/:linkyId/edit',
			templateUrl: 'modules/linkies/views/edit-linky.client.view.html'
		});
	}
]);
