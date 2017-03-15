
            var app = angular.module("StatusManagement", []);
         
            //Controller Part
            app.controller("StatusController", function($scope, $http) {
         
               
                $scope.status = [];
                $scope.statusForm = {
                 id : -1,
                    name : "",
                    code:"",
                    description : ""
                };
         
                //Now load the data from server
                _refreshStatusData();
         
                //HTTP POST/PUT methods for add/edit status 
                // with the help of id, we are going to find out whether it is put or post operation
                
                $scope.submitStatus = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.statusForm.id);
                    if ($scope.statusForm.id == -1 || $scope.statusForm.id == undefined) {
                        //Id is absent in form data, it is create new status operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/status/';
                        $http.post(url, { "name": $scope.statusForm.name,"code": $scope.statusForm.code, "description" : $scope.statusForm.description }).then( _success, _error ); 
                    
                    } else {
                    	 
                        //Id is present in form data, it is edit status operation
                        id=$scope.statusForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/Pasupu-Kumkuma-Api/master/status/'+ id;
                      $http.put(url, { "name": $scope.statusForm.name,"code": $scope.statusForm.code, "description" : $scope.statusForm.description }).then( _success, _error );
                      $scope.statusForm.id = -1;
                    }
 /*         
                    $http({
                        method : method,
                        url : url,
                        data : angular.toJson($scope.statusForm),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error ); */
                };
         
                //HTTP DELETE- delete status by Id
                $scope.deleteStatus = function(status) {
                	if(confirm("Are you sure to Delete ?") == true){
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/status/' + status.id
                    }).then(_success, _error);
                	}
                };
 
             // In case of edit, populate form fields and assign form.id with status id
                $scope.editStatus = function(status) {
                  
                    $scope.statusForm.name = status.name;
                    $scope.statusForm.code = status.code;
                    $scope.statusForm.description = status.description;
                    $scope.statusForm.id = status.id;
                };
         
                /* Private Methods */
                //HTTP GET- get all status collection
                function _refreshStatusData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/Pasupu-Kumkuma-Api/master/status/'
                    }).then(function successCallback(response) {
                    	//alert(response.data.data)
                        $scope.status = response.data.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }
         
                function _success(response) {
                	if(response.data.statusCode=='300')
                		{
                	alert(response.data.message);
               			 } 
                    _refreshStatusData();
                    _clearFormData()
                }
         
                function _error(response) {
                	
                    console.log(response.statusText);
                }
         
                //Clear the form
                function _clearFormData() {
                    $scope.statusForm.id = -1;
                    $scope.statusForm.name = "";
                    $scope.statusForm.code = "";
                    $scope.statusForm.description = "";
                
                };
            });
      