const express = require('express');
const bodyParser = require('body-parser');

let weather, apiKey = 'APPID=fc2a5047efd117936135c68fe985dcf6';
const app = express();
const port = process.env.PORT || 1313;

function weatherSetUp() {
  loadJson('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=fc2a5047efd117936135c68fe985dcf6', getWeatherData)
}
function getWeatherData(data) {
  weather = data;
}


app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(reg, res) {
    res.status(200).send('The server is up!!');
});

app.listen(port, function() {
    console.log('We are listening to the port: ' + port);
});

app.post('/hello', function(req, res, next) {
    const userName = req.body.user_name;
    const botPayLoad = {
        text: 'Hello ' + userName + ', this is the Haggis slack channel. ^_^ Welcome and have fun! ^_^ '
    };

    if (userName !== 'slackbot') {
        return res.status(200).json(botPayLoad);
    } else {
        return res.status(200).end();
    }
});

app.post('/weatherLondon', function(req, res, next) {
  const userName = req.body.user_name;
  const botPayLoad = {
    text: 'Hello ' + userName + ', the temperature for London is ' + weather
  };

  if (userName !== 'slackbot') {
    return res.status(200).json(botPayLoad);
  } else {
    return res.status(200).end();
  }
});
