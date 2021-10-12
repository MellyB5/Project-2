// Create an initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map").setView([-25.27, 133.78], 4);

// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


// Coordinates for each point to be used in the polyline
var WA_fire = [[
  [-30.46, 115.17],
  [-33.75, 115.79],
  [-33.5, 116.03],
],[
  [-20.56, 116.23],
  [-21.64, 116.72],
  [-22.09, 121.57],
  [-19.47, 121.19]
],[
  [-18.73, 122.2],
  [-17.4, 128.96],
  [-14.85, 128.91],
  [-13.79, 126.94],
  [-17.06, 122.03]
]];

var NT_fire=[[
  [-16.35, 128.9],
  [-14.66, 132.92],
  [-17.1, 137.86],
  [-11.88, 136.59],
  [-11.15, 129.99]
]];

var QLD_fire= [[
  [-10.74, 142.06],
  [-17.48, 140.87],
  [-19.42, 146.87],
],[
  [-23.65, 149.4],
  [-27.49, 151.62],
  [-27.31, 153.14],
]];

var NSW_fire= [[
  [-28.82, 151.81],
  [-33.64, 149.75],
  [-33.63, 151.23],
  [-28.38, 153.50]
]]

var VIC_fire= [[
  [-34.36, 150.63],
  [-34.92, 147.98],
  [-37.77, 147.50],
  [-37.31, 149.72]
]]

var SA_fire= [[
  [-26.07, 129.17],
  [-28.4, 129.01],
  [-28.32, 131.35],
  [-26.45, 130.93]
]]

// Create a polyline using the line coordinates and pass in some initial options
d3.json("Bushfire Boundary 2019-2020.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(myMap)});



var WA_state=  [[-13.78, 128.83],
[-21.81, 112.90],
[-35.75, 114.34],
[-31.72, 129.01]]

var NT_state= [[-11.15, 129.15],
[-25.96, 128.96],
[-25.93, 138.00],
[-11.20, 137.77]]

var SA_state= [[-25.96, 128.99],
[-31.61, 128.96],
[-37.99, 140.84],
[-25.99, 140.95]]

var QLD_state= [[-16.64, 138.02],
[-10.58, 142.50],
[-28.25, 153.55],
[-28.90, 141.00],
[-25.94, 140.97],
[-25.92, 137.99]]

var NSW_state= [[-28.97, 140.96],
[-28.20, 153.37],
[-37.39, 149.57],
[-33.92, 140.96]]

var VIC_state= [[-33.92, 141.04],
[-38.80, 141.03],
[-37.31, 149.60]]