
            var app = angular.module("LanguageKnownManagement", []);
         
            //Controller Part
            app.controller("LanguageKnownController", function($scope, $http) {
         
               
                $scope.languageknown = [];
                $scope.languageknownForm = {
                 id : -1,
                   user  : "",
                   language : "",
                   read  : "",
                   write : "",
                   speak  : "",
                   proficiency : ""
                };
         
                //Now load the data from server
                _refreshLanguageKnownData();
         
                //HTTP POST/PUT methods for add/edit role 
                // with the help of id, we are going to find out whether it is put or post operation
                
                $scope.submitLanguageKnown = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.roleForm.id);
                    if ($scope.languageKnownForm.id == -1 || $scope.languageKnownForm.id == undefined) {
                        //Id is absent in form data, it is create new role operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/visog-job-portal-api/transaction/languageknown/';
                        $http.post(url, { "user": $scope.languageknownForm.user, "language" : $scope.languageknownForm.language,"read"  :$scope.languageknownForm.read,"write" :$scope.languagesknownForm.write,"speak" :$scope.languagknownForm.speak,"proficiency" :$scope.languageknownForm.proficiency }).then( _success, _error ); 
                    
                    } else {
                    	 
                        //Id is present in form data, it is edit role operation
                        id=$scope.languageknownForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/visog-job-portal-api/transaction/languageknown/'+ id;
                        $http.post(url, { "user": $scope.languageknownForm.user, "language" : $scope.languageknownForm.language,"read"  :$scope.languageknownForm.read,"write" :$scope.languagesknownForm.write,"speak" :$scope.languagknownForm.speak,"proficiency" :$scope.languageknownForm.proficiency }).then( _success, _error ); 
                      $scope.languageknownForm.id = -1;
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
                $scope.deleteLanguageKnown = function(languageknown) {
                	if(confirm("Are you sure to Delete ?") == true){
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/visog-job-portal-api/transaction/languageknown/' + languageknown.id
                    }).then(_success, _error);
                	}
                };
 
             // In case of edit, populate form fields and assign form.id with role id
                $scope.editLanguageKnown = function(languageknown) {
                  
                    $scope.languageknownForm.user = languageknown.user;
                    $scope.languageknownForm.language = languageknown.language;
                    $scope.languageknownForm.read = languageknown.read;
                    $scope.languageknownForm.write = languageknown.write;
                    $scope.languageknownForm.speak = languageknown.speak;
                    $scope.languageknownForm.proficiency = languageknown.proficiency;
                    $scope.languageknownForm.id = languageknown.id;
                };
         
                /* Private Methods */
                //HTTP GET- get all countries collection
                function _refreshLanguageKnownData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/visog-job-portal-api/transaction/languageknown/'
                    }).then(function successCallback(response) {
                    	//alert(response.data.data)
                        $scope.languageknown = response.data.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }
         
                function _success(response) {
                	if(response.data.statusCode=='300')
                		{
                	alert(response.data.message);
               			 } 
                    _refreshLanguageKnownData();
                    _clearFormData()
                }
         
                function _error(response) {
                	
                    console.log(response.statusText);
                }
         
                //Clear the form
                function _clearFormData() {
                    $scope.languageknownForm.id = -1;
                    $scope.languageknownForm.user = "";
                    $scope.languageknownForm.read = "";
                    $scope.languageknownForm.write = "";
                    $scope.languageknownForm.speak = "";
                    $scope.languageknownForm.proficiency = ""
                
                };
            });
      