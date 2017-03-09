app.controller("myCntrl", function ($scope, myService) {
	
	
	GetAllRoles();
	
	
	$scope.sort =function(keyname){
		
		//For sorting according to columns
		$scope.sortKey =keyname;
		$scope.reverse =!$scope.reverse;
	}
	
	 //To Get All Records  
    function GetAllRoles() {
        var getData = myService.getRoles();

        getData.then(function (roles) {
            $scope.roles = roles.data;
        }, function (roles) {
            alert("Records gathering failed!");
        });
    }
    
    $scope.editRole = function (role) {
        debugger;
       
        var getData = myService.getRoles(role.Id);
        getData.then(function (emp) {
            $scope.roleId = role.Id;
            $scope.roleName = role.name;
            $scope.roleDescription = role.description;
            $scope.Action = "Edit";       
            $("#myModal").modal('show');
        },
        function (msg) {
            $("#alertModal").modal('show');
            $scope.msg = msg.data;
        });
    }
    
    $scope.AddUpdateRoles = function () {
        var Role = {
            Name: $scope.roleName,
            Description: $scope.roleDescription
        };
        
        
        var getAction = $scope.Action;

        if (getAction == "Edit") {
            role.Id = $scope.roleId;
            var getData = myService.updateRoles(role);
            getData.then(function (msg) {
                GetAllRoles();
                ClearFields();
                $("#alertModal").modal('show');
                $scope.msg = msg.data;
            }, function (msg) {
                $("#alertModal").modal('show');
                $scope.msg = msg.data;
            });
        }
        else {
            var getData = myService.AddRoles(Employee);
            getData.then(function (msg) {
                GetAllRoles();
                $("#alertModal").modal('show');
                $scope.msg = msg.data;
                ClearFields();

            }, function (msg) {
                $("#alertModal").modal('show');
                $scope.msg = msg.data;
            });
        }
        debugger;
        GetAllRoles();
        $scope.refresh();
    }
    
    
    $scope.AddRoleDiv = function () {
        ClearFields();
        $scope.Action = "Add";
           
    }

    function GetDesignations() {
        var desg = myService.GetDesignations();

        desg.then(function (dsg) {
            $scope.designations = dsg.data;
        }, function (dsg) {
            $("#alertModal").modal('show');
            $scope.msg = "Error in filling designation drop down !";
        });
    }

    function GetDepartments() {
        var departments = myService.GetDepartment();

        departments.then(function (dep) {
            $scope.departments = dep.data;
        }, function (dep) {
            $("#alertModal").modal('show');
            $scope.msg = "Error in filling departments drop down !";
        });
    }

    $scope.alertmsg = function () {
        $("#alertModal").modal('hide');
    };

    function ClearFields() {
        $scope.employeeId = "";
        $scope.employeeName = "";
        $scope.employeeDOB = "";
        $scope.employeeGender = "";
        $scope.employeeEmail = "";
        $scope.employeeMobile = "";
        $scope.employeeAddress = "";
        $scope.employeeJoiningDate = "";
        $scope.employeeDepartment = "";
        $scope.employeeDesignation = "";
    }

	
});