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
    const apiResponse = `http://api.openweathermap.org/data/2.5/weather?q=${getCity[1]}&APPID=fc2a5047efd117936135c68fe985dcf6&units=metric`;
    const botPayLoad = $.getJSON(apiResponse, function(data) {
      text: `Hello ${userName}, the weather for ${getCity[1]} is: \n TEMP - ${data.main.temp} \n WEATHER - ${data.weather.description}`
    });
    

    // function httpGetAsync(theUrl, callback) {
    //     const xmlHttp = new XMLHttpRequest();
    //     xmlHttp.onreadystatechange = function() {
    //         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    //             callback(xmlHttp.responseText);
    //     }
    //     xmlHttp.open("GET", theUrl, true); // true for asynchronous
    //     xmlHttp.send(null);
    // }
    // const botPayLoad = httpGetAsync(`http://api.openweathermap.org/data/2.5/weather?q=${getCity[1]}&APPID=fc2a5047efd117936135c68fe985dcf6&units=metric`,
    //     function(err, data) {
    //         if (err != null) {
    //             console.log('Something went wrong')
    //         } else {
    //             text: `Hello ${userName}, the weather for ${getCity[1]} is: \n TEMP - ${data.main.temp} \n WEATHER - ${data.weather.description}`
    //         };
    //     }
    // });
// const json_obj = JSON.parse(Get(`http://api.openweathermap.org/data/2.5/weather?q=${getCity[1]}&APPID=fc2a5047efd117936135c68fe985dcf6&units=metric`))

if (userName !== 'slackbot') {
    return res.status(200).json(botPayLoad);
} else {
    return res.status(200).end();
}
});
