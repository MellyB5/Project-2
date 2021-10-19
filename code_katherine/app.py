import pandas as pd
import datetime as dt

import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import postgresql_pword

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
env_engine = create_engine(f'postgresql://postgres:{postgresql_pword}@localhost:5432/Project-2')
env_conn = env_engine.connect()

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# @app.route("/")
# def home():
#     return render_template("index.html")

@app.route("/")
def home():
    return render_template("env_impact.html")    

# @app.route("/env_impact")
# def home():
#     return render_template("env_impact.html")

@app.route("/api/env_impact/get_animals")
def get_env():
    # Create our session (link) from Python to the DB
    session=Session(env_engine)
    protected_animals = pd.read_sql_table("protected_animals", env_conn)
    animals_json = protected_animals.to_json(orient = "index")
    session.close()
    
    """Return the JSON representation of your dictionary."""
    return (animals_json)

if __name__ == '__main__':
    app.run(debug=True)
