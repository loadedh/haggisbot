const express = require('express');
const bodyParser = require('body-parser');

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
    const getCity = messageText.split('-weather ');
    const getData = $.ajax({
      dataType: "json",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${getCity[1]}&APPID=fc2a5047efd117936135c68fe985dcf6&units=metric`,
      data: data,
      success: success
    });

    const botPayLoad = {
      text: `Hello ${userName}, the weather for ${getCity[1]} is: \n ${getdata.main.temp}`
    };
    // $(document).ready(function() {
    //         $.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${getCity[1]}&APPID=fc2a5047efd117936135c68fe985dcf6&units=metric`, function(data) {
    //             temp: document.write(data.main.temp)
    //             conditions: document.write(data.weather.description)
    //         });
    //     });
    //
    //     text: `Hello ${userName}, the weather for ${getCity[1]} is: \n ${temp}`
    // };
    // const botPayLoad = {
    //     text: `Hello ${userName}, the weather for ${getCity[1]} is: \n ${weather.main.temp}`
    // };

    if (userName !== 'slackbot') {
        return res.status(200).json(botPayLoad);
    } else {
        return res.status(200).end();
    }
});
