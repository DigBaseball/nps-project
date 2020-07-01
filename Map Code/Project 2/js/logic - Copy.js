var _PremiumApiBaseURL = 'http://api.worldweatheronline.com/premium/v1/';

var _PremiumApiKey = '8ffb36c15c2d44998a545139202306';

  // Create an overlayMaps object to hold the bikeStations layer
  var layers = {
    National_Parks: new L.layerGroup(),
    Campgrounds: new L.layerGroup()
  };


// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var map = L.map("map", {
  center: [37.0902, -95.7129],
  zoom: 5,
  layers: [layers.National_Parks, layers.Campgrounds]
});

var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 10,
  id: 'mapbox/light-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
}).addTo(map);

var baseMaps = {
  "Light Map": lightmap
};

// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
L.control.layers(baseMaps, layers, {
  collapsed: false
}).addTo(map);
// Create an overlays object to add to the layer control
var overlays = {
  "National Parks": layers.National_Parks,
  "Campgrounds": layers.Campgrounds
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

function JSONP_LocalWeather(input) {
  var url = _PremiumApiBaseURL + 'weather.ashx?q=' + input.query + '&format=' + input.format + '&extra=' + input.extra + '&num_of_days=' + input.num_of_days + '&date=' + input.date + '&includelocation=' + input.includelocation + '&key=' + _PremiumApiKey;

  jsonP(url, input.callback);
}

function jsonP(url, callback) {
  $.ajax({
      type: 'GET',
      url: url,
      async: false,
      contentType: "application/json",
      jsonpCallback: callback,
      dataType: 'jsonp',
      success: function (json) {
          console.dir('success');
      },
      error: function (e) {
          console.log(e.message);
      }
  });
}


function createMarkers(response, response2) {

    
    var parkinfo = response;
  
   
    var parkMarkers = [];
    var parkslength = parkinfo.length;
  
    
    for (var index = 0; index < parkslength; index++) {
      var parks = parkinfo[index];
  
      
      if (parks.latitude == 0 && parks.longitude == 0){
  
      }
      else {
      
      var parkMarker = L.marker([parks.latitude, parks.longitude])
        .bindPopup("<h3>" + parks.fullname + "</h3>"+ "<br>" + "Park Code: " + parks.parkcode + "<br>");
     
      parkMarker.addTo(layers['National_Parks']);
      }
    }

    //var icons = {
      //Campgrounds: L.ExtraMarkers.icon({
      // icon: "ion-settings",
      //  iconColor: "white",
      //  markerColor: "yellow",
      //  shape: "star"
      //})};
      
      var campinfo = response2;
      var campMarkers = [];
      var camplength = campinfo.length;

    
    for (var index = 0; index < camplength; index++) {
      var camps = campinfo[index];
  
     
      if (camps.latitude == 0 || camps.longitude == 0)
      {
      }
      else 
      {
      var campMarker = L.marker([camps.latitude, camps.longitude]);//, {
       // icon: icons["Campgrounds"]
        
          campMarker.bindPopup("<h3>" + camps.name + "</h3>" + 
          "<br>" + "Corresponding Park Code: "  + camps.parkcode + "</br>"
          + "<br>" + "Total Number of Sites : " + camps.totalsites + "</br>");
          campMarker.addTo(layers['Campgrounds']);
      }



    


    }
}

createMarkers(parkinfo, campgrounds);


