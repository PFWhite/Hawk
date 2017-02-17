
fs = require('fs');
nunjucks = require('nunjucks');
nunjucks.configure({ autoescape: true });
//console.log(nunjucks.renderString('Hello {{ username }}', { username: 'Akash' }));

var component_name = process.argv[2];

console.log(component_name);
var dirName = "components/"+component_name;
if (!fs.existsSync(dirName)){
	fs.mkdirSync(dirName);
}

dirName += "/";

var fd = fs.openSync(dirName + component_name + ".html", 'w');
var htmlTemp = '<div class="{{class}}">\n</div>';
fs.writeSync(fd, nunjucks.renderString(htmlTemp, { class: component_name }));
fs.closeSync(fd);


fd = fs.openSync(dirName + component_name + ".js", 'w');
var jsTemp = 'function(){\n}';
fs.writeSync(fd, jsTemp);
fs.closeSync(fd);

fd = fs.openSync(dirName + component_name + ".scss", 'w');
var scssTemp = '.{{class}} { \n }';
fs.writeSync(fd, nunjucks.renderString(scssTemp, { class: component_name }));
fs.closeSync(fd);

fd = fs.openSync(dirName + component_name + "_test.js", 'w');
var testTemp = "describe('{{component}} Test Cases', function () { \n\
    it('Test Case 1', function () {\n\
       \n\
    });\n\
});";
fs.writeSync(fd, nunjucks.renderString(testTemp, { component: component_name }));
fs.closeSync(fd);

