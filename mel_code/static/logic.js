function buildPlot(){

// data route
const url = "/api/health";
d3.json(url).then(function(response){
    console.log(Object.entries(response));

    // var sales_18_19 = response.forEach(d=>d.18_19_n)
    // var sales_19_20 = response.forEach(d=>d.19_20_n)

    // var linedata = {
    
    // }
})
}