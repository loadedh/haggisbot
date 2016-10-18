const express = require('express');
const bodyParser = require('body-parser');

// let userWeather, userCity;
//
// const api = 'http://api.openweathermap.org/data/2.5/weather?' + '&APPID=fc2a5047efd117936135c68fe985dcf6&units=metric&';
// function() {
//   userWeather = api + userCity;
//   return userWeather;
// }

const app = express();
const port = process.env.PORT || 1313;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(reg, res) {
    res.status(200).send('App is live!!');
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

app.post('/weather', function(req, res, next) {
  const userName = req.body.user_name;
  const messageText = req.body.text;
  const getCity = messageText.match(/[^weather ]/gi);
  const botPayLoad = {
    text: 'Hello ' + userName + ', the weather for London is ' + 'http://api.openweathermap.org/data/2.5/weather?q='+ getCity +'&APPID=fc2a5047efd117936135c68fe985dcf6&units=metric'
    // text: 'Hello ' + userName + ', the weather for ' + userCity + ' is ' + userWeather.weather.clouds + ' : ' + userWeather.main.temp
  };

  if (userName !== 'slackbot') {
    return res.status(200).json(botPayLoad);
  } else {
    return res.status(200).end();
  }
});
