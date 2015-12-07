(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(HomeFactory) {
		var vm = this;
		
		HomeFactory.getAllPosts().then(function(res) {
			vm.posts = res;
		});
		

		vm.createPost = function() {
			HomeFactory.createPost(vm.post).then(function(res) {
				vm.posts.push(res);
				vm.post = '';
			});
		};


	}
})();
