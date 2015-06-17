/**
 * Created by zaccary.price on 17/06/2015.
 */

var express = require('express');
var http = require('http');
var config = require('./config/env');

var app = express();
var server = http.createServer(app);
var log = require('log4js').getLogger('server');


require('./config/express.config')(app);


server.listen(config.port, function(err) {
	log.info('listening on port %d in %s mode', config.port, config.env);
});