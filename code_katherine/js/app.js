//read in data
d3.json("data/protected_animals.json").then((dataA) => {
    //console.log(dataA);

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
        var status = dataA[whichAnimal].status;

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
        console.log("went to function")
        whichAnimal = Math.floor(Math.random() * (numAnimals));
        console.log(whichAnimal);
        getAnimal(whichAnimal);
    }

    // initialise page
    var whichAnimal = 10;
    getAnimal(whichAnimal);

    // start over on button click
    d3.select("#choose-animal")
        .on("click", newAnimal);

var data = [0, 1];

    // Fill
    var sliderFill = d3
        .sliderBottom()
        .min(d3.min(data))
        .max(d3.max(data))
        .width(300)
        .tickFormat(d3.format(',.0%'))
        .ticks(5)
        .default(0.3)
        .fill('#2196f3')
        .on('onchange', val => {
            d3.select('p#value-fill').text(d3.format(',.0%')(val));
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




    // Simple
    var data = [0, 0.1, 0.3, 0.5, 0.8, 1];

    var sliderSimple = d3
        .sliderBottom()
        .min(d3.min(data))
        .max(d3.max(data))
        .width(300)
        .tickFormat(d3.format('.0%'))
        .ticks(5)
        .default(0.3)
        .on('onchange', val => {
            d3.select('p#value-simple').text(d3.format('.2%')(val));
        });

    var gSimple = d3
        .select('div#slider-simple')
        .append('svg')
        .attr('width', 500)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

    gSimple.call(sliderSimple);

    d3.select('p#value-simple').text(d3.format('.2%')(sliderSimple.value()));

    // Step
    var sliderStep = d3
        .sliderBottom()
        .min(d3.min(data))
        .max(d3.max(data))
        .width(300)
        .tickFormat(d3.format('.0%'))
        .ticks(5)
        .step(0.005)
        .default(0.4)
        .on('onchange', val => {
            d3.select('p#value-step').text(d3.format('.0%')(val));
        });

    var gStep = d3
        .select('div#slider-step')
        .append('svg')
        .attr('width', 500)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

    gStep.call(sliderStep);

    d3.select('p#value-step').text(d3.format('.2%')(sliderStep.value()));

    // Range
    var sliderRange = d3
        .sliderBottom()
        .min(d3.min(data))
        .max(d3.max(data))
        .width(300)
        .tickFormat(d3.format('.2%'))
        .ticks(5)
        .default([0.015, 0.02])
        .fill('#2196f3')
        .on('onchange', val => {
            d3.select('p#value-range').text(val.map(d3.format('.2%')).join('-'));
        });

    var gRange = d3
        .select('div#slider-range')
        .append('svg')
        .attr('width', 500)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

    gRange.call(sliderRange);

    d3.select('p#value-range').text(
        sliderRange
            .value()
            .map(d3.format('.2%'))
            .join('-')
    );

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