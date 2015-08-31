'use strict';

//Linkies service used for communicating with the linkies REST endpoints
angular.module('linkies').factory('Linkies', ['$resource',
	function($resource) {
		return $resource('linkies/:linkyId', {
			linkyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
