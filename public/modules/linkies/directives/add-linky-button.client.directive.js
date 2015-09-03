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
				scope.messageAdd = 'Add a new Linky !';

				scope.submit = function() {
					if(scope.create()){
						scope.messageAdd = 'New linky added. Click to add another linky.';
						scope.toggleShowForm();
					}
				};
				
				scope.toggleShowForm = function() {
						scope.showForm = !scope.showForm;
				};
			}
		};
	}
]);
