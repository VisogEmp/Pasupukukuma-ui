var app = angular.module("myApp", []);
	//Controller Part
	app
		.controller(
			"myCtrl",
			function($scope, $http) {
alert('hi');
				$scope.registrationForm = [];
				_refreshGenderData();

				$scope.registrationForm = {
					id : -1,
					fname : "",
					mname : "",
					lname : "",
					dob : "",
					email : "",
					password : "",
					mobile : "",
					confirmpassword : ""
				};

				// Now load the data from server
				//	_refreshGenderData();

				//  alert('hi');
				///////////
				$scope.submitFile = function() {

					var method = "";
					var url = "";
					// alert($scope.registrationForm.id);
					if ($scope.registrationForm.id == -1
						|| $scope.registrationForm.id == undefined) {
						//Id is absent in form data, it is create new file operation
						//        alert('hhhh');
						method = "POST";
						url = 'http://localhost:8080/visog-job-portal-api/registration/job_seeker/';

						$http
							.post(
								url,
								{
									"firstName" : $scope.registrationForm.fname,
									"middleName" : $scope.registrationForm.mname,
									"lastName" : $scope.registrationForm.lname,
									"email" : $scope.registrationForm.email,
									"alternativeEmail" : $scope.registrationForm.a_email,
									"gender" : $scope.registrationForm.GenderGroup,
									"dob" : $scope.registrationForm.dob,
									"password" : $scope.registrationForm.password,
									"phone" : $scope.registrationForm.mobile,
									"landline" : $scope.registrationForm.landline
								}).then(_success, _error);
								//	alert('complete');

					} else {

						//Id is present in form data, it is edit file operation
						id = $scope.registrationForm.id;
						method = "PUT";
						url = 'http://localhost:8080/visog-job-portal-api/registration/job_seeker/'
							+ id;
						$http
							.post(
								url,
								{
									"firstName" : $scope.registrationForm.fname,
									"middleName" : $scope.registrationForm.mname,
									"lastName" : $scope.registrationForm.lname,
									"email" : $scope.registrationForm.email,
									"alternativeEmail" : $scope.registrationForm.a_email,
									"gender" : $scope.registrationForm.GenderGroup,
									"dob" : $scope.registrationForm.dob,
									"password" : $scope.registrationForm.password,
									"phone" : $scope.registrationForm.mobile,
									"landline" : $scope.registrationForm.landline
								}).then(_success, _error);
						$scope.registrationForm.id = -1;
					}
				};

				///////////
				//alert('hi fh');
				function _refreshGenderData() {
					$http(
						{
							method : 'GET',
							url : 'http://localhost:8080/visog-job-portal-api/master/gender/'
						}).then(function successCallback(response) {

						$scope.genders = response.data.data;
					//alert('hijj dfdfdf 1'+response.data.data);
					}, function errorCallback(response) {
						console.log(response.statusText);
					}); //alert('jjffj');
				}

				function _success(response) {
					alert(response.data.message);
					if (response.data.statusCode != 300) {
						_refreshGenderData();
						_clearFormData()
					}
				}

				/* function _success(response) {
					//	alert(response.data.message);
						_refreshGenderData();
						_clearFormData()
					} */
				//Clear the form
				function _clearFormData() {
					$scope.registrationForm.id == -1
					$scope.registrationForm.fname = "";
					$scope.registrationForm.mname = "";
					$scope.registrationForm.lname = "";
					$scope.registrationForm.dob = "";
					$scope.registrationForm.GenderGroup = "";
					$scope.registrationForm.a_email = "";
					$scope.registrationForm.email = "";
					$scope.registrationForm.landline = "";
					$scope.registrationForm.password = "";
					$scope.registrationForm.mobile = "";
					$scope.registrationForm.confirmpassword = "";

				}
				;

				function _error(response) {
					console.log(response.statusText);
				}
			});
	
	var datePicker = angular.module('app', []);

	datePicker.directive('datepicker', function() {
		return {
			restrict : 'C',
			require : 'ngModel',
			link : function(scope, element, attrs, ngModelCtrl) {
				element.datepicker({
					dateFormat : 'dd, MM, yy',
					onSelect : function(date) {
						scope.date = date;
						scope.$apply();
					}
				});
			}
		};
	});

	function checkPass() {
		//Store the password field objects into variables ...
		var pass1 = document.getElementById('pass1');
		var pass2 = document.getElementById('pass2');
		//Store the Confimation Message Object ...
		var message = document.getElementById('confirmMessage');
		//Set the colors we will be using ...
		var goodColor = "#66cc66";
		var badColor = "#ff6666";
		//Compare the values in the password field 
		//and the confirmation field
		if (pass1.value == pass2.value) {
			//The passwords match. 
			//Set the color to the good color and inform
			//the user that they have entered the correct password 
			pass2.style.backgroundColor = goodColor;
			message.style.color = goodColor;
			message.innerHTML = "Passwords Match"
		} else {
			//The passwords do not match.
			//Set the color to the bad color and
			//notify the user.
			pass2.style.backgroundColor = badColor;
			message.style.color = badColor;
			message.innerHTML = "Passwords Do Not Match!"
		}
	}

	function checkemail() {
		var email1 = document.getElementById('email1');
		var email2 = document.getElementById('email2');

		var message1 = document.getElementById('confirmMessage1');

		var goodColor = "#66cc66";
		var badColor = "#ff6666";


		if (email1.value != email2.value) {

			email2.style.backgroundColor = goodColor;
			message1.style.color = goodColor;
			message1.innerHTML = "valid"
		} else {

			email2.style.backgroundColor = badColor;
			message1.style.color = badColor;
			message1.innerHTML = "emails should not be same!"
		}
	}