'use strict';

var express    = require('express');
var consign    = require('consign');
var bodyParser = require('body-parser');
var config     = require('config');

var port = config.get('port');

var app = express();
app.use(bodyParser.json());

consign({cwd: process.cwd() + '/app'})
    .include('controllers')
    .include('routes')
    .into(app);

var server = app.listen(port, function () {
    console.log('Ipe listening at http://%s:%s',
		server.address().address, server.address().port);

    require('carbono-service-manager');
});

module.exports.app = app;
module.exports.server = server;
