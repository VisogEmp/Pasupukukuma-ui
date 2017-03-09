	var app = angular.module("CountryManagement", []);

	//Controller Part
	app
			.controller(
					"CountryController",
					function($scope, $http) {

						$scope.countries = [];
						$scope.countryForm = {
							// id : -1,
							name : "",
							code : "",
							//orderNum : ""
						};

						// Now load the data from server
						_refreshCountryData();

						// HTTP POST/PUT methods for add/edit role
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitCountry = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.countryForm.id == -1
									|| $scope.countryForm.id == undefined) {
								// Id is absent in form data, it is create new role
								// operation

								method = "POST";
								url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/country/';
								$http
										.post(
												url,
												{
													"name" : $scope.countryForm.name,
													"code" : $scope.countryForm.code,
													//"orderNum" : $scope.countryForm.orderNum
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit role
								// operation
								id = $scope.countryForm.id;
								method = "PUT";
								url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/country/'
										+ id;
								$http
										.put(
												url,
												{
													"name" : $scope.countryForm.name,
													"code" : $scope.countryForm.code,
													//"orderNum" : $scope.countryForm.orderNum
												}).then(_success, _error);
								$scope.countryForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete role by Id
						$scope.deleteCountry = function(country) {
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/country/'
												+ country.id
									}).then(_success, _error);
						};

						// In case of edit, populate form fields and assign form.id
						// with role id
						$scope.editCountry = function(country) {

							$scope.countryForm.name = country.name;
							$scope.countryForm.code = country.code;
							//$scope.countryForm.orderNum = country.orderNum;
							$scope.countryForm.id =country.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshCountryData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/country/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.countrys = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshCountryData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.countryForm.name = "";
							$scope.countryForm.code = "";
						//	$scope.countryForm.orderNum = "";

						}
						;
					});
