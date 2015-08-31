'use strict';

// Configuring the Linkies module
angular.module('linkies').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('topbar', 'Linkies', 'linkies', 'dropdown', '/linkies(/create)?');
		Menus.addSubMenuItem('topbar', 'linkies', 'List Linkies', 'linkies');
		Menus.addSubMenuItem('topbar', 'linkies', 'New Linky', 'linkies/create');*/
	}
]);
