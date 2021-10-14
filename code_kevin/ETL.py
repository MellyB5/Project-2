from flask_pymongo import PyMongo
import pymongo
from flask import Flask, render_template, redirect
import json
import pandas

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.AU_bushfire

# import the following information into MongoDB
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

# Collections inside bushfire databse
c=db.AU_busfire_area_2020

# If there's already a collection, drop it and replace it with the new ones.
c.drop()
c.insert_many(fire_location)

# The below code was obtained from https://kb.objectrocket.com/mongo-db/export-mongodb-documents-as-csv-html-and-json-files-in-python-using-pandas-347

# make an API call to the MongoDB server using a Collection object
cursor=c.find()

# After you make the API call find(), and receive the PyMongo Cursor object, pass it to the list() function to access all documents.
mongo_docs=list(cursor)

# The next step is to do a pandas.core.series.Series conversion from the MongoDB documents. * >NOTE: Series objects are one-dimensional with indexing support. This compliments MongoDB document indexing requirements.
# Get a Pandas Series object index and alter it

series_obj = pandas.Series({"a key":"a value"})
print ("series_obj:", type(series_obj))

series_obj = pandas.Series( {"one":"index"} )
series_obj.index = [ "one" ]
print ("index:", series_obj.index)

# Store documents in a Dataframe object
docs = pandas.DataFrame(columns=[])

# Time for iteration through the function enumerate() and then new Pandas Series objects creation
for num, doc in enumerate( mongo_docs ):
    # convert ObjectId() to str
    doc["_id"] = str(doc["_id"])

    # get document _id from dict
    doc_id = doc["_id"]

    # create a Series obj from the MongoDB dict
    series_obj = pandas.Series( doc, name=doc_id )
    # append the MongoDB Series obj to the DataFrame obj
    docs = docs.append( series_obj )

docs.to_json("static/js/AU_bushfire_2020.json") # return JSON data


# # alternative method - refer to https://stackoverflow.com/questions/49153020/how-to-dump-a-collection-to-json-file-using-pymongo
# from bson.json_util import dumps
# from pymongo import MongoClient

# if __name__ == '__main__':
#     client = MongoClient()
#     db = client.AU_bushfire
#     collection = db.AU_busfire_area_2020
#     cursor = collection.find({})
#     with open('test.json', 'w') as file:
#         file.write('[')
#         for document in cursor:
#             file.write(dumps(document))
#             file.write(',')
#         file.write(']')