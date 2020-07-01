#################################################
# Import Dependencies
#################################################

from flask import Flask
from flask import render_template
from flask import jsonify
import pandas as pd
import psycopg2


#################################################
# Database Setup
#################################################

t_host = "localhost"
t_port = "5432"
t_dbname = "nps_project"
t_user = "postgres"
t_pw = "yX8nLv1jy7"
conn = psycopg2.connect(host=t_host,port=t_port, dbname=t_dbname, user=t_user, password=t_pw)
cur = conn.cursor()

#################################################
# Flask Setup
#################################################

app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# *** not used *** a page to display a map 
@app.route("/index")
def index():
    """Return the map."""
    return render_template("index.html")
    
# a page for displaying the campground dashboard
@app.route("/dashboard")
def dashboard():
    """Return the dashboard."""
    return render_template("dashboard.html")


# a scratch page just to display query results with a for loop
@app.route("/results")

def MainCode():
    # SQL to get records from Postgres
    s = "SELECT name, parkCode, latitude, longitude FROM campgrounds;"
    cur.execute(s)

    # assign query response to a variable
    array_campgrounds = cur.fetchall()
    
    # load the results page and pass in a few variables
    return render_template("results.html", t_title = "Campgrounds", array_campgrounds = array_campgrounds)


@app.route("/parkCampgrounds/<pc>")
def parkCampgrounds(pc):
    """Return a list of campgrounds for a given park"""

    # perform the sql query
    s_parkCampgrounds = f"SELECT * FROM campgrounds WHERE parkCode like '{pc}' ORDER BY name asc;"
    cur.execute(s_parkCampgrounds)

    # store query result in a variable
    park_campground_names = cur.fetchall()

    # initialize empty list variables to populate park campground data via for loop
    parkCodes = []
    name = []
    totalSites = []
    latitude = []
    longitude = []
    numberOfSitesFirstComeFirstServe = []
    numberOfSitesReservable = []
    description = []
    operatingHours = []
    reservationInfo = []
    ids = []
    reservationUrl = []

    for park_campground in park_campground_names:
        parkCodes.append(park_campground[0])
        name.append(park_campground[1])
        totalSites.append(park_campground[2])
        latitude.append(park_campground[3])
        longitude.append(park_campground[4])
        numberOfSitesFirstComeFirstServe.append(park_campground[5])
        numberOfSitesReservable.append(park_campground[6])
        description.append(park_campground[7])
        operatingHours.append(park_campground[8])
        reservationInfo.append(park_campground[9])
        ids.append(park_campground[10])
        reservationUrl.append(park_campground[11])

    park_campgrounds_df = pd.DataFrame(list(zip(parkCodes, name, totalSites, latitude, longitude, numberOfSitesFirstComeFirstServe, numberOfSitesReservable, description, operatingHours, reservationInfo, ids, reservationUrl)), 
               columns =['parkCodes', 'name', 'totalSites', 'latitude', 'longitude', 'numberOfSitesFirstComeFirstServe', 'numberOfSitesReservable', 'description', 'operatingHours', 'reservationInfo', 'id', 'reservationUrl'])

    park_campgrounds_json = park_campgrounds_df.to_json(orient='table')     

    return park_campgrounds_json

# returns list of park names
@app.route("/parks")
def parks():
    """Return a list of park data"""

    # perform the sql query
    s_parks = "SELECT * FROM parks ORDER BY fullName asc;"
    cur.execute(s_parks)

    # store query result in variable
    park_names = cur.fetchall()

    # initialize empty list variables to populate park data via for loop
    fullName = []
    name = []
    parkCode = []
    designation = []
    states = []
    url = []

    for park in park_names:
        fullName.append(park[0])
        name.append(park[1])
        parkCode.append(park[2])
        designation.append(park[3])
        states.append(park[4])
        url.append(park[5])
    
    parks_df = pd.DataFrame(list(zip(fullName, name, parkCode, designation, states, url)), 
               columns =['fullName', 'name', 'parkCode', 'designation', 'states', 'url'])

    parks_json = parks_df.to_json(orient='table')

    return parks_json

# *** not used *** returns list of campgrounds names for displaying in dropdown menu
@app.route("/campgrounds")
def campgrounds():
    """Return a list of park names"""

    # perform the sql query
    s_campgrounds = "SELECT * FROM campgrounds ORDER BY name asc;"
    cur.execute(s_campgrounds)

    campground_names = cur.fetchall()

    return jsonify(campground_names)

if __name__ == '__main__':
    app.run(debug=True)
