

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data.csv", function(error, data) {
//$.getJSON("http://personality-insights-scotia.mybluemix.net/customer_json",function(data){
  if (error) throw error;
  var barNames = d3.keys(data[0]).filter(function(key) { return key !== "Category"; });  
  
  var categoryNames = [];
  var personal = [];
  var demographics = [];
  $.each( data, function( key, value ) {
	  categoryNames.push(value.Categories)
	  personal.push(value.Personal);
	  demographics.push(value.Demographics);
	});
	
	findPatient(categoryNames, personal, demographics);	
	
  data.forEach(function(d) {
    d.ages = barNames.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(data.map(function(d) { return d.Category; }));
  
  x1.domain(barNames).rangeRoundBands([0, x0.rangeBand()]);
  
  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Credit Debt");

  var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "state")
      .attr("transform", function(d) { return "translate(" + x0(d.Category) + ",0)"; });

  state.selectAll("text")
  		.data(function(d) { return d.ages; })
        .enter().append("text")
        .attr("class","barstext")
        .attr("x", function(d) { return x1(d.name); })
        .attr("y",function(d) { return y(d.value); })
        .text(function(d){ 
			return '$'+ d.value;
		})
	  
  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(barNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});

function findPatient(barNames, personal, demographics){
	console.log("findingPatientCategory")
	var diff = 0;
	var patients = [];
	
	for(var index = 1; index<personal.length; index++){			
		var newdiff = personal[index]-demographics[index];
		if(newdiff>diff){
			patients.push(index);
			diff = newdiff;
		}
		
	}
	if(patients.length>0)
	    d3.select('#risk-category').innerHTML= barNames[patients[0]];
}