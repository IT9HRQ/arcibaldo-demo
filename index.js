var express = require('express');
var app = express();
var path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './pages'));
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(3000, function () {
    console.log('arcibaldo demo ready on http://localhost:3000');
});

var a = 1;