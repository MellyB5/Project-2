//read in data
d3.json("data/protected_animals.json").then((data) => {
    //console.log(data);

    
    // function to get the animal data
    function getAnimal(whichAnimal){
        //console.log(data[whichAnimal])
        // extract data for chosen animal
        var common = data[whichAnimal].common;
        var scientific = data[whichAnimal].scientific;
        var states = data[whichAnimal].states;
        var type = data[whichAnimal].type;
        var distribution = data[whichAnimal].distribution;
        var status = data[whichAnimal].status;

        // put relevant data into animal card
        d3.select("#common-name").text(`${common}`);
        d3.select("#scientific-name").text(`${scientific}`);
        d3.select("#animal-type").text(`Type: ${type}`);
        d3.select("#animal-states").text(`Found in: ${states}`);
    }

     // initialise page
    var whichAnimal = 34;
    getAnimal(whichAnimal);

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