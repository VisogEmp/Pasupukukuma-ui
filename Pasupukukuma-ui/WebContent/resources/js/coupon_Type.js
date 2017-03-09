var app = angular.module("CouponTypeManagement", []);

	//Controller Part
	app
			.controller(
					"CouponTypeController",
					function($scope, $http) {

						//$scope.countries = [];
						$scope.coupontypeForm = {
							// id : -1,
							name : "",
							description : "",
							//orderNum : ""
						};

						// Now load the data from server
						_refreshCouponTypeData();

						// HTTP POST/PUT methods for add/edit CouponType
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitCouponType = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.coupontypeForm.id == -1
									|| $scope.coupontypeForm.id == undefined) {
								// Id is absent in form data, it is create new CouponType
								// operation

								method = "POST";
								url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/coupontype/';
								$http
										.post(
												url,
												{
													"name" : $scope.coupontypeForm.name,
													"description" : $scope.coupontypeForm.description,
													//"orderNum" : $scope.coupontypeForm.orderNum
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit coupontype
								// operation
								id = $scope.coupontypeForm.id;
								method = "PUT";
								url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/coupontype/'
										+ id;
								$http
										.put(
												url,
												{
													"name" : $scope.coupontypeForm.name,
													"description" : $scope.coupontypeForm.description,
													//"orderNum" : $scope.descriptionForm.orderNum
												}).then(_success, _error);
								$scope.coupontypeForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete coupontype by Id
						$scope.deleteCouponType = function(coupontype) {
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/coupontype/'
												+ coupontype.id
									}).then(_success, _error);
						};

						// In case of edit, populate form fields and assign form.id
						// with coupontype id
						$scope.editCouponType = function(coupontype) {

							$scope.coupontypeForm.name = coupontype.name;
							$scope.coupontypeForm.description = coupontype.description;
							//$scope.nakshatramForm.orderNum = coupontype.orderNum;
							$scope.coupontypeForm.id =coupontype.id;
						};

						/* Private Methods */
						// HTTP GET- get all coupontype collection
						function _refreshCouponTypeData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/coupontype/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.coupontypes = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshCouponTypeData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.coupontypeForm.name = "";
							$scope.coupontypeForm.description = "";
						//	$scope.coupontypeForm.orderNum = "";

						}
						;
					});
