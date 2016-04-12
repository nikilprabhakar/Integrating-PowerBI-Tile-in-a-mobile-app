

var express = require('express'),
    app = express();
//var routes = require('./routes');
var http = require('http');
//var models = require('./models');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.set('port', process.env.PORT || 8100);




app.listen(app.get('port'), function () {
console.log('Express server listening on port ' + app.get('port'));
});
