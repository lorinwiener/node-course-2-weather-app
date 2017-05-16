const yargs = require ('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, geocodeResults) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather.getWeather(geocodeResults.latitude, geocodeResults.longitude, (weatherErrorMessage, weatherResults) => {
      if (weatherErrorMessage) {
        console.log(weatherErrorMessage);
      } else {
        console.log(`Address: ${geocodeResults.address}`);
        console.log(`It's currently: ${weatherResults.currently.temperature}.`);
        console.log(`It feels like: ${weatherResults.currently.apparentTemperature}.`);
      }
    });
  }
});
