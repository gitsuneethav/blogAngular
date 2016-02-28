'use strict';

/* Controllers */

var blogControllers = angular.module('blogControllers', []);
blogControllers.controller('BlogCtrl', [ '$scope', 'BlogList',
		function BlogCtrl($scope, BlogList) {
			BlogList.get({}, function success(response) {
				console.log("Success:" + JSON.stringify(response));
				$scope.blogList = response;
			}, function error(errorResponse) {
				console.log("Error:" + JSON.stringify(errorResponse));
			});
		} ]);

blogControllers.controller('BlogViewCtrl', [ '$scope', '$routeParams',
		'BlogPost', function BlogViewCtrl($scope, $routeParams, BlogPost) {
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

		} ])

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