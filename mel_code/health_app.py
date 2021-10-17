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

app = Flask(__name__, template_folder="templates")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/health")
def health():
    session = Session(health_engine)
    sales = pd.read_sql_table("inhaler_sales", connection)
    sales_dict = sales.to_dict(orient="record")
    session.close()
    return jsonify(sales_dict)

# @app.route("/api/health/2")
# def health2():
#     session = Session(health_engine)
#     lung_data = []
#     breathing = pd.read_sql_table("breathing_abnormalities", connection)
#     breathing_dict = breathing.to_dict(orient="records")
#     lung_data.append(breathing_dict)
#     asthma = pd.read_sql_table("asthma", connection)
#     asthma_dict = asthma.to_dict(orient="records")
#     lung_data.append(asthma_dict)
#     respiratory = pd.read_sql_table("respiratory_disease", connection)
#     respiratory_dict = respiratory.to_dict(orient="records")
#     lung_data.append(respiratory_dict)
#     copd = pd.read_sql_table("copd_exacerbation", connection)
#     copd_dict = copd.to_dict(orient="records")
#     lung_data.append(copd_dict)
#     session.close()
#     return jsonify(lung_data)


if __name__ == "__main__":
    app.run(debug=True)
    