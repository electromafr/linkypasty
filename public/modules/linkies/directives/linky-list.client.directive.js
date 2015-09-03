'use strict';

angular.module('linkies').directive('linkyList', [
	function() {
		return {
			templateUrl: 'modules/linkies/views/directive-linky-list.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				

			}
		};
	}
]);
