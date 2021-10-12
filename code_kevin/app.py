from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo


# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/AU_bushfire")


fire_location = [
    {
        'fire_coordinates': [[
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
        'state_coordinates': [[-13.78, 128.83],
        [-21.81, 112.90],
        [-35.75, 114.34],
        [-31.72, 129.01]],
        'territory': {
        'name': "Western Australia",
        'population': 2667000
        },
        'city': {
        'name': "Perth",
        'population': 1985000
        }
    },
    {
        'fire_coordinates': [[
        [-26.07, 129.17],
        [-28.4, 129.01],
        [-28.32, 131.35],
        [-26.45, 130.93]
        ]],
        'state_coordinates': [[-25.96, 128.99],
        [-31.61, 128.96],
        [-37.99, 140.84],
        [-25.99, 140.95]],
        'territory': {
        'name': "Southern Australia",
        'population': 1771000
        },
        'city': {
        'name': "Adelaide",
        'population': 1306000
        }
    },
    {
        'fire_coordinates': [[
        [-34.36, 150.63],
        [-34.92, 147.98],
        [-37.77, 147.50],
        [-37.31, 149.72]
        ]],    
        'state_coordinates': [[-33.92, 141.04],
        [-38.80, 141.03],
        [-37.31, 149.60]],
        'territory': {
        'name': "Victoria",
        'population': 6681000
        },
        'city': {
        'name': "Melbourne",
        'population': 5078000
        }
    },
    {
        'fire_coordinates': [[
        [-28.82, 151.81],
        [-33.64, 149.75],
        [-33.63, 151.23],
        [-28.38, 153.50]
        ]],    
        'state_coordinates': [[-28.97, 140.96],
        [-28.20, 153.37],
        [-37.39, 149.57],
        [-33.92, 140.96]],
        'territory': {
        'name': "New South Wales",
        'population': 8166000
        },
        'city': {
        'name': "Sydney",
        'population': 5312000
        }
    },
    {
        'fire_coordinates': [[
        [-10.74, 142.06],
        [-17.48, 140.87],
        [-19.42, 146.87],
        ],[
        [-23.65, 149.4],
        [-27.49, 151.62],
        [-27.31, 153.14],
        ]],
        'state_coordinates': [[-16.64, 138.02],
        [-10.58, 142.50],
        [-28.25, 153.55],
        [-28.90, 141.00],
        [-25.94, 140.97],
        [-25.92, 137.99]],
        'territory': {
        'name': "Queensland",
        'population': 5185000
        },
        'city': {
        'name': "Brisbane",
        'population': 2280000
        }
    },
    {
        'fire_coordinates': [[
        [-16.35, 128.9],
        [-14.66, 132.92],
        [-17.1, 137.86],
        [-11.88, 136.59],
        [-11.15, 129.99]
        ]],
        'state_coordinates': [[-11.15, 129.15],
        [-25.96, 128.96],
        [-25.93, 138.00],
        [-11.20, 137.77]],
        'territory': {
        'name': "Northern Territory",
        'population': 246500
        },
        'city': {
        'name': "Darwin",
        'population': 132045
        }
    }
]

mongo.db.AU_busfire_area_2020.drop()
mongo.db.AU_busfire_area_2020.insert_many(fire_location)

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # # Return template and data
    return render_template("Bushfire_Area.html")

@app.route("/tes")
def tes():

    # Redirect back to home page
    return render_template("Bushfire_Area.html")

if __name__ == "__main__":
    app.run(debug=True)
