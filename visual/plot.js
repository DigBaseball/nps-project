/*
Old JSON test
   {
     "": 0,
     "parkCode": "apis",
     "name": "Presque Isle Campground - Stockton Island",
     "totalSites": 17,
     "latitude": "",
     "longitude": "",
     "numberOfSitesFirstComeFirstServe": 0,
     "numberOfSitesReservable": 17,
     "description": "Boat-in only campsites scattered along the shore of Presque Isle Bay on Stockton Island, 14 miles offshore from Bayfield, WI.  Island access is extremely limited in winter and challenging in spring and fall.  Cruise boat and/or water taxi access available from late spring to early fall.  The island features 15 miles of hiking trails,  three beautiful beaches, and supports a population of black bears. Campsites include picnic tables, a fire ring, a tent pad, and a bear proof food locker.",
     "operatingHours": "[{'exceptions': [], 'description': 'The campground is open all year.  Getting to the island in winter may involve crossing the ice on Lake Superior.  Getting to the island by boat in spring and fall can be very challenging.  Park staff are stationed on the island from mid-June through Labor Day.  The campground is unstaffed the rest of the year.  Camping permits are required to stay in the campground.  The sites are available on a first-come first-served basis. Specific sites cannot be reserved.', 'standardHours': {'wednesday': 'All Day', 'monday': 'All Day', 'thursday': 'All Day', 'sunday': 'All Day', 'tuesday': 'All Day', 'friday': 'All Day', 'saturday': 'All Day'}, 'name': 'Presque Isle Campground - Stockton Island'}]",
     "reservationInfo": "Campsites in the Presque Isle Campground can be reserved at www.recreation.gov.",
     "id": "B9A85E18-3D4D-4310-8175-F0F18015AC42",
     "reservationUrl": "http://www.recreation.gov/wildernessAreaDetails.do?page=detail&contractCode=NRSO&parkId=74996"
   },
[
New JSON test
  {
    "OG_Count": 1,
    "parkCode": "grsm",
    "name": "Abrams Creek Campground",
    "Qtr": 1,
    "Season": "Winter",
    "maxtempC": 10.21458752,
    "mintempC": 0.7682323,
    "humidity": 78.67823075,
    "visibility": 8.028522245,
    "windspeedKmph": 8.19305749,
    "DewPointC": 1.305202325,
    "cloudcover": 48.06644035
  },
*/

// d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
d3.json("data/data.json").then((incomingData) => {
  function filterTemps(temp_max) {
    return temp_max.maxtempC > 0;
  }
/*
  d3.json("data/data.json").then((incomingData2) => {
    function filterHumid(humid_max) {
      return humid_max.humidity > 0;
    }
*/
  // filter() to pass the function as its argument
  var filteredTemps = incomingData.filter(filterTemps);
  //var filteredHumid = incomingData1.filter(filterHumid);
  //var filteredMinTemp = incomingData1.filter(filteredMinTemp);



  //  filtering parameters.
  console.log(filteredTemps);
  //console.log(filteredHumid);
  //console.log(filteredMinTemp);



  // map method with the arrow function to return all the filtered 
  var parkCode = filteredTemps.map(parks =>  parks.name);
  //var parkCode = filteredHumid.map(parks =>  parks.parkCode);
  //var parkCode = filteredMinTemp.map(parks =>  parks.parkCode);



  // Use the map method with the arrow function to return all the filtered movie metascores.
  //var parkID = filteredCampSites.map(code => code.parkCode);
  var tempTest = filteredTemps.map(code => code.cloudcover);
  //var humidTest = filteredHumid.map(code => code.humidity);
  //var humidTest = filteredMinTemp.map(code => code.humidity);




  // Check  filtered data .
  //console.log(maxtempC);
  //console.log(parkID);
  //console.log(mintempC);


  // Create  trace1.
  var trace = {
    x: parkCode,
    y: tempTest,
    type: "scatter"
  };

/*
    // Create  trace2.
    var trace2 = {
      x: parkCode,
      y: humidTest,
      type: "line"
    };
*/
  // Create the data array for  plot
  var data = [trace];
  //var data2 = [trace2];


  // Defining plot layout
  var layout = {
    title: "Cloud Cover % for National Parks",
    xaxis: { title: "National Park Name" },
    yaxis: { title: "Cloud Cover %"}
  };

  /*
  // Defining the plot layout
  var layout2 = {
    title: "Humidity Data for NPS",
    xaxis: { title: "National Park CODE" },
    yaxis: { title: "Humidity"}
    };

      // Defining the plot layout
  var layout3 = {
    title: "Humidity Data for National Parks",
    xaxis: { title: "National Park CODE" },
    yaxis: { title: "Min Temp C"}
    };
*/
  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar-plot", data, layout);
  //Plotly.newPlot("line-plot", data2, layout2);
  //Plotly.newPlot("bar-plot", data3, layout3);

});
