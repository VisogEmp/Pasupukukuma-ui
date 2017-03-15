
            var app = angular.module("SpecilizationManagement", []);
         
            //Controller Part
            app.controller("SpecilizationController", function($scope, $http) {
         
               
                $scope.Specilization = [];
                $scope.SpecilizationForm = {
                 id : -1,
                    name : "",
                    description : "",
                    	course : ""	
                };
         
                //Now load the data from server
                _refreshAddressTypeData();
         
                //HTTP POST/PUT methods for add/edit role 
                // with the help of id, we are going to find out whether it is put or post operation
                
                $scope.submitSpecilization = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.roleForm.id);
                    if ($scope.SpecilizationForm.id == -1 || $scope.SpecilizationForm.id == undefined) {
                        //Id is absent in form data, it is create new role operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/visog-job-portal-api/master/specialization/';
                        $http.post(url, { "name": $scope.SpecilizationForm.name, 
                        				  "description" : $scope.SpecilizationForm.description,
                        			"course" : $scope.SpecilizationForm.course}).then( _success, _error ); 
                    
                    } else {
                    	 
                        //Id is present in form data, it is edit role operation
                        id=$scope.SpecilizationForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/visog-job-portal-api/master/specialization/'+ id;
                      $http.put(url, { "name": $scope.SpecilizationForm.name, 
                    	  "description" : $scope.SpecilizationForm.description,
                    	  "course" : $scope.SpecilizationForm.course}).then( _success, _error );
                      $scope.SpecilizationForm.id = -1;
                    }
 /*         
                    $http({
                        method : method,
                        url : url,
                        data : angular.toJson($scope.roleForm),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error ); */
                };
         
                //HTTP DELETE- delete role by Id
                $scope.deleteSpecilization = function(Specilization) {
                	if(confirm("Are you sure to Delete ?") == true){
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/visog-job-portal-api/master/specialization/' + Specilization.id
                    }).then(_success, _error);
                	}
                };
 
             // In case of edit, populate form fields and assign form.id with role id
                $scope.editSpecilization = function(Specilization) {
                  
                    $scope.SpecilizationForm.name = Specilization.name;
                    $scope.SpecilizationForm.description = Specilization.description;
                    $scope.SpecilizationForm.course = Specilization.course;
                    $scope.SpecilizationForm.id = Specilization.id;
                };
         
                /* Private Methods */
                //HTTP GET- get all countries collection
                function _refreshAddressTypeData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/visog-job-portal-api/master/specialization/'
                    }).then(function successCallback(response) {
                    	//alert(response.data.data)
                        $scope.Specilization = response.data.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }
         
                function _success(response) {
                	if(response.data.statusCode=='300')
                		{
                	alert(response.data.message);
               			 } 
                    _refreshAddressTypeData();
                    _clearFormData()
                }
         
                function _error(response) {
                	
                    console.log(response.statusText);
                }
         
                //Clear the form
                function _clearFormData() {
                    $scope.SpecilizationForm.id = -1;
                    $scope.SpecilizationForm.name = "";
                    $scope.SpecilizationForm.description = "";
                    $scope.SpecilizationForm.course = "";
                
                };
            });
      