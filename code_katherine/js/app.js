//read in data
d3.json("data/protected_animals.json").then((dataA) => {
    console.log(dataA);

    var numAnimals = Object.keys(dataA).length;

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
        if (type === "Bird") { filenameImage = "images/Bird-Silhouette.svg" }
        else if (type === "Fish") { filenameImage = "images/Fish-Silhouette.svg" }
        else if (type === "Reptile") { filenameImage = "images/Reptile-Silhouette.svg" }
        else if (type === "Spider") { filenameImage = "images/Spider-Silhouette.svg" }
        else if (type === "Frog") { filenameImage = "images/Frog-Silhouette.svg" }
        else if (type === "Mammal") { filenameImage = "images/Mammal-Silhouette.svg" }
        else if (type === "Insect") { filenameImage = "images/Insect-Silhouette.svg" };
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
        getAnimal(whichAnimal);
        return(whichAnimal);
        }

    function getStatus(dataA, whichAnimal) {
        status = dataA[whichAnimal].status;
        return(status)
    }

    function getDistribution(dataA, whichAnimal) {
        distribution = dataA[whichAnimal].distribution;
        return(distribution)
    }

    // initialise page
    var whichAnimal = 10;
    getAnimal(whichAnimal);
    // var test = newAnimal(whichAnimal);
    // console.log(`'test ${test}'`)
    var status = getStatus(dataA, whichAnimal);
    console.log(status);
    var distribution = getDistribution(dataA, whichAnimal);

    // // start over on button click
    // d3.select("#choose-animal")
    //     .on("click", newAnimal);

            // start over on button click
    d3.select("#choose-animal")
    .on("click", function(){
        test=newAnimal(whichAnimal);
        console.log(`'test ${test}'`)
    });

    d3.select('#liveAlertBtn')
    .on("click", function(){
        var alertPlaceholder = d3.select('#liveAlertPlaceholder');
        var message = "";
        if (sliderFill.value() === 0){
            message = "oh, but you haven't guessed yet";
        }
        else {
            // getStatus
            message =`"your answer was ${sliderFill.value()} actual is ${distribution}"`;} ;
        console.log(sliderFill.value())
        alertPlaceholder.html(`'<div class="alert alert-info alert-dismissible fade show" role="alert"> ${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'`)

    })



    var data = [0, 1];

    // Fill
    var flame = d3.select("#flame");

    var sliderFill = d3
        .sliderBottom()
        .min(d3.min(data))
        .max(d3.max(data))
        .width(300)
        .tickFormat(d3.format(',.0%'))
        .ticks(5)
        .default(0)
        .fill('#2196f3')
        .on('onchange', val => {
            d3.select('p#value-fill').text(d3.format(',.0%')(val));
            // // alert
            // var alertPlaceholder = d3.select('#liveAlertPlaceholder')
            // // var alertTrigger = d3.select('#liveAlertBtn')
            // var message = `"your answer was ${val} actual is "`;
            // alertPlaceholder.html(`'<div class="alert alert-info alert-dismissible fade show" role="alert"> ${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'`)
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

    flame
        .append('svg')
        .attr('width', 600)
        .attr('height', 400)
        .append('g')
        .attr('transform', 'translate(30,30)');

    var box = flame
        .append('rect')
        .attr('width', 100)
        .attr('height', 100)
        .attr('transform', 'translate(400,0)')
        .attr('fill', "pink");



    // Color picker
    var num2hex = rgb => {
        return rgb
            .map(color => {
                let str = color.toString(16);

                if (str.length === 1) {
                    str = '0' + str;
                }

                return str;
            })
            .join('');
    };

    var rgb = [100, 0, 0];
    var colors = ['red', 'green', 'blue'];

    var gColorPicker = d3
        .select('div#slider-color-picker')
        .append('svg')
        .attr('width', 600)
        .attr('height', 400)
        .append('g')
        .attr('transform', 'translate(30,30)');

    var box = gColorPicker
        .append('rect')
        .attr('width', 100)
        .attr('height', 100)
        .attr('transform', 'translate(400,0)')
        .attr('fill', `#${num2hex(rgb)}`);

    rgb.forEach((color, i) => {
        var slider = d3
            .sliderBottom()
            .min(0)
            .max(255)
            .step(1)
            .width(300)
            .default(rgb[i])
            .displayValue(false)
            .fill(colors[i])
            .on('onchange', num => {
                rgb[i] = num;
                box.attr('fill', `#${num2hex(rgb)}`);
                d3.select('p#value-color-picker').text(`#${num2hex(rgb)}`);
            });

        gColorPicker
            .append('g')
            .attr('transform', `translate(30,${60 * i})`)
            .call(slider);
    });

    d3.select('p#value-color-picker').text(`#${num2hex(rgb)}`);

    // blob
    var blob = document.getElementById('blob');
    var colorSlider = document.getElementById('slider-colour-picker');
    var num2hex = rgb => {
        return rgb
            .map(color => {
                let str = color.toString(16);
                if (str.length === 1) {
                    str = '0' + str;
                }
                return str;
            })
            .join('');
    };
    var rgb = [100, 0, 0];
    var colors = ['red', 'green', 'blue'];

    var gColorPicker = d3
        .select('div#slider-colour-picker')
        .append('svg')
        .attr('width', 375)
        .attr('height', 200)
        .append('g')
        .attr('transform', 'translate(30,30)');

    rgb.forEach((color, i) => {
        var slider = d3
            .sliderBottom()
            .min(0)
            .max(255)
            .step(1)
            .width(300)
            .ticks(0)
            .default(rgb[i])
            .displayValue(false)
            .fill(colors[i])
            .handle(
                d3
                    .symbol()
                    .type(d3.symbolCircle)
                    .size(200)()
            )
            .on('onchange', num => {
                rgb[i] = num;
                blob.style.fill = `#${num2hex(rgb)}`;
            });
        gColorPicker
            .append('g')
            .attr('transform', `translate(30,${60 * i})`)
            .call(slider);
    });
})