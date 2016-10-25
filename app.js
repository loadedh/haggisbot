const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const request = require('request');

const app = express();
const port = process.env.PORT || 1313;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(reg, res) {
    res.status(200).send('App is live!!');
    process.stdout.write('Does this thing work? ');
});

app.listen(port, function() {
    console.log(`We are listening to the port: ${port}!!!!!!!`);
});

app.post('/hello', function(req, res, next) {
  console.log('HEY')
    const userName = req.body.user_name;
    const botPayLoad = {
        text: `Hello ${userName}, this is the Haggis slack channel. ^n^ Welcome and have fun! ^n^`
    };

    if (userName !== 'slackbot') {
        return res.status(200).json(botPayLoad);
    } else {
        return res.status(200).end();
    }
});

app.post('/weather', function(req, res, next) {
// console.log('Im calling the weather');

  const userName = req.body.user_name;
  const messageText = req.body.text;
  const splitUsersMessage = messageText.split(' ');
  const userDefinedCity = splitUsersMessage[1];

  if (userDefinedCity == undefined) {
    return res.status(409).json({
      text: `Help: This is the weather bot. To use this bot type
        'weather (a city) (units of measurement celsius or fahrenheit)'
        the units of measurement are optional, if not specified it will be
        defaulted to metric/celsius. `
    });
  }

  UnitsOfMeasurement = '';
  imperialOrMetric = '';

  if (splitUsersMessage[2] === 'fahrenheit') {
    UnitsOfMeasurement = 'imperial';
    imperialOrMetric = '°F';
  } else {
    UnitsOfMeasurement = 'metric';
    imperialOrMetric = '°C';
    process.stdout.write('Units entered did not meet the criteria. Defaulting to metric');
  }

  const configuredApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${userDefinedCity}&APPID=fc2a5047efd117936135c68fe985dcf6&units=${UnitsOfMeasurement}`;
  const options = {
    uri: configuredApiUrl
  };

  function callback(error, response, body) {

    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      const botPayload = {
        text: `Hello ${userName}, here is the weather for ${userDefinedCity}:
               Temperature: ${info.main.temp}${imperialOrMetric}
               Weather conditions: ${info.weather[0]['description']} :${info.weather[0]['icon']}:
               Wind speed: ${info.wind.speed}mph`
      };
      return res.status(200).json(botPayload);
    } else {
      return process.stdout.write(`${res.status(409)} There was an error in the request and could not be processed`);
    }
  }

  request(options, callback)
});
