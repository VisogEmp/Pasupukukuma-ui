  
	var app = angular.module("GenderManagement", ["ngStorage"]);

	//Controller Part
	
	app.controller("GenderController",function($scope, $http, $sessionStorage) {

		
		var config="";
    	
    	
		config = {headers:  {
			 'Content-Type':'application/json',
	        'Accept': 'application/json;odata=verbose',
	        'X-Session-Id': $sessionStorage.SessionUser
	    }
	};
		
		
		
		
						//$scope.countries = [];
						$scope.genderForm = {
							// id : -1,
							name : "",
							code : "",
							description : ""
						};

						// Now load the data from server
						_refreshGenderData();

						// HTTP POST/PUT methods for add/edit role
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitGender = function() {

							var method = "";
							var url = "";
							 reqBody={ "name": $scope.genderForm.name, "description" : $scope.genderForm.description };
							// alert($scope.genderForm.id);
							if ($scope.genderForm.id == -1
									|| $scope.genderForm.id == undefined) {
								// Id is absent in form data, it is create new role
								// operation

								method = "POST";
								url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/gender/';
								$http
										.post(
												url,
												{
													"name" : $scope.genderForm.name,
													"code" : $scope.genderForm.code,
													"description" : $scope.genderForm.description
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit role
								// operation
								id = $scope.genderForm.id;
								method = "PUT";
								url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/gender/'
										+ id;
								$http
										.put(
												url,
												{
													"name" : $scope.genderForm.name,
													"code" : $scope.genderForm.code,
													"description" : $scope.genderForm.description
												}).then(_success, _error);
								$scope.genderForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete role by Id
						$scope.deleteGender = function(gender) {
							if(confirm("Are you sure to Delete ?") == true){
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/gender/'
												+ gender.id
									}).then(_success, _error);
							}
						};

						// In case of edit, populate form fields and assign form.id
						// with role id
						$scope.editGender = function(gender) {

							$scope.genderForm.name = gender.name;
							$scope.genderForm.code = gender.code;
							$scope.genderForm.description = gender.description;
							$scope.genderForm.id = gender.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshGenderData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/gender/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.genders = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshGenderData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.genderForm.name = "";
							$scope.genderForm.code = "";
							$scope.genderForm.description = "";

						}
						;
					});
