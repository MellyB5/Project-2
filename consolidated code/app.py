from flask import Flask, render_template, redirect, jsonify, request
from flask_pymongo import PyMongo
import pandas
from pymongo import MongoClient

import numpy as np
import pandas as pd
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import postgresql_pword
from config import username

#################################################
# Database Setup - SQL
#################################################
env_engine = create_engine(f'postgresql://{username}:{postgresql_pword}@localhost:5432/Project-2')
env_conn = env_engine.connect()

health_engine = create_engine(f"postgresql://{username}:{postgresql_pword}@localhost:5432/Health_db")
health_conn=health_engine.connect()

# Create an instance of Flask
app = Flask(__name__)
#set up mongo URI
app.config['MONGO_URI'] = 'mongodb://localhost:27017/AU_bushfire'

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app)

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # # Return template and data
    return render_template("index.html")

# -----------------------------------------Bushfire Map code -------------------------------------------------------------
@app.route("/bushfire_get_data", methods=['GET'])
def get_all_data():

    # establishing connection (refer to https://www.bogotobogo.com/python/MongoDB_PyMongo/python_MongoDB_RESTAPI_with_Flask.php)
    conn = 'mongodb://localhost:27017'
    client = MongoClient(conn)
    db = client.AU_bushfire
    c=db.AU_busfire_area_2020
    output=[]
    for result in c.find():
        output.append({
            'fire_coordinates': result['fire_coordinates'], 
            'state_coordinates': result['state_coordinates'],
            'territory': result['territory'],
            'city': result['city']
        })
    client.close()
    return jsonify(output)



@app.route("/bushfire_map.html")
def bushfire_map():

    # Return bushfire map page
    return render_template("bushfire_map.html")

# ------------------------------------------------------------------------------------------------------

# --------------------------Environmental Impact codes--------------------------------
@app.route("/bushfire-env")
def env_impact():
    return render_template("env_impact.html")    

@app.route("/api/env_impact/get_animals")
def get_env():
    # Create our session (link) from Python to the DB
    session=Session(env_engine)
    protected_animals = pd.read_sql_table("protected_animals", env_conn)
    animals_json = protected_animals.to_json(orient = "index")
    session.close()
    
    """Return the JSON representation of your dictionary."""
    return (animals_json)

# -----------------------------------------------------------------------------------

# ----------------------------Health Impact Codes------------------------------------
@app.route("/health_impact")
def health_impact():
    return render_template("health_impact.html")

@app.route("/api/health")
def health():
    health_session = Session(health_engine)
    sales = pd.read_sql_table("inhaler_sales", health_conn)
    sales_dict = sales.to_dict(orient="record")
    health_session.close()
    return jsonify(sales_dict)

# -----------------------------------------------------------------------------------
# ----------------------------Volunteer Statistics------------------------------------

@app.route("/volunteer")
def volunteer():

    # # Return template and data
    return render_template("volunteers.html")

if __name__ == "__main__":
    app.run(debug=True)


