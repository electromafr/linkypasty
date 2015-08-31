'use strict';

// Linkies controller
angular.module('linkies').controller('LinkiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Linkies',
	function($scope, $stateParams, $location, Authentication, Linkies) {
		$scope.authentication = Authentication;

		// Create new Linky
		$scope.create = function() {
			// Create new Linky object
			var linky = new Linkies({
				title: this.title,
				link: this.link,
				description: this.description
			});

			// Redirect after save
			linky.$save(function(response) {
				$location.path('linkies/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.link = '';
				$scope.description = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Linky
		$scope.remove = function(linky) {
			if (linky) {
				linky.$remove();

				for (var i in $scope.linkies) {
					if ($scope.linkies[i] === linky) {
						$scope.linkies.splice(i, 1);
					}
				}
			} else {
				$scope.linky.$remove(function() {
					$location.path('linkies');
				});
			}
		};

		// Update existing Linky
		$scope.update = function() {
			var linky = $scope.linky;

			linky.$update(function() {
				$location.path('linkies/' + linky._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Linkies
		$scope.find = function() {
			$scope.linkies = Linkies.query();
		};

		// Find existing Linky
		$scope.findOne = function() {
			$scope.linky = Linkies.get({
				linkyId: $stateParams.linkyId
			});
		};
	}
]);
