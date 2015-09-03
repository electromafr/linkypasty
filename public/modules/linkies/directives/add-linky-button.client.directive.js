'use strict';

angular.module('linkies').directive('addLinkyButton', [
	function() {
		return {
			templateUrl: 'modules/linkies/views/directive-add-linky.client.view.html',
			restrict: 'E',
			scope: '=',
			link: function postLink(scope, element, attrs) {
				// Add linky button directive logic
				scope.showForm = false;

				scope.toggleShowForm = function() {
					if (scope.showForm)
						scope.showForm = false;
					else {
						scope.showForm = true;
					}
				};



			}
		};
	}
]);
