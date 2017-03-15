	var app = angular.module("ProjectDetails", []);

	//Controller Part
	app
			.controller(
					"ProjectDetailsController",
					function($scope, $http) {

						$scope.projectdDetails = [];
						$scope.projectdDetailsForm = {
							// id : -1,
								user : "",
								jobResponsibilities : "",
								projectdetails : "",
								projectTitle : "",
								employmentType:"",
								clientName:"",
								durationFrom:"",
								durationTo:"",
								teamSize:"",
								technologiesUsed:""
						};

						// Now load the data from server
						_refreshProjectDetailsData();

						// HTTP POST/PUT methods for add/edit projectDetails
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitProjectDetails = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.projectdDetailsForm.id == -1
									|| $scope.projectdDetailsForm.id == undefined) {
								// Id is absent in form data, it is create new projectDetails
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/projectdDetails/';
								$http
										.post(
												url,
												{
													"user" : $scope.projectdDetailsForm.user,
													"jobResponsibilities" : $scope.projectdDetailsForm.jobResponsibilities,
													"projectdetails" : $scope.projectdDetailsForm.projectdetails,
													"projectTitle" : $scope.projectdDetailsForm.projectTitle,
													"employmentType" : $scope.projectdDetailsForm.employmentType,
													"clientName" : $scope.projectdDetailsForm.clientName,
													"durationFrom" : $scope.projectdDetailsForm.durationFrom,
													"durationTo" : $scope.projectdDetailsForm.durationTo,
													"teamsize" : $scope.projectdDetailsForm.teamsize,
													"technologiesUsed" : $scope.projectdDetailsForm.technologiesUsed

													
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit projectDetails
								// operation
								id = $scope.projectdDetailsForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/projectdDetails/'
										+ id;
								$http
										.put(
												url,
												{
													"user" : $scope.projectdDetailsForm.user,
													"jobResponsibilities" : $scope.projectdDetailsForm.jobResponsibilities,
													"projectdetails" : $scope.projectdDetailsForm.projectdetails,
													"projectTitle" : $scope.projectdDetailsForm.projectTitle,
													"employmentType" : $scope.projectdDetailsForm.employmentType,
													"clientName" : $scope.projectdDetailsForm.clientName,
													"durationFrom" : $scope.projectdDetailsForm.durationFrom,
													"durationTo" : $scope.projectdDetailsForm.durationTo,
													"teamsize" : $scope.projectdDetailsForm.teamsize,
													"technologiesUsed" : $scope.projectdDetailsForm.technologiesUsed
												}).then(_success, _error);
								$scope.projectdDetailsForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete projectDetails by Id
						$scope.deleteProjectDetails = function(projectdDetails) {
							if(confirm("Are you sure to Delete ?") == true){
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/projectdDetails/'
												+ projectdDetails.id
									}).then(_success, _error);
							}
						};

						// In case of edit, populate form fields and assign form.id
						// with projectDetails id
						$scope.editProjectDetails = function(projectdDetails) {

							$scope.projectdDetailsForm.user = projectdDetails.user;
							$scope.projectdDetailsForm.jobResponsibilities = projectdDetails.jobResponsibilities;
							$scope.projectdDetailsForm.projectdetails = projectdDetails.projectdetails;
							$scope.projectdDetailsForm.projectTitle = projectdDetails.projectTitle;
							$scope.projectdDetailsForm.employmentType = projectdDetails.employmentType;
							$scope.projectdDetailsForm.clientName = projectdDetails.clientName;
							$scope.projectdDetailsForm.durationFrom = projectdDetails.durationFrom;
							$scope.projectdDetailsForm.durationTo = projectdDetails.durationTo;

							$scope.projectdDetailsForm.teamSize = projectdDetails.teamSize;
							$scope.projectdDetailsForm.technologiesUsed = projectdDetails.technologiesUsed;

					
							$scope.projectdDetailsForm.id =projectdDetails.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshProjectDetailsData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/projectdDetails/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.projectdDetailsForm = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshProjectDetailsData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.projectdDetailsForm.user = "";
							$scope.projectdDetailsForm.jobResponsibilities = "";
							$scope.projectdDetailsForm.projectdetails = "";
							$scope.projectdDetailsForm.projectTitle = "";
							$scope.projectdDetailsForm.employmentType = "";
							$scope.projectdDetailsForm.clientName = "";
							$scope.projectdDetailsForm.durationFrom = "";
							$scope.projectdDetailsForm.durationTo = "";
							$scope.projectdDetailsForm.teamSize = "";
							$scope.projectdDetailsForm.technologiesUsed = "";


						}
						;
					});
