'use strict';

angular.module('linkies').directive('addLinkyButton', [
	function() {
		return {
			template: '<div class="add-linky"><a class="btn" href="/#!/linkies/create">Add</a></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Add linky button directive logic
				// ...


			}
		};
	}
]);
