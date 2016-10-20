const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const port = process.env.PORT || 1313;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(reg, res) {
    res.status(200).send('App is live!!');
});

app.listen(port, function() {
    console.log(`We are listening to the port: ${port}`);
});

app.post('/hello', function(req, res, next) {
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
  const userName = req.body.user_name;
  const messageText = req.body.text;
  const getCity = messageText.split('weather ');
  const urlApiResponse = `http://api.openweathermap.org/data/2.5/weather?q=${getCity[1]}&APPID=fc2a5047efd117936135c68fe985dcf6&units=metric`;

  const getData = http.get(urlApiResponse, (res) => {
    let body = '';
          // res.setEncoding('utf8');
          res.on('data', (chunk) => {
            body += chunk;
          });

          res.on('end', () => {
            const data = JSON.parse(body);
            const botPayLoad = {
              text: `Hello ${userName}, here is the weather for ${getCity}:
                    \nTEMP - ${data}
                    \nWEATHER - ${data}
                    \nWIND SPEED - ${data}`
                  };

            if (userName !== 'slackbot') {
              return res.status(200).json(botPayLoad)
            } else {
              return res.status(200).end();
            }
          }).on('error', (e) => {
            console.log('Got error: ' + e.message);
          });

    });

    return getData;
});
