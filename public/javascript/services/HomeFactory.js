(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	function HomeFactory($http, $q, $window) {
		var o = {};

		o.getAllPosts = function() {
			var q = $q.defer();
			$http.get('/api/v1/posts').then(function(res) {
				q.resolve(res.data)
			});
			return q.promise;
		};

		o.getMyPosts = function() {
			var q = $q.defer();
			$http.get('api/v1/posts/profile', { headers: { authorization: 'Bearer ' + $window.localStrorage.getItem('token')}
			}).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.createPost = function(post) {
			var post_obj = { message: post };
			var q = $q.defer();
			$http.post('/api/v1/posts', post_obj, {
				headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
			}).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		return o;
	}
})();
