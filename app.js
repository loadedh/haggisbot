const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 322;

app.use(bodyParser.urlencoded({
    extend,
    true
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
