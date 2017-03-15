var app = angular.module("StateManagement", []);

// Controller Part
app
		.controller(
				"StateController",
				function($scope, $http) {

					$scope.countries = [];
					$scope.stateForm = {
					 id : -1,
						name : "",
						country_id :""
				
					};

					// Now load the data from server
					_refreshStateData();

					// HTTP POST/PUT methods for add/edit role
					// with the help of id, we are going to find out whether it
					// is put or post operation

					$scope.submitState = function() {

						var method = "";
						var url = "";
						// alert($scope.stateForm.id);
						if ($scope.stateForm.id == -1
								|| $scope.stateForm.id == undefined) {
							// Id is absent in form data, it is create new role
							// operation

							method = "POST";
							url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/state/';
							$http.post(url, {
								"name" : $scope.stateForm.name,
								"country" : $scope.stateForm.country
								
							}).then(_success, _error);

						} else {

							// Id is present in form data, it is edit role
							// operation
							id = $scope.stateForm.id;
							method = "PUT";
							url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/state/'
									+ id;
							$http.put(url, {
								"name" : $scope.stateForm.name,
								"country" : $scope.stateForm.country
								
							}).then(_success, _error);
							$scope.stateForm.id = -1;
						}
						/*
						 * $http({ method : method, url : url, data :
						 * angular.toJson($scope.genderForm), headers : {
						 * 'Content-Type' : 'application/json' } }).then(
						 * _success, _error );
						 */
					};

					// HTTP DELETE- delete role by Id
					$scope.deleteState = function(state) {
						if(confirm("Are you sure to Delete ?") == true){
						$http(
								{
									method : 'DELETE',
									url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/state/'
											+ state.id
								}).then(_success, _error);
						}
					};

					// In case of edit, populate form fields and assign form.id
					// with role id
					$scope.editState = function(state) {

						$scope.stateForm.name = state.name;
						$scope.stateForm.country_id = state.country;
					
						$scope.stateForm.id = state.id;
					};

					/* Private Methods */
					// HTTP GET- get all countries collection
					function _refreshStateData() {
						$http(
								{
									method : 'GET',
									url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/state/'
								}).then(function successCallback(response) {
							// alert(response.data.data)
							$scope.states = response.data.data;
						}, function errorCallback(response) {
							console.log(response.statusText);
						});
					}

					function _success(response) {

						_refreshStateData();
						_clearFormData()
					}

					function _error(response) {

						console.log(response.statusText);
					}

					// Clear the form
					function _clearFormData() {
						// $scope.cityForm.id = -1;
						$scope.stateForm.name = "";
						$scope.stateForm.country = "";
					

					}
					;
				});