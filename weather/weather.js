const request = require('request');

var getWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/20b43a0308c6637818777c8b0e7e4f4e/${lat},${lng}`,
      json: true
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, body);
      } else {
        callback('Unable to connect to Forecast.io server.');
      }
    }
  );
};

module.exports = {
  getWeather
};
