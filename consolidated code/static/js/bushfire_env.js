//read in data
// "data/protected_animals.json"
var url = "/api/env_impact/get_animals"
d3.json(url).then((dataA) => {
    console.log(dataA);

    var numAnimals = Object.keys(dataA).length;

    var bottom = 0;
    var top = 100;
    // var near_enough = 1000; //dummy value to test if animal has been chosen yet

    // function to get the animal data
    function getAnimal(whichAnimal) {
        //console.log(dataA[whichAnimal]);
        // extract data for chosen animal
        var common = dataA[whichAnimal].common;
        var scientific = dataA[whichAnimal].scientific;
        var states = dataA[whichAnimal].states;
        var type = dataA[whichAnimal].type;
        var distribution = dataA[whichAnimal].distribution;


        // choose silhouette to go on card
        var filenameImage = "";
        if (type === "Bird") { filenameImage = "static/Images/Bird-Silhouette.svg" }
        else if (type === "Fish") { filenameImage = "static/Images/Fish-Silhouette.svg" }
        else if (type === "Reptile") { filenameImage = "static/Images/Reptile-Silhouette.svg" }
        else if (type === "Spider") { filenameImage = "static/Images/Spider-Silhouette.svg" }
        else if (type === "Frog") { filenameImage = "static/Images/Frog-Silhouette.svg" }
        else if (type === "Mammal") { filenameImage = "static/Images/Mammal-Silhouette.svg" }
        else if (type === "Insect") { filenameImage = "static/Images/Insect-Silhouette.svg" };
        //console.log(filenameImage);


        // put relevant data into animal card
        d3.select("#common-name").text(`${common}`);
        d3.select("#scientific-name").text(`${scientific}`);
        d3.select("#animal-type").text(`Type: ${type}`);
        d3.select("#animal-states").text(`Found in: ${states}`);
        d3.select("#animal-image").html(`'<img src=${filenameImage} class="card-img-top" id="image-silhouette" alt="animal type silhouette" >'`);
    }

    function newAnimal() {
        whichAnimal = Math.floor(Math.random() * (numAnimals));
        // console.log(whichAnimal);
        // getAnimal(whichAnimal);
        return (whichAnimal);
    }

    function getStatus(whichAnimal) {
        status = dataA[whichAnimal].status;
        if (status === "0") {status = "migratory"}; // deal with 0 for migratory birds
        return (status)
    }

    function getDistribution(whichAnimal) {
        distribution = dataA[whichAnimal].distribution;
        return (distribution)
    }

    function threatColour(status) {
        var threat_colour = "ffb0a0";
        if(status === "Critically Endangered") 
        {threat_colour = "#a52a2a"}
        else if(status === "Endangered") 
        {threat_colour = "#c4554d"}
        else if (status === "Vulnerable") 
        {threat_colour = "#e27d72"}
        else if (status === "migratory")
        {threat_colour = "#ffa599"}
        else {threat_colour = "#ffa599"};
        console.log("went to color function");
        console.log(threat_colour);
        return (threat_colour)
    }

    // initialise page
    var whichAnimal = 5;
    newAnimal();
    getAnimal(whichAnimal);
    var status = getStatus(whichAnimal);
    console.log(status);
    var distribution = getDistribution(whichAnimal);
    if (distribution === '10 to <30%') {
        bottom = 10;
        top = 30;
    }
    else if (distribution === '30 to <50%') {
        bottom = 30;
        top = 50;
    }
    else if (distribution === '50 to <80%') {
        bottom = 50;
        top = 80;
    }
    else {
        bottom = 80;
        top = 100;
    };
    


    // start over on click of button "Find an endangered animal"
    d3.select("#choose-animal")
        .on("click", function () {
            whichAnimal = newAnimal();
            getAnimal(whichAnimal);
            status = getStatus(whichAnimal);
            distribution = getDistribution(whichAnimal);
            if (distribution === '10 to <30%') {
                bottom = 10;
                top = 30;
            }
            else if (distribution === '30 to <50%') {
                bottom = 30;
                top = 50;
            }
            else if (distribution === '50 to <80%') {
                bottom = 50;
                top = 80;
            }
            else {
                bottom = 80;
                top = 100;
            }
            d3.select('#answer-alert')
                .remove();
            d3.select("#threatened-status").style("display", "none");
        });


    // actions to take on "Check your answer" button
    d3.select('#liveAlertBtn')
        .on("click", function () {
            var alertPlaceholder = d3.select('#liveAlertPlaceholder');
            var message = "";
            if (sliderFill.value() === 0) {
                message = "oh, but you haven't guessed yet";
            }
            else {
                // compare message to distribution and choose appropriate response
                near_enough = Math.round(sliderFill.value() * 100);
                // console.log(near_enough);
                var message2 = ""
                if (near_enough < bottom) {
                    message2 = "Sadly, it was more like "
                }
                else if (near_enough > top) {
                    message2 = "Actually, it wasn't that bad.  It was more like "
                }
                else {
                    message2 = "You're in the ball park! It was estimated at "
                }
                message = `Your answer was ${near_enough}%. ${message2} ${distribution}`;
            };
            // console.log(sliderFill.value())
            alertPlaceholder.html(`<div class="alert alert-info alert-dismissible fade show" 
            role="alert" id="answer-alert"> ${message} <button type="button" class="btn-close" 
            data-bs-dismiss="alert" aria-label="Close" ></button></div>`);
            d3.select("#threatened-status").style("display", "block");
            d3.select(".threatButton")
            .text(status);
            d3.select(".threatButton")
            .style("background-color", threatColour(status));
        })


    // The remainder of the code pertains to the slider
    var data = [0, 1];

    var sliderFill = d3
        .sliderBottom()
        .min(d3.min(data))
        .max(d3.max(data))
        .width(300)
        .tickFormat(d3.format(',.0%'))
        .ticks(5)
        .default(0)
        .fill('#a52a2a')
        .on('onchange', val => {
            d3.select('p#value-fill').text(d3.format(',.0%')(val));
            d3.select('#answer-alert')
                .remove();
        });

    var gFill = d3
        .select('div#slider-fill')
        .append('svg')
        .attr('width', 500)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

    gFill.call(sliderFill);

    d3.select('p#value-fill').text(d3.format(',.0%')(sliderFill.value()));


})