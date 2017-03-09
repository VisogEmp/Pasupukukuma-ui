var app = angular.module("PujaManagement", []);

// Controller Part
app
		.controller(
				"PujaController",
				function($scope, $http) {

					//$scope.countries = [];
					$scope.pujaForm = {
					 id : -1,
						name : "",
						description : "",
						price : "",
						duration : "",
						photo : "",
						pujaCount : "",
						status :""
				
					};

					// Now load the data from server
					_refreshPujaData();

					// HTTP POST/PUT methods for add/edit pujas
					// with the help of id, we are going to find out whether it
					// is put or post operation

					$scope.submitPuja = function() {

						var method = "";
						var url = "";
						// alert($scope.pujasForm.id);
						if ($scope.pujaForm.id == -1
								|| $scope.pujaForm.id == undefined) {
							// Id is absent in form data, it is create new role
							// operation

							method = "POST";
							url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/puja/';
							$http.post(url, {
								"name" : $scope.pujaForm.name,
								"description" : $scope.pujaForm.description,
								"price" : $scope.pujaForm.price,
								"duration" : $scope.pujaForm.duration,
								"photo" : $scope.pujaForm.photo,
								"pujaCount" : $scope.pujaForm.pujaCount,
								"status" : $scope.pujaForm.status
								
							}).then(_success, _error);

						} else {

							// Id is present in form data, it is edit pujas
							// operation
							id = $scope.pujaForm.id;
							method = "PUT";
							url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/puja/'
									+ id;
							$http.put(url, {
								"name" : $scope.pujaForm.name,
								"description" : $scope.pujaForm.description,
								"price" : $scope.pujaForm.price,
								"duration" : $scope.pujaForm.duration,
								"photo" : $scope.pujaForm.photo,
								"pujaCount" : $scope.pujaForm.pujaCount,
								"status" : $scope.pujaForm.status
								
								
							}).then(_success, _error);
							$scope.pujaForm.id = -1;
						}
						/*
						 * $http({ method : method, url : url, data :
						 * angular.toJson($scope.genderForm), headers : {
						 * 'Content-Type' : 'application/json' } }).then(
						 * _success, _error );
						 */
					};

					// HTTP DELETE- delete pujas by Id
					$scope.deletePuja = function(puja) {
						$http(
								{
									method : 'DELETE',
									url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/puja/'
											+ puja.id
								}).then(_success, _error);
					};

					// In case of edit, populate form fields and assign form.id
					// with pujas id
					$scope.editPuja = function(puja) {

						$scope.pujaForm.name = puja.name;
						$scope.pujaForm.description = puja.description;
						$scope.pujaForm.price = puja.price;
						$scope.pujaForm.duration = puja.duration;
						$scope.pujaForm.photo = puja.photo;
						$scope.pujaForm.pujaCount = puja.pujaCount;
						$scope.pujaForm.status = puja.status;
					
						$scope.pujaForm.id = puja.id;
					};

					/* Private Methods */
					// HTTP GET- get all pujas collection
					function _refreshStateData() {
						$http(
								{
									method : 'GET',
									url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/puja/'
								}).then(function successCallback(response) {
							// alert(response.data.data)
							$scope.pujas = response.data.data;
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
						$scope.pujaForm.name = "";
						$scope.pujaForm.description = "";
						$scope.pujaForm.price = "";
						$scope.pujaForm.duration = "";
						$scope.pujaForm.photo = "";
						$scope.pujaForm.pujaCount = "";
						$scope.pujaForm.status = "";
					

					}
					;
				});