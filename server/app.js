express = require('express');

var app = express()

app.get('/', function (req, res) {
    var componentName = 'example';
    res.send({
        componentName: 'example',
        template: '<div>EXAMPLE</div>',
        codeURL: `/components/${componentName}`
    })
})
