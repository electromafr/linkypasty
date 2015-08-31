'use strict';

(function() {
	// Linkies Controller Spec
	describe('Linkies Controller Tests', function() {
		// Initialize global variables
		var LinkiesController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Linkies controller.
			LinkiesController = $controller('LinkiesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one linky object fetched from XHR', inject(function(Linkies) {
			// Create sample linky using the Linkies service
			var sampleLinky = new Linkies({
				title: 'An Linky about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample linkies array that includes the new linky
			var sampleLinkies = [sampleLinky];

			// Set GET response
			$httpBackend.expectGET('linkies').respond(sampleLinkies);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.linkies).toEqualData(sampleLinkies);
		}));

		it('$scope.findOne() should create an array with one linky object fetched from XHR using a linkyId URL parameter', inject(function(Linkies) {
			// Define a sample linky object
			var sampleLinky = new Linkies({
				title: 'An Linky about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.linkyId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/linkies\/([0-9a-fA-F]{24})$/).respond(sampleLinky);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.linky).toEqualData(sampleLinky);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Linkies) {
			// Create a sample linky object
			var sampleLinkyPostData = new Linkies({
				title: 'An Linky about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample linky response
			var sampleLinkyResponse = new Linkies({
				_id: '525cf20451979dea2c000001',
				title: 'An Linky about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Linky about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('linkies', sampleLinkyPostData).respond(sampleLinkyResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the linky was created
			expect($location.path()).toBe('/linkies/' + sampleLinkyResponse._id);
		}));

		it('$scope.update() should update a valid linky', inject(function(Linkies) {
			// Define a sample linky put data
			var sampleLinkyPutData = new Linkies({
				_id: '525cf20451979dea2c000001',
				title: 'An Linky about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock linky in scope
			scope.linky = sampleLinkyPutData;

			// Set PUT response
			$httpBackend.expectPUT(/linkies\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/linkies/' + sampleLinkyPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid linkyId and remove the linky from the scope', inject(function(Linkies) {
			// Create new linky object
			var sampleLinky = new Linkies({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new linkies array and include the linky
			scope.linkies = [sampleLinky];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/linkies\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLinky);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.linkies.length).toBe(0);
		}));
	});
}());
