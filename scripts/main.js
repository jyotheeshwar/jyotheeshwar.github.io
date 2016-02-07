$(document).ready(function() {
    $("#signin-button").click(function(){
        if ($("#login-account-number").val() === '4321987612345678' && $("#login-password").val() === 'abcd1234') {
        	var url = window.location.href;
        	url += "home.html";
        	window.location.replace(url);
        } else {
        	alert("Your credentials are incorrect. Please try again");
        }
    }); 
    $("#select-plan-button").click(function () {
    	alert("Your savings plan has been updated. For more information, please contact your local branch.");
    });
    $("#graphs-png-image").click(function () {
    	$("#graphs-history-image").addClass("show-history");
    });
});
