var app = angular.module("NakshatramManagement", []);

	//Controller Part
	app
			.controller(
					"NakshatramController",
					function($scope, $http) {

						//$scope.countries = [];
						$scope.nakshatramForm = {
							// id : -1,
							name : "",
							description : "",
							//orderNum : ""
						};

						// Now load the data from server
						_refreshNakshatramData();

						// HTTP POST/PUT methods for add/edit Nakshatram
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitNakshatram = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.nakshatramForm.id == -1
									|| $scope.nakshatramForm.id == undefined) {
								// Id is absent in form data, it is create new Nakshatram
								// operation

								method = "POST";
								url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/nakshatram/';
								$http
										.post(
												url,
												{
													"name" : $scope.nakshatramForm.name,
													"description" : $scope.nakshatramForm.description,
													//"orderNum" : $scope.nakshatramForm.orderNum
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit Nakshatram
								// operation
								id = $scope.nakshatramForm.id;
								method = "PUT";
								url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/nakshatram/'
										+ id;
								$http
										.put(
												url,
												{
													"name" : $scope.nakshatramForm.name,
													"description" : $scope.nakshatramForm.description,
													//"orderNum" : $scope.descriptionForm.orderNum
												}).then(_success, _error);
								$scope.nakshatramForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete nakshatram by Id
						$scope.deleteNakshatram = function(nakshatram) {
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/nakshatram/'
												+ nakshatram.id
									}).then(_success, _error);
						};

						// In case of edit, populate form fields and assign form.id
						// with nakshatram id
						$scope.editNakshatram = function(nakshatram) {

							$scope.nakshatramForm.name = nakshatram.name;
							$scope.nakshatramForm.description = nakshatram.description;
							//$scope.nakshatramForm.orderNum = nakshatram.orderNum;
							$scope.nakshatramForm.id =nakshatram.id;
						};

						/* Private Methods */
						// HTTP GET- get all nakshatram collection
						function _refreshNakshatramData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/nakshatram/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.nakshatrams = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshNakshatramData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.nakshatramForm.name = "";
							$scope.nakshatramForm.description = "";
						//	$scope.nakshatramForm.orderNum = "";

						}
						;
					});
