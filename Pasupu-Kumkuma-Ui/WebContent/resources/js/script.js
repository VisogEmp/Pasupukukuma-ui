
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

function validatephone(phone) 
{
    var maintainplus = '';
    var numval = phone.value
    if ( numval.charAt(0)=='+' )
    {
        var maintainplus = '';
    }
    curphonevar = numval.replace(/[\\A-Za-z!"£$%^&\,*+_={};:'@#~,.Š\/<>?|`¬\]\[]/g,'');
    phone.value = maintainplus + curphonevar;
    var maintainplus = '';
    phone.focus;
}