var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('/components', express.static(path.join(__dirname, 'components'))));

app.get('/', function (req, res) {
    var componentName = 'patrick';
    res.send({
        componentName: 'patrick',
        template: '/components/patrick/patrick.html',
        codeURL: `/components/patrick/patrick.js`
    });
});

app.listen(1337);
