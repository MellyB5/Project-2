from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pandas
from pymongo import MongoClient

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/AU_bushfire")

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
