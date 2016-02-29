'use strict';

/* Controllers */

var blogControllers = angular.module('blogControllers', []);
blogControllers.controller('BlogCtrl', [ '$scope', 'BlogList', '$location',
		'checkCreds',
		function BlogCtrl($scope, BlogList, $location, checkCreds) {
			if (!checkCreds()) {
				$location.path('/login');
			}
			BlogList.get({}, function success(response) {
				console.log("Success:" + JSON.stringify(response));
				$scope.blogList = response;
			}, function error(errorResponse) {
				console.log("Error:" + JSON.stringify(errorResponse));
			});
		} ]);

blogControllers.controller('BlogViewCtrl', [
		'$scope',
		'$routeParams',
		'$location',
		'checkCreds',
		'BlogPost',
		function BlogViewCtrl($scope, $routeParams, BlogPost, $location,
				checkCreds) {
			if (!checkCreds()) {
				$location.path('/login');
			}
			var blogId = $routeParams.id;
			BlogPost.get({
				id : blogId
			}, function success(response) {
				console.log("Success:" + JSON.stringify(response));
				$scope.blogEntry = response;
			}, function error(errorResponse) {
				console.log("Error:" + JSON.stringify(errorResponse));
			});

		} ]);

blogControllers.controller('NewBlogCtrl', [
		'$scope',
		'checkCreds',
		'$location',
		'$http',
		'getToken',
		function NewBlogCtrl($scope, checkCreds, $location, $http, getToken) {
			$http.defaults.headers.common['Authorization'] = 'Basic'
					+ getToken();
			Blog.save({}, function success(response) {
				console.log("Success:" + JSON.stringify(response));
				$scope.status = response;
			}, function error(errorResponse) {
				console.log("Error: " + JSON.stringify(errorResponse));
			})

		} ]);

blogControllers.controller('LoginCtrl', [ '$scope', '$location', 'Login',
		'setCreds', 'checkCreds',
		function LoginCtrl($scope, $location, Login, setCreds, checkCreds) {
			if (checkCreds()) {
				$location.path('/');
			}
			$scope.submit = function() {
				$scope.sub = true;
				var postData = {
					"username" : $scope.username,
					"password" : $scope.password
				};
				Login.login({}, postData, function success(response) {
					console.log("Success:" + JSON.stringify(response));
					if (response.authenticated) {
						setCreds($scope.username, $scope.password)
						$location.path('/');
					} else {
						$scope.error = "Login Failed"
					}

				}, function error(errorResponse) {
					console.log("Error:" + JSON.stringify(errorResponse));
				});

			};
		} ]);

blogControllers.controller('LogoutCtrl', [ '$location', 'deleteCreds',
		function LogoutCtrl($location, deleteCreds) {
			deleteCreds();
			$location.path('/login');
		} ]);

/*
 * var helloWorldControllers = angular.module('helloWorldControllers', []);
 * 
 * helloWorldControllers.controller('MainCtrl', [ '$scope', '$location',
 * '$http', function MainCtrl($scope, $location, $http) { $scope.blogArticle =
 * "This is a blog post about AngularJS"; } ]);
 * 
 * helloWorldControllers.controller('CustomerCtrl', [ '$scope', function
 * CustomerCtrl($scope) { $scope.customerName = "Bob's Burgers";
 * $scope.customerNumber = "44522"; // add method to scope $scope.changeCustomer =
 * function() { $scope.customerName = $scope.cName; $scope.customerNumber =
 * $scope.cNumber; }; } ]);
 * 
 * helloWorldControllers.controller('AddCustomerCtrl', [ '$scope', '$location',
 * function AddCustomerCtrl($scope, $location) { $scope.submit = function() {
 * $location.path('/addedCustomer/' + $scope.cName + "/" + $scope.cCity); } }
 * ]);
 * 
 * helloWorldControllers.controller('AddedCustomerCtrl', [ '$scope',
 * '$routeParams', function AddedCustomerCtrl($scope, $routeParams) {
 * $scope.customerName = $routeParams.customer; $scope.customerCity =
 * $routeParams.city; } ]);
 */