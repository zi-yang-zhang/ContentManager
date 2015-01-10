/**
 * Module dependencies
*/
var express  = require('express');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var passport = require('passport');
var vhost = 'nodejsapp.local'
var port     = process.env.PORT || 3000;
var ip     = process.env.IP || "localhost";

var app = express();

var db = require('./config/database')(mysql);
require('./config/passport')(passport,db); // pass passport for configuration

app.configure(function() {
    // set up our express application
	app.set('port', port);
	app.use(express.logger('dev')); // log every request to the console

    app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
    app.engine('.html', require('ejs').__express);
	app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.methodOverride());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router); //init routing
 });

require('./app/routes.js')(app,passport,db); // load our routes and pass in our app

 // development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
    // TODO
};

//express.vhost(vhost, app);

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + vhost+":"+server.address().port);
});