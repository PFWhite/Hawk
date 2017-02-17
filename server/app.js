var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');

var app = express();

// app.use('/components', express.static(path.join(__dirname, 'components')));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.static('components'));

app.get('/', function (req, res) {
    res.render('test_page.html');
});

app.listen(1337);
