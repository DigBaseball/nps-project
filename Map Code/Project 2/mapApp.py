#################################################
# Import Dependencies
#################################################
from flask import Flask
from flask import render_template
from flask import jsonify, request, Response
import psycopg2
from psycopg2.extras import RealDictCursor
import json
import pandas as pd

#################################################
# Database Setup
#################################################
t_host = "localhost"
t_port = "5432"
t_dbname = "National_Parks"
t_user = "postgres"
t_pw = "kenny123"
conn = psycopg2.connect(host=t_host,port=t_port, dbname=t_dbname, user=t_user, password=t_pw)
cur = conn.cursor(cursor_factory=RealDictCursor)
#################################################
# Flask Setup
#################################################
app = Flask(__name__, static_folder='static')
#################################################
# Flask Routes
#################################################
@app.route("/")
def index():
    #"""Return the map."""
    s_weather = "SELECT parkcode, name, totalsites, latitude, longitude, maxtempc, mintempc, humidity, windspeedkmph FROM clean_data;"
    cur.execute(s_weather)
    weather_info = cur.fetchall()
    with open('weather.json', 'w') as json_file:
        json.dump(weather_info, json_file)
    return render_template("index.html")
#@app.route("/dashboard")
#def dashboard():
#    """Return the dashboard."""
#    return render_template("dashboard.html")
# a page just to display query results with a for loop
#@app.route("/results")
#def MainCode():
    # SQL to get records from Postgres
#    s = "SELECT name, parkCode, latitude, longitude FROM campgrounds;" 
#    cur.execute(s)
    # assign query response to a variable
#    array_campgrounds = cur.fetchall()
    # load the results page and pass in a few variables
#    return render_template("results.html", t_title = "Campgrounds", array_campgrounds = array_campgrounds)
# returns list of park names
@app.route("/parks")
def parks():
    """Return a list of park names"""
 # perform the sql query
    s_parks = "SELECT parkcode, fullname, latitude, longitude FROM parkinfo;"
    cur.execute(s_parks)
    array_parks = cur.fetchall()
    with open('parks.json', 'w') as json_file:
        json.dump(array_parks, json_file)
    return jsonify(array_parks)
# returns list of campgrounds names for displaying in dropdown menu
@app.route("/campgrounds")
def campgrounds():
    """Return a list of park names"""
  # perform the sql query
    s_campgrounds = "SELECT * FROM campgrounds;"
    cur.execute(s_campgrounds)
    campground_names = cur.fetchall()
    with open('campgrounds.json', 'w') as json_file:
        json.dump(campground_names, json_file)
    return jsonify(campground_names)

#@app.route("/weather")
#def weather():
    """Return a list of weather"""
  # perform the sql query
    #s_weather = "SELECT maxtempc, mintempc, humidity, windspeedkmph FROM clean_data;"
    #cur.execute(s_weather)
    #weather_info = cur.fetchall()
    #with open('weather.json', 'w') as json_file:
    #    json.dump(weather_info, json_file)
    #return jsonify(weather_info)
if __name__ == '__main__':
    app.run(debug=True)