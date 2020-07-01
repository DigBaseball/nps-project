var _PremiumApiBaseURL = 'http://api.worldweatheronline.com/premium/v1/';

var _PremiumApiKey = '8ffb36c15c2d44998a545139202306';

// -------------------------------------------

function JSONP_LocalWeather(input) {
    var url = _PremiumApiBaseURL + 'weather.ashx?q=' + input.query + '&format=' + input.format + '&extra=' + input.extra + '&num_of_days=' + input.num_of_days + '&date=' + input.date + '&includelocation=' + input.includelocation + '&key=' + _PremiumApiKey;

    jsonP(url, input.callback);
}

function JSONP_PastWeather(input) {
    var url = _PremiumApiBaseURL + 'past-weather.ashx?q=' + input.query + '&format=' + input.format + '&date=' + input.date + '&enddate=' + input.enddate + '&includelocation=' + input.includelocation + '&key=' + _PremiumApiKey;

    jsonP(url, input.callback);
}

// -------------------------------------------

// Helper Method
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


