import numpy as np
import pandas as pd
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import postgresql_pword

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
env_engine = create_engine(f'postgresql://postgres:{postgresql_pword}@localhost:5432/Project-2')
env_conn = env_engine.connect()
# reflect an existing database into a new model
# Base = automap_base()
# reflect the tables
# Base.prepare(env_engine, reflect=True)

# Save references to the tables
# protected_animals = Base.classes.protected_animals



#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/env_impact")
def home():
    return render_template("env.html")

# @app.route("/api/env_impact")
@app.route("/api/env_impact/get_animals")
def get_env():
    # Create our session (link) from Python to the DB
    # session = Session(env_engine)
    # animals = pd.read_sql_table("protected_animals", connection)
    session=Session(env_engine)
    protected_animals = pd.read_sql_table("protected_animals", env_conn)
    animals_json = protected_animals.to_json(orient = "index")
    session.close()
    
    """Return the JSON representation of your dictionary."""
    return (animals_json)

if __name__ == '__main__':
    app.run(debug=True)
