import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
import pandas as pd
from config import username
from config import password

health_engine = create_engine(f"postgresql://{username}:{password}@localhost:5432/Health_db")
connection = health_engine.connect()


app = Flask(__name__)

# @app.route("/")
# def home():
#     return render_template("index.html")

@app.route("/api/health")
def health():
    session = Session(health_engine)
    sales = pd.read_sql_table("inhaler_sales", connection)
    sales_dict = sales.to_dict(orient="records")
    # breathing_abnormalities = session.query("select * from breathing_abnormalities")
    # asthma = session.query("select * from asthma")
    session.close()
    return jsonify(sales_dict)
    # return jsonify(breathing_abnormalities)
    # return jsonify(asthma)

@app.route("api/health/2")
def health2():
    session = Session(health_engine)
    breathing = pd.read_sql_table("breathing_abnormalities", connection)
    breathing_dict = breathing.to_dict(orient="records")
    asthma = pd.read_sql_table("asthma", connection)
    asthma_dict = asthma.to_dict(orient="records")
    respiratory = pd.read_sql_table("respiratory_disease", connection)
    respiratory_dict = respiratory.to_dict(orient="records")
    copd = pd.read_sql_table("copd", connection)
    copd_dict = copd.to_dict(orient="records")
    session.close()
    return jsonify(breathing_dict)
    return jsonify(asthma_dict)
    return jsonify(respiratory_dict)
    return jsonify(copd_dict)

if __name__ == "__main__":
    app.run()
    