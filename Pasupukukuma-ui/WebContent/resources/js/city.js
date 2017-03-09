var app = angular.module("CityManagement", []);

// Controller Part
app
		.controller(
				"CityController",
				function($scope, $http) {

					$scope.countries = [];
					$scope.cityForm = {
					 id : -1,
						name : "",
						country :"",
						state : ""
					};

					// Now load the data from server
					_refreshCityData();

					// HTTP POST/PUT methods for add/edit role
					// with the help of id, we are going to find out whether it
					// is put or post operation

					$scope.submitCity = function() {

						var method = "";
						var url = "";
						// alert($scope.cityForm.id);
						if ($scope.cityForm.id == -1
								|| $scope.cityForm.id == undefined) {
							// Id is absent in form data, it is create new role
							// operation

							method = "POST";
							url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/city/';
							$http.post(url, {
								"name" : $scope.cityForm.name,
								"country" : $scope.cityForm.country,
								"state" : $scope.cityForm.state
							}).then(_success, _error);

						} else {

							// Id is present in form data, it is edit role
							// operation
							id = $scope.cityForm.id;
							method = "PUT";
							url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/city/'
									+ id;
							$http.put(url, {
								"name" : $scope.cityForm.name,
								"country" : $scope.cityForm.country,
								"state" : $scope.cityForm.state
							}).then(_success, _error);
							$scope.cityForm.id = -1;
						}
						/*
						 * $http({ method : method, url : url, data :
						 * angular.toJson($scope.genderForm), headers : {
						 * 'Content-Type' : 'application/json' } }).then(
						 * _success, _error );
						 */
					};

					// HTTP DELETE- delete role by Id
					$scope.deleteCity = function(city) {
						$http(
								{
									method : 'DELETE',
									url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/city/'
											+ city.id
								}).then(_success, _error);
					};

					// In case of edit, populate form fields and assign form.id
					// with role id
					$scope.editCity = function(city) {

						$scope.cityForm.name = city.name;
						$scope.cityForm.country = city.country;
						$scope.cityForm.state = city.state;
						$scope.cityForm.id = city.id;
					};

					/* Private Methods */
					// HTTP GET- get all countries collection
					function _refreshCityData() {
						$http(
								{
									method : 'GET',
									url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/city/'
								}).then(function successCallback(response) {
							// alert(response.data.data)
							$scope.cities = response.data.data;
						}, function errorCallback(response) {
							console.log(response.statusText);
						});
					}

					function _success(response) {

						_refreshCityData();
						_clearFormData()
					}

					function _error(response) {

						console.log(response.statusText);
					}

					// Clear the form
					function _clearFormData() {
						// $scope.cityForm.id = -1;
						$scope.cityForm.name = "";
						$scope.cityForm.country = "";
						$scope.cityForm.state = "";

					}
					;
				});