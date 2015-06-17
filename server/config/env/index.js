/**
 * Created by zaccary.price on 17/06/2015.
 */


var _ = require('lodash');
var path = require('path');

var all = {
	port: process.env.PORT || 9090,
	env: process.env.NODE_ENV || 'development',
	root: path.normalize(__dirname + '/../../..')
};

module.exports = _.merge(
	all,
	require('./' + all.env + '.js')
);