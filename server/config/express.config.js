/**
 * Created by zaccary.price on 17/06/2015.
 */

'use strict';

var express			= require('express');
var compression		= require('compression');
var bodyParser			= require('body-parser');
var methodOverride	= require('method-override');
var cookieParser		= require('cookie-parser');
var session			= require('express-session');
var errorHandler		= require('errorhandler');
var path				= require('path');
var config				= require('./env');

module.exports = function(app) {
	var env = config.env;

	app.use(cookieParser("gO0g$I3qkEWr0X&C92*P/=aiL8NAV-"));
	app.use(session({secret: "gO0g$I3qkEWr0X&C92*P/=aiL8NAV-"}));
	app.set('views', config.root + '/server/views');
	app.set('view engine', 'html');
	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	if ('production' === env) {
		//app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
		app.use(express.static(path.join(config.root, 'public')));
		app.set('appPath', config.root + '/public');

	} else if('heroku' === env) {
		app.use(express.static(path.join(config.root, 'public')));
		app.set('appPath', config.root + '/public');

	} else {

		app.use(express.static(path.join(config.root, '.tmp')));
		app.use(express.static(path.join(config.root, 'client')));
		app.set('appPath', 'client');
		app.use(errorHandler()); // Error handler - has to be last
	}
};