function updateCamps(parkCode) {
  console.log(`New Park code is ${parkCode}`);

  var campDropdown = d3.select("#selCampground");

  campDropdown.html("");

  d3.json(`/parkCampgrounds/${parkCode}`).then(function(data) {

      for (var i = 0; i < data.data.length; i++) {
        campDropdown.append("option").text(data.data[i].name);
      };
    });

};

// function to call when a new park is selected
function parkChanged() {

  // create a handle to the park dropdown menu
  var parkDropdown = d3.select("#selPark");

  // assign the value of the park dropdown menu option to a variable
  var newParkSelection = parkDropdown.property("value");

  // console.log(newParkSelection);

  d3.json(`/parks`).then(function(data) {
    var parkData = data.data;
    
    // assign a variable to store data for the park selected
    var selectedParkData = parkData.filter(park => park.fullName === newParkSelection);

    // assign a variable to store parkCode for the park selected
    var selectedParkCode = selectedParkData[0].parkCode;

    updateCamps(selectedParkCode);
  })
};



// function to do initial data load and visualization
function initParks() {

  // grab response from json
  d3.json(`/parks`).then(function(data) {

  // Get a handle to the campground dropdown menu
  var dropdown = d3.select("#selPark");

  // Populate dropdown menu with names
  for (var i = 0; i < data.data.length; i++) {
      dropdown.append("option").text(data.data[i].fullName);
  };

  parkChanged();

})};

initParks();