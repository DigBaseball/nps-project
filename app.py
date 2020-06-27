#################################################
# Import Dependencies
#################################################

from flask import Flask
from flask import render_template
import psycopg2


#################################################
# Database Setup
#################################################

t_host = "localhost"
t_port = "5432"
t_dbname = "nps_project"
t_user = "postgres"
t_pw = "yX8nLv1jy7"
db_conn = psycopg2.connect(host=t_host,port=t_port, dbname=t_dbname, user=t_user, password=t_pw)
db_cursor = db_conn.cursor()

#################################################
# Flask Setup
#################################################

app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/index")
def index():
    """Return the map."""
    return render_template("index.html")
    

@app.route("/results")


def MainCode():
    # SQL to get records from Postgres
    s = "SELECT name, parkCode, latitude, longitude FROM campgrounds;"
    db_cursor.execute(s)
    
    # Here we catch and display any errors that occur
    #   while TRYing to commit the execute our SQL script.
    try:
        array_campgrounds = db_cursor.fetchall()
    except psycopg2.Error as e:
        t_error_message = "Database error: " + e + "/n SQL: " + s
        # The "/n" we see above is a carriage return.
        # The "+ s" above tacks the SQL onto the error report, giving
        #   the developer potentially useful information on what
        #   may have caused the error.
        # NOTE: we did not supply the HTML to "error_report.html"
        #   You can build that page yourself using what you learned in studying results.html

        return render_template("error_report.html", t_error_message = t_error_message)

    return render_template("results.html", t_title = "Campgrounds", array_campgrounds = array_campgrounds)
 




if __name__ == '__main__':
    app.run(debug=True)
