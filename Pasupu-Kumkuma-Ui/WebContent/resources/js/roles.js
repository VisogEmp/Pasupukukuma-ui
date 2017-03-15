
            var app = angular.module("RoleManagement", []);
         
            //Controller Part
            app.controller("RoleController", function($scope, $http) {
         
               
                $scope.role = [];
                $scope.roleForm = {
                 id : -1,
                    name : "",
                    description : ""
                };
         
                //Now load the data from server
                _refreshRoleData();
         
                //HTTP POST/PUT methods for add/edit role 
                // with the help of id, we are going to find out whether it is put or post operation
                
                $scope.submitRole = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.roleForm.id);
                    if ($scope.roleForm.id == -1 || $scope.roleForm.id == undefined) {
                        //Id is absent in form data, it is create new role operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/visog-job-portal-api/master/roles/';
                        $http.post(url, { "name": $scope.roleForm.name, "description" : $scope.roleForm.description }).then( _success, _error ); 
                    
                    } else {
                    	 
                        //Id is present in form data, it is edit role operation
                        id=$scope.roleForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/visog-job-portal-api/master/roles/'+ id;
                      $http.put(url, { "name": $scope.roleForm.name, "description" : $scope.roleForm.description }).then( _success, _error );
                      $scope.roleForm.id = -1;
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
                $scope.deleteRole = function(role) {
                	
                	if(confirm("Are you sure to Delete ?") == true){
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/visog-job-portal-api/master/roles/' + role.id
                    }).then(_success, _error);
                	}
                };
 
             // In case of edit, populate form fields and assign form.id with role id
                $scope.editRole = function(role) {
                  
                    $scope.roleForm.name = role.name;
                    $scope.roleForm.description = role.description;
                    $scope.roleForm.id = role.id;
                };
         
                /* Private Methods */
                //HTTP GET- get all countries collection
                function _refreshRoleData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/visog-job-portal-api/master/roles/'
                    }).then(function successCallback(response) {
                    	//alert(response.data.data)
                        $scope.roles = response.data.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }
         
                function _success(response) {
                	if(response.data.statusCode=='300')
                		{
                	alert(response.data.message);
               			 } 
                    _refreshRoleData();
                    _clearFormData()
                }
         
                function _error(response) {
                	
                    console.log(response.statusText);
                }
         
                //Clear the form
                function _clearFormData() {
                    $scope.roleForm.id = -1;
                    $scope.roleForm.name = "";
                    $scope.roleForm.description = "";
                
                };
            });
      