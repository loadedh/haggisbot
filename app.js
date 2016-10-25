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
    process.stdout.write('Does this thing work?');
});

app.listen(port, function() {
    console.log(`We are listening to the port: ${port}!!!!!!!`);
});

app.post('/hello', function(req, res, next) {
  console.log('HEY')
    const userName = req.body.user_name;
    const botPayLoad = {
        text: `Hello ${userName}, this is the Haggis slack channel. ^_^ Welcome and have fun! ^_^`
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
  const getUserDefinedData = messageText.split(' ');
  const getCity = getUserDefinedData[1];
  UnitsOfMeasurement = '';

  if (getUserDefinedData.length === 2) {
    UnitsOfMeasurement = 'metric';
    console.log('Units defaulted to metric/celsius')
  } else if (getUserDefinedData[2] === 'celsius') {
    UnitsOfMeasurement = 'metric';
  } else if (getUserDefinedData[2] === 'fahrenheit') {
    UnitsOfMeasurement = 'imperial';
  } else {
    UnitsOfMeasurement = 'metric';
    process.stdout.write('Units entered did not meet the criteria. Defaulting to metric');
  }

  const configuredApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${getCity}&APPID=fc2a5047efd117936135c68fe985dcf6&units=${UnitsOfMeasurement}`;
  const options = {
    uri: configuredApiUrl
  };

  function callback(error, response, body) {

    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      const botPayload = {
        text: `Hello ${userName}, here is the weather for ${getCity}:
               TEMP - ${info.main.temp}
               WEATHER - ${info.weather[0]["description"]}
               WIND SPEED - ${info.wind.speed}`
      };
      return res.status(200).json(botPayload);
    } else {
      return process.stdout.write(`${res.status(409)} There was an error in the request and could not be processed`);
    }
  }

  request(options, callback)
});
