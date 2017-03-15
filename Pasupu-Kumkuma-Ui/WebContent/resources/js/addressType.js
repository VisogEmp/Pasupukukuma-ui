
            var app = angular.module("AddressTypeManagement", []);
         
            //Controller Part
            app.controller("AddressTypeController", function($scope, $http) {
         
               
                $scope.addressType = [];
                $scope.addressTypeForm = {
                 id : -1,
                    name : "",
                    description : ""
                };
         
                //Now load the data from server
                _refreshAddressTypeData();
         
                //HTTP POST/PUT methods for add/edit role 
                // with the help of id, we are going to find out whether it is put or post operation
                
                $scope.submitAddressType = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.roleForm.id);
                    if ($scope.addressTypeForm.id == -1 || $scope.addressTypeForm.id == undefined) {
                        //Id is absent in form data, it is create new role operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/visog-job-portal-api/master/addressType/';
                        $http.post(url, { "name": $scope.addressTypeForm.name, "description" : $scope.addressTypeForm.description }).then( _success, _error ); 
                    
                    } else {
                    	 
                        //Id is present in form data, it is edit role operation
                        id=$scope.addressTypeForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/visog-job-portal-api/master/addressType/'+ id;
                      $http.put(url, { "name": $scope.addressTypeForm.name, "description" : $scope.addressTypeForm.description }).then( _success, _error );
                      $scope.addressTypeForm.id = -1;
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
                $scope.deleteAddressType = function(addressType) {
                	
                	if(confirm("Are you sure to Delete ?") == true){
                		
						$http(
								{
									method : 'DELETE',
									url : 'http://localhost:8080/visog-job-portal-api/master/addressType/'
											+ addressType.id
								}).then(_success, _error);
						}
                };
 
             // In case of edit, populate form fields and assign form.id with role id
                $scope.editAddressType = function(addressType) {
                  
                    $scope.addressTypeForm.name = addressType.name;
                    $scope.addressTypeForm.description = addressType.description;
                    $scope.addressTypeForm.id = addressType.id;
                };
         
                /* Private Methods */
                //HTTP GET- get all countries collection
                function _refreshAddressTypeData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/visog-job-portal-api/master/addressType/'
                    }).then(function successCallback(response) {
                    	//alert(response.data.data)
                        $scope.addressType = response.data.data;
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
                    $scope.addressTypeForm.id = -1;
                    $scope.addressTypeForm.name = "";
                    $scope.addressTypeForm.description = "";
                
                };
            });
      