// data route
const url = "/api/health";
var plotdata = [];

d3.json(url).then(data => {
    // data.sales_dict
    var options = d3.select("#selDataset");
    var SA4_names = data.map(d=>d.SA4_name);
    SA4_names = [... new Set(SA4_names)];
    SA4_names.forEach(element => {
        console.log(element);
        var op = options.append("option");
        op.attr("value", element);
        op.text(element);
        
    });
    plotdata = data.map(d=>d);
    console.log(plotdata);
});


console.log(plotdata);
function buildPlot(choose=""){
    choose = d3.select("#selDataset").property("value");
    console.log(choose);


    d3.json(url).then(data => {
    // data.sales_dict
  console.log(data);
  var SA4_names = data.map(d=>d.SA4_name);
  SA4_names = [... new Set(SA4_names)];
//   console.log(SA4_names);
  if(choose==="") choose = SA4_names[0];

  var names = data;
  names = data.filter(d=>d.SA4_name===choose);
  console.log(names);

  var trace_1 = {
    y: names.map(d=>d["18_19_n"]),
    x: names.map(d=>d.Week),
    type: "line",
    name: "18-19"
};
var trace_2 = {
    y: names.map(d=>d["19_20_n"]),
    x: names.map(d=>d.Week),
    type: "line",
    name: "19-20"
};

    // console.log(data);
    Plotly.newPlot("bar", [trace_1, trace_2])

})
}

function lungPlot(){
    const url = "/api/health/2";
    console.log(lung_data);
    d3.json(url).then(function(response){
        console.log(Object.entries(response));
    })
}
buildPlot();


d3.select('#selDataset').on("change", buildPlot);