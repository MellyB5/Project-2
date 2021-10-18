# Project-2

<b>ETL - Bushfire Boundaries Map</b>
 - GeoJSON file on Bushfire Boundaries was initially obtained from data.gov.au, which amounts to 3.5gb
 - Due to the sheer size of the data (especially on latitude and longitude), this cannot be uploaded into MongoDB nor being utilized in javascript code to generate a map
 - as a result, a smaller dataset which was manually done was created inside ETL - Bushfire Map.py which is then uploaded into MongoDB
 - API call via Flask were used to call data from MongoDB into the Javascript

<b>ETL - Environment Impact</b>
 - 2 csv files called animal_impact.csv and animal_status.csv were used.
 - Data cleaning & transformation was undertaken in ETL - Environment Data.ipynb, which are then saved in csv and json format.
 - Once done, sql alchemy library was utilised to create table format, and also to upload the transformed data into postgreSQL into Project-2 database

 <b>ETL - Health Data</b>
 - 1 csv files called NSW_ED_presentations.xlsx were used. The excel spreadsheet contains multiple worksheets which are then split into multiple dataframes
 - Data cleaning & transformation was undertaken in ETL - Health Data.ipynb, which are then saved into csv format.
 - Once done, a table was created using SQL query (refer to table_schema.sql), and the above csv files were loaded manually via pgAdmin into Health_db database.
 - Due to time contstraint, visualisation has only been undertaken for inhaler sales information

Note: the above ETL codes are stored inside consolidated_code folder