from flask import Flask, render_template, redirect, jsonify, request
from flask_pymongo import PyMongo
import pandas
from pymongo import MongoClient

# Create an instance of Flask
app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/AU_bushfire'
# establishing connection (refer to https://www.bogotobogo.com/python/MongoDB_PyMongo/python_MongoDB_RESTAPI_with_Flask.php)
conn = 'mongodb://localhost:27017'
client = MongoClient(conn)
db = client.AU_bushfire
c=db.AU_busfire_area_2020

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app)

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # # Return template and data
    return render_template("index.html")

@app.route("/bushfire_get_data", methods=['GET'])
def get_all_data():
    output=[]
    for result in c.find():
        output.append({
            'fire_coordinates': result['fire_coordinates'], 
            'state_coordinates': result['state_coordinates'],
            'territory': result['territory'],
            'city': result['city']
        })
    return jsonify(output)



@app.route("/bushfire_map.html")
def bushfire_map():

    # Return bushfire map page
    return render_template("bushfire_map.html")

if __name__ == "__main__":
    app.run(debug=True)
