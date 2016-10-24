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
console.log('Im calling the weather');

  const userName = req.body.user_name;
  const messageText = req.body.text;
  const getUserDefinedData = messageText.split(' ');
  const getUnits = 'metric';
  const getCity = getUserDefinedData[1];

  // if (getUserDefinedData.length === 2) {
  //   return getUnits === 'metrics';
  // } else if (getUserDefinedData[2] === 'celsius') {
  //   return getUnits === 'metric';
  // } else {
  //   return getUnits === 'imperial';
  // }

  const urlApiResponse = `http://api.openweathermap.org/data/2.5/weather?q=${getCity}&APPID=fc2a5047efd117936135c68fe985dcf6&units=${getUnits}`;
  const options = {
    uri: urlApiResponse
  };

  function callback(error, response, body) {

    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      botPayLoad: {
        text: `Hello ${userName}, here is the weather for ${getCity}:
              \nTEMP - ${info.main.temp}
              \nWEATHER - ${info.weather[0]["description"]}
              \nWIND SPEED - ${info.wind.speed}`
            };

            return botPayLoad;
        }
    }
  return res.status(200).json(request(options, callback.botPayLoad));
});
