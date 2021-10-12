// An array containing all of the information needed to create city and state markers
var fire_locations = [
  {
    fire_coordinates: [[
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
    ]], 
    state_coordinates: [[-13.78, 128.83],
    [-21.81, 112.90],
    [-35.75, 114.34],
    [-31.72, 129.01]],
    territory: {
      name: "Western Australia",
      population: 2667000
    },
    city: {
      name: "Perth",
      population: 1985000
    }
  },
  {
    fire_coordinates: [[
      [-26.07, 129.17],
      [-28.4, 129.01],
      [-28.32, 131.35],
      [-26.45, 130.93]
    ]],
    state_coordinates: [[-25.96, 128.99],
    [-31.61, 128.96],
    [-37.99, 140.84],
    [-25.99, 140.95]],
    territory: {
      name: "Southern Australia",
      population: 1771000
    },
    city: {
      name: "Adelaide",
      population: 1306000
    }
  },
  {
    fire_coordinates: [[
      [-34.36, 150.63],
      [-34.92, 147.98],
      [-37.77, 147.50],
      [-37.31, 149.72]
    ]],    
    state_coordinates: [[-33.92, 141.04],
    [-38.80, 141.03],
    [-37.31, 149.60]],
    territory: {
      name: "Victoria",
      population: 6681000
    },
    city: {
      name: "Melbourne",
      population: 5078000
    }
  },
  {
    fire_coordinates: [[
      [-28.82, 151.81],
      [-33.64, 149.75],
      [-33.63, 151.23],
      [-28.38, 153.50]
    ]],    
    state_coordinates: [[-28.97, 140.96],
    [-28.20, 153.37],
    [-37.39, 149.57],
    [-33.92, 140.96]],
    territory: {
      name: "New South Wales",
      population: 8166000
    },
    city: {
      name: "Sydney",
      population: 5312000
    }
  },
  {
    fire_coordinates: [[
      [-10.74, 142.06],
      [-17.48, 140.87],
      [-19.42, 146.87],
    ],[
      [-23.65, 149.4],
      [-27.49, 151.62],
      [-27.31, 153.14],
    ]],
    state_coordinates: [[-16.64, 138.02],
    [-10.58, 142.50],
    [-28.25, 153.55],
    [-28.90, 141.00],
    [-25.94, 140.97],
    [-25.92, 137.99]],
    territory: {
      name: "Queensland",
      population: 5185000
    },
    city: {
      name: "Brisbane",
      population: 2280000
    }
  },
  {
    fire_coordinates: [[
      [-16.35, 128.9],
      [-14.66, 132.92],
      [-17.1, 137.86],
      [-11.88, 136.59],
      [-11.15, 129.99]
    ]],
    state_coordinates: [[-11.15, 129.15],
    [-25.96, 128.96],
    [-25.93, 138.00],
    [-11.20, 137.77]],
    territory: {
      name: "Northern Territory",
      population: 246500
    },
    city: {
      name: "Darwin",
      population: 132045
    }
  },
];

// Define arrays to hold created bushfire location of each respective states

var WA_fire=[]
var SA_fire=[]
var VIC_fire = [];
var NSW_fire = [];
var QLD_fire = [];
var NT_fire = [];



// Push the bushfire coordinates to its respective variable
  WA_fire.push(
    L.polygon(fire_locations[0].fire_coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "none",
      fillColor: "#de425b",
    })
  );

  SA_fire.push(
    L.polygon(fire_locations[1].fire_coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "none",
      fillColor: "#488f31",
    })
  );

  VIC_fire.push(
    L.polygon(fire_locations[2].fire_coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "none",
      fillColor: "#6aaa96",
    })
  );

  NSW_fire.push(
    L.polygon(fire_locations[3].fire_coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "none",
      fillColor: "#aecdc2",
    })
  );

  QLD_fire.push(
    L.polygon(fire_locations[4].fire_coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "none",
      fillColor: "#f3babc",
    })
  );

  NT_fire.push(
    L.polygon(fire_locations[5].fire_coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "none",
      fillColor: "#ec838a",
    })
  );
// Create base layers

// Streetmap Layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

// Create separate layer groups for each states
var WA_bushfire = L.layerGroup(WA_fire);
var SA_bushfire = L.layerGroup(SA_fire);
var VIC_bushfire = L.layerGroup(VIC_fire);
var NSW_bushfire = L.layerGroup(NSW_fire);
var QLD_bushfire = L.layerGroup(QLD_fire);
var NT_bushfire = L.layerGroup(NT_fire);

// Create a baseMaps object
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

// Create an overlay object
var overlayMaps = {
  "WA bushfire": WA_bushfire,
  "SA bushfire": SA_bushfire,
  "VIC bushfire": VIC_bushfire,
  "NSW bushfire": NSW_bushfire,
  "QLD bushfire": QLD_bushfire,
  "NT bushfire": NT_bushfire,
};

// Define a map object
var myMap = L.map("map", {
  center: [-25.27, 133.77],
  zoom: 4,
  layers: [streetmap, WA_bushfire, SA_bushfire, VIC_bushfire, NSW_bushfire, QLD_bushfire, NT_bushfire]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

// add a popup that shows each states' population upon mouseover
state_location=fire_locations.forEach(state=>{
  L.polygon(state.state_coordinates,{stroke: false,
    fillOpacity: 0.0,
    color: "none",
    fillColor: "white"})
    .bindPopup("State: "+ state.territory.name + "<br> State Population: "+state.territory.population)
    .addTo(myMap).on('mouseover', function (e) {this.openPopup()})
    .on('mouseout', function (e) {this.closePopup()});
})
