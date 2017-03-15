	var app = angular.module("AddressManagement", []);

	//Controller Part
	app
			.controller(
					"AddressController",
					function($scope, $http) {

						$scope.address = [];
						$scope.addressForm = {
							// id : -1,
								addresstype : "",
								line1 : "",
								line2 : "",
								city : "",
								state : "",
								country : "",
								zipcode : "",
								associatedtype : "",
								associatedid : ""
						};

						// Now load the data from server
						_refreshAddressData();

						// HTTP POST/PUT methods for add/edit role
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submiAddress = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.addressForm.id == -1
									|| $scope.addressForm.id == undefined) {
								// Id is absent in form data, it is create new role
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/address/';
								$http
										.post(
												url,
												{
													"addresstype" : $scope.addressForm.addresstype,
													"line1" : $scope.addressForm.line1,
													"line2" : $scope.addressForm.line2,
													"city" : $scope.addressForm.city,
													"state" : $scope.addressForm.state,
													"country" : $scope.addressForm.country,
													"zipcode" : $scope.addressForm.zipcode,
													"associatedtype" : $scope.addressForm.associatedtype,
													"associatedid" : $scope.addressForm.associatedid
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit role
								// operation
								id = $scope.addressForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/address/'
										+ id;
								$http
										.put(
												url,
												{
													"addresstype" : $scope.addressForm.addresstype,
													"line1" : $scope.addressForm.line1,
													"line2" : $scope.addressForm.line2,
													"city" : $scope.addressForm.city,
													"state" : $scope.addressForm.state,
													"country" : $scope.addressForm.country,
													"zipcode" : $scope.addressForm.zipcode,
													"associatedtype" : $scope.addressForm.associatedtype,
													"associatedid" : $scope.addressForm.associatedid
												}).then(_success, _error);
								$scope.addressForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete role by Id
						$scope.deleteAddress = function(address) {
							if(confirm("Are you sure to Delete ?") == true){
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/address/'
												+ address.id
									}).then(_success, _error);
							}
						};

						// In case of edit, populate form fields and assign form.id
						// with role id
						$scope.editAddress = function(address) {

							$scope.addressForm.addresstype = address.addresstype;
							$scope.addressForm.line1 = address.line1;
							$scope.addressForm.line2 = address.line2;
							$scope.addressForm.city = address.city;
							$scope.addressForm.state = address.state;
							$scope.addressForm.country = address.country;
							$scope.addressForm.zipcode = address.zipcode;
							$scope.addressForm.associatedtype = address.associatedtype;
							$scope.addressForm.associatedid = address.associatedid;
							$scope.addressForm.id =address.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshAddressData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/address/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.addressForm = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshAddressData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.addressForm.addresstype = "";
							$scope.addressForm.line1 = "";
							$scope.addressForm.line2 = "";
							$scope.addressForm.city = "";
							$scope.addressForm.state = "";
							$scope.addressForm.country = "";
							$scope.addressForm.zipcode = "";
							$scope.addressForm.associatedtype = "";
							$scope.addressForm.associatedid = "";
							
							
						}
						;
					});
