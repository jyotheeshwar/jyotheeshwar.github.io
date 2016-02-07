$.getJSON("http://personality-insights-scotia.mybluemix.net/customer_spendings_json",function(data){

	console.log(data);
	/*
	var data = [{
	"code": "healthcare",
	"label": "Healthcare",
	"credit": 300
}, {
	"code": "food",
	"label": "Food & Beverages",
	"credit": 1400
}, {
	"code": "entertainment",
	"label": "Entertainment",
	"credit": 400
}, {
	"code": "transportation",
	"label": "Transportation",
	"credit": 1400
}, {
	"code": "groceries",
	"label": "Groceries",
	"credit": 400
}, {
	"code": "other",
	"label": "Others",
	"credit": 2000
}];*/
	console.log(data)
var total = 0;
$.each(data, function(key, value){
	console.log(key+' '+value);
    $("#expenditurelist")
	.append("<li><div class=\"expenditure-list-element color-code-"+value.code+"\">"+
	"<div class=\"expenditure-category\"><span>"+value.label+": </span></div>"+
            "<div class=\"expenditure-amount\"><span> $"+value.credit+"</span></div></div></li>");			
			total = total + value.credit;
});

$("#total-expenditure").append("Total spending: $"+total+"");

});